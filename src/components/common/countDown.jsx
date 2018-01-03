import React, { Component } from 'react';
import css from './countDown.less';
import { withRouter } from 'react-router';
import { Tooltip, Button, Icon, Popover, Input } from 'antd';

var countTime = null;
class countDown extends Component {
  state = {
    times: '00:00:00',
    played: false,
    initSeconds: 300,
    visible: false
  }

  componentDidMount() {
    this.getFormattedTime();
  }

  componentWillUnmount() {
    clearInterval(countTime);
  }

  getFormattedTime(totalSeconds = this.state.initSeconds) {
    const audio = document.getElementById('bgMusic');
    let seconds = parseInt(totalSeconds % 60, 10);
    let minutes = parseInt(totalSeconds / 60, 10) % 60;
    let hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    this.setState({
      times: `${hours}:${minutes}:${seconds}`
    });

    if (totalSeconds === 30) {
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 3000);
    }

    if (totalSeconds <= 0) {
      clearInterval(countTime);
      this.setState({
        played: false
      });
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 8000);
    }
  }

  handleChange(event) {
    this.setState({
      initSeconds: event.target.value
    });
  }

  hide() {
    this.setState({
      visible: false
    });
    this.getFormattedTime();
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  goPlay() {
    if (!this.state.played && this.state.initSeconds > 0) {
      this.setState({
        played: !this.state.played
      });
      this.getFormattedTime();
      let count = 1
      countTime = setInterval(() => {
        const totalSeconds = this.state.initSeconds - count;
        this.getFormattedTime(totalSeconds);
        count++;
      }, 1000);
    }
  }

  pausePlay() {
    clearInterval(countTime);
    this.setState({
      played: false
    });
  }

  resetPlay() {
    clearInterval(countTime);
    this.setState({
      initSeconds: 0,
      times: '00:00:00',
      played: false
    });
  }

  render() {
    const { times } = this.state;
    const text = <span>设置倒计时长</span>;
    const content = (
      <div>
        <Input
          value={this.state.initSeconds}
          className={css.timeInput}
          onChange={this.handleChange.bind(this)}
          placeholder="请输入倒计时秒数。。。"
        />
        <Button onClick={this.hide.bind(this)} type="primary" size="small" icon="search">确定</Button>
      </div>
    );
    return (
      <div className={css.countBg}>
        <div className={css.count_content}>
          <Popover
            content={content}
            title={text}
            placement="top"
            trigger="click"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
          >
            <div className={css.setTime}>
              <Tooltip placement="right" title="设置倒计时长">
                <Icon type="setting" style={{ fontSize: 25 }} />
              </Tooltip>
            </div>
          </Popover>
          <div>
            <audio id="bgMusic" loop="loop">
              <source src="/src/images/alarm.mp3" type="audio/mpeg" />
              您的浏览器不支持播放此音频。
            </audio>
          </div>
          <div className={css.realTime}>{times}</div>
          <div className={css.palyBtn}>
            <Tooltip placement="top" title="开始">
              {
                this.state.played
                  ? <Button onClick={this.pausePlay.bind(this)} size="large" shape="circle" shape="circle" icon="pause-circle" />
                  : <Button onClick={this.goPlay.bind(this)} size="large" shape="circle" shape="circle" icon="play-circle" />
              }
            </Tooltip>
            <Tooltip placement="top" title="复位">
              <Button onClick={this.resetPlay.bind(this)} size="large" shape="circle" shape="circle" icon="reload" />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(countDown);
