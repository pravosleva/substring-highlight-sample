import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from '../pages/home'
import { NotFound } from '../pages/not-found'
import { Reviews } from '../pages/uremont/reviews/react-infinite-scroll-hook'
import { Login } from '../pages/auth/login'
import { Profile } from '../pages/profile'
import { About } from '../pages/about'
import mainStyles from '../styles/App.module.scss'
import { StyledLinkItem } from './components/StyledLinkItem'
import { UserAuthContext } from '../context/auth/UserAuthContext'
import { Sample } from '../pages/uremont/reviews/kai3341-sample'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
    options: { text: 'Home', access: ['free'] },
  },
  {
    path: '/uremont/reviews/react-infinite-scroll-hook',
    exact: true,
    main: () => <Reviews />,
    options: { text: 'UReviews', access: ['free'] },
  },
  {
    path: '/uremont/reviews/kai3341-sample',
    exact: true,
    main: () => <Sample />,
    options: { text: 'UReviews | kai3341', access: ['free'] },
  },
  {
    path: '/auth/login',
    exact: true,
    main: () => <Login />,
    options: { text: 'Login', access: ['unauthenticated'] },
  },
  {
    path: '/profile',
    exact: true,
    main: () => <Profile />,
    options: { text: 'Profile', access: ['authenticated'] },
  },
  {
    path: '/about',
    exact: true,
    main: () => <About />,
    options: { text: 'About', access: ['free'] },
  },
]

export const Routes = () => {
  const { user } = useContext(UserAuthContext)
  const isAuthenticated = !!user
  const routesLinksForCurrentUser = routes
    .filter((route) => (route.options.access.includes('unauthenticated') ? !isAuthenticated : true))
    .filter((route) => (route.options.access.includes('authenticated') ? isAuthenticated : true))

  return (
    <BrowserRouter>
      <div className={mainStyles['fixed-top-nav-menu']}>
        {routesLinksForCurrentUser.map((route) => (
          <StyledLinkItem key={route.path} path={route.path} text={route.options.text} />
        ))}
      </div>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        ))}
        <Route exact path="/*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
