// 通用UserSet组件
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent';
import css from './UserSet.less'
import Admin from '../Admin';
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon, Button, Spin, Alert } from 'antd'

class UserSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "",
    }
  }

  handleChange(info){
    this.setState({loading: "state2"})
    var file = info.target.files[0]
    console.log(file);
    this.pushData(file)
  }

  onClose(e) {
    this.setState({loading: ""})
  }

  pushData(file){
    var token = localStorage.token
    var phone = localStorage.phone
    var url = `http://114.55.172.35:3232/admin/upload_user_list`
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .field('file',file)
              .end( (err, res) => {
                if (res.ok) {
                  console.log(res.ok);
                  this.setState({loading: "state1"})
                }else{
                  this.setState({loading: "state3"})
                }
              })
  }

  download_xls(){
    const url = `http://114.55.172.35:3232/admin/load_user_list_template`
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', sessionStorage.admin_token)
      .set('X-Admin-Email', sessionStorage.admin_email)
      .end( (err, res) => {
        if (res.ok) {
          console.log('okokokokokokokokoko');
        }
      })
  }

  showMseeage(){
    const alert = []
    if (this.state.loading == "state1"){
      alert.push(<Alert
                  key="state1"
                  message="文件上传成功！"
                  description="名单总表已上传成功，点击右上角图标可关闭提示框."
                  type="success"
                  closable
                  onClose={this.onClose.bind(this)}
                  showIcon
                />)
      return alert
    }else if (this.state.loading == "state2"){
      alert.push(<div key="state2" className={css.progress}>
                  <Spin tip="文件上传中..." size="large" />
                </div>)
      return alert
    }else if (this.state.loading == "state3") {
      alert.push(<Alert
                  key="state3"
                  message="文件上传失败！"
                  description="名单总表已上传失败，请点击右上角图标关闭提示框，重新上传。"
                  type="error"
                  closable
                  onClose={this.onClose.bind(this)}
                  showIcon
                />)
      return alert
    }else{
      alert.push(<Alert
                  key="state4"
                  message="提示信息！"
                  description="*请导入格式为.xlsx的列表文件，并按照模板文件排版表格。"
                  type="info"
                  showIcon
                />)
      return alert
    }
  }

  render() {
    return (
      <Admin>
        <div className={css.card_content}>
          <div className={css.title_name}>上传考核名单总表</div>
          {this.showMseeage()}
          <div className={css.btn_content}>
            <div className={css.btn_content_d}><Button type="primary" icon="download" onClick={this.download_xls.bind(this)}>下载模板文件</Button></div>
            <Button className={css.inputContainer} type="primary" icon="plus"><input onChange={this.handleChange.bind(this)} multiple={true} type="file" accept=".xlsx" />导入用户名单</Button>
            <Button className={css.inputContainer} type="primary" icon="plus"><input onChange={this.handleChange.bind(this)} multiple={true} type="file" accept=".xlsx" />导入考核对象名单</Button>
          </div>
        </div>
      </Admin>
    )
  }
}

export default UserSet