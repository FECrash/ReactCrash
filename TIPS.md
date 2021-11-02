# useState
## 파라미터 형태의 차이
- `useState(createBulkTodos())`
  - 리렌더링될 때마다 createBulkTodos 실행
- `useState(createBulkTodos)`
  - 파라미터를 함수 형태로 넣어주면 처음 렌더링될 때만 함수 실행

<br>

# 최적화
## 컴포넌트가 리렌더링되는 상황
1. 자식이 전달받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. forceUpdate 함수가 실행될 때

## 컴포넌트의 리렌더링을 방지하는 방법
1. shouldComponentUpdate 라이프사이클 메서드를 사용
   - 그러나 함수형 컴포넌트에서 라이프사이클 메서드를 사용할 순 없다.

2. React.memo 함수 사용
   - 컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화할 수 있다.
      ```js
      //...
      export default React.memo(TodoListItem);
      ```
   - 리스트에 관련된 컴포넌트를 최적화할 때는 리스트 내부에서 사용하는 컴포넌트도 최적해야하고, 리스트로 사용되는 컴포넌트도 최적화해야 한다. 다른 state가 추가되어 리렌더링 될 경우를 생각해야하기 때문이다.

## 함수가 계속 생성되지 않게 하기
1. useState의 함수형 업데이트 기능 사용하기
    ```js
    const [number, setNumber] = useState(0);
    const onIncrease = useCallback(() => setNumber(prevNumber => prevNumber + 1), []);
    ```
    - `setNumber(number + 1)`이 아닌 어떻게 업데이트할 지 정의해 주는 **업데이트 함수**를 넣는다.
    - 이러면 useCallback을 사용할 때 두 번째 파라미터로 넣는 배열에 number를 넣지 않아도 된다.

2. useReducer 사용하기
   - 두 번째 파라미터에 초기 상태를 넣어줘야 하지만 undefined를 넣고 세 번째에 초기 상태를 만들어주는 함수를 넣는데, 이러면 컴포넌트가 맨 처음 렌더링 될 때만 세 번째 함수를 호출할 수 있다.
      ```js
      useReducer(todoReducer, undefined, createBulkTodos);
      ```

## 불변성
> 상태를 업데이트할 때 불변성을 지키는 것은 매우 중요하다.

기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 `불변성을 지킨다`고 한다.

```js
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array;
nextArrayBad[0] = 100;
console.log(array === nextArrayBad);

const nextArrayGood = [...array];
nextArrayGood[0] = 100;
console.log(array === nextArrayGood);

const object = {
  foo: 'bar',
  value: 1
};

const nextObjectBad = object;
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad);

const nextObjectGood = {
  ...object,
  value: object.value + 1
};
console.log(object === nextObjectGood);
```

왜 중요할까? 불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못하기 때문이다.

전개 연산자(Spread Operator)를 사용하면 1단계만 깊은 복사되므로, 복잡한 함수를 직접 구현하거나 다른 라이브러리를 사용하는 것이 좋다.

## react-virtualized
컴포넌트가 맨 처음 렌더링될 때 10,000개의 자식 컴포넌트 중 9,991개의 자식 컴포넌트는 스크롤하기 전에는 보이지 않음에도 렌더링이 이루어진다. 그러면서 관련된 배열이 변경되면 다시 10,000개 이상/이하의 자식 컴포넌트를 렌더링하게 된다. 이는 시스템 자원의 낭비다.

react-virtualized는 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있으며, 스크롤 시 해당 위치에 보여 주어야 할 컴포넌트만 렌더링시킨다. 따라서 시스템 자원을 아주 효율적으로 사용할 수 있다.

```sh
npm i react-virtualized
```
- 현재 기준 리액트는 17버전인데 react-virtualized는 15 ~ 16버전만 지원한다. `react@"^15.3.0 || ^16.0.0-alpha" from react-virtualized@9.22.3`
    ```sh
    npm i react-virtualized --force
    ```

```js
import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem/TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(({ index, key, style }) => {
    const todo = todos[index];
    return (
      <TodoListItem
        todo={todo}
        key={key}
        onRemove={onRemove}
        onToggle={onToggle}
        style={style}
      />
    );
  }, [onRemove, onToggle, todos]);


  return (
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513}  // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{outline: 'none'}} // List에 적용되는 기본 outline 스타일 제거
    />
    // <div className="TodoList">
    //   {todos.map(todo => (
    //     <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
    //   ))}
    // </div>
  )
}

export default React.memo(TodoList);
```