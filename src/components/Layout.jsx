import React from 'react'
import NavBar from './NavBar'
import {Outlet} from 'react-router-dom'
import Links from './Links'
export default function Layout() {
  return (
    <div>
        <header><NavBar/></header>
        <hr/>
        <div className="mainSection">
            <Links/>
            <div  className="outlet"><Outlet/></div>
            <div className="ads"></div>
        </div>
        <footer></footer>

    </div>
  )
}

