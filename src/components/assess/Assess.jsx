import React, { Component } from 'react';
import css from './assess.less';
import { Row, Col, Steps, Modal } from 'antd';
import { UserInfo } from './UserInfo';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import moment from 'moment';

const Step = Steps.Step;

export class Assess extends Component {
	state = {
		step: 1,
		user: {},
		timeline: {}
	}

	componentWillMount() {
		let timeline = JSON.parse(sessionStorage.getItem('timeline'));
		if (sessionStorage.user_type === "middle_manager") {
			this.setState({ step: 1, timeline: timeline });
		} else {
			this.setState({ step: 1, timeline: timeline });
		}
	}

	getStepOperation() {
		let { step } = this.state
		if (step === 1) {
			return <StepOne next={this.toNext.bind(this)}/>
		} else if (step === 2) {
			return <StepTwo next={this.toNext.bind(this)}/>
		} else if (step === 3) {
			return <StepThree next={this.toNext.bind(this)}/>
		}
	}

	dateFormat(date) {
		return moment(date).format("MM-DD");
  }

	// 开始下一步
	toNext() {
		this.setState({ step: this.state.step + 1 });
	}

	render() {
		const { step, user } = this.state;
		const { 
			activity_created_year, 
			first_phase_begin, first_phase_end, 
			second_phase_begin, second_phase_end, 
			third_phase_begin, third_phase_end
		} = this.state.timeline;
		return (
			<div>
				{/* 用户信息 */}
				{/* <UserInfo /> */}
				{/* 步骤主体 */}
				<div className={css.assess_container}>
					{/* 进度条 */}
					<div className={css.steps}>
						<Steps current={step - 1}>
					    <Step title="提交审核登记表" description={`${this.dateFormat(first_phase_begin)} —— ${this.dateFormat(first_phase_end)}`} />
					    <Step title="在线考核评分" description={`${this.dateFormat(second_phase_begin)} —— ${this.dateFormat(second_phase_end)}`} />
					    <Step title="考核结果统计" description={`${this.dateFormat(third_phase_begin)} —— ${this.dateFormat(third_phase_end)}`} />
					  </Steps>
					</div>
					{/* 分步操作 */}
					{this.getStepOperation()}
				</div>

			</div>
		);
	}
}
