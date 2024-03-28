import React,{useState,useEffect} from 'react'
import { Button } from '@mui/material'
import '../styles/App.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import {useContext} from'react'
import MyStore from './assets/Context';
import Persons from './assets/Persons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
export default function Flights() {
  const [showcomp,setShowComp]=useState(false);
  const {setFilteredData}=useContext(MyStore)
  const[adults,setAdults]=useState(1);
  const[children,setChildren]=useState(0);
  const[infants,setInfants]=useState(0);
  const date=new Date();
  const[day,setDay]=useState(date.getUTCDate())
  function setConstantValue({type, action}){
    if(type==='adults'){
      if(action==='increase'){
        setAdults((prev)=>(prev+1))
      }
      else{
        if(adults>1)
          setAdults((prev)=>(prev-1))
      }
    }
    else if(type==='children'){
      if(action==='increase'){
        setChildren((prev)=>(prev+1))
      }
      else{
        if(children>0)
        setChildren((prev)=>(prev-1))
      }
    }
    else{
      if(action==='increase'){
        setInfants((prev)=>(prev+1))
      }
      else{
        if(infants>0)
        setInfants((prev)=>(prev-1))
      } 
    }
  }
  useEffect(()=>{setFilteredData("FLIGHTS")
  },[])
  function showPersons(){
    setShowComp(!showcomp)
  }
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
    return (
    <div >
      <div className="flightHomeHeading">   
        <h1>Search Flights</h1>
        <h5>Enjoy hassle free bookings with ClearTrip</h5>
      </div>
      <div className="userinput">
        <div className="seatdetails">
          
          <div id="iconShow">
            {!showcomp&&<PersonOutlineOutlinedIcon onClick={showPersons}/>}
            {showcomp&&<PersonIcon onClick={showPersons}/>}
            
            <div onClick={showPersons}>{adults} Adults{children>0?`, ${children} Children`:null}{infants>0?`, ${infants} Infants`:null}</div>
            
            {!showcomp&&<KeyboardArrowDownIcon onClick={showPersons}/>}
            {showcomp&&<KeyboardArrowUpIcon onClick={showPersons}/>}
            </div>
            {showcomp&&<Paper elevation={3}>
          <Persons adults={adults} children={children} infants={infants} 
          setConstantValue={setConstantValue}/>
          </Paper>} 
        </div> 
        <div className="fromto">
          <div id="from">
            <FlightTakeoffIcon/>
            <input placeholder='Where from?' className="fromtoInput"></input>
          </div>
          <div className="toandfromicon"></div>
          <div id="to">
            <FlightLandIcon/>
            <input placeholder='Where to?' className="fromtoInput"></input>
          </div>
        </div>
        <div className="calender">
            <input type="date" placeholder={day}></input>
            <Button variant="contained" style={{ backgroundColor:"#da8210"}}>Search Flights</Button>
        </div>
      </div>
    </div>
    
  )
}
