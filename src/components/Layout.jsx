import React from 'react'
import NavBar from './NavBar'
import {Outlet} from 'react-router-dom'
import Links from './Links'
import Offers from './Offers'
export default function Layout() {
  
  return (
    <div>
        <header><NavBar/></header>
        <hr/>
        <div className="mainSection">
            <Links/>
            <Outlet className="flights" />
            <div className="offers"><Offers/>
            </div>
        </div>
        <footer></footer>

    </div>
  )
}

