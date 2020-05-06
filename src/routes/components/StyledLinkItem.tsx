import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export const StyledLinkItem = ({ path, text }) => {
  const location = useLocation()

  return (
    <div>
      <Link to={path} style={{ color: location.pathname === path ? 'red' : 'inherit' }}>
        {text}
      </Link>
    </div>
  )
}
