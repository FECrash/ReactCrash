# 컴포넌트의 스타일링
> 리액트는 컴포넌트를 스타일링하는 다양한 방식을 지원합니다.

- 일반 CSS : 가장 기본적인 방식
- Sass : CSS 전처리기로서 확장된 CSS 문법으로 CSS 코드를 더 쉽게 작성할 수 있습니다.
- CSS Module : 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해줍니다.
- styled-components : 스타일을 자바스크립트 파일에 내장시키는 방식입니다.

<br>

## 일반 CSS
> *.css의 클래스 이름은 컴포넌트 이름-클래스 형태가 기본적인 규칙입니다.

```js
import logo from './logo.svg';
import './App.css'; // 이렇게 사용합니다.

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

<br>

## Sass 사용하기
> Sass(Syntactically Awesome Style Sheets)는 스타일 코드의 재활용성과 가독성을 향상시킵니다.

create-react-app v2부터 별도 추가 설정 없이 바로 사용할 수 있습니다.