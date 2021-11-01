import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import About from './components/About';
// import Profile from './components/Profile';
import Profiles from './components/Profiles';
import History from './components/History';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        {/* <li>
          <Link to="/profile/tester">테스터 프로필</Link>
          </li>
          <li>
          <Link to="/profile/tester1">TESTER 프로필</Link>
        </li> */}
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact={true}></Route>
        <Route path={["/about", "/info"]} component={About}></Route>
        <Route path="/profiles" component={Profiles}></Route>
        <Route path="/history" component={History}></Route>
        <Route
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다:</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  )
}

export default App
