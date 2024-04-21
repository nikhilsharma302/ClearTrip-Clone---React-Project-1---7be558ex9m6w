import React from 'react'
import NavBar from './NavBar'
import {Outlet} from 'react-router-dom'
import Links from './Links'
import Offers from './Offers'

export default function Layout() {
  
  return (
    <div>
        <header><NavBar pageType={false}/></header>
        <hr style={{border:".1px solid gray"}}/>
        <div className="mainSection">
            <Links/>
            <Outlet  />
            <div className="offers" >
              <Offers/>
            </div>
        </div>
        <footer></footer>

    </div>
  )
}

