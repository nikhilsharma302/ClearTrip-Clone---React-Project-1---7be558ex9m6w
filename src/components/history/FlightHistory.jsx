import React,{useContext,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import NavBar from '../NavBar'
import MyStore from '../assets/Context';
import "../../styles/MyTrips.css"
export default function FlightHistory() {
  const {loggedIn} =useContext(MyStore)
  useEffect(()=>{
    if(!loggedIn){
      Navigate("/")
    }
  },[loggedIn])
  const location=useLocation();
  const {response}=location.state
  return (
    <div>
      <NavBar/>
      <div className="historybox">
        <div className="bookingBox">
          <div>
            Departure Date: {response.booking.start_date.split("T")[0]}
          </div>
          <div>
            Arrival Date: {response.booking.end_date.split("T")[0]}
          </div>
          <div>
            Status: {response.booking.status}
          </div>
        </div> 
      </div>     
    </div>  
  )
}
