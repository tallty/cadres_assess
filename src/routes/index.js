import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, Redirect } from 'react-router'
import { Application } from '../layouts/Application'
import { Login } from '../components/login/Login'
import { AssessOne } from '../components/assess_one/AssessOne'
import { AssessTwo } from '../components/assess_two/AssessTwo'
import { AssessThree } from '../components/assess_three/AssessThree'

export class Routes extends Component {
  // 接收鉴权
  requireAuth() {
    // auth.loggedIn();
  }

	render() {
		return (
			<Router history={this.props.history}>
        <Route path="/" component={Application}>
          {/* 登录 */}
          <IndexRoute component={Login} />
          {/* 提交审核登记表 */}
          <Route path="/assess_one" component={AssessOne} />
          {/* 在线考核评分 */}
          <Route path="/assess_two" component={AssessTwo} />
          {/* 考核结果统计 */}
          <Route path="/assess_three" component={AssessThree} />
        </Route>
		  </Router>
		)
	}
}

Routes.defaultProps = {
	
}

Routes.propTypes = {
  history: PropTypes.any,
}
