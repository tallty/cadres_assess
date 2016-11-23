import React, { Component } from 'react';
import css from './assess.less';
import { Row, Col, Steps, Modal } from 'antd';
import { UserInfo } from './UserInfo';
import { StepOne } from './StepOne';
import StepTwo from './StepTwo';
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
		let obj = JSON.parse(sessionStorage.getItem('timeline'));
		let timeline = {
			year: obj.activity_year,
			first_begin: moment(obj.first_phase_begin),
			first_end: moment(obj.first_phase_end),
			second_begin: moment(obj.second_phase_begin),
			second_end: moment(obj.second_phase_end),
			third_begin: moment(obj.third_phase_begin),
			third_end: moment(obj.third_phase_end)
		}
		if (sessionStorage.user_type === "middle_manager") {
			this.setState({ step: 1, timeline: timeline });
		} else {
			this.setState({ step: 2, timeline: timeline });
		}
	}

	getStepOperation() {
		let { step, timeline } = this.state;
		let { first_begin, first_end, second_begin, second_end, third_begin, third_end } = timeline;
		if (step === 1) {
			let is_actived = moment() >= first_begin && moment() <= first_end;
			console.log("是否处于第一阶段的时间内："+is_actived);
			return <StepOne next={this.toNext.bind(this)} active={is_actived}/>
		} else if (step === 2) {
			let is_actived = moment() >= second_begin && moment() <= second_end;
			console.log("是否处于第二阶段的时间内："+is_actived);
			return <StepTwo next={this.toNext.bind(this)} active={is_actived} timeline={timeline}/>
		} else if (step === 3) {
			let is_actived = moment() >= third_begin && moment() <= third_end;
			console.log("是否处于第三阶段的时间内："+is_actived);
			return <StepThree next={this.toNext.bind(this)} active={is_actived}/>
		}
	}

	// 开始下一步
	toNext() {
		this.setState({ step: this.state.step + 1 });
	}

	render() {
		const { step, user, timeline } = this.state;
		const { year, first_begin, first_end, second_begin, second_end, third_begin, third_end} = timeline;
		return (
			<div>
				{/* 用户信息 */}
				{/* <UserInfo /> */}
				{/* 步骤主体 */}
				<div className={css.assess_container}>
					{/* 进度条 */}
					<div className={css.steps}>
						<Steps current={step - 1}>
					    <Step title="提交审核登记表" description={`${first_begin.format("MM-DD")} —— ${first_end.format("MM-DD")}`} />
					    <Step title="在线考核评分" description={`${second_begin.format("MM-DD")} —— ${second_end.format("MM-DD")}`} />
					    <Step title="考核结果统计" description={`${third_begin.format("MM-DD")} —— ${third_end.format("MM-DD")}`} />
					  </Steps>
					</div>
					{/* 分步操作 */}
					{this.getStepOperation()}
				</div>

			</div>
		);
	}
}
