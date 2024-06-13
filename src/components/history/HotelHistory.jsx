import React,{useEffect,useContext} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import MyStore from '../assets/Context';
import NavBar from '../NavBar'
import "../../styles/MyTrips.css"
export default function HotelHistory() {
  const location=useLocation();
  const navigate=useNavigate();
  const {response}=location.state
  console.log("response is ",response)
  const {loggedIn}=useContext(MyStore)
  useEffect(()=>{
    if(!loggedIn){
      navigate("/")
    }
  },[loggedIn])
  return (
    <div>
      <NavBar/>
      <div className="historybox">
        <div className="bookingBox">
          <div>
            Check-In Date: {response.booking.start_date.split("T")[0]}
          </div>
          <div>
            Check-Out Date: {response.booking.end_date.split("T")[0]}
          </div>
          <div>
            Status: {response.booking.status}
          </div>
        </div>
      </div>
      
      
      {/* <h3>Hotel Details</h3>
      <div>
          Hotel Name: {response.booking.hotel.name}
      </div>
      <div>
          Location: {response.hotel.booking.location}
      </div>
      <div>
          Status: {response.booking.status}
      </div> */}
    </div>
    
  )
}
