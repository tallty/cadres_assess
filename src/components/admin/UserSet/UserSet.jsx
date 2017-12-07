// 通用UserSet组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './UserSet.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon, Button, Spin, Alert, Form, Select, Modal } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

class UserSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "",
      year: ""
    }
  }

  handleChange(info) {
    let activity_year = this.state.year;
    if (activity_year) {
      this.setState({ loading: "loading" });
      this.pushData(info.target.files[0], activity_year);
    } else {
      Modal.error({
        title: '错误',
        content: '上传考核名单总表之前，你需要先选择该考核表的年份。',
      });
    }
  }

  channgeYear(value) {
    console.log(value);
    this.setState({ year: value })
  }

  onClose(e) {
    this.setState({ loading: "" })
  }

  pushData(file, activity_year) {
    var token = localStorage.token
    var phone = localStorage.phone
    var url = `http://stiei-api.tallty.com/admin/upload_user_list`
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .set('Cache-control', 'no-cache')
      .field('file', file)
      .field('activity_year', activity_year)
      .end((err, res) => {
        if (!err || err === null) {
          if (res.body.error) {
            this.setState({ loading: "error" })
          } else {
            this.setState({ loading: "success" })
          }
        } else {
          this.setState({ loading: "error" })
        }
      })
  }

  showMseeage() {
    const alert = [];
    if (this.state.loading == "success") {
      alert.push(<Alert
        key="success"
        message="文件上传成功！"
        description="名单总表已上传成功，点击右上角图标可关闭提示框."
        type="success"
        closable
        onClose={this.onClose.bind(this)}
        showIcon
      />)
      return alert
    } else if (this.state.loading == "loading") {
      alert.push(<div key="loading" className={css.progress}>
        <Spin tip="文件上传中..." size="large" />
      </div>)
      return alert
    } else if (this.state.loading == "error") {
      alert.push(<Alert
        key="error"
        message="文件上传失败！"
        description="名单总表已上传失败，请检查信息表格式，并点击右上角图标关闭提示框，重新上传。"
        type="error"
        closable
        onClose={this.onClose.bind(this)}
        showIcon
      />)
      return alert
    } else {
      alert.push(<Alert
        key="state4"
        message="提示信息！"
        description="*请导入格式为.xlsx的列表文件，并按照模板文件排版表格。"
        type="info"
        showIcon
      />)
      return alert;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const url = `http://stiei-api.tallty.com/admin/load_user_list_template`
    const url_user = `http://stiei-api.tallty.com/admin/load_password_txt`

    let options = [];
    let date = new Date();
    let _year = date.getFullYear() - 5;
    for (let i = 0; i <= 20; i++) {
      let val = _year + i;
      options.push(<Option key={val} value={`${val}`}>{val}</Option>)
    }
    return (
      <Admin>
        <div className={css.card_content}>
          <div className={css.title_name}>上传考核名单总表</div>
          {this.showMseeage()}
          <div className={css.btn_content}>
            <div>
              <Select style={{ width: 200 }}
                placeholder="请选择上传名单年份"
                onChange={this.channgeYear.bind(this)}
                notFoundContent="请选择考核年度">
                {options}
              </Select>
            </div><br />
            <Button className={css.inputContainer} type="primary" icon="plus">
              <input onChange={this.handleChange.bind(this)} multiple={true} type="file" accept=".xlsx" />导入考核对象名单
            </Button>

            <div className={css.btn_content_d}>
              <a href={url}><Button type="ghost" icon="download" >下载模板文件</Button></a>
              <a href={url_user}><Button type="ghost" icon="download" >获取用户密码</Button></a>
            </div>
          </div>
        </div>
      </Admin>
    )
  }
}

UserSet = Form.create({})(UserSet);
export default UserSet
