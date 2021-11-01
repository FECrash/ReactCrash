# immer를 사용한 불변성 제어하기
immer를 사용하면 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있습니다.

사용법도 아주 간단하죠.

```js
import produce from 'immer';

const nextState = produce(originalState, draft => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

produce 함수는 두 개의 파라미터를 받는데, 첫 번째는 `수정하고 싶은 상태`, 두 번째는 `상태를 어떻게 업데이트할 지 정의하는 함수`입니다. 두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면 produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성합니다.

해당 라이브러리의 핵심은 `불변성에 신경 쓰지 않는 것처럼 작성하지만 불변성이 관리되는 것`입니다. 좀 더 복잡한 데이터를 불변성을 유지하면서 업데이트 해볼까요?

```js
import produce from 'immer';

const originalState = {
  {
    id: 1,
    todo: '전개 연산자와 배열 내장 함수로 불변성 유지하기',
    checked: true,
  },
  {
    id: 2,
    todo: 'immer로 불변성 유지하기',
    checked: false,
  }
};

const nextState = produce(originalState, draft => {
  const todo = draft.find(t => t.id === 2);
  todo.checked = true;

  draft.push({
    id: 3, 
    todo: '일정 관리 앱에 immer 적용하기',
    checked: false,
  });

  draft.splice(draft.findIndex(t => t.id === 1), 1);
});
```

immer를 사용하여 컴포넌트 상태를 작성할 때는 객체 안에 있는 값을 직접 수정하거나 배열에 직접 변화를 일으키는 메서드를 사용해도 무방합니다.

하지만 immer를 사용한다고 무조건적으로 코드가 간결해지지 않습니다. immer는 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분하죠.

<br>

### useState 함수형 업데이트와 immer 함께 쓰기

useState의 함수형 업데이트입니다.
```js
const [number, setNumber] = useState(0);
const onIncrease = useCallback(() => setNumber(prevNumber => prevNumber + 1), []);
```

immer에서 제공되는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환합니다.
```js
const update = produce(draft => {
  draft.value = 2;
});

const originalState = {
  value: 1,
  foo: 'bar',
};

const nextState = update(originalState);
console.log(nextState);
```

이러한 immer 속성과 useState 함수형 업데이트를 함께 활용하면 코드를 더욱 깔끔하게 만들 수 있습니다.