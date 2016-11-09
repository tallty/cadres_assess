{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent';
import { Row, Col, Modal, Form, Button, Input, Icon, } from 'antd';
import styles from './ListModal.less';

const FormItem = Form.Item;

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

  handleOk(e) {
    this.setState({ loading: true });

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
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    return (
      <div className={styles.link_btn}>
        <Form horizontal >
          <Modal
            width="36vw"
            style={{ top: 100 }}
            visible={this.props.visible}
            title={title}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            footer={[<FormItem key={-1}>
              <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                提交
              </Button></FormItem>,
            ]}
          >
            <Row className={styles.modal_content}>
              <Col span={24}>
                <FormItem className={styles.form_item} label="考核年度" {...formItemLayout} id="control-input2">
                {getFieldDecorator('price', {
                  initialValue: this.props.record?this.props.record.price:''
                }) (
                  <Input span={18} id="control-input2" className={styles.email_input} />
                )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem className={styles.form_item} label="上传登记表时间" {...formItemLayout} id="control-input2">
                {getFieldDecorator('price', {
                  initialValue: this.props.record?this.props.record.price:''
                }) (
                  <Input span={18} id="control-input2" className={styles.email_input} />
                )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem className={styles.form_item} label="在线考核时间" {...formItemLayout} id="control-input2">
                {getFieldDecorator('price', {
                  initialValue: this.props.record?this.props.record.price:''
                }) (
                  <Input span={18} id="control-input2" className={styles.email_input} />
                )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem className={styles.form_item} label="考核统计时间" {...formItemLayout} id="control-input2">
                {getFieldDecorator('price', {
                  initialValue: this.props.record?this.props.record.price:''
                }) (
                  <Input span={18} id="control-input2" className={styles.email_input} />
                )}
                </FormItem>
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}

ListModal = Form.create({})(ListModal);

export default ListModal;