import React from 'react'
import NavBar from './NavBar'
export default function Login() {
  return (
    <div>
        <NavBar/>
        <h1>Please Login with your credentials</h1>
        <form>
            <label htmlFor='email'>Enter your Email</label>
            <input type="email" placeholder="Enter your email Id"/><br/>
            <label htmlFor='password'>Enter your Password</label>
            <input type="password" placeholder="Enter your password"/><br/>
        </form>
        <p>New User, click <a href="/register">here</a> to Register</p>
    </div>
  )
}
