import React, { Component } from 'react';
import css from './assess.less';
import { Row, Col, Button, Form, Radio, Input } from 'antd';
import Agent from 'superagent';
import { data } from './step_one_data.js';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export class StepOne extends Component {

	componentDidMount() {

	}

	getFormItems() {
		let list = [];
		const { getFieldDecorator } = this.props.form;

		for (let item of data) {
			let des = item.description
			list.push(
				<div className={css.box} key={item.id}>
					<div className={css.item0}>{item.id}</div>
					<div className={css.item1}>{item.description}</div>
					{getFieldDecorator(item.description+"", { initialValue: ''})(
            <RadioGroup>
              <Radio value="1" className={css.item0}></Radio>
              <Radio value="2" className={css.item0}></Radio>
              <Radio value="3" className={css.item0}></Radio>
              <Radio value="4" className={css.item0}></Radio>
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
    console.dir(params);
    if (this.isValidSubmit(params)) {
			this.updateSelf(params);
    } else {
    	alert("请完善评分");
    }
	}

	updateSelf(params) {
		Agent
			.put("http://114.55.172.35:3232/middle_managers/self_evaluation")
			.set('Accept', 'application/json')
			.set('X-User-Token', sessionStorage.token)
			.set('X-User-Jobnum', sessionStorage.number)
			.send('user_info[job]', params.work)
			.send('self_evaluation[duties]', '')
			.send('self_evaluation[self_evaluation_totality]', '')
			.end((err, res) => {
				if (!err || err === null) {
					// this.props.next();
				} else {
					console.log("更新自评表失败");
				}
			})
	}

	isValidSubmit(params) {
		let count = 0;
		for(let value of Object.values(params)) {
			if (value != "") count++;
		}
		return count === 12;
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

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
						<br/>
						<FormItem label="从事或分管工作" {...formItemLayout} hasFeedback>
		          {getFieldDecorator('work', {
		            rules: [{ required: true, message: '请输入从事或分管工作!' }],
		          })(
		            <Input type="text" placeholder="从事或分管工作" />
		          )}
		        </FormItem>
						{/* submit */}
						<div className={css.button_div}>
							<br/>
							<Button type="primary" size="large" htmlType="submit">提交自我评价意见</Button>
						</div>
					</Form>
				</Col>
			</Row>
		);
	}
}

StepOne = Form.create()(StepOne);