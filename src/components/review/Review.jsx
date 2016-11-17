import React, { Component } from 'react';
import css from './Review.less';
import Agent from 'superagent';
import { Row, Col, Form, InputNumber, Button } from 'antd';
import { UserInfo } from '../assess/UserInfo';

const FormItem = Form.Item;
const ideology = ['思想政治态度','道德作风品行','团结协调合作']
const honest = ['廉洁从政','执行党风廉政建设责任制']
const duty = ['带领团队绩效', '带领团队开展专业建设效果', '带领团队实训室建设效果', '带领团队教学资源建设效果', '带领团队学生工作是建设效果', '带领团队学生培养效果']

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    Agent
      .get(`http://114.55.172.35:3232/user_info`)
      .set('Accept','application')
      .set('X-User-Token', sessionStorage.token)
      .set('X-User-Jobnum', sessionStorage.number)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({user: res.body});
        } else {
          console.log("获取用户信息失败");
        }
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  getFormCell(name, length){
    let cells = [];
    for (let i = 0; i < length; i++) {
      let label = '';
      if (name==='honest'){
        label = honest[i];
      }else if (name==='ideology'){
        label = ideology[i];
      }else{
        label = duty[i];
      }

      cells.push(<Row key={i} className={i%2 == 0?css.form_input_cell:css.form_input2_cell}>
        <Col span={12} className={css.form_label}>
          {label}
        </Col>
        <Col span={12} className={css.form_input}>
          <FormItem>
            {this.props.form.getFieldDecorator(`${name}${i}`, { initialValue: 0 })(
              <InputNumber min={0} max={100} />
            )}
          </FormItem>
        </Col>
      </Row>)
    }
    return cells;
  }

  render() {
    const {
      name, 
      sex, 
      date_of_birth, 
      political_status, 
      degree_of_education, 
      starting_time_for_the_present_job, 
      department_and_duty, 
      job
    } = this.state.user;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* 主体 */}
        <div className={css.review_container}>
          <div className={css.form_title}>中层干部<span>2015</span>年度考核民主测评表</div>
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
                {this.getFormCell('ideology' ,ideology.length)}
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
                {this.getFormCell('duty', duty.length)}
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
                {this.getFormCell('honest', honest.length)}
              </div>
            </div>
            <div className={css.form_cell}>
              <div className={css.form_cell_header}>
                总体评价
              </div>
              <div className={css.form_cell_body}>
                <FormItem className={css.num_review}>
                  {getFieldDecorator('num_point', { initialValue: 0 })(
                    <InputNumber min={0} max={100} />
                  )}<span>分</span>
                </FormItem>
              </div>
            </div>
            <div className={css.submit_btn}>
              <FormItem>
                <Button type="primary" htmlType="submit">提交测评表</Button>
              </FormItem>
            </div>
          </Form>
        </div>

      </div>
    );
  }
}

Review = Form.create({})(Review);

export default Review