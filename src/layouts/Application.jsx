import React, { Component } from 'react';
import css from './application.less';
import { AssessOne } from '../components/assess_one/AssessOne'


export class Application extends Component {
	render() {
		return (
			<div className={css.container}>
				<div className={css.header}></div>

				{ this.props.children || <AssessOne /> }
				
				<div className={css.footer}></div>
			</div>
		);
	}
}
