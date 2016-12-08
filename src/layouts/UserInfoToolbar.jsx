import React, { Component } from 'react';
import css from './application.less';
import { Message, Icon } from 'antd';
import SuperAgent from 'superagent';

export class UserInfoToolbar extends Component {
	state = {
		user: {}
	}

	componentWillMount() {
		let token = sessionStorage.getItem('token');
		let number = sessionStorage.getItem('number');
		SuperAgent
			.get(`http://114.55.172.35:3232/user_info?random=${Math.random()}`)
			.set('Accept', 'application/json')
			.set('Cache-control', 'no-cache')
			.set('X-User-Token', token)
			.set('X-User-Jobnum', number)
			.end((err, res) => {
				if (!err || err === null) {
					let obj = res.body;
					this.setState({ user: obj });
				} else {
					Message.error("获取用户信息失败");
				}
			})
	}

	signOut() {
		sessionStorage.clear();
		location.href = '/';
	}

	render() {
		return (
			<div className={css.toolbar}>
				<span>
					<a onClick={this.signOut}>[退出]</a>
				</span>
				<span>{this.state.user.name}</span>
				<span><Icon type="user"/> {sessionStorage.number}</span>
			</div>
		);
	}
}
