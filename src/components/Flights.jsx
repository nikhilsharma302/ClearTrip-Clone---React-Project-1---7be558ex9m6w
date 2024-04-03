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
import {FLIGHT_SEARCH_API} from './assets/Constants'
import ShowPort from './ShowPort';
export default function Flights() {
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
  const [selectedDate, setSelectedDate] = useState(null);
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
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  function setData(e){
    setSeatClass(e.target.innerText)
  }
  function setCalenderDate(e){
    const date=new Date(e.target.value);
    const dayarr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    setDay(dayarr[date.getDay()])
  } 
  async function searchFlights(){
    // try{
    //   const resp=await fetch(`${FLIGHT_SEARCH_API}`{source:${source},"destination:${destination}&day=${day}},{
    //     //const resp=await fetch("https://academics.newtonschool.co/api/v1/bookingportals/?search="")
    //     method:"GET",
    //     headers:{projectID:"f104bi07c490"}
    // })
  //   console.log(resp)
  //   if(!resp.ok){
  //     throw new Error("Unable to search for flight, please recheck the request")
  //   }
  //   else{
  //     const response=await resp.json();
      
  //     //console.log(response)
  //   }
  // }catch(err){
  //   console.log(`${FLIGHT_SEARCH_API}{"source":${source},"destination":${destination}&day=${day}}`)
  //   console.log(err)
  // }
  }
  async function searchingPort(value,id){
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${value}"}`,{
        headers:{
          projectID:"f104bi07c490"
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
    
    const val=e?.target?.id?e.target.id:e
    if(val==="src"){
      setSource(e.target.value);
      searchingPort(e.target.value,e.target.id)
    }
    else if(val==="dest"){
      setDestination(e.target.value);
      searchingPort(e.target.value,e.target.id)  
    }
    else if(e.type==="source"){
      console.log(e.ee.place)
      //setSource(e.ee.value);
    }
    else if(e.type==="destination"){
      //setDestination(e.ee.value);
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
            <section>
            <FlightTakeoffIcon/>
            <input placeholder='Where from?' id="src" className="fromtoInput" value={source} onChange={(e)=>searchPort(e)}/>
            </section>
            {showsrc&&<div className="showlist">
              <ShowPort airportList={airportList} type={"source"} searchPort={searchPort}/>
            </div>}
          </div>
          <div className="toandfromicon"></div>
          <div id="to">
          <section>
            <FlightLandIcon/>
            <input placeholder='Where to?'value={destination} id="dest" className="fromtoInput" onChange={(e,id)=>setDestination(e.target.value)}></input>
          </section>
            {showdest&&<div className="showlist" type={"destination"}>
              <ShowPort />
            </div>
            }
          </div>
        </div>
        <div className="calender">
            <input type="date" value={day} onChange={(e)=>setCalenderDate(e)}></input>
            <Button variant="contained" style={{ backgroundColor:"#da8210"}} onClick={searchFlights}>Search Flights</Button> 
        </div>
      </div>
    </div>
    
  )
}
