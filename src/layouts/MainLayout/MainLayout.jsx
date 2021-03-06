import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Row, Col, Button } from 'antd'
import styles from './MainLayout.less';

function GetUrlRelativePath(){
  var url = document.location.toString();
  var arrUrl = url.split("//");
  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
  if(relUrl.indexOf("?") != -1){
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

function signOut() {
  localStorage.clear();
  sessionStorage.clear();
  location.href = '/admin';
}
const MainLayout = ({ children }) => {
  const local_url = GetUrlRelativePath()
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        {local_url == '/admin'?<h1>上海电子信息职业技术学院中层干部考核系统后台管理</h1>:<h1>上海电子信息职业技术学院中层干部考核系统后台管理</h1>}
        {
          location.pathname === '/admin' ? null :
            <div className={styles.toolbar}>
              <a onClick={signOut}>[退出]</a>
            </div>
        }
      </div>
      {children}
      <div className={styles.foot}>
        <Row>
          <Col span={8}>联系单位：上海电子信息职业技术学院</Col>
          <Col span={8}>技术支持：上海拓体信息科技有限公司</Col>
          <Col span={8}>联系电话：18916591019</Col>
        </Row>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  // children: PropTypes.element.isRequired,
};

export default MainLayout;
