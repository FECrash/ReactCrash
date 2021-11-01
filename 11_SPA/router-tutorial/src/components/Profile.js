import React from 'react'
import { withRouter } from 'react-router';
import WithRouter from './WithRouter';

const data = {
  tester: {
    name: '테스터',
    description: '테스트 유저'
  },
  tester1: {
    name: 'TESTER',
    description: 'Test User'
  }
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];

  if (!profile) return <div>존재하지 않는 사용자입니다.</div>

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouter />
    </div>
  )
}

export default withRouter(Profile)
