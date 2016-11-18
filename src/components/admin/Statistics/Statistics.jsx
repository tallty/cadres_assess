// 通用Statistics组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './Statistics.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import { Icon, Table, Spin, Message } from 'antd'

const columns = [{
  title: '序号',
  dataIndex: 'index',
}, {
  title: '干部姓名',
  dataIndex: 'name',
}, {
  title: '领导评分',
  dataIndex: 'average_score_for_leader',
  sorter: (a, b) => a.average_score_for_leader - b.average_score_for_leader,
}, {
  title: '中层互评',
  dataIndex: 'average_score_for_middle_manager',
  sorter: (a, b) => a.average_score_for_middle_manager - b.average_score_for_middle_manager,
}, {
  title: '员工评分',
  dataIndex: 'average_score_for_staff',
  sorter: (a, b) => a.average_score_for_staff - b.average_score_for_staff,
}, {
  title: '总分',
  dataIndex: 'average_score_for_all',
  sorter: (a, b) => a.average_score_for_all - b.average_score_for_all,
},{
  title: '等级',
  dataIndex: 'final_result',
}];

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      loading: true,
      data: [],
      order_columns: [],
      filters: []
    }
  }

  componentWillMount() {
    var year = this.props.location.query.year
    this.getData(year);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loading: true})
    var year = this.getQueryString("year")
    this.getData(year);
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  detail_cell(record, index){
    this.props.router.replace(`/statistics_d?year=${this.props.location.query.year}&id=${record.id}`)
  }

  getData(year){
    const url = `http://114.55.172.35:3232/admin/results?activity_year=${year}`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end( (err, res) => {
        if (!err || err === null) {
          var data = res.body.table
          this.setState({data: data, loading: false})
        } else {
          Message.error("获取统计数据失败");
        }
      })
  }

  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  render() {
    return (
      <Admin>
        <div className={css.table_content}>
          <div className={css.table_title}><span>{this.props.location.query.year}</span>考核统计结果列表</div>
            <Table columns={columns} 
             bordered 
             dataSource={this.state.data} 
             onRowClick={this.detail_cell.bind(this)}
             loading={this.state.loading}
             pagination={{pageSize: 10}} 
             onChange={this.onChange} />
        </div>
      </Admin>
    )
  }
}

export default withRouter(Statistics)