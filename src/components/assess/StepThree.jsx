import React, { Component } from 'react';
import { Button } from 'antd';
import SuperAgent from 'superagent';
import css from './assess.less';

export class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      duty: '',
      self_evaluation: {},
      little_iterm: {},
      average_for_all_evaluation: {},
      average_for_each_role: {},
      statistics_result: {},
      set_by_admin: {},
      count_of_people: {}
    }
  }

  componentWillMount() {
    this.getData()
  }

  preview(id) {    
    var prnhtml = document.getElementById(id).innerHTML
    document.body.innerHTML=prnhtml;
    window.print();
  }

  getData(){
    var token = localStorage.token
    var phone = localStorage.phone
    var url = `http://114.55.172.35:3232/admin/results/${this.props.id}/feedback_form`
    SuperAgent.get(url)
              .set('Accept', 'application/json')
              .set('X-Admin-Token', sessionStorage.admin_token)
              .set('X-Admin-Email', sessionStorage.admin_email)
              .end( (err, res) => {
                if (res.ok) {
                  var self_evaluation = res.body.self_evaluation
                  var little_iterm = res.body.little_iterm
                  var average_for_all_evaluation = res.body.average_for_all_evaluation
                  var average_for_each_role = res.body.average_for_each_role
                  var statistics_result = res.body.statistics_result
                  var set_by_admin = res.body.set_by_admin
                  var count_of_people = res.body.count_of_people
                  var name = res.body.info.name
                  var duty = res.body.info.department_and_duty
                  //数据格式处理函数
                  this.setState({self_evaluation: self_evaluation, little_iterm: little_iterm, average_for_all_evaluation: average_for_all_evaluation , average_for_each_role: average_for_each_role , statistics_result: statistics_result , set_by_admin: set_by_admin , count_of_people: count_of_people , name: name, duty: duty})
                }
              })
  }

	render() {
		return (
			<div className={css.assess_three}>
        {/*-startprint-*/}
        <div id="print_table_one">
          <div className={css.print_table}>
            <h2 className={css.table_title}>上海电子信息职业技术学院<br/>中层干部2015年度考核结果反馈表</h2>
            <div className={css.table_cell_one}>
              <label>姓名:{this.state.name}</label><label>职务:{this.state.duty}</label>
              <Button className={css.print_btn_one} onClick={this.preview.bind(this, "print_table_one")} type="primary">打印表格</Button>
            </div>
            <div className={css.table_content}>
              <table>
                <tbody>
                  <tr className={css.table_tr_one}>
                    <td className={css.table_td_one} rowSpan={5}>评价项目要求</td>
                    <td className={css.table_td_three}>德</td>
                    <td className={css.table_td_two}>学习创新<br/>团结凝聚<br/>作风务实</td>
                    <td colSpan={4}></td>
                  </tr>
                  <tr>
                    <td className={css.table_td_three}>能</td>
                    <td className={css.table_td_two}>理论政策<br/>综合决策<br/>组织协调</td>
                    <td colSpan={4}></td>
                  </tr>
                  <tr className={css.table_tr_one}>
                    <td className={css.table_td_three}>勤</td>
                    <td className={css.table_td_two}>敬业勤勉<br/>开创局面<br/>注重实效</td>
                    <td colSpan={4}></td>
                  </tr>
                  <tr>
                    <td className={css.table_td_three}>绩</td>
                    <td className={css.table_td_two}>思路清晰<br/>措施有效<br/>引领作用</td>
                    <td colSpan={4}></td>
                  </tr>
                  <tr className={css.table_tr_one}>
                    <td className={css.table_td_three}>廉</td>
                    <td className={css.table_td_two}>廉洁奉公<br/>忠于职守<br/>艰苦奋斗</td>
                    <td colSpan={4}></td>
                  </tr>
                  <tr>
                    <td className={css.td_long} colSpan={3} rowSpan={2}><p>履行岗位职责情况</p><p className={css.sub_text}>（主要工作）每项不超过十五个字符</p></td>
                    <td colSpan={4}>自我评价意见</td>
                  </tr>
                  <tr className={css.tr_one}>
                    <td>优秀</td>
                    <td>称职</td>
                    <td>基本称职</td>
                    <td>不称职</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colSpan={2}>带领团队绩效</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td colSpan={2}>人才培养方案建设效果</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>开展专业建设效果</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td colSpan={2}>教学资源建设效果</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td colSpan={2}>教学资源建设效果</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td colSpan={3} rowSpan={2}>自我总体评价</td>
                    <td>优秀</td>
                    <td>称职</td>
                    <td>基本称职</td>
                    <td>不称职</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*-endprint-*/}
        <div id="print_table_two">
          <div className={css.print_table}>
            <div className={css.table_content}>
              <table>
                <tbody>
                  <tr>
                    <td className={css.persent_t} rowSpan={3}>中层干部<br/>整体评价<br/>（{this.state.little_iterm.sum_of_level_count}）</td>
                    <td>好</td>
                    <td>较好</td>
                    <td>一般</td>
                    <td>较差</td>
                    <td>空白</td>
                  </tr>
                  <tr>
                    <td>票数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比例％</td>
                  </tr>
                  <tr>
                    <td>{this.state.little_iterm.level_count_and_percentage.excellent_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.little_iterm.level_count_and_percentage.excellent_proportion}</td>
                    <td>{this.state.little_iterm.level_count_and_percentage.good_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.little_iterm.level_count_and_percentage.good_proportion}</td>
                    <td>{this.state.little_iterm.level_count_and_percentage.average_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.little_iterm.level_count_and_percentage.average_proportion}</td>
                    <td>{this.state.little_iterm.level_count_and_percentage.bad_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.little_iterm.level_count_and_percentage.bad_proportion}</td>
                    <td>{this.state.little_iterm.level_count_and_percentage.excellent_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.little_iterm.level_count_and_percentage.excellent_proportion}</td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>个人考核<br/>测评结果<br/>（{this.state.average_for_all_evaluation.sum_of_result_level_count}）</td>
                    <td>优 秀</td>
                    <td>称职</td>
                    <td>基本称职</td>
                    <td>不称职</td>
                    <td>空白</td>
                  </tr>
                  <tr>
                    <td>票数&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;比例％</td>
                    <td>票数&nbsp;&nbsp;&nbsp;比例％</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>考核等级</td>
                    <td>优 秀</td>
                    <td>称职</td>
                    <td>基本称职</td>
                    <td>不称职</td>
                    <td>空白</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className={css.row_height}>
                    <td colSpan={6}>
                      <p className={css.sign_name}>单位评鉴意见：</p>
                      <p></p>
                      <p className={css.sign_time}>时间：<label>年</label><span>月</span><span>日</span></p>
                    </td>
                  </tr>
                  <tr className={css.row_height}>
                    <td colSpan={6}>
                      <p className={css.sign_name}>本人已阅考核评价情况，并对评价结果表示：</p>
                      <p></p>
                      <p className={css.sign_time}><text>签名：</text>时间：<label>年</label><span>月</span><span>日</span></p>
                    </td>
                  </tr>
                  <tr className={css.row_height}>
                    <td colSpan={6}>
                      <p className={css.sign_name}>谈话反馈人：</p>
                      <p></p>
                      <p className={css.sign_time}><text>签名：</text>时间：<label>年</label><span>月</span><span>日</span></p>
                    </td>
                  </tr>
                  <tr className={css.row_height}>
                    <td colSpan={6}>
                      <p className={css.sign_name}>备注：</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;年度共有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名中层干部参加年度考核,共有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名同志参与民主测评。</p>
                      <p></p>
                      <p className={css.sign_time}>时间：<label>年</label><span>月</span><span>日</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div><span className={css.sign_name_school}>上海电子信息职业技术学院组织部</span></div>
            </div>
            <div className={css.btn_content}><Button className={css.print_btn_two} onClick={this.preview.bind(this, "print_table_two")} type="primary">打印表格</Button></div>
          </div>
        </div> 
      </div>
		);
	}
}