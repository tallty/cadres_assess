import React, { Component, PropTypes } from 'react';
import css from './assess.less';
import { Row, Col } from 'antd';
import Agent from 'superagent';

export class UserInfo extends Component {
	state = {
		user: {}
	}

	componentDidMount() {
		Agent
			.get("http://114.55.172.35:3232/user_info")
			.set('Accept', 'application/json')
			.set('Cache-control', 'no-cache')
			.set('X-User-Token', sessionStorage.token)
			.set('X-User-Jobnum', sessionStorage.number)
			.end((err, res) => {
				if (!err || err === null) {
					console.log("=======获取用户信息成功=======");
					console.log(res.body);
					let user_str = JSON.stringify(res.body);
					sessionStorage.setItem('user', user_str);
					this.setState({user: res.body});
				} else {
					console.log(err);
					console.log("获取用户信息失败");
				}
			})
	}

	render() {
		const {
			name, 
			sex, 
			date_of_birth, 
			political_status, 
			degree_of_education, 
			starting_time_for_the_present_job, 
			department_and_duty, 
			job
		} = this.state.user;

		return (
			<div className={css.user_info}>
				<div className={css.user_info_content}>
					<Row>
						<Col span={12}>
							<p>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</p>
							<p>出生年月：&nbsp;&nbsp;&nbsp;&nbsp;{date_of_birth}</p>
							<p>文化程度：&nbsp;&nbsp;&nbsp;&nbsp;{degree_of_education}</p>
							<p>部门及职务：{department_and_duty}</p>
						</Col>
						<Col span={12}>
							<p>性别：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sex}</p>
							<p>政治面貌：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{political_status}</p>
							<p>任现职时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{starting_time_for_the_present_job}</p>
							<p>从事或分管工作：{job}</p>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}