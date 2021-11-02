# 리덕스
리덕스를 사용하여 컴포넌트의 상태 업데이트 관련 기능을 다른 파일로 분산시켜 효율적으로 관리할 수 있습니다. 컴포넌트끼리 동일한 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 상태 값을 전달하거나 업데이트할 수 있죠.

리덕스 라이브러리는 `전역 상태를 관리`할 때 굉장히 효과적입니다. 물론 Context API를 통해서도 작업할 수 있지만 16.3 이전에는 주로 리덕스를 활용했습니다. 단순 전역 상태 관리라면 Context API로도 충분하지만 리덕스를 사용하면 상태를 더욱 체계적으로 관리할 수 있으므로 프로젝트의 규모가 크다면 리덕스를 사용하세요. 코드의 유지 보수성이나 작업 효율도 극대화해주기 때문입니다.

## 개념
### 액션
> 상태에 특정 변화가 필요하면 액션(Action)이 발생합니다.

액션은 하나의 객체로 표현됩니다. 아래처럼요.
```js
{
  type: 'ADD_TODO'
}
```

액션 객체는 type 필드(액션의 이름)를 반드시 가지고 있어야 합니다. 그 외의 값들은 추후 상태 업데이트 시 참고해야 하는 값들로 개발자의 마음대로 추가할 수 있습니다.

<br>

### 액션 생성 함수
> 액션 생성 함수(Action Creator)는 액션 객체를 만들어 주는 함수입니다.

특정 변화를 일으킬 때마다  액션 객체를 생성해야 하는데, 매번 액션 객체를 생성하면 번거롭기도 하고 실수가 발생할 수 있으므로 함수를 만들어 관리하는 것이 좋습니다.
```js
const addTodo = text => ({
  type: 'ADD_TODO',
  text
});
```

<br>

### 리듀서
> 리듀서(Reducer)는 변화를 일으키는 함수입니다.

액션을 만들어 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받습니다. 이 값을 참조하여 새로운 상태를 만들어 반환하죠.
```js
const reducer = (state = {todo: []}, action){
  switch(action.type){
    case ADD_TODO:
      return {
        ...state, 
        todo: state.todo.concat(action.data)
      }
    default:
      return state;
  }
}
```

<br>

### 스토어
> 리덕스를 적용하기 위한 스토어(Store)로 하나의 프로젝트는 하나의 스토어만을 가집니다.

스토어에는 현재 애플리케이션의 상태와 리듀서가 있으며 추가적인 메서드가 존재합니다.

<br>

### 디스패치
> 디스패치(Dispatch)는 스토어의 메서드 중 하나로 `액션을 발생시키는 것`입니다.

이 함수는 `dispatch(action)`과 같은 형태로 액션 객체를 파라미터로 넣어 호출하고, 스토어는 리듀서 함수를 실행시켜 새로운 상태를 만듭니다.

<br>

### 구독
> 구독(Subscribe)도 스토어의 메서드로 리스터 함수를 파라미터로 넣어 호출합니다.

리스너 함수는 액션이 디스패치되어 상태가 업데이트 될 때마다 호출됩니다.
```js
const listener = () => {
  console.log('상태가 업데이트 돼따!');
}
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 구독 비활성화 시 호출
```

<br>

## 바닐라 자바스크립트로 구현하기
코드는 [여기](https://github.com/InSeong-So/No-Framework-VanillaJS/tree/master/_projects/redux-vanilla)에 있습니다.

<br>

## 리덕스의 세 가지 규칙
### 단일 스토어
> 하나의 애플리케이션 안에는 하나의 스토어가 존재합니다.

물론 여러 스토어를 사용할 순 있습니다. 그러나 상태 관리가 복잡해질 수 있죠. 권장하지는 않지만 mobx 라이브러리가 이를 효율적으로 제공합니다.

<br>

### 읽기 전용 상태
> 리덕스의 상태는 **읽기 전용** 입니다.

리덕스는 상태를 업데이트할 때 기존 객체는 건드리지 않고 새로운 객체를 생성해야 합니다. 리덕스에서 불변성을 유지하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality) 검사를 하기 때문입니다.

객체의 변화를 감지할 때 객체의 깊숙한 안쪽이 아닌 겉만 비교하므로 좋은 성능을 유지하죠.

<br>

### 리듀서는 순수 함수
> 변화를 일으키는 리듀서 함수는 순수 함수여야 합니다.

리듀서를 작성할 때 아래의 네 가지 사항을 유의해야 합니다.

1. 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받습니다.
2. 파라미터 이외의 값에는 의존하면 안 됩니다.
3. 이전 상태는 절대 변경하지 않고 변화를 준 새로운 상태 객체를 만들어 반환합니다.
4. 같은 파라미터로 호출된 리듀서 함수는 언제나 동일한 값을 반환해야 합니다.

리듀서 함수 내부에서 랜덤 값을 생성하거나 Date 함수를 사용하여 현재 시간을 가져오거나 네트워크 요청을 한다면 파라미터가 같아도 다른 결과를 만들어 낼 수 있으므로 사용하면 안 됩니다. 이러한 작업들은 리듀서 함수 바깥에서 처리해야 합니다. 액션을 만드는 과정에서 처리하거나, 리덕스 미들웨어에서 말이죠. 주로 네트워크 요청과 같은 비동기 작업은 미들웨어를 통해 관리합니다.

<br>