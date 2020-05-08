import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Routes } from './routes'
import { Toaster } from './components/Toaster'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { store } from './store'
import { UserAuthContext } from './context/auth/UserAuthContext'

const App = () => {
  const [user, setUser] = useState(null)
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <UserAuthContext.Provider value={providerUser}>
      <React.StrictMode>
        <Provider store={store}>
          <Toaster />
          <Routes />
        </Provider>
      </React.StrictMode>
    </UserAuthContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
