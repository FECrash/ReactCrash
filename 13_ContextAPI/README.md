# Context API
리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능으로, 사용자 로그인 정보, 애플리케이션 환경 설정, 테마 등 여러 종류가 있습니다. 리액트 16.3 이후 많이 개선되었죠. 리액트 라우터, 리덕스, styled-components 등의 라이브러리가 Context API를 기반으로 구현되어 있습니다.

## 전역 상태 관리 흐름
리액트 애플리케이션은 컴포넌트 간 데이터를 props로 전달합니다. 따라서 최상위 컴포넌트 App에 state를 넣어 자식 컴포넌트까지 전달하는 형태죠. 그런데 이 컴포넌트의 관계가 깊어지면 App부터 최하위까지 props를 전달해야하는 상황이 옵니다. 더 많은 컴포넌트를 거치고, 다뤄야 하는 데이터가 많아질 수록 유지보수성이 낮아질 수 있죠.

따라서 redux, mobx 같은 상태 관리 라이브러리를 사용하여 전역 상태 관리 작업을 처리합니다. 그리고 리액트 16.3 이후 Context API가 많이 개선되어 별도 라이브러리 없이 전역 상태를 쉽게 관리할 수 있습니다. Context를 만들어 단 한 번에 원하는 값을 받아 사용할 수 있게 돼죠.

새 Context를 만들 때는 createContext 함수를 사용합니다.
```js
import { createContext } from "react";

const ColorContext = createContext({ color: 'black' });

export default ColorContext;
```
- 파라미터에는 해당 Context의 기본 상태를 지정합니다.

그 후 컴포넌트에 context를 주입합니다.
```js
import React from 'react'
import ColorContext from '../contexts/color'

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {value => (
        <div
          style={{
            width: '64px',
            height: '64px',
            background: value.color
          }}
        />
      )}
    </ColorContext.Consumer>
  )
}

export default ColorBox
```
- ColorContext 내부의 Consumer 컴포넌트를 통해 색상을 조회합니다.
- Consumer 사이에 중괄호를 통해 함수를 넣어줍니다. 이러한 패턴을 `Function as a child` 또는 `Render Props`라고 합니다.
- 컴포넌트의 Children이 있어야 할 자리에 JSX나 문자열이 아닌 함수를 전달하는 것입니다.

Render Props를 잠깐 더 살펴봅시다. 아래와 같은 컴포넌트를 Render Props로 활용하는 형태입니다.
```js
import React from 'react';

const RenderPropsTest = ({children}) => {
  return <div>결과: {children(5)}</div>;
}
export default RenderPropsTest;
```
```js
<RenderPropsTest>{value => 2 * value}</RenderPropsTest>
```
- children props로 파라미터에 2를 곱하여 반환하는 함수를 전달하면 해당 컴포넌트는 이 함수에 5를 인자로 넣어 "결과: 10"을 반환합니다.

<br>

### Provider
> Provider를 사용하면 Context의 value를 변경할 수 있습니다.

```js
import React from 'react';
import ColorBox from './components/ColorBox';
import ColorContext from './contexts/color';

function App() {
  return (
    <ColorContext.Provider value={{ color: 'red' }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
}

export default App;
```
- createContext의 파라미터는 Provider를 사용하지 않을 때만 사용됩니다. Provider를 사용하면서 value를 선언하지 않는다면 오류가 발생합니다.

<br>

## 동적 Context 사용하기
context로서 원시 값이 아닌 객체를 전달할 수 있습니다.

- color.js
  ```js
  import React, { createContext, useState } from "react";

  const ColorContext = createContext({
    state: { color: 'black', subcolor: 'red' },
    actions: {
      setColor: () => { },
      setSubcolor: () => { },
    }
  });

  const ColorProvider = ({ children }) => {
    const [color, setColor] = useState('black');
    const [subcolor, setSubcolor] = useState('red');

    const value = {
      state: { color, subcolor },
      actions: { setColor, setSubcolor }
    };

    return (
      <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
  }

  const { Consumer: ColorConsumer } = ColorContext;

  export { ColorProvider, ColorConsumer };
  export default ColorContext;
  ```

<br>

- ColorBox.js
  ```js
  import React from 'react'
  import { ColorConsumer } from '../contexts/color'

  const ColorBox = () => {
    return (
      <ColorConsumer>
        {({ state }) => (
          <>
            <div
              style={{
                width: '64px',
                height: '64px',
                background: state.color
              }}
            />
            <div
              style={{
                width: '32px',
                height: '32px',
                background: state.subcolor
              }}
            />
          </>
        )}
      </ColorConsumer>
    )
  }

  export default ColorBox
  ```

<br>

- SelectColor.js
  ```js
  import React from 'react'
  import { ColorConsumer } from '../contexts/color';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  const SelectColors = () => {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <ColorConsumer>
          {({ actions }) => (
            <div style={{ display: 'flex' }}>
              {colors.map(color => (
                <div
                  key={color}
                  style={{
                    background: color,
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                  onClick={() => actions.setColor(color)}
                  // 오른쪽 클릭 이벤트
                  onContextMenu={event => {
                    event.preventDefault();
                    actions.setSubcolor(color);
                  }}
                />
              ))}
            </div>
          )}
        </ColorConsumer>
        <hr />
      </div>
    )
  }

  export default SelectColors
  ```

<br>

- App.js
  ```js
  import React from 'react';
  import ColorBox from './components/ColorBox';
  import SelectColors from './components/SelectColors';
  import { ColorProvider } from './contexts/color';

  function App() {
    return (
      <ColorProvider>
        <div>
          <SelectColors />
          <ColorBox />
        </div>
      </ColorProvider>
    );
  }

  export default App;
  ```

<br>

## Consumer 대신 Hook/static contextType 사용하기
### useContext Hook 사용하기
> 함수형 컴포넌트에서 Context를 편하게 사용할 수 있습니다.

- ColorBox.js
  ```js
  import React, { useContext } from 'react'
  import ColorContext from '../contexts/color'

  const ColorBox = () => {
    const { state } = useContext(ColorContext);
    return (
      <>
        <div
          style={{
            width: '64px',
            height: '64px',
            background: state.color
          }}
        />
        <div
          style={{
            width: '32px',
            height: '32px',
            background: state.subcolor
          }}
        />
      </>
    )
  }

  export default ColorBox
  ```

훨씬 간결해진 것을 확인할 수 있습니다. Render Props 패턴이 불편하다면 useContext Hook으로 쉽고 편하게 Context 값을 조회할 수 있습니다. 단, Hook은 클래스형 컴포넌트에서는 사용할 수 없음을 유의하세요.

<br>

### static contextType 사용하기
> 클래스형 컴포넌트에서 Context를 편하게 사용할 수 있습니다.

- SelectColor.js
  ```js
  import React, { Component } from 'react'
  import ColorContext from '../contexts/color';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  export class SelectColors2 extends Component {
    static contextType = ColorContext;

    handleSetcolor = color => {
      this.context.actions.setColor(color);
    }

    render() {
      return (
        <div>
          <h2>색상을 선택하세요.</h2>
          <div style={{ display: 'flex' }}>
            {colors.map(color => (
              <div
                key={color}
                style={{
                  background: color,
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer'
                }}
                onClick={() => this.handleSetcolor(color)}
                // 오른쪽 클릭 이벤트
                onContextMenu={event => {
                  event.preventDefault();
                  this.handleSetcolor(color);
                }}
              />
            ))}
          </div>
          <hr />
        </div>
      )
    }
  }

  export default SelectColors2
  ```

static contextType을 정의하면 클래스 메서드에서도 Context에 정의한 함수를 호출할 수 있지만 한 클래스에 하나의 Context밖에 사용하지 못합니다.