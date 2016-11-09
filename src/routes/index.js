import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, Redirect } from 'react-router';
import { Application } from '../layouts/Application';
import Login from '../components/login/Login';
import { Assess } from '../components/assess/Assess';
import Admin from '../components/admin/Admin';
import AdminLogIn from '../components/Admin/AdminLogIn';
import AdminHome from '../components/admin/AdminHome/AdminHome';

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
          {/* 考核过程 */}
          <Route path="/assess" component={Assess} />          
        </Route>
        {/*管理端路由信息*/}
        <Route path="/admin" component={AdminLogIn} />
        <Route path="/admin_home" component={AdminHome} />
		  </Router>
		)
	}
}

Routes.defaultProps = {
	
}

Routes.propTypes = {
  history: PropTypes.any,
}
