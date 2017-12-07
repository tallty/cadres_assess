import React, { Component } from 'react';
import css from './Review.less';
import Agent from 'superagent';
import { withRouter, Link } from 'react-router';
import { Row, Col, Form, InputNumber, Button, Message } from 'antd';
import { UserInfo } from '../assess/UserInfo';

const FormItem = Form.Item;
const DUTIES = 'duties';
const THOUGHT = 'thought_morals';
const UPRIGHT = 'upright_incorruptiable';
var formData = [];

class Review extends Component {
  state = {
    evaluation: null,
    complete: false
  };

  componentWillMount() {
    this.getEvaluation();
  }

  componentDidMount() {
    console.log("要评价的人员信息");
    console.dir(this.state.evaluation);
  }

  /**
   * 缓存未取到时，获取评价详情
   */
  getEvaluation() {
    let id = this.props.location.query.id;
    Agent
      .get(`http://stiei-api.tallty.com/evaluations/${id}`)
      .set('Accept', 'application/json')
      .set('Cache-control', 'no-cache')
      .set('X-User-Token', sessionStorage.token)
      .set('X-User-Jobnum', sessionStorage.number)
      .end((err, res) => {
        if (!err || err === null) {
          console.log("获取要评价的人员成功");
          console.dir(res.body);
          this.setState({
            evaluation: res.body,
            complete: res.body.already_edited
          });
        } else {
          console.log("获取要评价的人员失败");
          Message.error("获取评价人员信息失败");
        }
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let type = sessionStorage.getItem('user_type');
      if (!err || err === null) {
        console.log('Received values of form: ', values);
        if (type === 'leader') {
          // 领导打总分即可
          this.leaderEvalution(values);
        } else {
          // 员工、中层干部打分
          this.otherEvalution(values);
        }
      }
    });
  }

  /**
   * 员工、中层干部打分
   */
  otherEvalution(params) {
    let id = this.props.location.query.id;
    console.log("非领导测评, 获取的表单数据");
    console.log(params);
    console.log("保存的kind 和 key");
    console.log(formData);

    let thought_morals_str = this.formatApiString(params, THOUGHT);
    let duties_str = this.formatApiString(params, DUTIES);
    let upright_incorruptiable_str = this.formatApiString(params, UPRIGHT);

    console.log(thought_morals_str);
    console.log(duties_str.split('*;*').join('*;*\n'));
    console.log(upright_incorruptiable_str);

    Agent
      .put(`http://stiei-api.tallty.com/evaluations/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', sessionStorage.token)
      .set('X-User-Jobnum', sessionStorage.number)
      .send({
        evaluation: {
          thought_morals: thought_morals_str,
          duties: duties_str,
          upright_incorruptiable: upright_incorruptiable_str,
          evaluation_totality: params.total_count,
        }
      })
      .end((err, res) => {
        if (!err || err === null) {
          console.log("提交测评成功");
          console.dir(res.body);
          this.setState({ evaluation: res.body, complete: true });
          Message.success("提交测评成功");
        } else {
          console.log("获取要评价的人员失败");
          Message.error("提交测评失败");
        }
      })
  }

  /**
   * 整理数据
   * 根据tag找到需要的key, 输出成对应的字符串
   */
  formatApiString(params, kind) {
    console.log("++++++++++++++")
    console.log(params);

    let str = '';
    formData.forEach((item, i, obj) => {
      if (item.kind === kind) {
        let k = kind + '___' + item.index;
        str += `${item.key}*,*${params[k]}*;*`;
      }
    });
    return str;
  }

  /**
   * 领导打分
   */
  leaderEvalution(params) {
    let id = this.state.evaluation.id;
    Agent
      .put(`http://stiei-api.tallty.com/evaluations/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', sessionStorage.token)
      .set('X-User-Jobnum', sessionStorage.number)
      .send({
        evaluation: {
          evaluation_totality: params.total_count,
        }
      })
      .end((err, res) => {
        if (!err || err === null) {
          console.log("领导提交测评成功");
          console.dir(res.body);
          this.setState({ evaluation: res.body, complete: true });
          Message.success("提交测评成功");
        } else {
          console.log("领导获取要评价的人员失败");
          Message.error("提交测评失败");
        }
      })
  }

  getFormCell(evaluation, key) {
    let array = evaluation.content[key];
    let cells = [];
    array.forEach((item, i, obj) => {
      let value = parseInt(item[1]) === -1 ? null : parseInt(item[1]);
      let required = sessionStorage.getItem('user_type') !== 'leader';
      // 本页表单的key为动态指定，需保存表单的 key， value, 以便提交表单时， 根据key来获取value
      let cache = { kind: key, key: item[0], index: i };
      formData.push(cache);
      // 表单列表
      cells.push(
        <Row key={i} className={i % 2 == 0 ? css.form_input_cell : css.form_input2_cell}>
          <Col span={12} className={css.form_label}>
            {item[0]}
          </Col>
          <Col span={12} className={css.form_input}>
            <FormItem>
              {this.props.form.getFieldDecorator(`${key}___${i}`, {
                rules: [{ type: 'number', required: required, message: "请填写评分项" }],
                initialValue: value
              })(
                <InputNumber min={0} max={99} disabled={this.state.complete} />
                )}
            </FormItem>
          </Col>
        </Row>
      );
    })
    return cells;
  }

  render() {
    const { evaluation, complete } = this.state;
    formData = [];
    // 总分表单的初始化
    let total_count = evaluation ? evaluation.content.evaluation_totality : null;
    total_count = parseInt(total_count) === -1 ? null : parseInt(total_count);
    const { getFieldDecorator } = this.props.form;
    const year = this.props.location.query.year;

    return (
      <div>
        {/* 主体 */}
        <div className={css.review_container}>
          <div className={css.form_title}>中层干部<span> {year} </span>年度考核民主测评表</div>
          {/* 用户信息 */}
          {/*
            <div className={css.user_info_content}>
              <Row>
                <Col span={12}>
                  <p>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</p>
                  <p>出生年月：&nbsp;&nbsp;&nbsp;&nbsp;{date_of_birth}</p>
                  <p>文化程度：&nbsp;&nbsp;&nbsp;&nbsp;{degree_of_education}</p>
                  <p>部门及职务：{department_and_duty}</p>
                </Col>
                <Col span={12}>
                  <p>性别：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sex}</p>
                  <p>政治面貌：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{political_status}</p>
                  <p>任现职时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{starting_time_for_the_present_job}</p>
                  <p>从事或分管工作：{job}</p>
                </Col>
              </Row>
            </div>
          */}
          {/* 评审表格 */}
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <div className={css.form_cell}>
              <div className={css.form_cell_header}>
                思想道德情况
              </div>
              <div className={css.form_cell2_header}>
                <Row>
                  <Col span={12}>评价项目</Col>
                  <Col span={12}>评价意见（百分制）</Col>
                </Row>
              </div>
              <div className={css.form_cell_body}>
                {evaluation ? this.getFormCell(evaluation, THOUGHT) : null}
              </div>
            </div>
            <div className={css.form_cell}>
              <div className={css.form_cell_header}>
                履行岗位职责情况（主要根据岗位和年度工作任务确定）
              </div>
              <div className={css.form_cell2_header}>
                <Row>
                  <Col span={12}>评价项目</Col>
                  <Col span={12}>评价意见（百分制）</Col>
                </Row>
              </div>
              <div className={css.form_cell_body}>
                {evaluation ? this.getFormCell(evaluation, DUTIES) : null}
              </div>
            </div>
            <div className={css.form_cell}>
              <div className={css.form_cell_header}>
                廉洁自律情况
              </div>
              <div className={css.form_cell2_header}>
                <Row>
                  <Col span={12}>评价项目</Col>
                  <Col span={12}>评价意见（百分制）</Col>
                </Row>
              </div>
              <div className={css.form_cell_body}>
                {evaluation ? this.getFormCell(evaluation, UPRIGHT) : null}
              </div>
            </div>
            <div className={css.form_cell}>
              <div className={css.form_cell_header}>
                总体评价
              </div>
              <div className={css.form_cell_body}>
                <FormItem className={css.num_review}>
                  {getFieldDecorator('total_count', {
                    rules: [{ type: 'number', required: true, message: "请填写总体评价" }],
                    initialValue: total_count
                  })(
                    <InputNumber min={0} max={99} disabled={complete} />
                    )}<span>分</span>
                </FormItem>
              </div>
            </div>
            <div className={css.submit_btn}>
              <FormItem>
                <Button type="primary" htmlType="submit">提交测评表</Button>
              </FormItem>
              <Link to="/assess?step=2">
                <Button type="ghost">返回待测评列表</Button>
              </Link>
              <br /><br />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

Review = Form.create({})(Review);

export default withRouter(Review);
