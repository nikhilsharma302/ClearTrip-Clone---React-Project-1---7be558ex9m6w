import React,{useState,useEffect,useContext} from 'react'
import MyStore from './assets/Context'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Button } from '@mui/material'
import {DateRangePicker} from '@mui/x-date-pickers-pro'
import '../styles/App.css'
export default function Hotels(){
  const {setFilteredData}=useContext(MyStore)
  
  useEffect(()=>{setFilteredData("HOTELS")
  },[])
  return (
    <div >
      <div className="flightHomeHeading">   
        <h1>Search Hotels</h1>
        <h5>Enjoy hassle free bookings with ClearTrip</h5>
      </div>
      <div className="userinput">
        <div><LocationOnOutlinedIcon/><input type="text"/></div>
        
        <div className="calender">
            <DateRangePicker  localeText={{ start: 'Check-in', end: 'Check-out' }} />
            <Button variant="contained" style={{ backgroundColor:"#da8210"}} >Search Hotels</Button> 
        </div>
      </div>
    </div>
  )
}
