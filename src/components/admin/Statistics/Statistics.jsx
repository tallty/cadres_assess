// 通用Statistics组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './Statistics.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import { Icon, Table } from 'antd'

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

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
      data: [],
      order_columns: [],
      filters: []
    }
  }

  componentWillMount() {
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    this.getData()
  }

  detail_cell(record, index){
    this.props.router.replace(`/statistics_d?id=${index}`)
  }

  getData(){
    SuperAgent
      .get("http://114.55.172.35:3232/admin/results")
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .send('activity_year', this.props.location.query.year)
      .end( (err, res) => {
        if (res.ok) {
          var data = res.body.table
          this.setState({data: data})
        }
      })
  }

  render() {
    return (
      <Admin>
        <div className={css.table_content}>
          <Table columns={columns} 
                 bordered 
                 dataSource={this.state.data} 
                 onRowClick={this.detail_cell.bind(this)} 
                 pagination={ false } 
                 onChange={onChange} />
        </div>
      </Admin>
    )
  }
}

export default withRouter(Statistics)