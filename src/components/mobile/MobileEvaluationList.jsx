import React, { Component } from 'react';
import css from './mobile_evaluation_list.less';
import { Icon, Row, Col, Alert } from 'antd';
import PopWindow from '../common/PopWindow';
import Spiner from '../common/Spiner';
import Agent from 'superagent';
import { withRouter, Link } from 'react-router';

class MobileEvaluationList extends Component {
	state = {
		user: {},
		pop: false,
		loading: true,
		evaluations: [],
		edited_count: 0
	};

	componentDidMount() {
		if (localStorage.getItem('user')) {
			this.setState({user: JSON.parse(localStorage.getItem('user'))});
		}
		this.getEvaluationList();
	}

	getEvaluationList() {
		Agent
			.get(`http://114.55.172.35:3232/evaluations?page=1&per_page=1000`)
			.set('Accept', 'application/json')
			.set('Cache-control', 'no-cache')
			.set('X-User-Token', localStorage.token)
			.set('X-User-Jobnum', localStorage.number)
			.end((err, res) => {
				if (!err || err === null) {
					let count = this.getEditedCount(res.body.middle_manager_evaluations);
					console.log(res.body);
					this.setState({ 
						evaluations: res.body.middle_manager_evaluations,
						edited_count: count,
						loading: false
					});
				} else {
					alert("获取测评列表失败");
					this.setState({loading: false});
				}
			})
	}

	getEditedCount(evaluations) {
		let edited_count = 0;
		evaluations.forEach((item, i, obj) => {
			if (item.already_edited) {
				edited_count += 1;
			} 
		})
		return edited_count;
	}

	handleMenuClick() {
		this.setState({pop: !this.state.pop});
	}

	hidePopWindow() {
		this.setState({pop: false});
	}

	getList() {
		let list = [];
		let width = document.body.clientWidth - 112;
		this.state.evaluations.forEach((item, index, obj) => {
			let bg = item.already_edited ? '#F5F5F5' : '#fff';
			list.push(
				<Link to={`/mobile_evaluate?id=${item.id}`} className={css.list_item} key={index} style={{background: bg}}>
					<div className={css.name}>{item.info.name}</div>
					<div className={css.info} style={{width: width}}>
						<p className={css.info_one}>工号：{item.info.job_num}</p>
						<p className={css.info_two}>{item.info.department_and_duty}</p>
					</div>
					<div className={css.arrow}><Icon type="right" /></div>
				</Link>
			);
		});
		return list;
	}

	handleLogout() {
		localStorage.clear();
		this.props.router.replace('/mobile_login');
	}

	render() {
		const { user, pop, loading, evaluations, edited_count } = this.state;

		return (
			<div className={css.container}>
				<div className={css.toolbar}>
					<div className={css.logout} onClick={this.handleMenuClick.bind(this)}>
						{ pop ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" /> }
					</div>
					<div className={css.title}>测评列表</div>
				</div>

				<Row className={css.tips}>
					<Col span={12}>共<span> {evaluations.length} </span>人</Col>
					<Col span={12}>已评<span> {edited_count} </span>人</Col>
				</Row>

				<div className={css.list}>
				  { loading ? <Spiner/> : this.getList() }
				</div>

				<PopWindow show={pop} direction="left" onCancel={this.hidePopWindow.bind(this)}>
					<div className={css.menu}>
						<div className={css.item}>
							<Icon type="user" /> {user.name}
						</div>
						<div className={css.item}>
							<Icon type="info-circle-o" /> {localStorage.number}
						</div>
						<div className={css.item} onClick={this.handleLogout.bind(this)}>
							<Icon type="logout" /> 退出
						</div>
					</div>
				</PopWindow>
			</div>
		);
	}
}

export default withRouter(MobileEvaluationList);