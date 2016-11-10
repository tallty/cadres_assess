import React, { Component } from 'react';
import { Button } from 'antd';
import css from './assess.less';

export class StepThree extends Component {

  preview(id) {    
    var prnhtml = document.getElementById(id).innerHTML
    document.body.innerHTML=prnhtml;
    window.print();
  }

	render() {
		return (
			<div className={css.assess_three}>
        {/*-startprint-*/}
        <div id="print_table_one">
          <div className={css.print_table}>
            <h2 className={css.table_title}>上海电子信息职业技术学院<br/>中层干部2015年度考核结果反馈表</h2>
            <div className={css.table_cell_one}>
              <label>姓名:胡国胜</label><label>职务:计算机应用系主任</label>
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
                    <td rowSpan={3}>中层干部<br/>整体评价<br/>（37069）</td>
                    <td>好</td>
                    <td>较好</td>
                    <td>一般</td>
                    <td>较差</td>
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
                    <td rowSpan={3}>个人考核<br/>测评结果<br/>（1435）</td>
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