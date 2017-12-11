import React, { Component } from 'react';
import SuperAgent from 'superagent';
import Admin from '../Admin';
import css from './evaluation_count.less'
import { Link } from 'react-router'
import { Icon, Button, Table, Modal, Message } from 'antd'
import { spawn } from 'child_process';

class EvaluationCount extends Component {
  state = {
    data: [],
    loading: true
  };

  columns = [{
    title: '工号',
    dataIndex: 'job_num',
    sorter: (a, b) => a.job_num - b.job_num,
  }, {
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: ' 是否自评',
    dataIndex: 'self_evaluation_edited',
    render: (text, record, index) => this.renderselfEvaluation(record, index),
    filters: [{
      text: '已自评',
      value: true
    }, {
      text: '未自评',
      value: false
    }],
    onFilter: (value, record) => {
      return String(record.self_evaluation_edited) === value;
    }
  }, {
    title: '已评数',
    dataIndex: 'edited_count',
    sorter: (a, b) => a.edited_count - b.edited_count,
  }, {
    title: '未评数',
    dataIndex: 'unedited_count',
    sorter: (a, b) => a.unedited_count - b.unedited_count,
  }];

  componentWillMount() {
    const year = this.props.location.query.year;
    this.getData(year);
  }

  getData(year) {
    SuperAgent
      .get(`http://stiei-api.tallty.com/admin/evaluation_count?activity_year=${year}`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end((err, res) => {
        if (!err || err === null) {
          console.log(res.body);
          this.setState({
            data: res.body,
            loading: false
          });
        } else {
          Message.error('获取数据失败');
        }
      })
  }

  renderselfEvaluation(record) {
    return record.self_evaluation_edited ?
      <span className={css.text_green}>已自评</span> :
      <span className={css.text_red}>未自评</span>;
  }

  render() {
    return (
      <Admin>
        <br />
        <div className={css.table_content}>
          <Table columns={this.columns}
            bordered
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={{ pageSize: 9 }} />
        </div>
      </Admin>
    );
  }
}

export default EvaluationCount;
