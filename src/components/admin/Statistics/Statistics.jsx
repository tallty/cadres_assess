// 通用Statistics组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './Statistics.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from 'antd'

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checking_data: 0,
      success_data: 0,
    }
  }

  componentWillMount() {
    this.getcheckedData()
    this.getUncheckData()
  }

  getUncheckData(){
    var token = localStorage.token
    var phone = localStorage.phone
    var url = "http://114.55.172.35:5555/admin/orders/uncheck"
    SuperAgent.get(url)
              .set('Accept', 'application/json')
              .set('X-Administrator-Token', token)
              .set('X-Administrator-Phone', phone)
              .end( (err, res) => {
                if (res.ok) {
                  var data = res.body.uncheck_orders
                  var num = data.length
                  this.setState({checking_data: num})
                }
              })
  }

  getcheckedData(){
    var token = localStorage.token
    var phone = localStorage.phone
    var url = "http://114.55.172.35:5555/admin/orders/checked"
    SuperAgent.get(url)
              .set('Accept', 'application/json')
              .set('X-Administrator-Token', token)
              .set('X-Administrator-Phone', phone)
              .end( (err, res) => {
                if (res.ok) {
                  var data = res.body.checked_orders
                  var num = data.length
                  this.setState({success_data: num})
                }
              })
  }

  render() {
    return (
      <Admin>
        <div className={css.card_content}>
          分数统计
        </div>
      </Admin>
    )
  }
}

export default Statistics