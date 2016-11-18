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
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    if (sessionStorage.admin_token) {
      this.props.router.replace('/test_set');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.props.form.getFieldsValue()
    let email = value.email;
    let password = value.password;
    this.beginLogin(email, password );
  }

  // 管理员登录
  beginLogin(email, password){
    SuperAgent
      .post("http://114.55.172.35:3232/admins/sign_in")
      .set('Accept', 'application/json')
      .send({'admin': {'email': email, 'password': password}})
      .end( (err, res) => {
        if (!err || err === null) {
          sessionStorage.setItem('admin_email', email);
          sessionStorage.setItem('admin_token', res.body.authentication_token);
          this.props.router.replace('/test_set');
        } else {
          console.log("admin登录失败");
        }
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={css.background_pic}>
        <Form horizontal onSubmit={this.handleSubmit.bind(this)} >
          <Row className={css.login_container}>
            <Col span={24} className={css.login_title}>
              <label>管理员登录</label>
            </Col>
            <Col span={24} className={css.login_input}>
              <FormItem id="control-input1" >
                {getFieldDecorator('email', { initialValue: '' })(
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
        </Form>
      </div>
    )
  }
}

AdminLogIn = Form.create({})(AdminLogIn);

export default withRouter(AdminLogIn);