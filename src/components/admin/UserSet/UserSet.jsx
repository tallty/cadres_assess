// 通用UserSet组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './UserSet.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from 'antd'

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
          UserSet
        </div>
      </Admin>
    )
  }
}

export default UserSet