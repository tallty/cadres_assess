import React, { Component, PropTypes } from 'react';
import css from './assess.less';
import { Row, Col } from 'antd';

export class UserInfo extends Component {
	render() {
		const {name, sex, birth, political_status, degree, officeholding_time, department, job} = this.props.user
		return (
			<div className={css.user_info}>
				<div className={css.user_info_content}>
					<Row>
						<Col span={12}>
							<p>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</p>
							<p>出生年月：&nbsp;&nbsp;&nbsp;&nbsp;{birth}</p>
							<p>文化程度：&nbsp;&nbsp;&nbsp;&nbsp;{degree}</p>
							<p>部门及职务：{department}</p>
						</Col>
						<Col span={12}>
							<p>性别：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sex}</p>
							<p>政治面貌：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{political_status}</p>
							<p>任现职时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{officeholding_time}</p>
							<p>从事或分管工作：{job}</p>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

UserInfo.defaultProps = {
	user: {
		name: '',
		sex: '',
		birth: '',
		political_status: '',
		degree: '',
		officeholding_time: '',
		department: '',
		job: ''
	}
}

UserInfo.propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string,
		sex: PropTypes.string,
		birth: PropTypes.string,
		political_status: PropTypes.string,
		degree: PropTypes.string,
		officeholding_time: PropTypes.string,
		department: PropTypes.string,
		job: PropTypes.string
	})
}