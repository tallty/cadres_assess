// 通用TestSet组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './TestSet.less'
import ListModal from './ListModal';
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon, Button, Table, Modal } from 'antd'
import moment from 'moment';

const confirm = Modal.confirm;
const ButtonGroup = Button.Group;

class TestSet extends Component {
  state = {
    visible: false,
    record: {},
    activities: []
  }

  componentWillMount() {
    this.getActivities();
  }

  getActivities(){
    SuperAgent
      .get("http://114.55.172.35:3232/admin/activities?page=1&per_page=1000")
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end( (err, res) => {
        if (!err || err === null) {
          console.log("获取所有考核活动成功");
          console.dir(res.body);
          this.setState({ activities: this.setDataSource(res.body.activities)});
        } else {
          console.log("获取所有考核活动失败");
        }
      })
  }

  // 整理数据源
  setDataSource(activities) {
    let array = [];
    for(let activity of activities) {
      let first_begin = moment(activity.first_phase_begin).format('YYYY-MM-DD');
      let first_end = moment(activity.first_phase_end).format('YYYY-MM-DD');
      let second_begin = moment(activity.second_phase_begin).format('YYYY-MM-DD');
      let second_end = moment(activity.second_phase_end).format('YYYY-MM-DD');
      let third_begin = moment(activity.third_phase_begin).format('YYYY-MM-DD');
      let third_end = moment(activity.third_phase_end).format('YYYY-MM-DD');

      let _cache = {
        id: activity.id,
        year: activity.activity_created_year,
        first_begin: first_begin,
        first_end: first_end,
        second_begin: second_begin,
        second_end: second_end,
        third_begin: third_begin,
        third_end: third_end,
        column_first: `${first_begin} ~ ${first_end}`,
        column_second: `${second_begin} ~ ${second_end}`,
        column_third: `${third_begin} ~ ${third_end}`
      };
      array.push(_cache);
    }
    console.log("整理的数据源");
    console.dir(array);
    return array;
  }

  /**
   * 表格改变事件
   */
  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  /**
   * 表格条目点击
   */
  detail_cell(record, index){
    
  }

  /**
   * 删除确认
   */
  deleteConfirm(that, activity) {
    confirm({
      title: '确定删除该考核活动吗?',
      content: '删除后不可以恢复，请谨慎操作。',
      onOk() {
        console.log("开始删除");
        that.deleteActivity(activity);
      },
      onCancel() {
        console.log("取消删除");
      },
    });
  }

  /**
   * 调用接口，删除考核
   */
  deleteActivity(activity) {
    console.dir(activity);
  }

  getColumns(){
    const columns = [{
      title: '考核年度',
      dataIndex: 'year',
      sorter: (a, b) => a.year - b.year,
    }, {
      title: '上传登记表时间',
      dataIndex: 'column_first',
    }, {
      title: '在线考核时间',
      dataIndex: 'column_second',
    }, {
      title: '分数统计时间',
      dataIndex: 'column_third',
    },{
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => this.change_icon(record)
    }];
    return columns;
  }

  /**
   * 自定义操作列
   */
  change_icon(record){
    const change_icon = []
    change_icon.push(
      <div key='icon' className={css.icon_content}>
        <ButtonGroup>
          <Button type="primary" icon="edit" onClick={this.showModal.bind(this, record)}/>
          <Button type="primary" icon="delete" onClick={this.deleteConfirm.bind(this, this, record)} />
        </ButtonGroup>
      </div>
    )
    return change_icon
  }

  /**
   * 新建、编辑模态框
   */
  showModal(record) {
    console.log(record);
    this.setState({
      visible: true,
      record: record
    });
  }

  handleModalVisible(){
    console.log("清楚了");
    this.setState({
      visible: false
    });
  }

  render() {
    const { activities } = this.state;

    return (
      <Admin>
        <div className={css.table_content}>
          <Button onClick={this.showModal.bind(this, {})} type="primary" icon="plus">新建考核</Button>

          <Table columns={this.getColumns()} 
                 bordered 
                 dataSource={activities} 
                 onRowClick={this.detail_cell.bind(this)} 
                 pagination={false} 
                 onChange={this.onChange} />

          <ListModal visible={this.state.visible} 
                     activity={this.state.record}
                     hideModal={this.handleModalVisible.bind(this)}
                     refreshData={this.getActivities.bind(this)} />
        </div>
      </Admin>
    )
  }
}

export default TestSet