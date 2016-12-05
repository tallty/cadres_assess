// 通用StatisticsD组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './StatisticsD.less'
import Admin from '../Admin';
import { StepThree } from '../../assess/StepThree';
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import { Icon, Table, Button, Tabs } from 'antd'

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

function callback(key) {
  console.log(key);
}

const TabPane = Tabs.TabPane;

const columns = [{
  title: '评委姓名',
  dataIndex: 'add_index.姓名',
}, {
  title: '考核项1',
  dataIndex: 'add_index.0',
}, {
  title: '考核项2',
  dataIndex: 'add_index.1',
}, {
  title: '考核项3',
  dataIndex: 'add_index.2',
}, {
  title: '考核项4',
  dataIndex: 'add_index.3',
},{
  title: '考核项5',
  dataIndex: 'add_index.4',
},{
  title: '考核项6',
  dataIndex: 'add_index.5',
},{
  title: '考核项7',
  dataIndex: 'add_index.6',
},{
  title: '考核项8',
  dataIndex: 'add_index.7',
},{
  title: '考核项9',
  dataIndex: 'add_index.8',
},{
  title: '考核项10',
  dataIndex: 'add_index.9',
},{
  title: '考核项11',
  dataIndex: 'add_index.10',
},{
  title: '考核项12',
  dataIndex: 'add_index.11',
},{
  title: '考核项13',
  dataIndex: 'add_index.12',
},{
  title: '考核项14',
  dataIndex: 'add_index.13',
},{
  title: '考核项15',
  dataIndex: 'add_index.14',
},{
  title: '考核项16',
  dataIndex: 'add_index.15',
},{
  title: '考核项17',
  dataIndex: 'add_index.16',
},{
  title: '总体评价',
  dataIndex: 'add_index.17',
},{
  title: '平均分',
  dataIndex: 'add_index.18',
  sorter: (a, b) => a.num - b.num,
}];

const columns2 = [{
  title: '项目',
  dataIndex: 'item_name',
}, {
  title: '优秀',
  children: [{
    title: '票数',
    dataIndex: 'excellent-count',
    key: 'excellent-count',
  }, {
    title: '比例 %',
    dataIndex: 'excellent-proportion',
    key: 'excellent-proportion',
  }],
}, {
  title: '称职',
  children: [{
    title: '票数',
    dataIndex: 'good-count',
    key: 'good-count',
  }, {
    title: '比例 %',
    dataIndex: 'good-proportion',
    key: 'good-proportion',
  }],
}, {
  title: '基本称职',
  children: [{
    title: '票数',
    dataIndex: 'average-count',
    key: 'average-count',
  }, {
    title: '比例 %',
    dataIndex: 'average-proportion',
    key: 'average-proportion',
  }],
}, {
  title: '不称职',
  children: [{
    title: '票数',
    dataIndex: 'bad-count',
    key: 'bad-count',
  }, {
    title: '比例 %',
    dataIndex: 'bad-proportion',
    key: 'bad-proportion',
  }],
}]

const nameD = ["John Brown", "Jim Green", "Joe Black", "Jim Red", "Jim pink"]

class StatisticsD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.query.id,
      order_data: [],
      persent_data: [],
      filters: []
    }
  }

  componentWillMount() {
    this.getData()
  }

  detail_cell(record, index){
    console.log(record);
  }

  reset_data(data, data1){
    var data_p1 = []
    for (let i=0; i < data1.length; i++) {
      data1[i][i].item_name = `考核项目${i}`
      data_p1.push(data1[i][i])
    }
    this.setState({order_data: data, persent_data: data_p1 })
  }

  getData(){
    var token = localStorage.token
    var phone = localStorage.phone
    var url = `http://114.55.172.35:3232/admin/results/${this.props.location.query.id}`
    SuperAgent.get(url)
              .set('Accept', 'application/json')
              .set('Cache-control', 'no-cache')
              .set('X-Admin-Token', sessionStorage.admin_token)
              .set('X-Admin-Email', sessionStorage.admin_email)
              .end( (err, res) => {
                if (res.ok) {
                  var data = res.body
                  var data1 = res.body.statistics
                  //数据格式处理函数
                  this.reset_data(data, data1)
                }
              })
  }

  render() {
    const id = this.props.location.query.id;
    const url = `http://114.55.172.35:3232/admin/output_result_show?result_id=${id}`
    return (
      <Admin>
        <div className={css.table_content}>
          <div><Link to={`/statistics?year=${this.props.location.query.year}`}><Button type="primary" icon="left">返回总表</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;<a href={url}><Button type="primary" icon="download" >个人统计表下载</Button></a></div>
          <div className={css.table_title}><span>{this.state.order_data.name}</span>考核成绩表</div>
          <Tabs defaultActiveKey="5" onChange={callback}>
            <TabPane className={css.tab_content} tab="领导打分数据统计" key="1">
              <Table columns={columns} bordered dataSource={this.state.order_data.leader_evaluations} onRowClick={this.detail_cell} pagination={{pageSize: 9}} onChange={onChange} />
            </TabPane>
            <TabPane className={css.tab_content} tab="中层干部互评统计" key="2">
              <Table columns={columns} bordered dataSource={this.state.order_data.middle_manager_evaluations} onRowClick={this.detail_cell} pagination={{pageSize: 9}} onChange={onChange} />
            </TabPane>
            <TabPane className={css.tab_content} tab="职工打分数据统计" key="3">
              <Table columns={columns} bordered dataSource={this.state.order_data.staff_evaluations} onRowClick={this.detail_cell} pagination={{pageSize: 9}} onChange={onChange} />
            </TabPane>
            <TabPane className={css.tab_content} tab="数据比例分析" key="4">
              <Table columns={columns2} bordered dataSource={this.state.persent_data} onRowClick={this.detail_cell} pagination={ false } onChange={onChange} />
            </TabPane>
            <TabPane className={css.tab_content} tab="表单文件打印" key="5">
              <StepThree {...this.state} />
            </TabPane>
          </Tabs>
        </div>
      </Admin>
    )
  }
}

export default withRouter(StatisticsD)