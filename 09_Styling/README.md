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

create-react-app v2부터 별도 추가 설정 없이 바로 사용할 수 있습니다. Sass를 작업한 뒤에는 개발 서버를 재시작해야 합니다.

### utils 함수 분리
> 여러 파일에서 사용될 수 있는 Sass 변수 및 믹스인(Mixins)은 다른 파일로 분리하여 작성할 수 있습니다.

- utils.scss
  ```scss
  // 변수
  $red: #fa5252;
  $orange: #fd7e14;
  $yellow: #fcc419;
  $green: #40c057;
  $blue: #339af0;
  $indigo: #5c7cfa;
  $violet: #7950f2;

  // 믹스인(재사용되는 스타일 블록을 함수처럼 사용)
  @mixin square($size) {
    $calculated: 32px * $size;
    width: $calculated;
    height: $calculated;
  }
  ```

- SassComponent.scss
  ```scss
  @import './styles/utils.scss';

  .SassComponent {
    // ...
  }
  ```

<br>

### sass-loader 설정 커스터마이징
프로젝트 구조가 깊어지면 해당 파일은 상위 폴더로 한참 거슬러 올라갑니다. `@import '../../../../../utils.scss'` 이렇게 말이죠. 이런 문제점은 Webpack에서 Sass를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있습니다.

create-react-app으로 생성한 프로젝트는 프로젝트 구조의 복잡도를 낮추기 위해 세부 설정이 모두 숨겨져 있는데, 이를 커스터마이징하기 위해 `eject` 명령어를 사용하여 세부 설정을 외부로 노출시켜야 합니다. eject 명령어는 커밋되지 않은 변경사항이 존재하면 진행되지 않으므로 커밋을 완료한 뒤에 실행합니다.

yarn eject, npm run eject 원하는 것을 사용하면 됩니다.