import React,{useState,useEffect,useContext} from 'react'
import MyStore from '../Context'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Button } from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import './Hotels.css'
import '../../../styles/App.css'
import PlaceIcon from '@mui/icons-material/Place';
import MoreOpt from '../MoreOpt';
import { PROJECT_ID } from '../Constants';
import GuestsAndRooms from '../../Modals/GuestsAndRooms';
import {useNavigate} from 'react-router-dom'
import CityList from '../../Modals/CityList';
export default function Hotels(){
  const navigate=useNavigate()
  const [showIcon,setShowIcon]=useState(false)
  const [showdivval, setShowDivval]=useState(false)
  // const [checkIn, setCheckIn]=useState({})
  // const [checkOut, setCheckOut]=useState({})
  const [divClicked,setDivClicked]=useState(false)
  const [showhotels,setshowhotels]=useState(false)
  const {setFilteredData}=useContext(MyStore)
  const [persons,setPersons]=useState("1Room, 2 Adults")
  const [showop,setshowop]=useState(false)
  const [cityArray,setCityArray]=useState([]);
  const [showCityList,setShowCityList]=useState(false)
  const[city,setcity]=useState([])
  const [selectcity,setselectcity]=useState("")
  const[fulldepartdate,setFullDepartDate]=useState("")
  const[fullarrivedate,setFullArriveDate]=useState("")
  useEffect(()=>{setFilteredData("HOTELS");
  //setfromValue(date.toDateString())
  },[])
  const {setDepartDate,arrivDate,setArriveDate,departDate}=useContext(MyStore)
  async function fetchCities(e){
    setselectcity(e.target.value)
    try{
      const resp=await fetch('https://academics.newtonschool.co/api/v1/bookingportals/city',{
        method:"GET",
        headers:{
          "projectID":PROJECT_ID
        }
      })
      if(!resp.ok){
        throw new Error("Something went Wrong please try again");
      }
      else{
        const response=await resp.json();
        setCityArray(response.data.cities);
        setShowCityList(true)
      }
    }catch(err){
      alert(err)
    }
  }
  function showdiv(){
    setShowDivval(!showdivval)
    setShowIcon(!showIcon)
  }
  function setpersonandromm(e){
    setPersons(e.target.innerText);
    setShowDivval(false)
  }
  function dispmore(){
    setshowop(!showop)
  }
  async function searchCity(e){
    //setselectcity(e.target.value.toUpperCase())
    if(!selectcity || !arrivDate || !departDate){
      alert("Please fill all the details")
      return
    }
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${selectcity.toUpperCase()}"}`,
      
      {
        headers:{
          projectID:PROJECT_ID
        }
      })  
      if(!resp.ok){
        throw new Error("Unable to fetch city details")
      }
      else{
        const response=await resp.json();
        setshowhotels(true)
        setcity(response.data.hotels)
        navigate(`/hotels/${selectcity.toLowerCase().split(",")[0]}`,
        {
          state:{
            fulldepartdate,fullarrivedate,
            "resarray":response.data.hotels,"redirected":true,"city":selectcity.toUpperCase()}})
      }
    }catch(err){
      console.log(err)
    } 
  }
  function setDateString(e,{type}){
    if(type=="arrive"){
      setFullArriveDate(e.$d.toLocaleDateString())
    }
    else{
      setFullDepartDate(e.$d.toLocaleDateString())
    }
  }
  return (
    <div >
      <div className="flightHomeHeading">   
        <h1>Search Hotels</h1>
        <h5>Enjoy hassle free bookings with ClearTrip</h5>
      </div>
      <div className="userinput">
        <div className="hotelsearch">
          <div className="landmark" onClick={()=>setDivClicked(true)} 
            style={{marginTop:"5%"}} >
            {!divClicked&&<LocationOnOutlinedIcon/>}
            {divClicked&&<PlaceIcon style={{color:"#da8210"}}/>}
            <TextField fullWidth id="outlined-basic" 
              placeholder="Enter locality, landmark, city or hotel"
              variant="standard" 
              //onChange={(e)=>setselectcity(e.target.value)}
              onChange={(e)=>fetchCities(e)}
              value={selectcity.toUpperCase()}
              InputProps={{disableUnderline: true }}
            />
          </div>
          {showCityList&&<CityList cityArray={cityArray} setselectcity={setselectcity} setShowCityList={setShowCityList}/>}
        </div>
        <div className="calender" style={{width:"80%"}}>
          <div className="dates">
            <div style={{display:"flex",flexDirection:"column",width:"48%",alignItems:"center",justifyContent:"center"}}>
              <label htmlFor='Check-In'>Check-In date</label>
              <DatePicker
              //placeholder="Check-In"
              sx={{width:"100%",marginRight:"0"} }
              onChange={(e)=>{setDepartDate(e.$d),setDateString(e,{type:"depart"})}}
            />
            </div>
            <div style={{display:"flex",width:"48%", flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <label htmlFor='Check-Out'>Check-Out Date</label>
              <DatePicker
              placeholder="Check-Out"
              sx={{width:"100%",marginRight:"0"} }
              onChange={(e)=>{setArriveDate(e.$d),setDateString(e,{type:"arrive"})}}
            />
            </div> 
          </div>
          <div id="usercheckinoutshow" >
            <div onClick={showdiv} className="hoteliconshow">
            {!showIcon&&<PersonOutlineOutlinedIcon />}
            {showIcon&&<PersonIcon/>}
            <div>{persons}</div>
            </div>
            {
              showdivval &&<div className="divhover">
                <div onClick={(e)=>{setpersonandromm(e)}}>
                  {
                    !showop && <GuestsAndRooms/>
                  }
                  {
                    showop  &&  <MoreOpt setpersonandromm={setpersonandromm}/>
                  }
                </div>
                  {
                    !showop &&  <div className="moreopt" onClick={dispmore}>
                      Add more rooms and travellers
                    </div>
                  }
              
              </div>
            }
          </div>
        </div>
        <Button variant="contained" style={{ backgroundColor:"#da8210"}} onClick={searchCity} >Search Hotels</Button> 
      </div>
    </div>
  )
}
