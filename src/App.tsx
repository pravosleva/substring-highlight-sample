import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Provider } from 'react-redux'

import { Routes } from 'src/routes'
import { Toaster } from 'src/components/Toaster'
import { store } from 'src/store'
import { UserAuthContext, MaybeUserModel } from 'src/context/auth/UserAuthContext'
import { groupLog } from 'src/utils/groupLog'
import { ClientPerfWidget } from 'src/components/ClientPerfWidget'

import './backdrop-blur.css'

let renderCounter = 0

export const App = () => {
  const [user, setUser] = useState(null as MaybeUserModel)

  groupLog({
    logType: 'info',
    header: 'APP RENDER COUNTER',
    argsArr: [++renderCounter],
  })

  useEffect(() => {
    groupLog({
      header: 'User auth init',
      logType: 'todo',
      argsArr: [
        'Get token from LS;',
        '1.1) TOKEN EXISTS: Load from back by token;',
        '  2.1) OK: setUser(data);',
        '  2.2) FAIL: clear LS;',
        '1.2) TOKEN DOES NOT EXISTS: nothing;',
      ],
    })
  }, [])

  const onLogin = useCallback((data: MaybeUserModel) => {
    setUser(data)
  }, [])

  const onLogout = useCallback(() => {
    setUser(null)
  }, [])

  const providerUser = useMemo(() => ({ user, onLogin, onLogout }), [user, onLogin, onLogout])

  return (
    <UserAuthContext.Provider value={providerUser}>
      <Provider store={store}>
        <Toaster />
        <Routes />
      </Provider>
      <ClientPerfWidget position="bottom-center" />
    </UserAuthContext.Provider>
  )
}
