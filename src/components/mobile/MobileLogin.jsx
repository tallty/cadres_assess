import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router';
import css from './mobile_login.less';
import SuperAgent from 'superagent';

const FormItem = Form.Item;

class MobileLogin extends Component {
  state = {
    loading: false
  };

  componentWillMount() {
    if (/Mobile/i.test(navigator.userAgent)) {
      if (localStorage.token) {
        this.props.router.replace('/mobile_evaluation_list');
      }
    } else {
      this.props.router.replace('/login');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ loading: true });
        this.beginLogin(values);
      }
    });
  }

  beginLogin(values) {
    // 开始登录
    SuperAgent
      .post("http://stiei-api.tallty.com/users/sign_in")
      .set('Accept', 'application/json')
      .set('Cache-control', 'no-cache')
      .send({ user: { job_num: values.number, password: values.password } })
      .end((err, res) => {
        if (!err || err === null) {
          let obj = res.body;
          this.setState({ loading: false });
          // 保存数据
          localStorage.setItem('id', obj.id);
          localStorage.setItem('token', obj.authentication_token);
          localStorage.setItem('number', obj.job_num);
          localStorage.setItem('user_type', obj.user_type);
          localStorage.setItem('take_part_in', obj.take_part_in);
          this.getUserInfo();
        } else {
          this.setState({ loading: false });
          alert("登录失败，请检查登录信息是否正确");
        }
      })
  }

  getUserInfo() {
    SuperAgent
      .get(`http://stiei-api.tallty.com/user_info?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.token)
      .set('X-User-Jobnum', localStorage.number)
      .end((err, res) => {
        if (!err || err === null) {
          let str = JSON.stringify(res.body);
          localStorage.setItem('user', str);
          this.props.router.replace('/mobile_evaluation_list');
        } else {
          alert("获取用户信息失败");
        }
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <div className={css.container}>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <div className={css.title}>
            <h1>中层干部考核系统</h1>
            <h1>上海电子信息职业技术学院</h1>
          </div>
          <FormItem>
            {getFieldDecorator('number', {
              rules: [{ required: true, message: '请输入登录账号！' }],
            })(
              <Input placeholder="登录账号" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input type="password" placeholder="密码" />
              )}
          </FormItem>
          <Button type="primary" htmlType="submit" loading={loading} className={css.login_btn}>登录</Button>
        </Form>
      </div>
    );
  }
}

MobileLogin = Form.create()(MobileLogin);
export default withRouter(MobileLogin);
