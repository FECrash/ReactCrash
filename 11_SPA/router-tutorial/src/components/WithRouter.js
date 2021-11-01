import React from 'react'
import { withRouter } from 'react-router'

const WithRouter = ({ location, match, history }) => {
  return (
    <div>
      <h4>loaction</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        rows={7}
        readOnly
      />
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly
      />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  )
}

export default withRouter(WithRouter)