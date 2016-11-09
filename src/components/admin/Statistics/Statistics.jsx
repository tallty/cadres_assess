// 通用Statistics组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './Statistics.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon, Table } from 'antd'

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

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
    this.getRoomList()
    this.getData()
  }

  getRoomList(){
    var url = "http://114.55.172.35:5555/meeting_rooms?page=1&per_page=10000"
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err || err === null) {
          var filters = []
          var meeting_rooms = res.body.meeting_rooms
          meeting_rooms.forEach(function (value) {
            filters.push({text: value.title, value: value.id})
          })
          this.getColumns(filters)
        }
      })
  }

  getColumns(filters){
    const columns = [{
      title: '会议室',
      dataIndex: 'meeting_room_id',
      filters: filters,
      filterMultiple: true,
      onFilter: (value, record) => record.meeting_room_id != null?record.meeting_room_id.toString().indexOf(value) === 0:null,
    }, {
      title: '预约日期',
      dataIndex: 'appoint_at',
      sorter: (a, b) => new Date(Date.parse(a.appoint_at.replace(/-/g,   "/"))) - new Date(Date.parse(b.appoint_at.replace(/-/g,   "/"))),
    }, {
      title: '时间段',
      dataIndex: 'session',
      filters: [{
        text: '上午',
        value: 'morning',
      }, {
        text: '下午',
        value: 'afternoon',
      }],
      filterMultiple: true,
      onFilter: (value, record) => record.session.indexOf(value) === 0,
    }, {
      title: '参会人数',
      dataIndex: 'join_number',
      sorter: (a, b) => a.join_number - b.join_number,
    }, {
      title: '会议准备',
      dataIndex: 'prepare',
    }, {
      title: '备注',
      dataIndex: 'sign',
    },{
      title: '预约人',
      dataIndex: 'appoint_name',
    }];
    this.setState({order_columns: columns})
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
          <Table columns={this.state.order_columns} bordered dataSource={this.state.order_data} pagination={{ pageSize: 9 }} onChange={onChange} />
        </div>
      </Admin>
    )
  }
}

export default Statistics