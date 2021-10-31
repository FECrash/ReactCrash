import React, { Component } from 'react';
import LifeCycle from './LifeCycle';
import ErrorBoundary from './ErrorBoundary';

const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 1677215).toString(16);
}

class App extends Component {
  state = {
    color: '#000000',
  }

  handleClick = () => {
    this.setState({
      color: getRandomColor()
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycle color={this.state.color} />
        </ErrorBoundary>
      </div>
    )
  }
}

export default App;