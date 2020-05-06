import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserAuthContext } from '../../../context/auth/UserAuthContext'
import { login } from '../../../api/login'
import mainStyles from '../../../styles/App.module.scss'

export function Login() {
  const { user, setUser } = useContext(UserAuthContext)

  return (
    <div className={mainStyles.container}>
      <button
        style={{ marginTop: '10px' }}
        onClick={async () => {
          const user = await login()

          setUser(user)
        }}
      >
        Login
      </button>
      {
        !!user && <Redirect to='/profile' />
      }
    </div>
  )
}
