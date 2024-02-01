import React, { useState, useEffect, useMemo, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { Routes } from './routes'
import { Toaster } from './components/Toaster'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { store } from './store'
import { UserAuthContext } from './context/auth/UserAuthContext'
import { groupLog } from './utils/groupLog'
import { ClientPerfWidget } from 'src/components/ClientPerfWidget'
import './backdrop-blur.css'

let renderCounter = 0

interface UserModel {
  id: any
  name: string
  role: string
}

const App = () => {
  const [user, setUser] = useState(null)

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
  const onLogin = useCallback((data: UserModel) => {
    setUser(data)
  }, [])
  const onLogout = useCallback(() => {
    setUser(null)
  }, [])
  const providerUser = useMemo(() => ({ user, onLogin, onLogout }), [user, onLogin, onLogout])

  return (
    <React.StrictMode>
      <UserAuthContext.Provider value={providerUser}>
        <Provider store={store}>
          <Toaster />
          <Routes />
        </Provider>
        <ClientPerfWidget position="bottom-center" />
      </UserAuthContext.Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
