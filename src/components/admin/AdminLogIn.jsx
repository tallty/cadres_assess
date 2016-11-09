// 通用AdminLogIn组件
import React, { Component, PropTypes } from 'react'
import css from './AdminLogIn.less'
import MainLayout from '../../layouts/MainLayout/MainLayout';
import classnames from 'classnames'
import SuperAgent from 'superagent'
import { Link, withRouter } from 'react-router'
import { Icon, Form, Input, Button, Row, Col } from 'antd'

const FormItem = Form.Item;

class AdminLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    }
  }

  componentWillMount() {
    localStorage.phone = ''
    localStorage.password = ''     
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.props.form.getFieldsValue()
    var phone = value.phone
    var password = value.password
    this.pushAppoint(phone, password )
  }

  // 预约
  pushAppoint(phone, password){
    var url = "http://114.55.172.35:5555/administrators/sign_in"
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({'administrator': {'phone': phone, 'password': password}})
              .end( (err, res) => {
                if (res.ok) {
                  localStorage.phone = phone
                  localStorage.token = res.body.authentication_token
                  this.props.router.replace('/admin_home')
                }
              })       
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={css.background_pic}>
        <Form horizontal onSubmit={this.handleSubmit.bind(this)} >
          <div className={css.login_container}>
            <Row className={css.login_content}>
              <Col span={24} className={css.login_title}>
                <label>管理员登录</label>
              </Col>
              <Col span={24} className={css.login_input}>
                <FormItem id="control-input1" >
                  {getFieldDecorator('phone', { initialValue: '' })(
                    <Input id="control-input1" placeholder="用户邮箱"/>
                  )}
                </FormItem>
              </Col>
              <Col span={24} className={css.login_input}>
                <FormItem id="control-input2">
                  {getFieldDecorator('password', { initialValue: '' })(
                    <Input id="control-input2" type="password" placeholder="密码" className={css.email_input}/>
                  )}
                </FormItem>
              </Col>
              <Col span={24} className={css.login_submit_btn}>
                <FormItem>
                  <Button className={css.login_btn} type="primary" htmlType="submit">登 录</Button>
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    )
  }
}

AdminLogIn = Form.create({})(AdminLogIn);

export default withRouter(AdminLogIn);