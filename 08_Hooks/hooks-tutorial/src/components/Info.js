import React, { useEffect, useState } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  // 항상 모든 값이 바뀔 때마다 실행
  useEffect(() => {
    console.log('렌더링 완료!');
    console.log({
      name, nickname
    });
  });
  // 마운트 때만 실행
  useEffect(() => {
    console.log('ㅇ마운트될 때만 실행돼요!ㅇ');
  }, []);
  // name이 변경될 때만 실행
  useEffect(() => {
    console.log('ㅇname 값이 변경될 때만 실행돼요!ㅇ');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    }
  }, [name]);
  const onChangeName = ({ target }) => {
    setName(target.value);
  }

  const onChangeNickname = ({ target }) => {
    setNickname(target.value);
  }

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  )
}

export default Info;