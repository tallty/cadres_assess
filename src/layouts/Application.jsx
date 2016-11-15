import React, { Component } from 'react';
import css from './application.less';
import { Assess } from '../components/assess/Assess';
import { Icon } from 'antd';

export class Application extends Component {
	signOut() {
		localStorage.clear();
		sessionStorage.clear();
		location.href = '/';
	}

	getUserInfo() {
		if (location.pathname !== '/' && sessionStorage.user) {
			return JSON.parse(sessionStorage.user);
		} else {
			return {};
		}
	}

	render() {
		let header_bg = location.pathname === '/' ? '#3C3C3C' : '#006EC6';
		let user = this.getUserInfo();

		return (
			<div className={css.container}>
				<div className={css.header} style={{background: header_bg}}>
					上海电子信息职业技术学院中层干部考核系统
				</div>
				
				{
					location.pathname === '/' ? null :
						<div className={css.toolbar}>
							<span>
								<a onClick={this.signOut}>[退出]</a>
							</span>
							<span>{user.name}</span>
							<span><Icon type="user"/> {sessionStorage.number}</span>
						</div>
				}
				

				{ this.props.children || <AssessOne /> }

				<div className={css.footer}>
					<p>联系单位：上海电子信息职业技术学院</p>
					<p>技术支持：上海拓体信息科技有限公司</p>
					<p>联系电话：18916591019</p>
				</div>
			</div>
		);
	}
}
