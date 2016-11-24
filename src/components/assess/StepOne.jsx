import React, { Component, PropTypes } from 'react';
import css from './assess.less';
import { Row, Col, Button, Form, Radio, Input, Modal, Message } from 'antd';
import Agent from 'superagent';
import {withRouter} from 'react-router';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class StepOne extends Component {
	state = {
		total_assess: null,
		duties: [],
		info: {}
	}

	componentWillMount() {
		Agent
			.get("http://114.55.172.35:3232/middle_managers/self_evaluation")
			.set('Accept', 'application/json')
			.set('X-User-Token', sessionStorage.token)
			.set('X-User-Jobnum', sessionStorage.number)
			.end((err, res) => {
				if (!err || err === null) {
					this.setState({ 
						total_assess: res.body.content.self_evaluation_totality,
						duties: res.body.content.duties,
						info: res.body.info
					});
				} else {
					Message.error("获取自我评价表失败，请稍后重试。");
				}
			})
	}

	getFormItems() {
		let list = [];
		const { getFieldDecorator } = this.props.form;
		const { duties } = this.state;

		for (let i = 0; i < 12; i++) {
			let duty = duties[i] ? duties[i] : [];
			list.push(
				<div className={css.box} key={i+1}>
					<div className={css.item0}>{i+1}</div>
					<div className={css.item1}>
						{getFieldDecorator("input"+i, { initialValue: duty[0]})(
	            <Input type="text" placeholder={`自评项${i+1}`}/>
	          )}
					</div>
					{getFieldDecorator("group"+i, { initialValue: duty[1]})(
            <RadioGroup>
              <Radio value="perfect" className={css.item0}></Radio>
              <Radio value="good" className={css.item0}></Radio>
              <Radio value="normal" className={css.item0}></Radio>
              <Radio value="bad" className={css.item0}></Radio>
            </RadioGroup>
          )}
				</div>
			)
		}
		return list;
	}

	handleSubmit(e) {
		e.preventDefault();
		let params = this.props.form.getFieldsValue();
    if (this.validateSubmit(params)) {
    	let duties = this.validateSubmit(params);
			this.updateSelf(params, duties);
    } else {
    	alert("请完善评分");
    }
	}

	updateSelf(params, duties) {
		Agent
			.put("http://114.55.172.35:3232/middle_managers/self_evaluation")
			.set('Accept', 'application/json')
			.set('X-User-Token', sessionStorage.token)
			.set('X-User-Jobnum', sessionStorage.number)
			.field('user_info[job]', params.job)
			.field('self_evaluation[duties]', duties)
			.field('self_evaluation[self_evaluation_totality]', params.total_assess)
			.end((err, res) => {
				if (!err || err === null) {
					this.setState({ total_assess: params.total_assess });
					Message.success("提交自我评价意见成功");
				} else {
					Message.error("提交自我评价意见失败，请重试");
				}
			})
	}

	validateSubmit(params) {
		let cache = "";
		if (params.job && params.total_assess) {
			for(let i = 0; i < 12; i++ ) {
				if (params["input"+i] && params['group'+i]) {
					cache += `${params["input"+i]},${params['group'+i]};`;
				}
			}
			return cache;
		} else {
			return false;
		}
	}

	// 提交确认
	showConfirm(that) {
		confirm({
	    title: '确认提交自我评价表吗?',
	    content: '提交后不可修改，请仔细确认填写内容。',
	    onOk() {
	      let submit_btn = document.getElementById('submit_btn');
	      submit_btn.click();
	    },
	    onCancel() {},
	  });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { info, total_assess } = this.state;

		return (
			<Row gutter={16} className={css.assess_one}>
			{
				this.props.active ? 
					<Col span={20} offset={2} className={css.form_container}>
						<p className={css.title}>中层干部年度考核等级表——自我评价</p>
						<div className={css.box} style={{background: '#006EC6', color: '#fff'}}>
							<div className={css.item0}>序号</div>
							<div className={css.item1}>履行岗位职责情况</div>
							<div className={css.item0}>优秀</div>
							<div className={css.item0}>良好</div>
							<div className={css.item0}>一般</div>
							<div className={css.item0}>较差</div>
						</div>
						{/* form */}
						<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
							{this.getFormItems()}
							{/* 总体评价 */}
			        <div className={css.box} key={13}>
								<div className={css.item0}><span>*</span> 13</div>
								<div className={css.item1}>总体评价</div>
								{getFieldDecorator("total_assess", { initialValue: total_assess})(
			            <RadioGroup>
			              <Radio value="perfect" className={css.item0}></Radio>
			              <Radio value="good" className={css.item0}></Radio>
			              <Radio value="normal" className={css.item0}></Radio>
			              <Radio value="bad" className={css.item0}></Radio>
			            </RadioGroup>
			          )}
							</div>
							{/* 分管工作 */}
			        <div className={css.box} key={14}>
								<div className={css.item0}><span>*</span> 从事和分管工作</div>
								<div className={css.item1}>
									{getFieldDecorator('job', {
										initialValue: info.department_and_duty,
				            rules: [{ required: true}],
				          })(
				            <Input type="text" placeholder="从事或分管工作" />
				          )}
								</div>
							</div>
							{/* submit */}
							<div className={css.button_div}>
								<br/>
								<Button htmlType="submit" style={{display: 'none'}} id="submit_btn"></Button>
								{
									total_assess ?
										<Button type="primary" size="large" onClick={this.props.next}>下一步</Button> :
										<Button type="primary" size="large" onClick={this.showConfirm.bind(this, this)}>提交自我评价意见</Button>
								}
							</div>
						</Form>
					</Col> :
					<Col span={20} offset={2} className={css.form_container}>
						<p className={css.title}>未达到本阶段规定日期</p>
					</Col>
			}
			</Row>
		);
	}
}

StepOne.defaultProps = {
	next: new Function,
	active: false
}

StepOne.propTypes = {
	next: PropTypes.func,
	active: PropTypes.bool
}

StepOne = Form.create()(StepOne);
export default withRouter(StepOne);