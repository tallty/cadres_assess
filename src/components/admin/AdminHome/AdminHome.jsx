// 通用AdminHome组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './AdminHome.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from 'antd'

class AdminHome extends Component {
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
          <div className={css.tips_card}>
            <img src="src/images/approval.svg" alt=""/>
            <div className={css.card_pad}><p className={css.card_name1}>待审批</p><p><span className={css.card_number1}>{this.state.checking_data}</span>项预约申请</p></div>
            <Link className={css.card_link} to="/admin_order_list">查看</Link>
          </div>
          <div className={css.tips_card}>
            <img src="src/images/success.svg" alt=""/>
            <div><p className={css.card_name2}>预定成功</p><p><span className={css.card_number2}>{this.state.success_data}</span>个会议将于未来举行</p></div>
            <Link className={css.card_link} to="/admin_meeting_plan">查看</Link>
          </div>
        </div>
      </Admin>
    )
  }
}

export default AdminHome