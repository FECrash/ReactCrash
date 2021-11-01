import React from 'react'
// import { Link, Route } from 'react-router-dom'
import { NavLink, Route } from 'react-router-dom'
import Profile from './Profile'

const Profiles = () => {
  const activeStyle = {
    background: 'black',
    color: 'white'
  };

  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          {/* <Link to="/profiles/tester">테스터</Link> */}
          <NavLink activeStyle={activeStyle} to="/profiles/tester">
            테스터
          </NavLink>
        </li>
        <li>
          {/* <Link to="/profiles/tester1">TESTER</Link> */}
          <NavLink activeStyle={activeStyle} to="/profiles/tester1">
            TESTER
          </NavLink>
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
    </div>
  )
}

export default Profiles
