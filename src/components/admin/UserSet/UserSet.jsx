// 通用UserSet组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './UserSet.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon, Button } from 'antd'

class UserSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Admin>
        <div className={css.card_content}>
          <div className={css.title_name}>{this.props.location.query.year}度考核名单总表</div>
          <div className={css.btn_content}><Button className={css.file_btn} type="primary" icon="plus">选择文件</Button><Button type="primary" icon="plus">导入考核名单</Button></div>
        </div>
      </Admin>
    )
  }
}

export default UserSet