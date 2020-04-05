import React from 'react'
import { Link } from 'react-router-dom'
import mainStyles from '../../styles/App.module.scss'

export const NotFound = () => (
  <div className={mainStyles.container}>
    <header className={mainStyles.header}>
      <p>
        Page not found <Link to="/">Go to homepage</Link>
      </p>
    </header>
  </div>
)
