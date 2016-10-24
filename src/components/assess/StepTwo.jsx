import React, { Component } from 'react';
import css from './assess.less';

export class StepTwo extends Component {
	getList() {
		let data = [
			{id: 1, name: '张三', department: '计算机系', state: true},
			{id: 2, name: '李四', department: '计算机系', state: false},
			{id: 3, name: '王五', department: '计算机系', state: true}
		]
		let list = []
		for(let item of data) {
			list.push(
				<div className={css.box} key={item.id}>
					<div className={css.item1}>{item.id}</div>
					<div className={css.item1}>{item.name}</div>
					<div className={css.item1}>{item.department}</div>
					<div className={css.item1}>{item.state ? '已评' : '待评'}</div>
				</div>
			)
		}
		return list
	}

	render() {
		let header_style = {
			background: '#006EC6',
			color: '#fff',
			marginTop: 15,
			textAlign: 'center'
		}
		return (
			<div className={css.assess_two}>
				<div className={css.title}>中层干部考核名单</div>
				<p className="text-center">
					<span className={css.info}>共<span>46</span>人</span>
					<span className={css.info}>已评<span>2</span>人</span>
					<span className={css.info}>待评<span>40</span>人</span>
				</p>

				<div className={css.box} style={header_style}>
					<div className={css.item1}>工号</div>
					<div className={css.item1}>干部姓名</div>
					<div className={css.item1}>部门</div>
					<div className={css.item1}>评分情况</div>
				</div>
				{this.getList()}
			</div>
		);
	}
}