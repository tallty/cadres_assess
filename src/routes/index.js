import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, Redirect } from 'react-router';
import { Application } from '../layouts/Application';
import Login from '../components/login/Login';
import { Assess } from '../components/assess/Assess';
import Review from '../components/review/Review';
import MobileLogin from '../components/mobile/MobileLogin';
import MobileEvaluationList from '../components/mobile/MobileEvaluationList';
import MobileEvaluate from '../components/mobile/MobileEvaluate';

import Admin from '../components/admin/Admin';
import AdminLogIn from '../components/Admin/AdminLogIn';
import Statistics from '../components/admin/Statistics/Statistics';
import StatisticsD from '../components/admin/Statistics/StatisticsD';
import UserSet from '../components/admin/UserSet/UserSet';
import TestSet from '../components/admin/TestSet/TestSet';
import EvaluationCount from '../components/admin/evaluation_count/EvaluationCount';

export class Routes extends Component {
  // 接收鉴权
  requireAuth() {
    if (!sessionStorage.token) {
      location.href = '/';
    }
  }

  // 后台鉴权
  adminAuth() {
    if (!sessionStorage.admin_token) {
      location.href = '/admin';
    }
  }

  // 手机端鉴权
  mobileAuth() {
    if (!localStorage.token) {
      location.href = '/mobile_login';
    }
  }

  render() {
    return (
			<Router history={this.props.history}>
        <Route path="/" component={Application}>
          {/* 登录 */}
          <IndexRoute component={Login} />
          {/* 考核过程 */}
          <Route path="/assess" component={Assess} onEnter={this.requireAuth} />
          {/* 考核表格 */}
          <Route path="/review" component={Review} onEnter={this.requireAuth} />
        </Route>

        {/*管理端路由信息*/}
        <Route path="/admin" component={AdminLogIn} />
        <Route path="/statistics" component={Statistics} onEnter={this.adminAuth} />
        <Route path="/statistics_d" component={StatisticsD} onEnter={this.adminAuth} />
        <Route path="/user_set" component={UserSet} onEnter={this.adminAuth} />
        <Route path="/test_set" component={TestSet} onEnter={this.adminAuth} />
        <Route path="/evaluation_count" component={EvaluationCount} onEnter={this.adminAuth} />

        {/* 手机端互评 */}
        <Route path="/mobile_login" component={MobileLogin} />
        <Route path="/mobile_evaluation_list" component={MobileEvaluationList} onEnter={this.mobileAuth}/>
        <Route path="/mobile_evaluate" component={MobileEvaluate} onEnter={this.mobileAuth}/>
      </Router>
		)
  }
}

Routes.defaultProps = {

}

Routes.propTypes = {
  history: PropTypes.any
}
