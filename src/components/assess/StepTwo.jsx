import React, { Component } from 'react';
import css from './assess.less';
import {Modal, Button, Row, Col} from 'antd';
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

	getTable() {
		let object = {
			count: 0,
			edited_count: 0,
			list: []
		};
		this.state.evaluations.forEach((item, i, obj) => {
			let event = null;
			if (item.already_edited) {
				object.edited_count += 1;
				event = '已评';
			} else {
				event = <a onClick={this.handleAssess.bind(this, item)}>待评</a>;
			}
			object.list.push(
				<Row key={item.id}>
					<Col span={4} className={css.table_cell}>{item.user_id}</Col>
					<Col span={4} className={css.table_cell}>{item.info.name}</Col>
					<Col span={12} className={css.table_cell}>{item.info.department_and_duty}</Col>
					<Col span={4} className={css.table_cell}>{event}</Col>
				</Row>
			);
		})
		object.count = object.list.length;
		if (object.list.length <= 0) {
			object.list.push(
				<div className={css.box} key={-1}>
					<div className={css.item1}>暂无考核名单</div>
				</div>
			);
		}
		return object;
	}

	handleAssess(evaluation) {
		let now_date = new Date();
		let begin_date = new Date("2016-11-11");
		if (now_date > begin_date) {
			location.href = "/review"
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
		let list_obj = this.getTable();

		return (
			<div className={css.assess_two}>
				<div className={css.title}>中层干部考核名单</div>
				<p className="text-center">
					<span className={css.info}>共<span>{list_obj.count}</span>人</span>
					<span className={css.info}>已评<span>{list_obj.edited_count}</span>人</span>
					<span className={css.info}>待评<span>{list_obj.count - list_obj.edited_count}</span>人</span>
				</p>

				<Row className={css.table_header}>
					<Col span={4} className={css.table_cell}>工号</Col>
					<Col span={4} className={css.table_cell}>干部姓名</Col>
					<Col span={12} className={css.table_cell}>部门</Col>
					<Col span={4} className={css.table_cell}>评分情况</Col>
				</Row>

				<div className={css.table_div}>
					{list_obj.list}
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