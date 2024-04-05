import React,{useState,useEffect,useContext} from 'react'
import MyStore from './assets/Context'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Button } from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/App.css'
import { Room } from '@mui/icons-material';
export default function Hotels(){
  const [showIcon,setShowIcon]=useState(false)
  const date=new Date()
  console.log(date.toDateString())
  const[fromvalue,setfromValue]=useState()
  const {setFilteredData}=useContext(MyStore)
  const [persons,setPersons]=useState("1Room, 2 Adults")
  useEffect(()=>{setFilteredData("HOTELS");
  //setfromValue(date.toDateString())
  },[])
  return (
    <div >
      <div className="flightHomeHeading">   
        <h1>Search Hotels</h1>
        <h5>Enjoy hassle free bookings with ClearTrip</h5>
      </div>
      <div className="userinput">
        <div  className="landmark">
          <LocationOnOutlinedIcon/>
          <TextField fullWidth id="outlined-basic" 
          placeholder="Enter locality, landmark, city or hotel"
          variant="standard" style={{width:"90%", border:"none",height:"13vh",textAlign:"center",paddingTop:"1.2%",fontSize:"xx-large"}}
          InputProps={{ disableUnderline: true }}
        />
        </div>
        <div className="calender">
          <DatePicker
            placeHolder="hello"
            value={fromvalue}
            onChange={(e) => console.log(e.$d)}
          />
          <DatePicker
            placeHolder="hello"
            value={fromvalue}
            onChange={(e) => console.log(e.$d)}
          />
          <div className="usercheckinout">
            <div id="usercheckinoutshow">
              {!showIcon&&<PersonOutlineOutlinedIcon />}
              {showIcon&&<PersonIcon/>}
              {persons}
              <div className="divhover">
                <Paper elevation={3}/>
              </div> 
            </div>
          </div>
        </div>
        <Button variant="contained" style={{ backgroundColor:"#da8210"}} >Search Hotels</Button> 
      </div>
    </div>
  )
}
