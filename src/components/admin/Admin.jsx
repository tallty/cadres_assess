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
          <Link to="/admin_home"><div className={url=='/admin_home'?list_style1:list_style2}><img src="src/images/home.svg" alt=""/><span>主页</span></div></Link>
          <Link to="/admin_order_list"><div className={url=='/admin_order_list'?list_style1:list_style2}><img src="src/images/order.svg" alt=""/><span>预约申请</span></div></Link>
          <Link to="/admin_meeting_plan"><div className={url=='/admin_meeting_plan'?list_style1:list_style2}><img src="src/images/meeting_plan.svg" alt=""/><span>会议议程</span></div></Link>
          <Link to="/admin_meeting_room_set"><div className={url=='/admin_meeting_room_set'?list_style1:list_style2}><img src="src/images/room_seting.svg" alt=""/><span>会议室设置</span></div></Link>
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