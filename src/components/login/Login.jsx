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
					let obj = res.body;
					let timeline = {
						year: obj.activity_created_year,
						first_begin: moment(obj.first_phase_begin),
						first_end: moment(obj.first_phase_end),
						second_begin: moment(obj.second_phase_begin),
						second_end: moment(obj.second_phase_end),
						third_begin: moment(obj.third_phase_begin),
						third_end: moment(obj.third_phase_end)
					}
					let str = JSON.stringify(obj);
					sessionStorage.setItem('timeline', str);
					console.log(timeline);
					this.setState({ timeline: timeline });
				} else {
					console.dir(err);
					Message.error("获取考核时间表失败，请稍后重试。")
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

	render() {
		let timeTop = ( this.height - 410 ) / 2;
		let formTop = ( this.height - 380 ) / 2;
		let notification_top = ( this.height - 84 ) / 2;
		const { getFieldDecorator } = this.props.form;
		const { loading } = this.state;
		// 考核时间
		const { year, first_begin, first_end, second_begin, second_end, third_begin, third_end } = this.state.timeline;

		const is_actived = moment().get('y') <= moment(`${year}`).get('y');

		return (
			<div className={css.loginContainer} style={{height: this.height}}>
			{
				is_actived ?
					<Row>
						<Col span={12} className={css.col}>
							<div className={css.timeContent} style={{marginTop: timeTop}}>
								<p>{year} 年考核流程说明图</p>
								<img src="src/images/timeline.svg" alt="时间线"/>
								<div className={css.timeOne}>{first_begin.format("MM-DD")} —— {first_end.format("MM-DD")}</div>
								<div className={css.timeTwo}>{second_begin.format("MM-DD")} —— {second_end.format("MM-DD")}</div>
								<div className={css.timeThree}>{third_begin.format("MM-DD")} —— {third_end.format("MM-DD")}</div>
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
						{year ? <p>本年度的考核活动暂未发布<br/>请等待通知</p> : null}
					</div>
			}				
			</div>
		);
	}
}

Login = Form.create()(Login);

export default withRouter(Login);