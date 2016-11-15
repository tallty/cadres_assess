import React, { Component } from 'react';
import css from './assess.less';
import { Row, Col, Steps } from 'antd';
import { UserInfo } from './UserInfo';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';

const Step = Steps.Step;

export class Assess extends Component {
	state = {
		step: 1,
		user: {}
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

	change_time(step){
		this.setState({ step: step })
	}

	// 开始下一步
	toNext() {
		this.setState({ step: this.state.step + 1 })
	}

	render() {
		const { step, user } = this.state;
		return (
			<div>
				{/* 用户信息 */}
				{/* <UserInfo /> */}
		
				{/* 步骤主体 */}
				<div className={css.assess_container}>
					{/* 进度条 */}
					<div className={css.steps}>
						<Steps current={step - 1}>
					    <Step onClick={this.change_time.bind(this, 1)} title="提交审核登记表" description="05-01 —— 06-31" />
					    <Step onClick={this.change_time.bind(this, 2)} title="在线考核评分" description="05-01 —— 06-31" />
					    <Step onClick={this.change_time.bind(this, 3)} title="考核结果统计" description="05-01 —— 06-31" />
					  </Steps>
					</div>
					{/* 分步操作 */}
					{this.getStepOperation()}
				</div>

			</div>
		);
	}
}
