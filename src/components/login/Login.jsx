import React, { Component } from 'react';
import css from './login.less';
import { Row, Col, Form, Input, Button, Icon, message } from 'antd';
import { withRouter } from 'react-router';
import SuperAgent from 'superagent';

const FormItem = Form.Item;
message.config({ top: 75, duration: 3 });

class Login extends Component {
	height = document.body.clientHeight - 105;
	state = {
		loading: false,
		num: {
			number: null,
			isValid: null,
			error: null
		},
		pwd: {
			password: null,
			isValid: null,
			error: null
		}
	}

	handleSubmit(e) {
    e.preventDefault();
    console.log('Received values of form:', this.props.form.getFieldsValue());
		const { loading, num, pwd } = this.state;
		if (num.isValid && pwd.isValid) {
			this.setState({ loading: true })
		}
		// 开始登录
		SuperAgent
			.get("http://114.55.172.35:3232/users/sign_in")
			.set('Accept', 'application/json')
			.send({user: { job_num: num.number, password: pwd.password }})
			.end((err, res) => {
				if (!err || err === null) {
					console.log(res.body);
					this.setState({ loading: false });
				} else {
					console.dir(err);
					this.setState({ loading: false });
					message.error("登录失败，请检查登录信息是否正确");
				}
			})
  }

  checkNumber(e) {
		e.preventDefault();
		let value = e.target.value

		if (value.length < 6) {
			this.setState({
				num: { number: value, isValid: false, error: '工号格式不正确' }
			})
		} else {
			this.setState({
				num: { number: value, isValid: true, error: null }
			})
		}
  }

  checkPassword(e) {
		e.preventDefault();
		let value = e.target.value

		if (value.length < 6) {
			this.setState({
				pwd: { password: value, isValid: false, error: '密码长度不足' }
			})
		} else {
			this.setState({
				pwd: { password: value, isValid: true, error: null }
			})
		}
  }

  checkInputState(item) {
  	switch(item.isValid) {
  		case true:
  			return 'success';
  			break;
  		case false:
  			return 'error';
  			break;
  		default:
  			return null;
  			break;
  	}
  }

	render() {
		let timeTop = ( this.height - 410 ) / 2;
		let formTop = ( this.height - 380 ) / 2;
		const { getFieldDecorator } = this.props.form;
		const { loading, disabled, num, pwd } = this.state;

		return (
			<div className={css.loginContainer} style={{height: this.height}}>
				<Row>
					<Col span={12} className={css.col}>
						<div className={css.timeContent} style={{marginTop: timeTop}}>
							<img src="src/images/timeline.svg" alt="时间线"/>
							<div className={css.timeOne}>05-01 —— 06-31</div>
							<div className={css.timeTwo}>07-01 —— 07-31</div>
							<div className={css.timeThree}>10-01 —— 10-21</div>
						</div>
					</Col>

					<Col span={12} className={css.col} style={{marginTop: formTop}}>
						<div className={css.loginForm}>
							<p className={css.title}>登 录</p>

							<Form onSubmit={this.handleSubmit.bind(this)}>
				        <FormItem className={css.input_item}
				        					validateStatus={this.checkInputState(num)}
				        					help={num.error}
				        					hasFeedback >
				          {getFieldDecorator('number')(
				          	<Input placeholder="输入工号" onChange={this.checkNumber.bind(this)}/>
				          )}
				          <Icon type="user" />
				        </FormItem>
				        <FormItem className={css.input_item}
									        validateStatus={this.checkInputState(pwd)}
									        help={pwd.error}
				        					hasFeedback >
				          {getFieldDecorator('password')(
				          	<Input type="password" placeholder="输入随机密码" onChange={this.checkPassword.bind(this)} />
				          )}
				          <Icon type="lock" />
				        </FormItem>
				        <Button type="primary" loading={loading} htmlType="submit">登 录</Button>
				      </Form>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

Login = Form.create()(Login);

export default withRouter(Login);