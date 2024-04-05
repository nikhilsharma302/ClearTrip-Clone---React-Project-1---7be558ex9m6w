import React,{useState,useEffect,useContext} from 'react'
import { Button } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import MyStore from '../assets/Context';
import Persons from '../assets/Persons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import {FLIGHT_SEARCH_API,PROJECT_ID} from '../assets/Constants'
import ShowPort from '../ShowPort';
import {DatePicker} from '@mui/x-date-pickers'
import {useNavigate} from 'react-router-dom'
export default function Flights() {
  const navigate=useNavigate();
  console.log(navigate)
  const [airportList, setAirportList]=useState([]);
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
  const [searchedFlights, setSearchedFlight]=useState([])
  const [destination, setDestination]=useState("")
  const [source, setSource]=useState("")
  const [showsrc,setshowsrc]=useState(false)
  const [showdest,setshowdest]=useState(false)
  function setConstantValue(e,{type, action}){
    if(type==="adults"){
      if(action==='increase'){
        setAdults((prev)=>{
        setAdultDisable(false)
        return prev+1
        }
        )
      }
      else{
        if(adults>1)
          setAdults((prev)=>{
          
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
  function setData(e){
    setSeatClass(e.target.innerText)
  }
  function setCalenderDate(e){
    const date=new Date(e.$d);
    const dayarr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    setDay(dayarr[date.getDay()])
  } 
  async function searchFlights(){
    try{
      const resp=await fetch(`${FLIGHT_SEARCH_API}{"source":"${source.slice(0,3)}","destination":"${destination.slice(0,3)}"}&day=${day}`
      ,{
        headers:{
          projectID:`${PROJECT_ID}`,
        }
    })
      if(!resp.ok){
        throw new Error("Unable to search for flight, please recheck the request")
      }
      else{
        const response=await resp.json();
        setSearchedFlight(response)
        navigate("/flights/results" ,{state:{adults:`${adults}`,"childs":`${children}`,
        "infants":`${infants}`,"class":`${seatClass}`,"searchedFlights":searchedFlights}})
      }
    }catch(err){
    console.log(err)
    }
  }
  async function searchingPort(value,id){
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${value}"}`,{
        headers:{
          projectID:`${PROJECT_ID}`
        }
      })
      if(!resp.ok){
        throw new Error("unable to search airport")
      }
      else{
        const response=await resp.json();
        setAirportList(response.data.airports)
        
        if(id==="src"){
          setshowsrc(true);
          setshowdest(false);
        }
        else{
          setshowsrc(false);
          setshowdest(true);
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  function searchPort(e){
    const val=e?.target?.id?e.target.id:null
    if(val==="src"){
      setSource(e.target.value);
      searchingPort(e.target.value,e.target.id)
    }
    else if(val==="dest"){
      setDestination(e.target.value);
      searchingPort(e.target.value,e.target.id)  
    }
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
            <div className="iconContainer">
            <FlightTakeoffIcon/>
            <input placeholder='Where from?' id="src" className="fromtoInput" value={source} onChange={(e)=>searchPort(e)}/>
            </div>
            {showsrc&&<div className="showlist">
              <ShowPort airportList={airportList} type="source" searchPort={searchPort}
               setDestination={setDestination} setSource={setSource}/>
            </div>}
          </div>
          <div className="toandfromicon"></div>
          <div id="to">
          <div className="iconContainer">
            <FlightLandIcon/>
            <input placeholder='Where to?' id="dest" className="fromtoInput" value={destination}  onChange={(e)=>searchPort(e)}></input>
          </div>
            {showdest&&<div className="showlist">
            <ShowPort airportList={airportList} type="destination" searchPort={searchPort}
               setDestination={setDestination} setSource={setSource}/>
            </div>
            }
          </div>
        </div>
        <div className="calender">
            <DatePicker onChange={(e)=>setCalenderDate(e)}/>
           <Button variant="contained" style={{ backgroundColor:"#da8210"}} onClick={searchFlights}>Search Flights</Button>
        </div>
      </div>
    </div>
    
  )
}
