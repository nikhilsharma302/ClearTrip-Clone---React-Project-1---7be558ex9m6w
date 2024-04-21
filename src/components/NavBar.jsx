import React,{useState} from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import logo from './assets/logo.png'
import HotelIcon from '@mui/icons-material/Hotel';
import SignUp from './Modals/SignUp'
import PersonIcon from '@mui/icons-material/Person';
import "../styles/App.css"
export default function NavBar({pageType}) {
  const [showportal,setShowportal]=useState(false)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const[user,setUser]=useState("Traveller")
  const[hover,setHover]=useState("hover")
  const navigate=useNavigate();
  function gotoHome(){
    navigate('/')
  }
  function gotoHotels(){
    navigate('/hotels')
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
          <button className="userIcon" onClick={(e)=>setShowportal(!showportal)}>
            <PersonIcon fontSize="large"/>
            <span>
                Hi,{user}
            </span>
          </button>
          {/* <Button variant="contained" onClick={(e)=>setShowportal(!showportal)} sx={{margin:"5%"}}>{isLoggedIn?`Logout` :`Log In/Sign Up`}</Button> */}
        </div>
          {showportal&&<SignUp setShowportal={setShowportal}/>}  
    </div>
  )
}
