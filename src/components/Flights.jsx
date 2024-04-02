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
  const [seatClass,setSeatClass]=useState("Economy")
  const date=new Date();
  const[day,setDay]=useState(date.getUTCDate())
  const[adultDisable, setAdultDisable]=useState(true)
  const[childDisable, setChildDisable]=useState(true)
  const[infantDisable, setInfantDisable]=useState(true)
  const [selectedDate, setSelectedDate] = useState(null);
  const [destination, setDestination]=useState("")
  const [source, setSource]=useState("")
  function setConstantValue(e,{type, action}){
    if(type==="adults"){
      if(action==='increase'){
        setAdults((prev)=>{
        console.log(prev)
        setAdultDisable(false)
        return prev+1
        }
        )
      }
      else{
        if(adults>1)
          setAdults((prev)=>{
          console.log(prev,prev-1)
        if(prev==2){
            setAdultDisable(true)
        }
        return prev-1
      })
    }
    }
    else if(type==='children'){
      if(action==='increase'){
        setChildren((prev)=>{
          setChildDisable(false)
          return prev+1})
      }
      else{
        if(children>0){
          setChildren((prev)=>{
            if(prev==1){
              setChildDisable(true)
            }
            return prev-1;
          }
          )
        }
      }
    }
    else{
      if(action==='increase'){
        setInfants((prev)=>{
          setInfantDisable(false)
          return prev+1
        }
        )
      }
      else{
        if(infants>0){
          setInfants((prev)=>{
            if(prev===1){
              setInfantDisable(true)
            }
            return prev-1
          }
          )
        }
      }
    }
  }
  useEffect(()=>{setFilteredData("FLIGHTS")
  },[])
  function showPersons(){
    setShowComp(!showcomp)
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  function setData(e){
    setSeatClass(e.target.innerText)
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
            <div className="divhover" onClick={showPersons}>{adults} {adults==1?"Adult, ":"Adults, "}{children===0?null:(children==1?`${children} Child, `:`${children} Children, `)}{infants===0?null:(infants===1?`${infants} Infant, `:`${infants} Infants, `)}{seatClass}</div>
            {!showcomp&&<KeyboardArrowDownIcon onClick={showPersons}/>}
            {showcomp&&<KeyboardArrowUpIcon onClick={showPersons}/>}
            </div>
            {showcomp&&<Paper elevation={3}>
          <Persons adults={adults} children={children} infants={infants} 
          setConstantValue={setConstantValue} setData={setData} seatClass={seatClass} adultDisable={adultDisable} childDisable={childDisable} infantDisable={infantDisable}  />
          </Paper>} 
        </div> 
        <div className="fromto">
          <div id="from">
            <FlightTakeoffIcon/>
            <input placeholder='Where from?' className="fromtoInput" value={source} onChange={(e)=>setSource(e.target.value)}></input>
          </div>
          <div className="toandfromicon"></div>
          <div id="to">
            <FlightLandIcon/>
            <input placeholder='Where to?'value={destination} className="fromtoInput" onChange={(e)=>setDestination(e.target.value)}></input>
          </div>
        </div>
        <div className="calender">
            <input type="date" value={day} onChange={(e)=>console.log(e)}></input>
            <Button variant="contained" style={{ backgroundColor:"#da8210"}}>Search Flights</Button>
            
        </div>
      </div>
    </div>
    
  )
}
