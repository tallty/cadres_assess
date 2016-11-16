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
  dataIndex: 'point1',
  sorter: (a, b) => a.point1 - b.point1,
}, {
  title: '中层互评',
  dataIndex: 'point2',
  sorter: (a, b) => a.point2 - b.point2,
}, {
  title: '员工评分',
  dataIndex: 'point3',
  sorter: (a, b) => a.point3 - b.point3,
}, {
  title: '总分',
  dataIndex: 'point4',
  sorter: (a, b) => a.point4 - b.point4,
},{
  title: '等级',
  dataIndex: 'rank',
}];

const data = [{
  index: '1',
  name: 'John Brown',
  point1: 80,
  point2: 81,
  point3: 89,
  point4: 83,
  rank:"",
}, {
  index: '2',
  name: 'Jim Green',
  point1: 70,
  point2: 64,
  point3: 79,
  point4: 83,
  rank:"",
}, {
  index: '3',
  name: 'Joe Black',
  point1: 90,
  point2: 77,
  point3: 71,
  point4: 83,
  rank:"",
}, {
  index: '4',
  name: 'Jim Red',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  rank:"",
}, {
  index: '5',
  name: 'Jim pink',
  point1: 82,
  point2: 88,
  point3: 90,
  point4: 83,
  rank:"",
}];

class Statistics extends Component {
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

  detail_cell(record, index){
    this.props.router.replace(`/statistics_d?id=${index}`)
  }


  getData(){
    SuperAgent
      .get("http://114.55.172.35:5555/admin/orders/checked?page=1&per_page=1000")
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end( (err, res) => {
        if (res.ok) {
          var data = res.body.checked_orders
          this.setState({order_data: data})
        }
      })
  }

  render() {
    return (
      <Admin>
        <div className={css.table_content}>
          <Table columns={columns} bordered dataSource={data} onRowClick={this.detail_cell.bind(this)} pagination={{ pageSize: 9 }} onChange={onChange} />
        </div>
      </Admin>
    )
  }
}

export default withRouter(Statistics)