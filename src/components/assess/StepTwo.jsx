import React, { Component } from 'react';
import css from './assess.less';
import {Modal, Button} from 'antd';
import Agent from 'superagent';

export class StepTwo extends Component {
	state = {
		visible: false,
		evaluations: []
	}

	componentDidMount() {
		this.getEvaluationList();
	}

	getEvaluationList() {
		let type = sessionStorage.user_type + "s";
		Agent
			.get(`http://114.55.172.35:3232/${type}/evaluations?page=1&per_page=100`)
			.set('Accept', 'application/json')
			.set('X-User-Token', sessionStorage.token)
			.set('X-User-Jobnum', sessionStorage.number)
			.end((err, res) => {
				if (!err || err === null) {
					let key = sessionStorage.user_type + "_evaluations";
					console.log("获取考核名单成功");
					console.dir(res.body[key]);
					this.setState({ evaluations: res.body[key] });
				} else {
					console.log("获取考核名单失败");
				}
			})
	}

	getList() {
		let obj = {
			count: 0,
			edited_count: 0,
			list: []
		};
		for(let item of this.state.evaluations) {
			if (obj.already_edited) {
				obj.edited_count += 1;
				let event = '已评';
			} else {
				let event = <a onClick={this.handleAssess.bind(this, item)}>待评</a>;
			}
			obj.list.push(
				<div className={css.box} key={item.id}>
					<div className={css.item1}>{item.user_id}</div>
					<div className={css.item1}>{item.info.name}</div>
					<div className={css.item1}>{item.info.department_and_duty}</div>
					<div className={css.item1}>{event}</div>
				</div>
			);
		}
		obj.count = obj.list.length;
		if (obj.list.length <= 0) {
			obj.list.push(
				<div className={css.box} key={-1}>
					<div className={css.item1}>暂无考核名单</div>
				</div>
			);
		}
		return obj;
	}

	handleAssess(evaluation) {
		let now_date = new Date();
		let begin_date = new Date("2016-11-11");
		if (now_date > begin_date) {

		} else {
			this.setState({ visible: true });
		}
		
	}

  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
  }

	render() {
		let header_style = {
			background: '#006EC6',
			color: '#fff',
			marginTop: 15,
			textAlign: 'center'
		}
		let modal_footer = (
			<div className="text-center">
				<Button type="primary" size="large" onClick={this.handleOk.bind(this)}>
					&nbsp;&nbsp;&nbsp;&nbsp;确 定&nbsp;&nbsp;&nbsp;&nbsp;
				</Button>
			</div>
		);
		let list_obj = this.getList();

		return (
			<div className={css.assess_two}>
				<div className={css.title}>中层干部考核名单</div>
				<p className="text-center">
					<span className={css.info}>共<span>{list_obj.count}</span>人</span>
					<span className={css.info}>已评<span>{list_obj.edited_count}</span>人</span>
					<span className={css.info}>待评<span>{list_obj.count - list_obj.edited_count}</span>人</span>
				</p>

				<div className={css.box} style={header_style}>
					<div className={css.item1}>工号</div>
					<div className={css.item1}>干部姓名</div>
					<div className={css.item1}>部门</div>
					<div className={css.item1}>评分情况</div>
				</div>

				<div className={css.table_div}>
					{ list_obj.list }
				</div>

				<Modal title="系统消息" 
							 visible={this.state.visible} 
							 onOk={this.handleOk.bind(this)} 
							 closable={false}
							 wrapClassName="global_modal"
							 footer={modal_footer}>
          <h3>您好！在线考核开通的时间为7月1日至7月31日<br/>请7月1日后再登录平台进行评分！</h3>
        </Modal>
			</div>
		);
	}
}