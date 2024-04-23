import React,{useState,useEffect,useContext} from 'react'
import { Button } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import MyStore from '../assets/Context';
import Persons from '../Modals/Persons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {FLIGHT_SEARCH_API,PROJECT_ID} from '../assets/Constants'
import ShowPort from '../Modals/ShowPort'
import {DatePicker} from '@mui/x-date-pickers'
import {useNavigate} from 'react-router-dom'
export default function Flights() {
  const navigate=useNavigate();
  const [airportList, setAirportList]=useState([]);
  const [showcomp,setShowComp]=useState(false);
  const {setFilteredData}=useContext(MyStore)
  const[adults,setAdults]=useState(1);
  const[children,setChildren]=useState(0);
  const[infants,setInfants]=useState(0);
  const [seatClass,setSeatClass]=useState("Economy")
  const todaydate=new Date();
  const[day,setDay]=useState("")
  const[adultDisable, setAdultDisable]=useState(true)
  const[childDisable, setChildDisable]=useState(true)
  const[infantDisable, setInfantDisable]=useState(true)
  const [fulldate,setfullDate]=useState(todaydate.toLocaleDateString())
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
        })
      }
      else{
        if(adults>1){
          setAdults((prev)=>{ 
            if(prev==2){
              setAdultDisable(true)
            }
            return prev-1
          })
        }
      }
    }
    else if(type==='children'){
      if(action==='increase'){
        setChildren((prev)=>{
          setChildDisable(false)
          return prev+1
        })
      }
      else{
        if(children>0){
          setChildren((prev)=>{
            if(prev==1){
              setChildDisable(true)
            }
            return prev-1;
          })
        }
      }
    }
    else{
      if(action==='increase'){
        setInfants((prev)=>{
          setInfantDisable(false)
          return prev+1
        })
      }
      else{
        if(infants>0){
          setInfants((prev)=>{
            if(prev===1){
              setInfantDisable(true)
            }
            return prev-1
          })
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

    const date = e?.$d
    //console.log("typeof date ",typeof date)
    setfullDate(date.toLocaleDateString())
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const reqday= daysOfWeek[date.getDay()];
    setDay(reqday)
  }
  async function searchFlights(){
    if(source.length>0&&destination.length>0){
      try{
        const resp=await fetch(`${FLIGHT_SEARCH_API}{"source":"${source.slice(0,3)}","destination":"${destination.slice(0,3)}"}&day=${day}`
        ,{
          headers:{
            projectID:`${PROJECT_ID}`,
          }
        })
        console.log(`${FLIGHT_SEARCH_API}{"source":"${source.slice(0,3)}","destination":"${destination.slice(0,3)}"}&day=${day}`)
        if(!resp.ok){
          throw new Error("Unable to search for flight, please recheck the request")
        }
        else{
          const response=await resp.json();
          
          navigate("/flights/results" ,{state:{adults:`${adults}`,"childs":`$ {children}`,
          "infants":`${infants}`,"class":`${seatClass}`,"searchedFlights":response.data.flights,"source":source,"destination":destination,"fulldate":fulldate}})
        }
      }catch(err){
        console.log(err)
      }
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
        //console.log(response.data.airports)
        if(id=="src" && response.data.airports.length>0){
          setshowsrc(true);
          setshowdest(false);
        }
        else if(id==="dest" && response.data.airports.length>0){
          setshowsrc(false);
          setshowdest(true);
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  function showkey(e,{type}){
    setshowsrc(false);
    setshowdest(false);
    const newsrc=source.slice(0,1).toLowerCase();
    const newdest=destination.slice(0,1).toLowerCase();
    if(e.code==="Backspace"){
      if(type==="src"){
        setSource("")
        searchingPort(newsrc,"src")
      }
      else {
        setDestination("")
        searchingPort(newdest,"dest")
      }
    }
  }
  function searchPort(e){
    setshowsrc(false);
    setshowdest(false);
    const val=e.target.parentNode.id.trim()
    if(val==="src"){
      setSource(e.target.value);
      searchingPort(e.target.value,e.target.parentNode.id)
    }
    
    else if(val==="dest"){
      setDestination(e.target.value);
      searchingPort(e.target.value,e.target.parentNode.id)  
    }
  }
  function changetofromvals(){
    const dest=source;
    setSource(destination);
    setDestination(dest)
  }
  return (
    <div className="flights" >
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
          {showcomp&&
          <Persons adults={adults} children={children} 
            infants={infants} 
            setConstantValue={setConstantValue}
            setData={setData} seatClass={seatClass} 
            adultDisable={adultDisable}
            childDisable={childDisable}
            infantDisable={infantDisable}
          />} 
        </div> 
        <div className="fromto">
          <div id="from">
            <div className="iconContainer" id="src">
              <FlightTakeoffIcon sx={{paddingRight:"5%"}}/>
              <input placeholder='Where from?' id="src" className="fromtoInput" value={source} onKeyDown={(e)=>showkey(e,{type:"src"})} onChange={(e)=>searchPort(e)}/>
            </div>
            {showsrc&&<div className="showlist">
              <ShowPort airportList={airportList} type="source" searchPort={searchPort}
               setDestination={setDestination} blur={false} setSource={setSource} positionLeft={"17%"} positionTop={"69%"} width={"24%"}/>
            </div>}
          </div>
          <div className="toandfromicon" onClick={changetofromvals}><SyncAltIcon/></div>
          <div id="to">
          <div className="iconContainer"  id="dest">
            <FlightLandIcon sx={{paddingRight:"5%"}}/>
            <input placeholder='Where to?' className="fromtoInput" value={destination} onKeyDown={(e)=>showkey(e,{type:"dest"})} onChange={(e)=>searchPort(e)}></input>
          </div>
            {showdest&&<div className="showlist">
            <ShowPort airportList={airportList} type="destination" searchPort={searchPort}
               setDestination={setDestination} blurr={false} setSource={setSource} positionLeft={"45%"} positionTop={"69%"} width={"24%"}/>
            </div>
            }
          </div>
        </div>
        <div className="calender">
            <DatePicker onChange={(e)=>setCalenderDate(e)} sx={{height:"100%"}} size="small"/>
            
           <Button variant="contained" style={{ backgroundColor:"#da8210"}} onClick={searchFlights}>Search Flights</Button>
        </div>
      </div>
    </div> 
  )
}

