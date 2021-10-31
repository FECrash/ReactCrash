import React, { useState } from 'react';

const EventHandling = () => {
  const [form, setForm] = useState({
    username: '',
    message: ''
  });

  const [username, message] = form;
  const onChange = ({ target }) => {
    const nextForm = {
      ...form,
      [target.value]: target.value
    };
    setForm(nextForm);
  }
  const onClick = () => {
    alert(`${username}: ${message}`);
    setForm({
      username: '',
      message: '',
    });
  }
  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      onClick();
    }
  }
  return (
    <div>
      <h1>이벤트 핸들링</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="입력"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  )
};

export default EventHandling;