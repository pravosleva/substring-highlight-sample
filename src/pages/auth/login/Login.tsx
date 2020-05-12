import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserAuthContext } from '../../../context/auth/UserAuthContext'
import { login } from '../../../api/login'
import mainStyles from '../../../styles/App.module.scss'
import loginStyles from './Login.module.scss'

export function Login() {
  const { user, onLogin } = useContext(UserAuthContext)

  return (
    <div className={mainStyles.container}>
      <button
        style={{ marginTop: '10px' }}
        className={loginStyles['btn-default']}
        onClick={async () => {
          const user = await login()
          // TODO: move auth from context to redux -> async login to saga

          onLogin(user)
        }}
      >
        Login
      </button>
      {!!user && <Redirect to="/profile" />}
    </div>
  )
}
