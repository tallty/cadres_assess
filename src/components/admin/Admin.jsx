// 通用Admin组件
import React, { Component, PropTypes } from 'react';
import css from './Admin.less';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Icon, Menu } from 'antd';
import Agent from 'superagent';

const SubMenu = Menu.SubMenu;

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

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
      lists: []
    }
  }

  componentWillMount() {
    Agent
      .get("http://114.55.172.35:3232/admin/activities")
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end((err, res) => {
        if (!err || err === null) {
          const results = res.body.activities
          var lists = []
          for (let list of results) {
            lists.push(list.activity_year)
          }
          this.setState({ 
            lists: lists
          });
        } else {
          console.log("获取活动时间列表失败");
        }
      })
  }

  handleClick(e) {
    // console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }

  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }

  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }

  render() {
    const url = GetUrlRelativePath();
    // console.log(url);
    let list_style1 = classnames(
      css.holyGrail_list,
      css.holyGrail_list_active,
    );
    let list_style2 = classnames(
      css.holyGrail_list,
    );
    const Menus_one = []
    for (let year of this.state.lists) {
      Menus_one.push(<Menu.Item key={year}><Link to={`/statistics?year=${year}`}>{`${year}年`}</Link></Menu.Item>)
    }

    return (
      <MainLayout>
        <div className={css.holyGrail_body}>
          <nav className={css.holyGrail_nav}>
            <Link to="/test_set"><div className={url=='/test_set'?list_style1:list_style2}><img src="src/images/testSetting.svg" alt=""/><span>考核设置</span></div></Link>
            <Link to="/user_set"><div className={url=='/user_set'?list_style1:list_style2}><img src="src/images/setting.svg" alt=""/><span>用户设置</span></div></Link>
            <Menu
              theme="dark"
              mode="inline"
              defaultOpenKeys={['sub1', 'sub2']}
              selectedKeys={[this.state.current]}
              onClick={this.handleClick.bind(this)}>
              <SubMenu title={<div className={url=='/statistics'||url=='/statistics_d'?list_style1:list_style2}><img src="src/images/statistics.svg" alt=""/><span>分数统计表</span></div>}>
                {Menus_one}
              </SubMenu>
            </Menu>
          </nav>
          <main className={css.holyGrail_content}>
            {this.props.children }
          </main>
        </div>
      </MainLayout>
    )
  }
}

export default Admin;