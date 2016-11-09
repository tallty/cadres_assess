// 通用StatisticsD组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './StatisticsD.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import { Icon, Table, Button } from 'antd'

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

const columns = [{
  title: '评委姓名',
  dataIndex: 'name',
}, {
  title: '考核项1',
  dataIndex: 'point1',
  sorter: (a, b) => a.point1 - b.point1,
}, {
  title: '考核项2',
  dataIndex: 'point2',
  sorter: (a, b) => a.point2 - b.point2,
}, {
  title: '考核项3',
  dataIndex: 'point3',
  sorter: (a, b) => a.point3 - b.point3,
}, {
  title: '考核项4',
  dataIndex: 'point4',
  sorter: (a, b) => a.point4 - b.point4,
},{
  title: '考核项5',
  dataIndex: 'point5',
  sorter: (a, b) => a.point5 - b.point5,
},{
  title: '考核项6',
  dataIndex: 'point6',
  sorter: (a, b) => a.point6 - b.point6,
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
  num: 444,
}, {
  point5: 92,
  name: '评委3',
  point1: 90,
  point2: 77,
  point3: 71,
  point4: 83,
  point6: 56,
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
  num: 1234,
}];

const nameD = ["John Brown", "Jim Green", "Joe Black", "Jim Red", "Jim pink"]

class StatisticsD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_data: [],
      order_columns: [],
      filters: []
    }
  }

  componentWillMount() {
    // this.getData()
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  detail_cell(record, index){
    console.log(record);
    console.log(index);
  }


  getData(){
    var token = localStorage.token
    var phone = localStorage.phone
    var url = "http://114.55.172.35:5555/admin/orders/checked?page=1&per_page=10000"
    SuperAgent.get(url)
              .set('Accept', 'application/json')
              .set('X-Administrator-Token', token)
              .set('X-Administrator-Phone', phone)
              .end( (err, res) => {
                if (res.ok) {
                  var data = res.body.checked_orders
                  this.setState({order_data: data})
                }
              })
  }

  render() {
    const id = this.getQueryString("id");
    return (
      <Admin>
        <div className={css.table_content}>
          <div><Link to="/Statistics"><Button type="primary" icon="left">返回总表</Button></Link></div>
          <div className={css.table_title}><span>{nameD[id]}</span>考核成绩表</div>
          <Table columns={columns} bordered dataSource={data} onRowClick={this.detail_cell} pagination={{ pageSize: 9 }} onChange={onChange} />
        </div>
      </Admin>
    )
  }
}

export default withRouter(StatisticsD)