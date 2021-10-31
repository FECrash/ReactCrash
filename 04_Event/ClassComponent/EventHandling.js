import React, { Component } from 'react';

class EventHandling extends Component {
  state = {
    username: '',
    message: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = () => {
    alert(`${this.state.username}: ${this.state.message}`);
    this.setState({
      username: '',
      message: '',
    })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <h1>이벤트 핸들링</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자명"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="입력"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    )
  }
}

export default EventHandling;