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
export default function Hotels(){
  const navigate=useNavigate()
  const [showIcon,setShowIcon]=useState(false)
  const [showdivval, setShowDivval]=useState(false)
  const date=new Date()
  const [divClicked,setDivClicked]=useState(false)
  const[fromvalue,setfromValue]=useState()
  const {setFilteredData}=useContext(MyStore)
  const [persons,setPersons]=useState("1Room, 2 Adults")
  const [showop,setshowop]=useState(false)
  const [showhotels,setshowhotels]=useState(false);
  const[city,setcity]=useState([])
  const [selectcity,setselectcity]=useState("")
  useEffect(()=>{setFilteredData("HOTELS");
  //setfromValue(date.toDateString())
  },[])
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
    setselectcity(e.target.value.toUpperCase())
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
        navigate(`/hotels/city=${selectcity.toLowerCase()}`,
        {state:{"resarray":response.data.hotels,"redirected":true,"city":selectcity.toUpperCase()}})
      }
    }catch(err){
      console.log(err)
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
            onChange={(e)=>setselectcity(e.target.value)}
            value={selectcity.toUpperCase()}
            InputProps={{disableUnderline: true }}
            />
          </div>
        </div>
        
        <div className="calender" style={{width:"80%"}}>
          <div className="dates">
            <DatePicker
              label="Check-in"
              sx={{width:"40%",marginRight:"0"} }
            />
            <DatePicker
              label="Check-out"
              sx={{width:"40%"} }
            />
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
