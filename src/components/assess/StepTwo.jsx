import React, { Component } from 'react';
import css from './assess.less';
import {Modal, Button} from 'antd';

export class StepTwo extends Component {
	state = {
		visible: false
	}

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
					<div className={css.item1}>
						{
							item.state ? '已评' : <a onClick={this.handleAssess.bind(this)}>待评</a>
						}
					</div>
				</div>
			)
		}
		return list
	}

	handleAssess() {
		let now_date = new Date();
		let begin_date = new Date("2016-10-31");
		if (now_date > begin_date) {

		} else {
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
				<Button type="primary" size="large" 
								onClick={this.handleOk.bind(this)}>&nbsp;&nbsp;&nbsp;&nbsp;确 定&nbsp;&nbsp;&nbsp;&nbsp;</Button>
			</div>
		)

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

				<div className={css.table_div}>
					{this.getList()}
				</div>

				<Modal title="系统消息" 
							 visible={this.state.visible} 
							 onOk={this.handleOk.bind(this)} 
							 closable={false}
							 wrapClassName="global_modal"
							 footer={modal_footer}>
          <h3>您好！在线考核开通的时间为7月1日至7月31日<br/>请7月1日后再登录平台进行评分！</h3>
        </Modal>
			</div>
		);
	}
}