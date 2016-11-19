import React, { Component, PropTypes } from 'react';
import css from './assess.less';
import {Modal, Button, Row, Col, Table} from 'antd';
import Agent from 'superagent';
import { withRouter } from 'react-router';

class StepTwo extends Component {
	state = {
		visible: false,
		evaluations: [],
		edited_count: 0
	};
	columns = [{
		title: '工号',
		dataIndex: 'info.job_num',
		key: 'index'
	}, {
		title: '干部姓名',
		dataIndex: 'info.name',
		key: 'name'
	}, {
		title: '部门',
		dataIndex: 'info.department_and_duty',
		key: 'department'
	}, {
		title: '评分情况',
		key: 'action',
		render: (text, record) => (
			record.already_edited ? '已评' : <a onClick={this.handleAssess.bind(this, record)}>待评</a>
		)
	}];

	componentDidMount() {
		this.getEvaluationList();
	}

	getEvaluationList() {
		Agent
			.get(`http://114.55.172.35:3232/evaluations?page=1&per_page=1000`)
			.set('Accept', 'application/json')
			.set('X-User-Token', sessionStorage.token)
			.set('X-User-Jobnum', sessionStorage.number)
			.end((err, res) => {
				if (!err || err === null) {
					console.log("获取考核名单成功");
					console.dir(res.body.middle_manager_evaluations);
					let count = this.getEditedCount(res.body.middle_manager_evaluations);
					this.setState({ 
						evaluations: res.body.middle_manager_evaluations,
						edited_count: count
					});
				} else {
					console.log("获取考核名单失败");
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

	/**
	 * 处理测评事件
	 */
	handleAssess(evaluation) {
		if (!this.props.active) {
			console.log("处于第二阶段规定时间，可以点评");
			console.dir(evaluation);
			sessionStorage.setItem('evaluation', JSON.stringify(evaluation));
			this.props.router.replace(`/review?id=${evaluation.id}`);
		} else {
			// 不在规定时间
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
		const { evaluations, edited_count } = this.state;
		let { second_begin, second_end } = this.props.timeline;

		return (
			<div>
				<div className={css.assess_two}>
					<div className={css.title}>中层干部考核名单</div>
					<p className="text-center">
						<span className={css.info}>共<span>{evaluations.length}</span>人</span>
						<span className={css.info}>已评<span>{edited_count}</span>人</span>
						<span className={css.info}>待评<span>{evaluations.length - edited_count}</span>人</span>
					</p>

					<div className={css.table_div}>
						<Table columns={this.columns} dataSource={this.state.evaluations} />
					</div>

					<Modal title="系统消息" 
								 visible={this.state.visible} 
								 onOk={this.handleOk.bind(this)} 
								 closable={false}
								 wrapClassName="global_modal"
								 footer={modal_footer}>
	          <h3>您好！在线考核开通的时间为{second_begin.format('MM[月]DD[日]')} 至 {second_end.format('MM[月]DD[日]')}<br/>请于开通时间内登录平台进行评分！</h3>
	        </Modal>
				</div>
			</div>
		);
	}
}

StepTwo.defaultProps = {
	next: new Function,
	active: false,
	timeline: {}
}

StepTwo.propTypes = {
	next: PropTypes.func,
	active: PropTypes.bool,
	timeline: PropTypes.object
}

export default withRouter(StepTwo);