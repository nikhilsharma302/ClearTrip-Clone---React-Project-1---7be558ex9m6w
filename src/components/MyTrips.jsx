import React,{useState,useEffect,useContext,useRef} from 'react'
import MyStore from './assets/Context'
import {useNavigate} from 'react-router-dom'
import { PROJECT_ID } from './assets/Constants'
import '../styles/MyTrips.css'
export default function MyTrips() {
  const [travelArr,setTravelArr]=useState([]);
  const [hotelArr,setHotelArr]=useState([])
  const {loggedIn,user}=useContext(MyStore)
  const ref1=useRef();
  const ref2=useRef();
  const ref3=useRef();
  const ref4=useRef();
  const userdata=localStorage.getItem("loggedInUser")?JSON.parse(localStorage.getItem("loggedInUser")):{}
  const token= userdata.token?userdata.token:{}
  const navigate=useNavigate()
  useEffect(()=>{
    if(!loggedIn){
      alert("You are not logged In,Please Login first")
      navigate("/login")
    }
  },[loggedIn])
  useEffect(()=>{
    async function fetchingHistory(){
      try{
          
          const resp=await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking/',{
          method:"GET",
          headers:{
            "projectId":PROJECT_ID,
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
        if(!resp.ok){
          throw new Error("Something went wrong")
        }
        else{
          const response=await resp.json();
          const fullHistorryArray=response.data
          setTravelArr(fullHistorryArray.filter(flight=>flight.booking_type=="flight"))
          setHotelArr(fullHistorryArray.filter(flight=>flight.booking_type=="hotel"))
          
        }
      }catch(err){
        console.log(err)
      }
    };
    fetchingHistory()
   
  },[])
  const fetchIndiDetails= async(obj)=>{
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking/${obj._id}`,{
        method:"GET",
        headers:{
          "projectId":PROJECT_ID,
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })
    
      if(!resp.ok){
        throw new Error("Some error occurred while fetching flight booking data")
      }
      else{
        const response=await resp.json();
        navigate("/flightbooking-history",{
          state:{
            response  
          }
        })
      }
    }catch(err){
      alert(err)
    }
  }
  const fetchIndiHotelDetails= async(obj)=>{
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking/${obj._id}`,{
        method:"GET",
        headers:{
          "projectId":PROJECT_ID,
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })
    
      if(!resp.ok){
        throw new Error("Some error occurred while fetching flight booking data")
      }
      else{
        const response=await resp.json();
        navigate("/hotelbooking-history",{
          state:{
            response  
          }
        })
      }
    }catch(err){
      alert(err)
    }
  }
  const showindiflightDetails=(e)=>{
    e.stopPropagation()
    try{
      const obj=travelArr.find(flight=>flight.flight._id==e.target.id)
      if(!obj){
        throw new Error("Something went wrong, please try again!")
      }
      else{
        fetchIndiDetails(obj)
      }
    }catch(err){
      alert(err)
    }
    
  }
  const showingindiflightDetails=(e)=>{
    e.stopPropagation();
    try{
      const obj=travelArr.find(flight=>flight.flight._id==e.target.parentNode.id)
      if(!obj){
        throw new Error("Something went wrong, please try again!")
      }
      else{
        fetchIndiDetails(obj)
      }
    }catch(err){
      alert(err)
    }
  }
  function showindiHotelDetails(e){
    e.stopPropagation();
    try{
      const obj=hotelArr.find(hotel=>hotel._id==e.target.id)
      if(!obj){
        throw new Error("Something went wrong, please try again!")
      }
      else{
        fetchIndiHotelDetails(obj)
      }
    }catch(err){
      alert(err)
    }
  }
  const showingindiHotelDetails=(e)=>{
    e.stopPropagation();
    try{
      const obj=hotelArr.find(hotel=>hotel._id==e.target.parentNode.id)
      if(!obj){
        throw new Error("Something went wrong, please try again!")
      }
      else{
        fetchIndiHotelDetails(obj)
      }
    }catch(err){
      alert(err)
    }
  }
  function closeAndOpenTab(e){
    if(e.target.id==="a1"){
      ref3.current.classList.add("active")
      ref4.current.classList.remove("active")
      ref1.current.classList.add("block");
      ref1.current.classList.remove("hidden");
      ref2.current.classList.add("hidden");
      ref1.current.classList.remove("block");
    }
    else{
      ref3.current.classList.remove("active")
      ref4.current.classList.add("active")
      ref1.current.classList.remove("block");
      ref1.current.classList.add("hidden");
      ref2.current.classList.remove("hidden");
      ref1.current.classList.add("block");
    }
  }
  return (
    <div  className="historypage">
      {loggedIn?<div className="historydetails">
        <h1>Welcome, {user}</h1>
        <div className="tabdiv"><h6 onClick={closeAndOpenTab}  ref={ref3} id="a1" className="active">Travel History</h6><h6 ref={ref4} onClick={closeAndOpenTab} id="a2">Hotel Booking History</h6></div>
        <div className ="travelhistory block " ref={ref1}>
          
          <div className="travelhistorycards " >
          {
            travelArr.map(flight=>(
              <div key={flight._id} id={flight.flight._id} onClick={showindiflightDetails} className="historycards">
                <span onClick={showingindiflightDetails}>SOURCE: {flight.flight.source}</span>
                <span onClick={showingindiflightDetails}>DESTINATION: {flight.flight.destination}</span>
                <span onClick={showingindiflightDetails}>DEPARTURE TIME : {flight.flight.departureTime}</span>
                <span onClick={showingindiflightDetails}>ARRIVAL TIME: {flight.flight.arrivalTime}</span>
              </div>
            ))
          }
        </div>
      </div>
      <div className="hotel hidden" ref={ref2}>
        
        <div className="travelhistorycards " >
          {
            hotelArr.map(hotel=>(
              <div key={hotel._id} id={hotel._id} onClick={showindiHotelDetails} className="historycards">
                <span onClick={showingindiHotelDetails}>Check-In Date: {hotel.start_date.split("T")[0]}</span>
                <span onClick={showingindiHotelDetails}>Check-Out Date: {hotel.end_date.split("T")[0]}</span>
              </div>
            ))
          }
        </div>
      </div> 
    </div>:<h1>Please Login </h1>}
    </div>
  )
}
