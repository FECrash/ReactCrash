import React, { Component } from 'react';

class EventHandling extends Component {
  state = {
    message: ''
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: '',
    })
  }

  render() {
    return (
      <div>
        <h1>이벤트 핸들링</h1>
        <input
          type="text"
          name="message"
          placeholder="입력"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    )
  }
}

export default EventHandling;