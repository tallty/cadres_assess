/**
 * 手机端 - 打分页面
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import css from './mobile_evaluation_list.less';
import { Icon, Card, Form, Button, Slider, Message } from 'antd';
import Spiner from '../common/Spiner';
import Agent from 'superagent';

const FormItem = Form.Item;
const DUTIES = 'duties';
const THOUGHT = 'thought_morals';
const UPRIGHT = 'upright_incorruptiable';
var formData = [];

class MobileEvaluate extends Component {
	state = {
    evaluation: null,
    complete: false
	}

	componentDidMount() {
		this.getEvaluation();
	}

	/**
   * 获取评价详情
   */
  getEvaluation() {
    let id = this.props.location.query.id;
    Agent
      .get(`http://114.55.172.35:3232/evaluations/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.token)
      .set('X-User-Jobnum', localStorage.number)
      .end((err, res) => {
        if (!err || err === null) {
          console.log("获取要评价的人员成功");
          this.setState({ 
            evaluation: res.body,
            complete: res.body.already_edited
          });
        } else {
          this.setState({ evaluation: {}});
          Message.error("获取评价人员信息失败");
        }
      })
  }

	handleBack() {
		localStorage.removeItem('evaluate_user');
		this.props.router.replace('/mobile_evaluation_list')
	}

	handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let type = localStorage.getItem('user_type');
      if (!err || err === null) {
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
    let id = this.state.evaluation.id;
    let thought_morals_str = this.formatApiString(params, THOUGHT);
    let duties_str = this.formatApiString(params, DUTIES);
    let upright_incorruptiable_str = this.formatApiString(params, UPRIGHT);

    Agent
      .put(`http://114.55.172.35:3232/evaluations/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.token)
      .set('X-User-Jobnum', localStorage.number)
      .send({evaluation: {
        thought_morals: thought_morals_str,
        duties: duties_str,
        upright_incorruptiable: upright_incorruptiable_str,
        evaluation_totality: params.total_count,
      }})
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ evaluation: res.body, complete: true });
          Message.success("提交测评成功");
        } else {
          Message.error("提交测评失败");
        }
      })
  }

  /**
   * 整理数据
   * 根据tag找到需要的key, 输出成对应的字符串
   */
  formatApiString(params, kind) {
    let str = '';
    formData.forEach((item, i, obj) => {
      if (item.kind === kind) {
        str += `${item.key},${params[item.key]};`
      }
    });
    return str;
  }

  /**
   * 领导打分
   */
  leaderEvalution(params) {
    Agent
      .put(`http://114.55.172.35:3232/evaluations/${this.state.evaluation.id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.token)
      .set('X-User-Jobnum', localStorage.number)
      .send({evaluation: {
        evaluation_totality: params.total_count,
      }})
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ evaluation: res.body, complete: true });
          Message.success("提交测评成功");
        } else {
          Message.error("提交测评失败");
        }
      })
  }

  getFormCell(evaluation, key){
    let array = evaluation.content[key];
    let cells = [];
    array.forEach((item, i, obj) => {
      let value = parseInt(item[1]) === -1 ? null : parseInt(item[1]);
      let required = localStorage.getItem('user_type') !== 'leader';
      // 本页表单的key为动态指定，需保存表单的 key， value, 以便提交表单时， 根据key来获取value
      let cache = { kind: key, key: item[0] };
      formData.push(cache);
      // 表单列表
      cells.push(
      	<FormItem key={i}>
      		<p className={css.input_label}>{item[0]}</p>
          {this.props.form.getFieldDecorator(`${item[0]}`, { 
            rules: [{ type: 'number', required: required, message: "请填写评分项" }],
            initialValue: value 
          })(
            <Slider disabled={this.state.complete} max={99} min={0}/>
          )}
        </FormItem>
      );
    })
    return cells;
  }

	render() {
		const { getFieldDecorator } = this.props.form;
		const { evaluation, complete } = this.state;
		formData = [];
		// 总分表单的初始化
    let total_count = evaluation ? evaluation.content.evaluation_totality : null;
    total_count = parseInt(total_count) === -1 ? null : parseInt(total_count);

		return (
			<div className={css.container}>
				<div className={css.toolbar}>
					<div className={css.logout} onClick={this.handleBack.bind(this)}>
						<Icon type="arrow-left" />
					</div>
					<div className={css.title}>开始打分</div>
				</div>

				<div className={css.tips}>提示：本次考核打分为<span>百分制</span></div>

				<div className={css.form_container}>
					{
						evaluation ? 
						<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
							<Card className={css.card} title="思想道德情况">
						    {evaluation ? this.getFormCell(evaluation, THOUGHT) : null}
						  </Card>
						  <Card className={css.card} title="履行岗位职责情况（主要根据岗位和年度工作任务确定）">
						    { evaluation ? this.getFormCell(evaluation, DUTIES) : null }
						  </Card>
						  <Card className={css.card} title="廉洁自律情况">
						    {evaluation ? this.getFormCell(evaluation, UPRIGHT) : null}
						  </Card>
						  <Card className={css.card} title="总体评价">
						    <FormItem className={css.num_review}>
		              {getFieldDecorator('total_count', { 
		                rules: [{ type: 'number', required: true, message: "请填写总体评价" }],
		                initialValue: total_count 
		              })(
		                <Slider disabled={complete} max={99} min={0}/>
		              )}
		            </FormItem>
						  </Card>
						  <div className={css.submit_btn}>
						  {
						  	complete ?
							  	<Button type="primary" disabled>已提交</Button> :
							  	<Button type="primary" htmlType="submit">提交测评表</Button>
						  }
						  </div>
		        </Form> : <Spiner/>
					}
				</div>
			</div>
		);
	}
}
MobileEvaluate = Form.create({})(MobileEvaluate);
export default withRouter(MobileEvaluate);