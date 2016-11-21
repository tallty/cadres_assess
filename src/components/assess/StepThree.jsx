import React, { Component } from 'react';
import { Button, Icon } from 'antd';
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
      count_of_people: {},
      level_count_and_percentage: []
    }
  }

  componentWillMount() {
    this.getData()
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  preview(id) {    
    var prnhtml = document.getElementById(id).innerHTML
    document.body.innerHTML=prnhtml;
    window.print();
  }

  get_self_list(){
    const lists = []
    if (this.state.self_evaluation.self_evaluation_duties.length == 0) {
      lists.push(<tr key='blank'>
                  <td>&nbsp;</td>
                  <td colSpan={2}>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>)
      return lists
    }else{
      for (var i = 0; i < this.state.self_evaluation.self_evaluation_duties.length; i++) {
        lists.push(<tr key={-i}>
                    <td>{i+1}</td>
                    <td colSpan={2}>{this.state.self_evaluation.self_evaluation_duties[i][0]}</td>
                    <td>{this.state.self_evaluation.self_evaluation_duties[i][1] == "perfect" ?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{this.state.self_evaluation.self_evaluation_duties[i][1] == "good" ? <Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{this.state.self_evaluation.self_evaluation_duties[i][1] == "normal" ? <Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{this.state.self_evaluation.self_evaluation_duties[i][1] == "bad" ? <Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                  </tr>)
      }
      return lists
    }
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
                  console.log(res.body);
                  var self_evaluation = res.body.self_evaluation
                  var little_iterm = res.body.little_iterm
                  var level_count_and_percentage = res.body.little_iterm.level_count_and_percentage
                  var average_for_all_evaluation = res.body.average_for_all_evaluation
                  var average_for_each_role = res.body.average_for_each_role
                  var statistics_result = res.body.statistics_result
                  var set_by_admin = res.body.set_by_admin
                  var count_of_people = res.body.count_of_people
                  var name = res.body.info.name
                  var duty = res.body.info.department_and_duty
                  //数据格式处理函数
                  this.setState({self_evaluation: self_evaluation, little_iterm: little_iterm, average_for_all_evaluation: average_for_all_evaluation , average_for_each_role: average_for_each_role , statistics_result: statistics_result , set_by_admin: set_by_admin , count_of_people: count_of_people, level_count_and_percentage: level_count_and_percentage , name: name, duty: duty})
                }
              })
  }

	render() {
    const { self_evaluation, little_iterm, level_count_and_percentage, average_for_all_evaluation, average_for_each_role, statistics_result, set_by_admin, count_of_people, name, duty } = this.state;
    const present_true = this.state.level_count_and_percentage == undefined
    const present_true_one = this.state.average_for_all_evaluation.result_level_count_and_percentage == undefined
    console.log("------======-------");
    const set_year = set_by_admin.updated_at?new Date(set_by_admin.updated_at).getFullYear():''
    const set_month = set_by_admin.updated_at?new Date(set_by_admin.updated_at).getMonth():''
    const set_day = set_by_admin.updated_at?new Date(set_by_admin.updated_at).getDay():''
		return (
			<div className={css.assess_three}>
        {/*-startprint-*/}
        <div id="print_table_one">
          <div className={css.print_table}>
            <h2 className={css.table_title}>上海电子信息职业技术学院<br/>中层干部{this.getQueryString("year")}年度考核结果反馈表</h2>
            <div className={css.table_cell_one}>
              <label>姓名:{name}</label><label>职务:{duty}</label>
              <Button className={css.print_btn_one} onClick={this.preview.bind(this, "print_table_one")} type="primary">打印表格</Button>
            </div>
            <div className={css.table_content}>
              <table>
                <tbody>
                  <tr className={css.table_tr_one}>
                    <td className={css.table_td_one} rowSpan={5}>评价项目要求</td>
                    <td className={css.table_td_three}>德</td>
                    <td className={css.table_td_two}>学习创新<br/>团结凝聚<br/>作风务实</td>
                    <td colSpan={4}>自觉学习政治理论、专业知识和先进的办学理念；<br/> 
                                    班子团结进取、有感召力，营造团结和谐的工作氛围；<br/>
                                    顾全大局，克服困难，勇于承担责任，主动参与学院改革；<br/>
                                    关心群众思想、生活，勇于解决问题。</td>
                  </tr>
                  <tr>
                    <td className={css.table_td_three}>能</td>
                    <td className={css.table_td_two}>理论政策<br/>综合决策<br/>组织协调</td>
                    <td colSpan={4}>具备履职要求的业务、文化、技术和管理水平;<br/>  
                                    善于结合自身工作创新工作思路和方法，有效组织本部门教职工开展各项工作；<br/>  
                                    加强部门之间沟通与协调。</td>
                  </tr>
                  <tr className={css.table_tr_one}>
                    <td className={css.table_td_three}>勤</td>
                    <td className={css.table_td_two}>敬业勤勉<br/>开创局面<br/>注重实效</td>
                    <td colSpan={4}>对工作有事业心、责任心，勤奋投入，讲真话、办实事、求实效；<br/>  
                                    执行政策和上级决定有力度、有方法、有效果；<br/>  
                                    积极进取、甘于奉献，为教职工办实事。</td>
                  </tr>
                  <tr>
                    <td className={css.table_td_three}>绩</td>
                    <td className={css.table_td_two}>思路清晰<br/>措施有效<br/>引领作用</td>
                    <td colSpan={4}>按目标任务和履职要求，注重数量、质量和效益；<br/> 
                                    发挥领导职能作用。</td>
                  </tr>
                  <tr className={css.table_tr_one}>
                    <td className={css.table_td_three}>廉</td>
                    <td className={css.table_td_two}>廉洁奉公<br/>忠于职守<br/>艰苦奋斗</td>
                    <td colSpan={4}>遵守政治纪律、组织纪律和经济纪律;<br/>  
                                    勤政廉政、率先垂范。</td>
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
                  {self_evaluation.self_evaluation_duties == undefined ? <tr></tr>:this.get_self_list()}
                  <tr>
                    <td colSpan={3} rowSpan={2}>自我总体评价</td>
                    <td>优秀</td>
                    <td>称职</td>
                    <td>基本称职</td>
                    <td>不称职</td>
                  </tr>
                  <tr>
                    <td>{self_evaluation.self_evaluation_totality == "perfect"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{self_evaluation.self_evaluation_totality == "good"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{self_evaluation.self_evaluation_totality == "normal"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{self_evaluation.self_evaluation_totality == "bad"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
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
                  <tr className={css.tr_one}>
                    <td className={css.persent_t} rowSpan={3}>中层干部<br/>整体评价<br/>（{little_iterm.sum_of_level_count}）</td>
                    <td>&nbsp;好&nbsp;</td>
                    <td>较好</td>
                    <td>&nbsp;&nbsp;一般&nbsp;&nbsp;</td>
                    <td>较差</td>
                  </tr>
                  <tr>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                  </tr>
                  <tr>
                    <td><span className={css.persent_span}>{present_true ? '':level_count_and_percentage['excellent-count']}</span><span>{present_true ? '':level_count_and_percentage['excellent-proportion']}</span></td>
                    <td><span className={css.persent_span}>{present_true ? '':level_count_and_percentage['good-count']}</span><span>{present_true ? '':level_count_and_percentage['good-proportion']}</span></td>
                    <td><span className={css.persent_span}>{present_true ? '':level_count_and_percentage['average-count']}</span><span>{present_true ? '':level_count_and_percentage['average-proportion']}</span></td>
                    <td><span className={css.persent_span}>{present_true ? '':level_count_and_percentage['bad-count']}</span><span>{present_true ? '':level_count_and_percentage['bad-proportion']}</span></td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>个人考核<br/>测评结果<br/>（{average_for_all_evaluation.sum_of_result_level_count}）</td>
                    <td>优 秀</td>
                    <td>称职</td>
                    <td>基本称职</td>
                    <td>不称职</td>
                  </tr>
                  <tr>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                    <td><span className={css.persent_span}>票数</span><span className={css.persent_span_p}>比例％</span></td>
                  </tr>
                  <tr>
                    <td><span className={css.persent_span}>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['excellent-count']}</span><span>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['excellent-proportion']}</span></td>
                    <td><span className={css.persent_span}>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['good-count']}</span><span>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['good-proportion']}</span></td>
                    <td><span className={css.persent_span}>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['average-count']}</span><span>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['average-proportion']}</span></td>
                    <td><span className={css.persent_span}>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['bad-count']}</span><span>{present_true_one ? '':average_for_all_evaluation.result_level_count_and_percentage['bad-proportion']}</span></td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>考核等级</td>
                    <td>优 秀</td>
                    <td>称职</td>
                    <td>基本称职</td>
                    <td>不称职</td>
                  </tr>
                  <tr>
                    <td>{self_evaluation.self_evaluation_totality == "perfect"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{self_evaluation.self_evaluation_totality == "good"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{self_evaluation.self_evaluation_totality == "normal"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                    <td>{self_evaluation.self_evaluation_totality == "bad"?<Icon className={css.check_icon} type="check" />:<span>&nbsp;</span>}</td>
                  </tr>
                  <tr className={css.row_height}>
                    <td colSpan={6}>
                      <p className={css.sign_name}>单位评鉴意见：</p>
                      <p className={css.set_by_admin}>{set_by_admin.final_result}</p>
                      <p className={css.sign_time}>时间：<label>{set_year}年</label><span>{set_month}月</span><span>{set_day}日</span></p>
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
                      <p><span className={css.count_people}>{this.getQueryString("year")}</span>年度共有<span className={css.count_people}>{count_of_people.count_of_middle_manager}</span>名中层干部参加年度考核,共有<span className={css.count_people}>{count_of_people.count_of_all_user}</span>名同志参与民主测评。</p>
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