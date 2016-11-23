{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent';
import { Row, Col, Modal, Form, Button, Input, Icon, DatePicker, Select } from 'antd';
import styles from './ListModal.less';
import moment from 'moment';

const { string, number, shape, arrayOf, func } = PropTypes;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class ListModal extends Component {
  state = {
    loading: false
  }

  /**
   * 修改时间段
   */
  onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

  /**
   * 考核年度改变
   */
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  getYearString(){
    let options = [];
    let date = new Date();
    let year = date.getFullYear() - 1;
    for (let i=0; i<=20;i++) {
      let val = year+i
      options.push(<Option key={val} value={`${val}`}>{val}</Option>)
    }
    return options;
  }

  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
  }

  /**
   * 提交表单
   */
  handleOk(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        console.log('Received values of form: ', values);
        this.processActivity(values);
      }
    });
  }

  /**
   * 更新或创建考核活动
   */
  processActivity(fromData) {
    let {time_line_year, first_range, second_range, third_range} = fromData;
    let method = this.props.activity.id ? 'put' : 'post';
    let id = this.props.activity.id ? this.props.activity.id : '';
    let format = "YYYY-MM-DD";

    SuperAgent(method, `http://114.55.172.35:3232/admin/activities/${id}`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .send({
        activity: {
          activity_year: time_line_year,
          first_phase_begin: moment(first_range[0], format),
          first_phase_end: moment(first_range[1], format),
          second_phase_begin: moment(second_range[0], format),
          second_phase_end: moment(second_range[1], format),
          third_phase_begin: moment(third_range[0], format),
          third_phase_end: moment(third_range[1], format)
        }
      })
      .end( (err, res) => {
        if (!err || err === null) {
          if (res.body.error) {
            alert(res.body.error);
          } 
          console.log("创建或更新考核活动情况：");
          console.dir(res.body);
          this.props.hideModal();
          this.props.refreshData();
          this.setState({ loading: false });
        } else {
          console.log("创建或更新考核活动失败");
        }
      })
  }

  render() {
    const title = [];
    title.push(
      this.props.activity.id ? 
        <div key={1} className={styles.modal_title}>编辑考核</div> : 
        <div key={1} className={styles.modal_title}>新建考核</div>
    );

    let options = [];
    let date = new Date();
    let _year = date.getFullYear() - 5;
    for (let i=0; i<=20;i++) {
      let val = _year + i;
      options.push(<Option key={val} value={`${val}`}>{val}</Option>)
    }

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    
    // 表单默认值
    let {id, year, first_begin, first_end, second_begin, second_end, third_begin, third_end} = this.props.activity;
    let first_range = '';
    let second_range = '';
    let third_range = '';
    let year_value = '';

    if (id) {
      year_value = year+"";
      first_range = [moment(first_begin, "YYYY-MM-DD"), moment(first_end, "YYYY-MM-DD")];
      second_range = [moment(second_begin, "YYYY-MM-DD"), moment(second_end, "YYYY-MM-DD")];
      third_range = [moment(third_begin, "YYYY-MM-DD"), moment(third_end, "YYYY-MM-DD")];
    } 

    return (
      <div className={styles.link_btn}>
        <Modal
            width="36vw"
            style={{ top: 100 }}
            visible={this.props.visible}
            onCancel={this.handleCancel.bind(this)}
            title={title}
            footer={false}>
            <Form horizontal onSubmit={this.handleOk.bind(this)}>
              <Row className={styles.modal_content}>
                <FormItem className={styles.form_item} labelCol={{ span: 5 }} help label="考核年度" {...formItemLayout}>
                  {getFieldDecorator("time_line_year", {
                    initialValue: year_value,
                    rules: [{ type: 'string', required: true, message: '请选择考核年度' }]
                  })(
                    <Select style={{ width: 200 }} 
                      placeholder="请选择年份" 
                      onChange={this.handleChange}
                      notFoundContent="请选择考核年度">
                      {options}
                    </Select>
                  )}
                </FormItem>
                <FormItem label="上传登记表时间" labelCol={{ span: 5 }} help className={styles.form_item} {...formItemLayout}>
                  {getFieldDecorator("first_range", {
                    initialValue: first_range,
                    rules: [{ type: 'array', required: true, message: '请选择上传登记表时间' }]
                  })(
                    <RangePicker format="YYYY-MM-DD" onChange={this.onChange} />
                  )}
                </FormItem>
                <FormItem label="在线考核时间" labelCol={{ span: 5 }} help className={styles.form_item} {...formItemLayout}>
                  {getFieldDecorator("second_range", {
                    initialValue: second_range,
                    rules: [{ type: 'array', required: true, message: '请选择上传登记表时间' }]
                  })(
                    <RangePicker format="YYYY-MM-DD" onChange={this.onChange} />
                  )}
                </FormItem>
                <FormItem label="考核统计时间" labelCol={{ span: 5 }} help className={styles.form_item} {...formItemLayout}>
                  {getFieldDecorator("third_range", {
                    initialValue: third_range,
                    rules: [{ type: 'array', required: true, message: '请选择上传登记表时间' }]
                  })(
                    <RangePicker format="YYYY-MM-DD" onChange={this.onChange} />
                  )}
                </FormItem>
                <FormItem className={styles.form_submit}>
                  <Button type="primary" htmlType="submit" size="large" loading={this.state.loading} >
                    { this.state.loading ? "正在提交..." : "提交" }
                  </Button>
                </FormItem>
              </Row>
            </Form>
        </Modal>
      </div>
    );
  }
}

ListModal.defaultProps = {
  activity: {},
  hideModal: new Function,
  refreshData: new Function
}

ListModal.propTypes = {
  activity: shape({
    id: number,
    first_begin: string, 
    first_end: string,
    second_begin: string,
    second_end: string,
    third_begin: string,
    third_end: string
  }),
  hideModal: func,
  refreshData: func
}

ListModal = Form.create({})(ListModal);

export default ListModal;