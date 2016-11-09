// 通用TestSet组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './TestSet.less'
import ListModal from './ListModal';
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon, Button, Table, Modal } from 'antd'

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

const confirm = Modal.confirm;

const data = [{
  point1: 2016,
  point2: "07.01--07.31",
  point3: "08.01--08.31",
  point4: "09.01--09.30",
}, {
  point1: 2015,
  point2: "07.01--07.31",
  point3: "08.01--08.31",
  point4: "09.01--09.30",
}, {
  point1: 2014,
  point2: "07.01--07.31",
  point3: "08.01--08.31",
  point4: "09.01--09.30",
}, {
  point1: 2013,
  point2: "07.01--07.31",
  point3: "08.01--08.31",
  point4: "09.01--09.30",
}];

class TestSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      record: {},
    }
  }

  componentWillMount() {
    // this.getData()
  }

  detail_cell(record, index){
    // this.props.router.replace(`/statistics_d?id=${index}`)
  }

  showModal(record) {
    console.log('show modal');
    this.setState({
      visible: true,
      record: record
    });
  }

  getColumns(){
    const columns = [{
      title: '考核年度',
      dataIndex: 'point1',
      sorter: (a, b) => a.point1 - b.point1,
    }, {
      title: '上传登记表时间',
      dataIndex: 'point2',
      sorter: (a, b) => a.point2 - b.point2,
    }, {
      title: '在线考核时间',
      dataIndex: 'point3',
      sorter: (a, b) => a.point3 - b.point3,
    }, {
      title: '分数统计时间',
      dataIndex: 'point4',
      sorter: (a, b) => a.point4 - b.point4,
    },{
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => this.change_icon(record)
    }];
    return columns
  }

  change_icon(record){
    const change_icon = []
    change_icon.push(
      <div key='icon' className={css.icon_content}>
        <Link onClick={this.showModal.bind(this, record)}>详情</Link>
      </div>
    )
    return change_icon
  }

  deleteList(val){
    console.log(val);
    this.setState({visible: val})
    // this.getData()
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
    return (
      <Admin>
        <div className={css.table_content}>
          <div><Button onClick={this.showModal.bind(this)} type="primary" icon="plus">新建考核</Button></div>
          <Table columns={this.getColumns()} bordered dataSource={data} onRowClick={this.detail_cell.bind(this)} pagination={{ pageSize: 9 }} onChange={onChange} />
          <ListModal {...this.state} onChange={val => this.deleteList(val)} />
        </div>
      </Admin>
    )
  }
}

export default TestSet