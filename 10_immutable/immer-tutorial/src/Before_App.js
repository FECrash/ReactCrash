import React, { useCallback, useRef, useState } from 'react'

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // input 수정
  const onChange = useCallback(({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: [value]
    });
  }, [form]);

  // form 등록
  const onSubmit = useCallback(event => {
    event.preventDefault();
    const info = {
      id: nextId.current,
      name: form.name,
      username: form.username,
    };

    setData({
      ...data,
      array: data.array.concat(info),
    });

    setForm({
      name: '',
      username: '',
    });

    nextId.current += 1;
  }, [data, form.name, form.username]);

  // 항목 삭제
  const onRemove = useCallback(id => {
    setData({
      ...data,
      array: data.array.filter(info => info.id !== id)
    });
  }, [data]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => 
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App
