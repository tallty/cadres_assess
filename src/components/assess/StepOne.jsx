import React, { Component } from 'react';
import css from './assess.less';
import { Row, Col, Button, Form, Radio, Input } from 'antd';
import Agent from 'superagent';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export class StepOne extends Component {
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
					console.log("获取自评表成功");
					console.dir(res.body);
					this.setState({ 
						total_assess: res.body.content.self_evaluation_totality,
						duties: res.body.content.duties,
						info: res.body.info
					});
				} else {
					console.log("获取自评表失败");
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
		console.log("=========表单值============")
    console.dir(params);
    if (this.validateSubmit(params)) {
    	let duties = this.validateSubmit(params);
			this.updateSelf(params, duties);
    } else {
    	alert("请完善评分");
    }
	}

	updateSelf(params, duties) {
		console.log(duties);
		console.log(params)
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
					// this.props.next();
					console.log("更新成功");
					console.dir(res.body);
				} else {
					console.log("更新自评表失败");
				}
			})
	}

	validateSubmit(params) {
		let cache = "";
		if (params.job && params.total_assess) {
			for(let i = 1; i <= 12; i++ ) {
				if (params["input"+i] && params['group'+i]) {
					cache += `${params["input"+i]},${params['group'+i]};`;
				}
			}
			return cache;
		} else {
			return false;
		}
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
							<div className={css.item0}><span>*</span> 14</div>
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
							<Button type="primary" size="large" htmlType="submit">
								{ total_assess ? "修改自我评价意见" : "提交自我评价意见" }
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		);
	}
}

StepOne = Form.create()(StepOne);