import React, { Component } from 'react';
import css from './login.less';
import { Row, Col, Form, Input, Button, Icon, Message } from 'antd';
import { withRouter } from 'react-router';
import SuperAgent from 'superagent';
import moment from 'moment';

const FormItem = Form.Item;
Message.config({ top: 75, duration: 3 });

class Login extends Component {
	height = document.body.clientHeight - 105;
	state = {
		loading: false,
		timeline: {}
	}

	componentWillMount() {
		if (sessionStorage.token) {
			this.props.router.replace('/assess');
		}
		this.getTimeLine();
	}

	handleSubmit(e) {
    e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
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
			.post("http://114.55.172.35:3232/users/sign_in")
			.set('Accept', 'application/json')
			.send({user: { job_num: values.number, password: values.password }})
			.end((err, res) => {
				if (!err || err === null) {
					console.log(res.body);
					let obj = res.body;
					this.setState({ loading: false });
					// 保存数据
					sessionStorage.setItem('id', obj.id);
					sessionStorage.setItem('token', obj.authentication_token);
					sessionStorage.setItem('number', obj.job_num);
					sessionStorage.setItem('user_type', obj.user_type);
					sessionStorage.setItem('take_part_in', obj.take_part_in);
					// 获取用户信息
					this.getUserInfo();
				} else {
					console.dir(err);
					this.setState({ loading: false });
					Message.error("登录失败，请检查登录信息是否正确");
				}
			})
  }

  getUserInfo() {
  	SuperAgent
			.get("http://114.55.172.35:3232/user_info")
			.set('Accept', 'application/json')
			.set('X-User-Token', sessionStorage.token)
			.set('X-User-Jobnum', sessionStorage.number)
			.end((err, res) => {
				if (!err || err === null) {
					console.log(res.body);
					let obj = res.body;
					let user_str = JSON.stringify(obj);
					sessionStorage.setItem('user', user_str);
					// 登录成功跳转
					this.props.router.replace('/assess');
				} else {
					console.dir(err);
					this.setState({ loading: false });
					Message.error("登录失败，请检查登录信息是否正确");
				}
			})
  }

  getTimeLine() {
  	SuperAgent
			.get("http://114.55.172.35:3232/home_info")
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (!err || err === null) {
					console.log(res.body);
					let str = JSON.stringify(res.body);
					sessionStorage.setItem('timeline', str);
					this.setState({ timeline: res.body });
				} else {
					console.dir(err);
				}
			})
  }

  checkNumber(rule, value, callback) {
    const form = this.props.form;
    if (value) {
      callback();
    } else {
      callback("请输入登录账号");
    }
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value) {
      callback();
    } else {
      callback("请输入登录密码");
    }
  }

  dateFormat(date) {
		return moment(date).format("MM-DD");
  }

	render() {
		let timeTop = ( this.height - 410 ) / 2;
		let formTop = ( this.height - 380 ) / 2;
		let notification_top = ( this.height - 84 ) / 2;
		const { getFieldDecorator } = this.props.form;
		const { loading } = this.state;
		// 考核时间
		const { 
			activity_created_year, 
			first_phase_begin, first_phase_end, 
			second_phase_begin, second_phase_end, 
			third_phase_begin, third_phase_end
		} = this.state.timeline;
		const is_actived = moment().get('y') <= moment(`${activity_created_year}`).get('y');

		return (
			<div className={css.loginContainer} style={{height: this.height}}>
			{
				is_actived ?
					<Row>
						<Col span={12} className={css.col}>
							<div className={css.timeContent} style={{marginTop: timeTop}}>
								<p>{activity_created_year} 年考核流程说明图</p>
								<img src="src/images/timeline.svg" alt="时间线"/>
								<div className={css.timeOne}>{this.dateFormat(first_phase_begin)} —— {this.dateFormat(first_phase_end)}</div>
								<div className={css.timeTwo}>{this.dateFormat(second_phase_begin)} —— {this.dateFormat(second_phase_end)}</div>
								<div className={css.timeThree}>{this.dateFormat(third_phase_begin)} —— {this.dateFormat(third_phase_end)}</div>
							</div>
						</Col>

						<Col span={12} className={css.col} style={{marginTop: formTop}}>
							<div className={css.loginForm}>
								<p className={css.title}>登 录</p>
								<Form onSubmit={this.handleSubmit.bind(this)}>
					        <FormItem className={css.input_item}
					        					hasFeedback >
					          {getFieldDecorator('number', {
					          	rules: [{  
					          		required: true, message: '请输入登录账号'
						          }, {
						          	validator: this.checkNumber.bind(this),
						          }]
					          })(
					          	<Input placeholder="输入工号" type="text"/>
					          )}
					          <Icon type="user" />
					        </FormItem>
					        <FormItem className={css.input_item}
					        					hasFeedback >
					          {getFieldDecorator('password', {
					          	rules: [{
					          		required: true, message: '请输入登录密码',
					          	}, {
					          		validator: this.checkPassword.bind(this),
					          	}]
					          })(
					          	<Input type="password" placeholder="输入登录密码"/>
					          )}
					          <Icon type="lock" />
					        </FormItem>
					        <Button type="primary" loading={loading} htmlType="submit">登 录</Button>
					      </Form>
							</div>
						</Col>
					</Row> : 
					<div className={css.unactived_notification} style={{paddingTop: notification_top}}>
						{activity_created_year ? <p>本年度的考核活动暂未发布<br/>请等待通知</p> : null}
					</div>
			}				
			</div>
		);
	}
}

Login = Form.create()(Login);

export default withRouter(Login);