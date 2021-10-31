import React, { Component } from 'react';

class Counter extends Component {
  // 1번째 방법
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
      fixedNumber: 0
    }
  }

  // 2번째 방법 : constructor를 선언하지 않고 state 설정하기
  state = {
    number: 0,
    fixedNumber: 0
  }

  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button>
          onClick={() => {
            // 1번째 방법
            this.setState({ number: number + 1 });

            // 2번째 빵법 : 객체 대신 함수 인자 전달하기
            this.setState((prevState, props) => {
              return {
                number: prevState.number + 1
              }
            });

            // 또는 함수에서 바로 객체를 반환하기
            this.setState((prevState, props) => ({
              number: prevState.number + 1
            }));

            // this.setState가 끝난 후 특정 작업 실행하기
            this.setState({
              number: number + 1
            },
              () => {
                console.log('number 값이 변경되었습니다.', this.state);
              })
          }}
          +1
        </button>
      </div>
    );
  }
}

export default Counter;