// 通用Admin组件
import React, { Component, PropTypes } from 'react'
import css from './Admin.less'
import MainLayout from '../../layouts/MainLayout/MainLayout';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from 'antd'

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

const Admin = ({ children }) => {
  const url = GetUrlRelativePath()
  console.log(url);
  let list_style1 = classnames(
    css.holyGrail_list,
    css.holyGrail_list_active,
  )
  let list_style2 = classnames(
    css.holyGrail_list,
  )

  return (
    <MainLayout>
      <div className={css.holyGrail_body}>
        <nav className={css.holyGrail_nav}>
          <Link to="/statistics"><div className={url=='/statistics'||url=='/statistics_d'?list_style1:list_style2}><img src="src/images/statistics.svg" alt=""/><span>分数统计表</span></div></Link>
          <Link to="/user_set"><div className={url=='/user_set'?list_style1:list_style2}><img src="src/images/setting.svg" alt=""/><span>用户设置</span></div></Link>
          <Link to="/test_set"><div className={url=='/test_set'?list_style1:list_style2}><img src="src/images/testSetting.svg" alt=""/><span>考核设置</span></div></Link>
        </nav>
        <main className={css.holyGrail_content}>
          {children}
        </main>
      </div>
    </MainLayout>
  )
}

Admin.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Admin