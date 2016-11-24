// 通用Statistics组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './Statistics.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import { Icon, Table, Spin, Message, Button, Modal, Form, Select } from 'antd'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class Statistics extends Component {
  state = {
    year: '',
    loading: true,
    data: [],
    order_columns: [],
    filters: [],
    visible: false,
    logic_record: {},
    logic_index: null,
    modal_loading: false
  };
  columns = [{
      title: '序号',
      dataIndex: 'index',
    }, {
      title: '干部姓名',
      dataIndex: 'name',
    }, {
      title: '领导评分',
      dataIndex: 'average_score_for_leader',
      sorter: (a, b) => a.average_score_for_leader - b.average_score_for_leader,
    }, {
      title: '中层互评',
      dataIndex: 'average_score_for_middle_manager',
      sorter: (a, b) => a.average_score_for_middle_manager - b.average_score_for_middle_manager,
    }, {
      title: '员工评分',
      dataIndex: 'average_score_for_staff',
      sorter: (a, b) => a.average_score_for_staff - b.average_score_for_staff,
    }, {
      title: '总分',
      dataIndex: 'average_score_for_all',
      sorter: (a, b) => a.average_score_for_all - b.average_score_for_all,
    },{
      title: '等级',
      dataIndex: 'final_result',
    },{
      title: '操作',
      dataIndex: '',
      render: (text, record, index) => this.adminEvaluate(record, index)
  }];

  componentWillMount() {
    var year = this.props.location.query.year
    this.getData(year);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({loading: true})
  //   var year = this.getQueryString("year")
  //   this.getData(year);
  // }
  
  adminEvaluate(record, index) {
    return (
      <ButtonGroup>
        <Button type="primary" onClick={this.showModal.bind(this, record, index)}>评鉴</Button>
        <Button type="primary" onClick={this.detail_cell.bind(this, record)}>详情</Button>
      </ButtonGroup>
    );
  }

  showModal(record, index) {
    this.setState({ 
      visible: true,
      logic_record: record,
      logic_index: index
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
      logic_record: {},
      logic_index: null
    });
  }

  handleSubmit(e) {
    this.setState({modal_loading: true});
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        SuperAgent
          .patch(`http://114.55.172.35:3232//admin/results/${this.state.logic_record.id}/set_final_result`)
          .set('Accept', 'application/json')
          .set('X-Admin-Token', sessionStorage.admin_token)
          .set('X-Admin-Email', sessionStorage.admin_email)
          .field('result[final_result]', values.level)
          .end( (err, res) => {
            if (!err || err === null) {
              let {data, logic_index} = this.state;
              let item = data[logic_index];
              item.final_result = values.level;
              console.log(data);
              this.setState({data: data, modal_loading: false, visible: false});
            } else {
              Message.error("评鉴失败，请重试");
            }
          })
      }
    });
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  detail_cell(record){
    this.props.router.replace(`/statistics_d?year=${this.props.location.query.year}&id=${record.id}`)
  }

  getData(year){
    const url = `http://114.55.172.35:3232/admin/results?activity_year=${year}`;
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end( (err, res) => {
        if (!err || err === null) {
          let data = this.formatData(res.body.table);
          console.log(data);
          this.setState({data: data, loading: false});
        } else {
          Message.error("获取统计数据失败");
        }
      })
  }

  formatData(data) {
    data.forEach((item, index, obj) => {
      item.index = index + 1;
    })
    return data;
  }

  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const url = `http://114.55.172.35:3232/admin/output_result_index?activity_year=${this.props.location.query.year}`;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Admin>
        <div className={css.table_content}>
          <div className={css.table_title}><span>{this.props.location.query.year}</span>考核统计结果列表</div>
          <div><a href={url}><Button type="primary" icon="download" >下载总表</Button></a></div>
          <br/>
          <Table columns={this.columns} 
            bordered 
            dataSource={this.state.data} 
            loading={this.state.loading}
            pagination={{pageSize: 9}} 
            onChange={this.onChange} />

          <Modal title="考核人员等级评鉴" visible={this.state.visible}
                 onCancel={this.handleCancel.bind(this)}
                 footer={false}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem {...formItemLayout} label="评鉴等级">
                {getFieldDecorator('level', {
                  rules: [{ required: true, message: '请输入评鉴等级！' }],
                })(
                  <Select multiple={false} placeholder="请选择评鉴等级">
                    <Option value="优秀">优秀</Option>
                    <Option value="称职">称职</Option>
                    <Option value="基本称职">基本称职</Option>
                    <Option value="不称职">不称职</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem style={{textAlign: 'center'}}>
                <Button type="primary" loading={this.state.modal_loading} htmlType="submit">确认</Button>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </Admin>
    )
  }
}

Statistics = Form.create()(Statistics);
export default withRouter(Statistics)