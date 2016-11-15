{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent';
import { Row, Col, Modal, Form, Button, Input, Icon, DatePicker, Select } from 'antd';
import styles from './ListModal.less';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class ListModal extends Component {
  static defaultProps = {
      onChange: new Function
  }

  static PropTypes = {
      onChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  getYearString(){
    var options = []
    var date = new Date()
    var year = date.getFullYear()-1
    for (var i=0; i<=20;i++) {
      var val = year+i
      options.push(<Option key={val} value={`${val}`}>{val}</Option>)
    }
    return options
  }

  handleOk(e) {
    this.setState({ loading: true });

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);

    var visible = this.state.visible
    this.setState({visible}, ()=> this.props.onChange(visible));
  }

  handleCancel() {
    var visible = this.state.visible
    this.setState({visible}, ()=> this.props.onChange(visible));
  }

  // 创建考核
  pushAppoint(){
    
  }

  //更新考核
  putAppoint(){
     
  }

  render() {
    const title = []
    title.push(
      this.props.record.id?<div key={1} className={styles.modal_title}>编辑考核</div>:<div key={1} className={styles.modal_title}>新建考核</div>
    )

    const options = []
    var date = new Date()
    var year = date.getFullYear()-5
    for (var i=0; i<=20;i++) {
      var val = year+i
      options.push(<Option key={val} value={`${val}`}>{val}</Option>)
    }

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    return (
      <div className={styles.link_btn}>
        <Modal
            width="36vw"
            style={{ top: 100 }}
            visible={this.props.visible}
            title={title}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            footer={[]}
          >
          <Form horizontal onSubmit={this.handleOk.bind(this)}>
            <Row className={styles.modal_content}>
              <FormItem className={styles.form_item} labelCol={{ span: 5 }} help label="考核年度" {...formItemLayout}>
                {getFieldDecorator("time_line_year")(
                  <Select style={{ width: 200 }} placeholder="请选择年份" 
                    onChange={this.handleChange}
                    notFoundContent=""
                  >
                    {options}
                  </Select>
                )}
              </FormItem>
              <FormItem label="上传登记表时间" labelCol={{ span: 5 }} help className={styles.form_item} {...formItemLayout}>
                {getFieldDecorator("time_line_one")(
                  <RangePicker format="MM.DD" onChange={this.onChange} />
                )}
              </FormItem>
              <FormItem label="在线考核时间" labelCol={{ span: 5 }} help className={styles.form_item} {...formItemLayout}>
                {getFieldDecorator("time_line_two")(
                  <RangePicker format="MM.DD" onChange={this.onChange} />
                )}
              </FormItem>
              <FormItem label="考核统计时间" labelCol={{ span: 5 }} help className={styles.form_item} {...formItemLayout}>
                {getFieldDecorator("time_line_three")(
                  <RangePicker format="MM.DD" onChange={this.onChange} />
                )}
              </FormItem>
              <FormItem className={styles.form_submit}>
                <Button type="primary" htmlType="submit" size="large" loading={this.state.loading} >
                  提交
                </Button>
              </FormItem>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

ListModal = Form.create({})(ListModal);

export default ListModal;