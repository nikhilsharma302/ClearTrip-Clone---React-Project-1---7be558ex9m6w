import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './assets/logo.png'
import { Button } from '@mui/material'
import "../styles/App.css"
export default function NavBar() {
  return (
    <div>
        <NavLink  to="/" className="navlink">
            <img src={logo} alt="cleartriplogo" className="logo"/>
            <Button variant="contained">Log In/Sign Up</Button>
            </NavLink>
    </div>
  )
}
