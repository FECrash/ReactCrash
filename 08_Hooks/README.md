# 함수형 컴포넌트의 상태 관리
> Hooks는 리액트 16.8에 도입된 기능입니다.

Hooks로 인해 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여 다양한 작업을 할 수 있게 해줍니다.

## useState
> 가장 기본적인 Hook으로 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해줍니다.

useState 함수의 파라미터에는 `상태의 기본값`을 넣어 줍니다. 해당 함수가 호출되면 배열을 반환하는데, 첫 번째 원소는 `상태 값`, 두 번째 원소는 `상태를 설정하는 함수`입니다. 이 함수에 파라미터를 넣어 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링 됩니다.

하나의 useState 함수는 하나의 상태 값만 관리합니다.

<br>

## useEffetc
> 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook입니다.

클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태죠.

### 마운트 때만 실행하고 싶을 때
useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고 업데이트 될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 `비어 있는 배열`을 넣어주면 됩니다.

```js
useEffect(() => {
  console.log('마운트에만 실행됩니다.');
}, [])
```

<br>

### 특정 값이 업데이트될 때만 실행하고 싶을 때
> useEffect를 사용하면서 특정 값이 변경될 때만 호출하고 싶은 경우 어떻게 할까요?

useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 특정 값이 변경될 때만 호출됩니다.

```js
useEffect(() => {
  console.log(name);
}, [name])
```

<br>

### 뒷정리
> 컴포넌트가 언마운트되기 전이나 업데이트 직전에 어떤 작업을 수행하고 싶다면 useEffect에서 뒷정리(cleanup) 함수를 반환해야 합니다.

```js
useEffect(() => {
  console.log('effect');
  console.log(name);
  return () => {
    console.log('cleanup');
    console.log(name);
  }
}, [name]);
```

<br>

## useReducer
> useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트하고 싶을 사용하는 Hook 입니다.

리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수로, 새로운 상태를 만들 때는 반드시 불변성을 지켜야 합니다. redux라는 라이브러리에서는 어떤 액션인지 알려주는 type 필드가 필요하지만, useReducer에는 그럴 필요가 없으며 객체가 아닌 문자열, 숫자여도 상관 없습니다.

useReducer의 첫 번째 파라미터에는 리듀서 함수를, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어주며 반환하는 값은 현재 상태인 state와 액션을 발생시키는 dispatch 함수입니다. dispatch(action)의 형태로 호출하면 리듀서 함수가 호출되는 구조입니다.

```js
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  // action.type에 따라 다른 작업을 수행합니다.
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않다면 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>현재 카운터 값은 <b>{state.value}</b>입니다.</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  )
}

export default Counter;
```

useReducer를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 분리할 수 있다는 것입니다.