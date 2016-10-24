import React, { Component } from 'react';
import css from './assess.less';
import { Row, Col, Button, Form, Radio } from 'antd';
import Agent from 'superagent';
import { data } from './step_one_data.js';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export class StepOne extends Component {

	componentDidMount() {
		// Agent
		// 	.get("")
		// 	.set('Accept', 'applition/json')
		// 	.end((err, res) => {
		// 		if (!err || err === null) {
				
		// 		} else {
		// 			console.dir(err)
		// 		}
		// 	})
	}

	getFormItems() {
		let list = [];
		const { getFieldDecorator } = this.props.form;

		for (let item of data) {
			let des = item.description
			list.push(
				<div className={css.box} key={item.id}>
					<div className={css.item}>{item.id}</div>
					<div className={css.flex_item}>{item.description}</div>
					{getFieldDecorator(item.id+"", { initialValue: 'good' })(
            <RadioGroup>
              <Radio value="perfect" className={css.item}></Radio>
              <Radio value="good" className={css.item}></Radio>
              <Radio value="normal" className={css.item}></Radio>
              <Radio value="bad" className={css.item}></Radio>
            </RadioGroup>
          )}
				</div>
			)
		}
		return list;
	}

	handleSubmit(e) {
		e.preventDefault();
    console.log('Received values of form:', this.props.form.getFieldsValue());
    this.props.next();
	}

	render() {
		return (
			<Row gutter={16} className={css.assess_one}>
				<Col span={9} className={css.print_container}>
					<div className={css.print}></div>
					<br/>
					<Button type="primary" size="large">打印</Button>
				</Col>
				<Col span={15} className={css.form_container}>
					<p className={css.title}>中层干部年度考核等级表——自我评价</p>
					<div className={css.box} style={{background: '#006EC6', color: '#fff'}}>
						<div className={css.item}>序号</div>
						<div className={css.flex_item}>履行岗位职责情况</div>
						<div className={css.item}>优秀</div>
						<div className={css.item}>良好</div>
						<div className={css.item}>一般</div>
						<div className={css.item}>较差</div>
					</div>
					{/* form */}
					<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
						{this.getFormItems()}
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