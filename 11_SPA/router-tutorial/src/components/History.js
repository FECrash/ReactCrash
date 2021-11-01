import React, { Component } from 'react'

export class History extends Component {

  // 뒤로 가기
  handleGoBack = () => {
    this.props.history.goBack();
  }

  // 홈으로
  handleGoHome = () => {
    this.props.history.push('/');
  }

  componentDidMount(){
    // 이걸 설정하면 페이지 변화가 생기려고 할 때마다 묻습니다.
    this.unblock = this.props.history.block('정말 떠나실 건가요?');
  }

  componentWillUnmount(){
    // 질문을 멈추기
    if(this.unblock) this.unblock();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.handleGoHome}>홈으로</button>
      </div>
    )
  }
}

export default History
