import React from 'react'
import { Link, Route } from 'react-router-dom'
import Profile from './Profile'
import WithRouter from './WithRouter'

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/tester">테스터</Link>
        </li>
        <li>
          <Link to="/profiles/tester1">TESTER</Link>
        </li>
      </ul>
      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route
        path="/profiles/:username"
        component={Profile}
      />
      <WithRouter />
    </div>
  )
}

export default Profiles
