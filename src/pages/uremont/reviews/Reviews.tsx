import React from 'react'
import { Link } from 'react-router-dom'
import mainStyles from '../../../styles/App.module.scss'

export const Reviews = () => (
  <div className={mainStyles.container}>
    <header className={mainStyles.header}>
      <p>
        <em>Reviews in progress...</em> <Link to="/">Go to homepage</Link>
      </p>
    </header>
  </div>
)
