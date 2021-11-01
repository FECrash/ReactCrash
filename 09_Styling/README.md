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

```sh
npm run eject
y
# 또는
yarn eject
react-scripts eject
y
```

config라는 디렉토리가 생성되었다면 webpack.config.js를 수정합니다.

```js
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    },
    'sass-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
```
- use:의 'sass-loader'를 지우고 concat을 통해 커스터마이징된 sass-loader를 넣어줍니다.
  ```js
  {
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders(
      {
        importLoaders: 3,
        sourceMap: isEnvProduction
          ? shouldUseSourceMap
          : isEnvDevelopment,
      },
      'sass-loader'
    ),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
  },
  ```

이제 utils.scss 파일을 불러올 때 해당 scss 파일이 어디에 위치해도 상대 경로를 입력할 필요 없이 `styles 디렉토리 기준` 절대 경로를 사용해 불러올 수 있습니다.

```scss
@import 'utils.scss';
```

새 파일을 생성할 때마다 utils.scss를 매번 포함시키는 것이 귀찮다면 sass-loader의 data 옵션을 설정하여 Sass 파일을 불러올 때마다 코드의 맨 윗부분에 특정 코드를 포함시킬 수 있습니다.

```js
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders({
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    }).concat({
      loader: require.resolve('sass-loader'),
      options: {
        sassOptions: {
          includePaths: [paths.appSrc + '/styles']
        },
        sourceMap: isEnvDevelopment && shouldUseSourceMap,
        additionalData: `@import 'utils';`  // 여기가 추가되었습니다.
      }
    }),
  sideEffects: true,
},
```

<br>

### node_modules에서 라이브러리 불러오기
> 물결 문자를 사용하면 자동으로 node_modules의 라이브러리 디렉토리를 탐지해 스타일을 불러올 수 있습니다.

연습 삼아 반응형 디자인을 쉽게 만들어주는 include-media와 편리한 색상 팔레트 open-color를 설치해봅시다.

```sh
npm i open-color include-media
```

이제 utils.scss파일을 열고 물결 표시를 사용해 라이브러리를 불러봅시다.

```scss
@import '~include-media/dist/include-media';
@import '~open-color/open-color';
```
- node_modules 내부 라이브러리 경로 안의 scss파일을 불러와야 하므로 직접 경로를 확인해야 합니다.

<br>

## CSS Module
> CSS를 import하여 사용할 때 클래스 이름을 고유한 값인 `[파일 이름]_[클래스 이름]_[해시값]` 형태로 자동 변환하여 컴포넌트 스타일 클래스 이름이 중복되는 현상을 방지하는 기술입니다.

create-react-app v1은 웹 팩에서 css-loader 설정을 별도로 해줘야 하지만 v2는 .module.css 확장자로 파일을 저장하기만 하면 CSS Module이 적용됩니다.

- CSSModule.module.css
  ```css
  /* 고유한 값으로 자동 변환되므로 아무 단어나 클래스 이름으로 설정해도 됩니다. */

  .wrapper {
    background: black;
    padding:1rem;
    color:white;
    font-size: 2rem;
  }

  /* 글로벌 CSS 작성 시 */
  :global .something {
    font-weight: 800;
    color: aqua;
  }
  ```
  ```js
  import React from 'react';
  import styles from './CSSModule.module.css';

  const CSSModule = () => {
    return (
      <div className={styles.wrapper}>
        안녕하세요, 저는 <span className="someting">CSS Module이에요!</span>
      </div>
    );
  };

  export default CSSModule;
  ```
  - CSS Module이 적용된 스타일 파일을 불러오면 객체를 전달받고, CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 Key-Value 쌍으로 들어있는데, `styles`를 console.log로 출력하면 아래와 같습니다.
    ```js
    { "wrapper": "CSSModule_wrapper__26PNO" }
    ```
  
  - 고유화 된 값을 사용하고 싶다면 `className={styles.클래스 이름}` 형태로 전달하면 됩니다.
  - `:global`을 적용한 선역 클래스는 기존 클래스를 사용하듯 `className='something'`으로 넣어주면 됩니다.

여러 스타일을 적용하고 싶은 경우 두 가지 방법이 있습니다.
1. 템플릿 문자열
    ```js
    <div className={`${styles.wrapper} ${styles.inverted}`}>
    ```

2. Array 내장 메서드
    ```js
    <div className={[styles.wrapper, styles.inverted].join(' ')}>
    ```

<br>

### classnames
> CSS 클래스를 조건부로 설정하거나 CSS Module을 사용할 때 유용한 라이브러리입니다.

```sh
npm i classnames
```

```js
import classNames from 'classnames';

classNames('one', 'two')  // 'one two'
classNames('one', {two: true})  // 'one two'
classNames('one', {two: false})  // 'one'
classNames('one', ['two', 'three'])  // 'one two three'

const myClass = 'hello';
classNames('one', myClass, {myCondition: true});  // 'one hello myCondition''
```

CSS Module 사용시 classnames에 내장된 bind 함수릀 아용하여 사전에 미리 받아온 후 사용하게끔 설정하고 `cx('클래스 이름', '클래스 이름2')` 형태로 사용할 수 있습니다.

<br>

### Sass와 함께 사용하기
> Sass도 .module.scss 확장자를 사용하면 CSS Module로 사용할 수 있습니다.

```scss
/* 고유한 값으로 자동 변환되므로 아무 단어나 클래스 이름으로 설정해도 됩니다. */

.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;

  &.inverted {
    color: black;
    background: white;
    border: 1px solid black;
  }
}

/* 글로벌 CSS 작성 시 */
:global {
  .something {
    font-weight: 800;
    color: aqua;
  }
}
```

```js
import styles from  './CSSModule.module.scss';
```

<br>

### CSS Module이 아닌 파일에서 CSS Module 사용하기
> `:local`을 사용하여 CSS Module을 사용할 수 있습니다.

```css
:local .wrapper {
  /**/
}
```

```scss
:local {
  .wrapper {
    //
  }
}
```

<br>

## styled-components
> 자바스크립트 파일 안에 스타일을 선언하는 `CSS-in-JS` 방식의 대표적인 라이브러리입니다.

```sh
npm i styled-components
```

<br>

### Tagged 템플릿 리터럴
> <code>`</code>를 사용하여 만드는 문법을 Tagged 템플릿 리터럴이라고 부릅니다.

템플릿에 객체를 넣거나 함수를 넣으면 형태를 잃어버리고 문자열로 출력됩니다.

```js
`hello ${{foo: 'bar'}} ${() => 'world'}}!`
// hello [object Object] () => 'world'!
```

Tagged 템플릿 리터럴을 사용하면 템플릿 사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있습니다. styled-components는 이런 속성으로 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있도록 해주죠.

```js
function tagged(...args){
  console.log(args);
}

tagged`hello ${{foo: 'bar'}} ${() => 'world'}}!`
```

<br>

### 스타일링된 엘리먼트 만들기
> 사용해야할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링을 하고 싶다면 이 방법을 써주세요.

```js
const MyInput = styled('input')`
  background: gray;
`;

const StyledLink = styled(Link)`
  color: blue;
`
```

컴포넌튼를 styled의 파라미터로 넣는 경우 해당 컴포넌트에 className props를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어 있어야 합니다. 아래처럼요.
```js
const Test = ({className}) => {
  return <div className={className}>TEST</div>;
}

const StyledTest = styled(Test)`
  font-size: 2rem;
`;
```

<br>

### 반응형 디자인
> 일반 CSS처럼 media 쿼리를 사용합니다.

```js
import React from 'react';
import styled, { css } from 'styled-components';

const Box = styled.div`
  /* props로 넣어준 값을 직접 전달할 수 있습니다. */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  @media (max-width: 1024px){
    width: 768px;
  }
  @media (max-width: 768px){
    width:100%;
  }
`;
```

일반 CSS와 큰 차이가 없죠? 그런데 여러 컴포넌트에서 반복하면 조금 귀찮아질 수 있으므로 함수화하여 간편하게 사용해봅시다. 이 내용은 styled-components 메뉴얼에서 제공하는 유틸 함수입니다.

```js
import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  desktop: 1024,
  tablet: 768
};

// size 객체에 따라 자동으로 media 쿼리를 만들어줍니다.
const media = Object.keys(sizes).reduce({acc, label} => {
  acc[label] = (...args) => css`
    @media(max-width: ${sizes[label] / 16}em){
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Box = styled.div`
  /* props로 넣어준 값을 직접 전달할 수 있습니다. */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  ${media.desktop`width: 768px;`};
  ${media.tablet`width: 100%;`};
`;
```