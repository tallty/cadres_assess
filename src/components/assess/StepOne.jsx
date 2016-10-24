import React, { Component } from 'react';
import css from './assess.less';
import { Row, Col, Button, Form, Radio } from 'antd';
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
					{getFieldDecorator(item.id+"", { initialValue: 'good' })(
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