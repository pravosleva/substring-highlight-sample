import React, { useContext } from 'react'
import { UserAuthContext } from '../../context/auth/UserAuthContext'
import mainStyles from '../../styles/App.module.scss'

export function About() {
  const { user } = useContext(UserAuthContext)

  return (
    <div className={mainStyles.container} style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ marginTop: '10px' }}>
        <strong>
          User data from <code>UserAuthContext</code>
        </strong>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>
        This project was created as example of the following technologies:
        <ul>
          <li>TypeScript</li>
          <li>React: context, hooks</li>
          <li>Redux</li>
          <li>Redux-Saga</li>
          <li>css modules</li>
        </ul>
      </div>
    </div>
  )
}
