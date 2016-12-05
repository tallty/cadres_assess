import React, { Component } from 'react';
import SuperAgent from 'superagent';
import Admin from '../Admin';
import css from './evaluation_count.less'
import { Link } from 'react-router'
import { Icon, Button, Table, Modal, Message } from 'antd'

class EvaluationCount extends Component {
	state = {
		data: [],
		loading: true
	};
	columns = [{
    title: '工号',
    dataIndex: 'job_num',
    sorter: (a, b) => a.job_num - b.job_num,
  }, {
    title: '已评数',
    dataIndex: 'edited_count',
    sorter: (a, b) => a.edited_count - b.edited_count,
  }, {
    title: '未评数',
    dataIndex: 'unedited_count',
    sorter: (a, b) => a.unedited_count - b.unedited_count,
  }];

  componentWillMount() {
  	const year = this.props.location.query.year;
    this.getData(year);
  }

  getData(year){
    SuperAgent
      .get(`http://114.55.172.35:3232/admin/evaluation_count?activity_year=${year}`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end( (err, res) => {
        if (!err || err === null) {
        	console.log(res.body);
          this.setState({ 
          	data: res.body, 
          	loading: false
          });
        } else {
          Message.error("获取数据失败");
        }
      })
  }

	render() {
		return (
			<Admin>
				<br/>
				<div className={css.table_content}>
					<Table columns={this.columns}
	          bordered 
	          dataSource={this.state.data} 
	          loading={this.state.loading}
	          pagination={{pageSize: 9}} />
				</div>
			</Admin>
		);
	}
}

export default EvaluationCount;