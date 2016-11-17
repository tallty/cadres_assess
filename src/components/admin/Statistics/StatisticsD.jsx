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
  title: '考核项18',
  dataIndex: 'add_index.17',
},{
  title: '总分',
  dataIndex: 'add_index.18',
  sorter: (a, b) => a.num - b.num,
}];

const columns1 = [{
  title: '评委姓名',
  dataIndex: 'name',
}, {
  title: '考核项1',
  children: [{
    title: '票数',
    dataIndex: 'point1',
    key: 'point1',
  }, {
    title: '比例 %',
    dataIndex: 'point2',
    key: 'point2',
  }],
}, {
  title: '考核项2',
  children: [{
    title: '票数',
    dataIndex: 'point3',
    key: 'point3',
  }, {
    title: '比例 %',
    dataIndex: 'point4',
    key: 'point4',
  }],
}, {
  title: '考核项3',
  children: [{
    title: '票数',
    dataIndex: 'point5',
    key: 'point5',
  }, {
    title: '比例 %',
    dataIndex: 'point6',
    key: 'point6',
  }],
}, {
  title: '考核项4',
  children: [{
    title: '票数',
    dataIndex: 'point7',
    key: 'point7',
  }, {
    title: '比例 %',
    dataIndex: 'point8',
    key: 'point8',
  }],
},{
  title: '考核项5',
  children: [{
    title: '票数',
    dataIndex: 'point9',
    key: 'point9',
  }, {
    title: '比例 %',
    dataIndex: 'point10',
    key: 'point10',
  }],
},{
  title: '考核项6',
  children: [{
    title: '票数',
    dataIndex: 'point11',
    key: 'point11',
  }, {
    title: '比例 %',
    dataIndex: 'point12',
    key: 'point12',
  }],
},{
  title: '考核项7',
  children: [{
    title: '票数',
    dataIndex: 'point13',
    key: 'point13',
  }, {
    title: '比例 %',
    dataIndex: 'point14',
    key: 'point14',
  }],
},{
  title: '考核项8',
  children: [{
    title: '票数',
    dataIndex: 'point15',
    key: 'point15',
  }, {
    title: '比例 %',
    dataIndex: 'point16',
    key: 'point16',
  }],
},{
  title: '考核项9',
  children: [{
    title: '票数',
    dataIndex: 'point17',
    key: 'point17',
  }, {
    title: '比例 %',
    dataIndex: 'point18',
    key: 'point18',
  }],
},{
  title: '考核项10',
  children: [{
    title: '票数',
    dataIndex: 'point19',
    key: 'point19',
  }, {
    title: '比例 %',
    dataIndex: 'point20',
    key: 'point20',
  }],
},{
  title: '考核项11',
  children: [{
    title: '票数',
    dataIndex: 'point21',
    key: 'point21',
  }, {
    title: '比例 %',
    dataIndex: 'point22',
    key: 'point22',
  }],
},{
  title: '考核项12',
  children: [{
    title: '票数',
    dataIndex: 'point23',
    key: 'point23',
  }, {
    title: '比例 %',
    dataIndex: 'point24',
    key: 'point24',
  }],
},{
  title: '考核项13',
  children: [{
    title: '票数',
    dataIndex: 'point25',
    key: 'point25',
  }, {
    title: '比例 %',
    dataIndex: 'point26',
    key: 'point26',
  }],
},{
  title: '考核项14',
  children: [{
    title: '票数',
    dataIndex: 'point27',
    key: 'point27',
  }, {
    title: '比例 %',
    dataIndex: 'point28',
    key: 'point28',
  }],
},{
  title: '考核项15',
  children: [{
    title: '票数',
    dataIndex: 'point29',
    key: 'point29',
  }, {
    title: '比例 %%',
    dataIndex: 'point30',
    key: 'point30',
  }],
},{
  title: '总分',
  dataIndex: 'num',
  sorter: (a, b) => a.num - b.num,
}];

const data = [{
  point5: 71,
  name: '评委1',
  point1: 80,
  point2: 81,
  point3: 89,
  point4: 83,
  point6: 56,
  num: 345,
}, {
  point5: 76,
  name: '评委2',
  point1: 70,
  point2: 64,
  point3: 79,
  point4: 83,
  point6: 66,
  point15: 67,
  num: 444,
}, {
  point5: 92,
  name: '评委3',
  point1: 90,
  point2: 77,
  point3: 71,
  point4: 83,
  point6: 56,
  point7: 56,
  point8: 56,
  num: 753,
}, {
  point5: 76,
  name: '评委4',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 88,
  num: 395,
}, {
  point5: 78,
  name: '评委5',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 56,
  point10: 56,
  num: 1234,
}, {
  point5: 78,
  name: '评委6',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  num: 1234,
}, {
  point5: 78,
  name: '评委7',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point13: 67,
  num: 1234,
}];

const data1 = [{
  point5: 71,
  name: '考核项1',
  point1: 80,
  point2: 81,
  point3: 89,
  point4: 83,
  point6: 56,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 76,
  name: '考核项2',
  point1: 70,
  point2: 64,
  point3: 79,
  point4: 83,
  point6: 66,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
  point7: 83,
  point8: 66,
}, {
  point5: 92,
  name: '考核项3',
  point1: '89',
  point2: 77,
  point3: 71,
  point4: 83,
  point6: 56,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 76,
  name: '考核项4',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 88,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项5',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项6',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项7',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项8',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项9',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项10',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项11',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项12',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项13',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项14',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}, {
  point5: 78,
  name: '考核项15',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  point6: 67,
  point7: 83,
  point8: 66,
  point9: 83,
  point10: 66,
}]

const columns2 = [{
  title: '项目',
  dataIndex: 'name',
}, {
  title: '优秀',
  children: [{
    title: '票数',
    dataIndex: 'point1',
    key: 'point1',
  }, {
    title: '比例 %',
    dataIndex: 'point2',
    key: 'point2',
  }],
}, {
  title: '称职',
  children: [{
    title: '票数',
    dataIndex: 'point3',
    key: 'point3',
  }, {
    title: '比例 %',
    dataIndex: 'point4',
    key: 'point4',
  }],
}, {
  title: '基本称职',
  children: [{
    title: '票数',
    dataIndex: 'point5',
    key: 'point5',
  }, {
    title: '比例 %',
    dataIndex: 'point6',
    key: 'point6',
  }],
}, {
  title: '不称职',
  children: [{
    title: '票数',
    dataIndex: 'point7',
    key: 'point7',
  }, {
    title: '比例 %',
    dataIndex: 'point8',
    key: 'point8',
  }],
}, {
  title: '空白',
  children: [{
    title: '票数',
    dataIndex: 'point9',
    key: 'point9',
  }, {
    title: '比例 %',
    dataIndex: 'point10',
    key: 'point10',
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
    console.log(index);
  }

  reset_data(data, data1){
    
    console.log(data); 
    this.setState({order_data: data, persent_data: data1 })
  }

  getData(){
    var token = localStorage.token
    var phone = localStorage.phone
    var url = `http://114.55.172.35:3232/admin/results/${this.props.location.query.id}`
    SuperAgent.get(url)
              .set('Accept', 'application/json')
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
    return (
      <Admin>
        <div className={css.table_content}>
          <div><Link to="/statistics"><Button type="primary" icon="left">返回总表</Button></Link></div>
          <div className={css.table_title}><span>{this.state.order_data.name}</span>考核成绩表</div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane className={css.tab_content} tab="领导打分数据统计" key="1">
              <Table columns={columns} bordered dataSource={this.state.order_data.leader_evaluations} onRowClick={this.detail_cell} pagination={{pageSize: 10}} onChange={onChange} />
            </TabPane>
            <TabPane className={css.tab_content} tab="中层干部互评统计" key="2">
              <Table columns={columns} bordered dataSource={this.state.order_data.middle_manager_evaluations} onRowClick={this.detail_cell} pagination={{pageSize: 10}} onChange={onChange} />
            </TabPane>
            <TabPane className={css.tab_content} tab="职工打分数据统计" key="3">
              <Table columns={columns} bordered dataSource={this.state.order_data.staff_evaluations} onRowClick={this.detail_cell} pagination={{pageSize: 10}} onChange={onChange} />
            </TabPane>
            <TabPane className={css.tab_content} tab="数据比例分析" key="4">
              <Table columns={columns2} bordered dataSource={data1} onRowClick={this.detail_cell} pagination={ false } onChange={onChange} />
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