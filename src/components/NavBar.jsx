import React,{useState,useContext} from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import logo from './assets/logo.png'
import HotelIcon from '@mui/icons-material/Hotel';
import SignUp from './Modals/SignUp'
import MyStore from './assets/Context';
import PersonIcon from '@mui/icons-material/Person';
import "../styles/App.css"
export default function NavBar({pageType}) {
  const {showportal,toggleLogin,user,loggedIn,changeUser,changeLoggedStatus}=useContext(MyStore)
  const[hover,setHover]=useState("hover")
  const navigate=useNavigate();
  function gotoHome(){
    navigate('/')
  }
  function gotoHotels(){
    navigate('/hotels')
  }
  function logoutFn(){
        changeUser("Traveller")
        changeLoggedStatus(true)
        localStorage.removeItem("loggedInUser")
  }
  return (
    <div className="navbar">
        <div className="logocontainer" >
          {/*<NavLink  to="/" >*/}
            <img src={logo} alt="cleartriplogo" className="logo" onClick={gotoHome}/>
          {/*</NavLink>*/}
          {
            pageType&&
                
                  <HotelIcon sx={{marginLeft:"2%",cursor:"pointer"}} onClick={gotoHotels}/>
          }
        </div>
        <div className="login">
        {!loggedIn ?<button className="userIcon" onClick={(e)=>toggleLogin(showportal)}>
            <PersonIcon fontSize="large"/>
            <span>
                Hi,{user}
            </span>
          </button>:<div className="login">
          <PersonIcon fontSize="large"/><br/>
            <span>
                Hi,{user}
            </span><br/>
            <button onClick={logoutFn}>Logout</button>
          </div>
            
          }
        </div>
          {showportal&&<SignUp/>}  
    </div>
  )
}
