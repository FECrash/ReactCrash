import React, { useState } from 'react';
// import Counter from './components/Counter';
import Info2 from './components/Info2';

const App = () => {
  const [visible, setVisible] = useState(false);
  // return <Counter />;
  return (
    <div>
      <button
        onClick={() => setVisible(!visible)}
      >{visible ? '숨기기' : '보이기'}</button>
      <hr />
      {visible && <Info2 />}
    </div>
  );
}

export default App;