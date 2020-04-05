import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Home } from '../pages/home'
import { NotFound } from '../pages/not-found'
import { Reviews } from '../pages/uremont'
import mainStyles from '../styles/App.module.scss'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
    link: { text: 'Home' },
  },
  {
    path: '/uremont/reviews',
    exact: true,
    main: () => <Reviews />,
    link: { text: 'Uremont Reviews' },
  },
]

export const Routes = () => {
  return (
    <BrowserRouter>
      <div className={mainStyles['fixed-top-nav-menu']}>
        {routes.map((route, index) => (
          <Link key={index} to={route.path}>
            {route.link.text}
          </Link>
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
