import React, { useState } from 'react';

const EventHandling = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const onChangeUsername = ({ target }) => setUsername(target.value);
  const onChangeMessage = ({ target }) => setMessage(target.value);
  const onClick = () => {
    alert(`${username}: ${message}`);
    setUsername('');
    setMessage('');
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
        onChange={onChangeUsername}
      />
      <input
        type="text"
        name="message"
        placeholder="입력"
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  )
};

export default EventHandling;