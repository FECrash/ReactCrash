import React, { useCallback, useMemo, useState } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산!');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
}

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onChange = useCallback(({target}) => setNumber(target.value), []);
  // number 또는 list가 바뀌었을 때만 함수 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  }, [number, list])

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  )
}

export default Average;