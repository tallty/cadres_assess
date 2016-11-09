// 通用TestSet组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './TestSet.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from 'antd'

class TestSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Admin>
        <div className={css.card_content}>
          TestSet
        </div>
      </Admin>
    )
  }
}

export default TestSet