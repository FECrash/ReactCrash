# 컴포넌트를 얕게 알아보기
> 리액트를 사용한 애플리케이션에는 여러가지 컴포넌트로 구성되어 있습니다.

컴포넌트는 단순한 템플릿이 아닙니다. 데이터가 주어졌을 때 맞춤형 UI를 만들고 라이프사이클 API로 데이터를 유동적으로 처리하며, 임의의 메소드를 만들어 특별한 기능을 붙이기도 합니다.

컴포넌트를 선언하는 방식은 두 가지입니다. 하나씩 알아볼까요?

## 함수형 컴포넌트
- 작성방법
  ```js
  import React from 'react';
  // ES6 이전
  function App() {
    const name = 'react';
    return <div className='react'>{name}</div>;
  }

  // ES6 이후
  const App = () => {
    const name = 'react';
    return <div className='react'>{name}</div>;
  }

  export default App;
  ```

- 함수형 컴포넌트는 `state 기능 및 라이프사이클 API`의 사용이 불가능하지만 리액트 v16.8 업데이트 이후 `Hooks`라는 기능을 통해 해결되었습니다.

## 클래스형 컴포넌트
- 작성 방법
  ```js
  import Reqct, { Component } from 'react';

  class App extends Component {
    render() {
      const name = 'react';
      return <div className='react'>{name}</div>;
    }
  }

  export default App;
  ```

- 클래스형 컴포넌트는 이후에 등장할 `state 기능 및 라이프사이클 기능`을 사용할 수 있으며, `임의 메서드`를 정의할 수 있습니다.

## 함수형 컴포넌트 vs 클래스형 컴포넌트

|구분|함수형 컴포넌트|클래스형 컴포넌트|
|----|----|-----|
|선언 용이성|쉽습니다.|어렵습니다.|
|메모리 자원|적게 사용합니다.|많이 사용합니다.|
|빌드 후 파일 크기|적습니다.|많습니다.|

물론, 성능과 파일 크기의 차이가 사실상 크지 않으니 이 부분은 개의치 않고 넘기셔도 됩니다.

리액트는 공식 메뉴얼에서 함수형 컴포넌트와 Hooks를 사용하도록 권장합니다. 단, 클래스형 컴포넌트도 반드시 알아두셔야 해요!

## props
> properties의 약어로 컴포넌트 속성을 설정할 때 사용하는 요소입니다.
> - props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 사용할 수 있습니다.

### props 값 지정하기
props 값은 컴포넌트 함수의 파라미터로 받아 와서 사용할 수 있습니다.

- App.js
  ```js
  import React from 'react';
  import Hello from './Hello';

  function App() {
    return (
      <Hello name="react" />
    );
  }
  ```

- Hello.js
  ```js
  import React from 'react';

  function Hello(props) {
    return <div>안녕하세요 {props.name}</div>
  }

  export default Hello;
  ```

props는 이렇게 객체 형태로 전달이 됩니다!

### defaultProps로 기본값 설정하기
> props를 기본값으로 설정하고 싶다면 컴포넌트에 defaultProps 라는 값을 설정합니다.

- App.js
  ```js
  import React from 'react';
  import Hello from './Hello';

  function App() {
    return (
      <>
        <Hello name="react" color="red"/>
        <Hello color="pink"/>
      </>
    );
  }
  ```

- Hello.js
  ```js
  import React from 'react';

  function Hello({ color, name }) {
    return <div style={{ color }}>안녕하세요 {name}</div>
  }

  Hello.defaultProps = {
    name: '이름없음'
  }

  export default Hello;
  ```

### props.children으로 태그 사이의 내용을 보여주기
> 컴포넌트 태그 사이의 내용을 보여주는 props입니다.

- App.js
  ```js
  import React from 'react';
  import Hello from './Hello';

  function App() {
    return (
      <>
        <Hello name='react'>리액트</Hello>
      </>
    );
  }
  ```

- Hello.js
  ```js
  import React from 'react';

  function Hello({ name }) {
    return (
      <div>
        안녕하세요 {name}
        <p>children : {props.children}</p>
      </div>
    )
  }

  Hello.defaultProps = {
    name: '이름없음'
  }

  export default Hello;
  ```

### 비구조화 할당 문법을 통해 props 내부 값 추출하기
> ES6의 비구조화 할당 문법을 사용하여 내부 값을 간편하게 추출할 수 있습니다.

- 첫 번째 방법
  ```js
  import React from 'react';

  function Hello() {
    const {name, children} = props; 
    return (
      <div>
        안녕하세요 {name}
        <p>children : {children}</p>
      </div>
    )
  }

  Hello.defaultProps = {
    name: '이름없음'
  }

  export default Hello;
  ```

- 두 번째 방법
  ```js
  import React from 'react';

  function Hello({ name, children }) {
    return (
      <div>
        안녕하세요 {name}
        <p>children : {children}</p>
      </div>
    )
  }

  Hello.defaultProps = {
    name: '이름없음'
  }

  export default Hello;
  ```

### propTypes로 props 검증하기
> 컴포넌트의 필수 props를 지정하거나 타입(type)을 지정할때 사용합니다.

- Hello.js
  ```js
  import React from 'react';
  import PropTypes from 'prop-types';

  function Hello({ name, children }) {
    return (
      <div>
        안녕하세요 {name}
        <p>children : {children}</p>
      </div>
    )
  }

  Hello.defaultProps = {
    name: '이름없음'
  }

  Hello.propTypes = {
    name: PropTypes.string
  }

  export default Hello;
  ```

이는 name의 값이 반드시 문자열(string)이어야 한다는 의미입니다. 그럼 propTypes를 지정하지 않았을 때는 어떻게 제어할까요?

이 때는 isRequired를 붙여주면 됩니다.

- Hello.js
  ```js
  import React from 'react';
  import PropTypes from 'prop-types';

  function Hello({ name, favoriteNumber, children }) {
    return (
      <div>
        안녕하세요 {name}
        <p>children : {children}</p>
        <p>제가 좋아하는 숫자는 {favoriteNumber} 입니다.</p>
      </div>
    );
  }

  Hello.defaultProps = {
    name: '이름없음'
  }

  Hello.propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
  }

  export default Hello;
  ```

PropTypes에서는 여러 종류를 설정할 수 있습니다.

|유형|내용|
|---|----|
|array|배열|
|arrayOf()|특정 PropType으로 이루어진 배열입니다. 예로, arrayOf(PropTypes.number)는 숫자로 이루어진 배열입니다.|
|bool|true or false 값|
|func|함수|
|number|숫자|
|object|객체|
|string|문자열|
|symbol|ES6의 Symbol 타입|
|node|렌더링할 수 있는 모든 것|
|instanceOf(클래스)|특정 클래스의 인스턴스|
|oneOf(['name', 'favoritNumber'])|주어진 배열 요소 중 하나|
|oneOfType([PropTypes.string, PropTypes.number])|주어진 배열 안의 종류 중 하나|
|objectOf(PropTypes.number)|객체의 모든 키 값이 인자로 주어진 PropType인 객체|
|shape({name: PropTypes.string, num:PropTypes.number})|주어진 스키마를 가진 객체|
|any|아무 종류|

자, 여기까지 왔으면 함수형 컴포넌트와 클래스형 컴포넌트를 작성하고 번갈아 변환해보세요!

## state
> 리액트에서의 state는 컴포넌트 내부에서 바뀔 수 있는 값입니다.

props는 컴포넌트가 사용되는 과정에서 **부모 컴포넌트가 설정하는 불변 값**이며, 컴포넌트 자신은 props를 읽기 전용으로만 사용합니다. 즉, 부모 컴포넌트만이 props를 변경할 수 있는 것입니다. 그럼 부모-자식 컴포넌트 사이에서 데이터를 어떻게 변경하고 전달할 수 있을까요? 그 역할을 하는 것이 가변값 state입니다.

state는 클래스형 컴포넌트가 지니고 있고, 함수형 컴포넌트는 useState를 지니고 있습니다. 각각 알아보죠.

### 클래스형 컴포넌트의 state
> 예제 : [ClassComponent/Counter.js]()

컴포넌트의 state는 constructor 메서드를 통해 설정하며, 반드시 `super(props)`를 
호출하고 객체여야만 하며, constructor가 존재하지 않으면 class의 멤버 변수로서 선언할 수 있습니다.

this.setState에는 객체 대신 함수 인자를 전달할 수 있습니다.
```js
this.setState((prevState, props) => ({
  number: prevState + 1
}));
```
- 화살표 함수에서 값을 반환하고 싶다면 코드 블록을 생략하고, 객체를 반환할 경우 소괄호로 감싸주면(`prevState => ({number: prevState + 1})`) 됩니다!

this.setState가 끝난 뒤 특정 작업을 진행하고 싶다면 콜백으로 함수 인자를 넘겨주면 됩니다.
```js
this.setState({number: number + 1}, () => console.log('이렇게요!'));
```

<br>

### 함수형 컴포넌트의 state
> 예제 : [FunctionComponent/Counter.js]()

리액트 16.8 이전 버전에서는 함수형 컴포넌트에서 state를 사용할 수 없었지만, 그 이후부터는 Hooks 중 하나인 useState 함수를 사용하여 state를 사용할 수 있게 되었습니다.

> useState는 배열 비구조화 할당(Destructuring) 문법으로 표현하므로 이를 알아두세요!

useState 함수의 인자에는 상태의 초깃값을 넣어줍니다. 값의 형태는 자유로, useState를 호출하면 현재 상태와 상태를 바꿔주는 함수를 배열로 반환합니다. 이를 배열 비구조화 할당을 통해 자유롭게 정해줄 수 있죠.

<br>

## state 사용 시 주의 사항
> state 값을 바꿔야 할 때는 setState나 useState를 통해 전달받은 setter 함수를 사용해야 합니다.

객체에 대한 사본을 생성하여 그 값을 업데이트하고 사본의 상태를 setState 혹은 세터 함수를 통해 변경합니다.
```js
// 객체
const ojbect = { a: 1, b: 2, c: 3 };
const nextOjbect = { ...object, b: 4 }; // 사본을 만들어 b 값만 덮어 쓰기

// 배열
const array = [
  { id: 1, value: true },
  { id: 2, value: true },
  { id: 3, value: false },
];

let nextArray = array.concat({ id: 4 });
nextArray.filter(item => item.id !== 2);
nextArray.map(item => (item.id === 1 ? { ...item, value: false } : item));
```

객체의 사본을 생성할 때는 spread Operator나 내장 함수를 활용합니다.

<br>

## 정리
props와 state는 컴포넌트에서 사용하거나 렌더링할 데이터를 담고 있으므로 비슷해 보이지만, props는 `부모 컴포넌트가 설정`하고, state는 `컴포넌트 자체적으로 지닌 값`으로 `컴포넌트 내부에서 값을 업데이트 할 수 있습니다.

props를 사용한다고 값이 무조건 고정되진 않습니다. 부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달하여 자식 컴포넌트의 이벤트가 발생하면 부모 컴포넌트의 메서드를 호출해서 props를 유동적으로 사용할 수 있죠.