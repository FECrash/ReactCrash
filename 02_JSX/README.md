# JSX
> 자바스크립트의 확장 문법으로 XML과 매우 비슷합니다.

JSX 형식으로 작성한 코드는 브라우저에서 실행되기 전, 코드가 번들링되는 과정 전에 Babel을 사용하여 자바스크립트로 변환합니다.

- 변환 전
  ```js
  function App(){
    return (
      <div>
        어서오세요!
        <p>React 입니다!</p>
      </div>
    );
  }
  ```

- 변환 후
  ```js
  function App(){
    return React.createElement('div', null, '어서오세요!', React.createElement('p', null, 'React 입니다!'));
  }
  ```

JSX는 공식적인 자바스크립트 묹법이 아니라 리액트로 프로젝트를 개발할 때 사용되는 문법입니다. JSX를 사용하면 매우 편하게 UI를 렌더링할 수 있죠.

## 장점?
### 용이성
아래를 볼까요? 상단의 JSX문법으로 작성한 내용을 자바스크립트로 표현한 것입니다.

```js
const $div = document.createElement('div');
const $p = document.createElement('p');
$div.innerHTML = '어서오세요!';
$div.appendChild($p);
$p.innerHTML = 'React 입니다!';
```

JSX를 보면 HTML코드와 매우 흡사하다는 걸 알 수 있습니다. 결국 자바스크립트로 요소를 계속 생성할 필요가 없는 거죠!

### 활용성
JSX는 HTML 태그 뿐만 아니라, 우리가 작성한 컴포넌트의 태그를 HTML 태그처럼 사용할 수 있습니다.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

`<App />` 처럼 말이죠!

> ReactDOM.render : 컴포넌트를 페이지에 렌더링하는 역할로, react-dom 모듈을 불러와 사용할 수 있습니다.

> React.StrictMode : 리액트의 레거시 기능을 사용하지 못하게 합니다.

## 문법
### 감싸인 요소
> 컴포넌트에 여러 요소가 존재하면 반드시 부모 요소 하나로 감싸야 합니다.

- 에러가 납니다!
  ```js
  import React from 'react';

  function App(){
    return (
      <div>
        어서오세요!
        <p>React 입니다!</p>
      </div>
      <div>
        반가워요!
      </div>
    );
  }
  ```

- 정상이에요!
  ```js
  import React from 'react';

  function App(){
    return (
      <div>
        <div>
          어서오세요!
          <p>React 입니다!</p>
        </div>
        <div>
          반가워요!
        </div>
      </div>
    );
  }
  ```

왜 이럴까요? 그건 Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교하도록 **컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙** 이 있기 때문입니다.

`div`태그가 아닌, react-v16 이상부터 도입된 `Fragment` 기능을 사용할 수 있습니다.

- Fragment 사용하기
  ```js
  import React, { Fragment } from 'react';

  function App(){
    return (
      <Fragment>
        <div>
          어서오세요!
          <p>React 입니다!</p>
        </div>
        <div>
          반가워요!
        </div>
      </Fragment>
    );
  }
  ```

- `<>` 사용하기
  ```js
  import React from 'react';

  function App(){
    return (
      <>
        <div>
          어서오세요!
          <p>React 입니다!</p>
        </div>
        <div>
          반가워요!
        </div>
      </>
    );
  }
  ```

### 자바스크립트 표현
> JSX는 자바스크립트 표현식을 쓸 수 있습니다. `{변수명}` 형태로요!

- 자바스크립트 값 렌더링하기
  ```js
  import React from 'react';

  function App(){
    const name = 'React';
    return (
      <div>
        <div>
          어서오세요!
          <p>{name} 입니다!</p>
        </div>
        <div>
          반가워요!
        </div>
      </div>
    );
  }
  ```

### 조건부 연산자
> JSX 내부의 자바스크립트 표현식에서 if문을 사용할 순 없지만, 조건부 연산자(삼항 연산자)를 사용하면 됩니다!

- 조건부 연산자 사용하기
  ```js
  import React from 'react';

  function App(){
    const name = 'React';
    return (
      <div>
        <div>
          어서오세요!
          {name === 'React' ? (
            <p>React 입니다!</p>
          ) : (
            <p>React 가 아니에요ㅠ</p>
          )}
        </div>
        <div>
          반가워요!
        </div>
      </div>
    );
  }
  ```

### AND 연산자(&&)로 조건부 렌더링하기
> 특정 조건에 따라 렌더링 여부를 결정할 수 있습니다.

- 조건부 렌더링하기
  ```js
  import React from 'react';

  function App(){
    const name = 'React';
    return (
        <div>
          어서오세요!
          {name === 'React' && <p>React 입니다!</p>}
        </div>
    );
  }
  ```

예외적으로 && 연산자로 조건부 렌더링을 할 때, **falsy한 값 0은 화면에 나타납니다!**

### undefined를 렌더링하지 않기
> 리액트 컴포넌트의 함수는 undefined만 반환하여 렌더링하는 상황을 만들면 안 됩니다!

- undefined 렌더링
  ```js
  import React from 'react';

  function App(){
    const name = undefined;
    // 불가능합니다.
    return name;
    // 이렇게 처리해야합니다.
    return name || 'undefined 값입니다.';
    // 가능합니다.
    return (
        <div>
          {name}
        </div>
    );
    // 위랑 합쳐서 출력해볼까요?
    return (
        <div>
          {name || 'react'}
        </div>
    );
  }
  ```

### 인라인 스타일링
> 리액트의 DOM 요소 스타일 적용방법은 객체 형태로 넣는 것입니다.

`-` 문자가 포함되는 경우, `-` 문자를 없애고 카멜 표기법으로 작성합니다. 즉, background-color는 backgroundColor가 됩니다.

- 인라인 스타일링 : 미리 선언하기
  ```js
  import React from 'react';

  function App(){
    const name = 'React';
    const style = {
      backgroundColor: 'black',
      color: 'aqua',
      fontSize: '48px',
      fontWeight: 'bold',
      padding: 16 // 단위 생략 시 px 자동 지정
    }
    return (
        <div style={style}>
          어서오세요!
          {name} 입니다!
        </div>
    );
  }
  ```

- 인라인 스타일링 : 선언하지 않기
  ```js
  import React from 'react';

  function App(){
    const name = 'React';
    return (
        <div style={{
                      backgroundColor: 'black',
                      color: 'aqua',
                      fontSize: '48px',
                      fontWeight: 'bold',
                      padding: 16 // 단위 생략 시 px 자동 지정
                    }}>
          어서오세요!
          {name} 입니다!
        </div>
    );
  }
  ```

### class가 아닌 className
> JSX는 class가 아닌 className으로 설정합니다.

- class 속성에 적용하기
  ```css
  .react {
    background-color: 'black';
    color: 'aqua';
    font-size: '48px';
    font-weight: 'bold';
    padding: 16px;
  }
  ```

  ```js
  import React from 'react';

  function App(){
    const name = 'React';
    return (
        <div className='react'>
          어서오세요!
          {name} 입니다!
        </div>
    );
  }
  ```

### 반드시 닫아야 하는 태그(Tag)

`<input>` 같은, HTML문법에서는 전혀 문제 없이 작동하지만 JSX에서는` <input></input>`, 또는 self-closing 태그인 `<input />` 같이 태그를 닫아야 작동합니다.

### 주석
> 주석은 `{/* ... */}`로 표현합니다.

- 주석 작성방법
  ```js
  import React from 'react';

  function App(){
    const name = 'React';
    return (
        {/* 주석입니다. */}
        <div className='react'>
          어서오세요!
          {name} 입니다!
        </div>
        // 이런 주석이나
        /* 이런 주석은 페이지에 나타납니다. */
    );
  }
  ```