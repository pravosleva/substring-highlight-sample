import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserAuthContext } from '../../context/auth/UserAuthContext'
import mainStyles from '../../styles/App.module.scss'
import profileStyles from './Profile.module.scss'

export function Profile() {
  const { user, onLogout } = useContext(UserAuthContext)

  return (
    <div className={mainStyles.container} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <pre style={{ textAlign: 'left' }}>{JSON.stringify(user, null, 2)}</pre>
      {!user && <Redirect to="/auth/login" />}
      <button onClick={() => onLogout()} style={{ marginTop: '10px' }} className={profileStyles['btn-default']}>
        Logout
      </button>
    </div>
  )
}
