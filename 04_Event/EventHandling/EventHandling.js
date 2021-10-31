import React, { Component } from 'react';

class EventHandling extends Component {
  state = {
    message: ''
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
          onChange={
            ({ target }) => {
              this.setState({
                message: target.value,
              })
            }
          }
        />
        <button
          onClick={
            () => {
              alert(this.state.message);
              this.setState({
                message: '',
              })
            }
          }
        >확인</button>
      </div>
    )
  }
}

export default EventHandling;