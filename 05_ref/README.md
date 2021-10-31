# DOM을 직접 제어하기
> 특정 DOM 요소에 작업이 필요할 때 id, data- 어트리뷰트를 통해 자바스크립트에서 해당 요소를 찾아 작업할 수 있습니다.

ref는 DOM을 반드시 직접 건드려야할 때 사용합니다.
1. 특정 input에 포커스 주기
2. 스크롤 박스 조작하기
3. Canvas 요소에 그림 그리기

## ref 사용
### 콜백 함수를 통한 ref 설정
> ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달합니다.

이 콜백 함수는 ref 값을 파라미터로 전달 받으며, 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해 줍니다.
```js
<input ref={(ref) => {this.input = ref}} />
```
- this.input은 input 요소의 DOM을 가리킵니다.
- ref의 이름은 자유롭게 지정할 수 있습니다.

<br>

### createRef를 통한 ref 설정
> 리액트 16.3부터 내장된 createRef라는 함수를 사용할 수 있습니다.

createRef를 사용하려면 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아 주어야 합니다. 그 후 해당 멤버 변수를 ref로 지정할 요소에 props로 넘겨 주면 ref 설정이 끝납니다.
```js
import React, {Component} from 'react';

class RefComponent extends Component {
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  }

  render(){
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}

export default RefComponent;
```
- 콜백 함수와 달리 *.current로 조회합니다.

<br>

## 컴포넌트에 ref 달기
> 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 사용합니다.

이번 장은 실습 코드만으로 진행합니다. 스크롤 박스가 있는 컴포넌트를 하나 만들고, 스크롤바를 아래로 내리는 작업을 부모 컴포넌트에서 실행해 봅시다.