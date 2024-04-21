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
import PlaceIcon from '@mui/icons-material/Place';
import MoreOpt from './assets/MoreOpt';
import { PROJECT_ID } from './assets/Constants';
export default function Hotels(){
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
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/city`,{
        headers:{
          projectID:PROJECT_ID
        }
      }
      )  
      if(!resp.ok){
        throw new Error("Unable to fetch city details")
      }
      else{
        const response=await resp.json();
        console.log(response.data.cities)
        setshowhotels(true)
        setcity(response.data.cities)
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
        <div  className="landmark" onClick={()=>setDivClicked(true)} style={{marginTop:"5%"}} >
          {!divClicked&&<LocationOnOutlinedIcon/>}
          {divClicked&&<PlaceIcon style={{color:"#da8210"}}/>}
          <TextField fullWidth id="outlined-basic" 
          placeholder="Enter locality, landmark, city or hotel"
          variant="standard" style={{width:"90%", border:"none",height:"5vh",textAlign:"center",paddingTop:"1%",fontSize:"xx-large"}}
          onChange={searchCity}
          value={selectcity}
          InputProps={{disableUnderline: true }}
        />
        <ul >{showhotels&&
          city.map(singlecity=>(
            <li  onClick={(e)=>{setselectcity(e.target.innerText);
              console.log(e.target.innerText);
              setshowhotels(false)}} key={singlecity._id}>{singlecity.cityState}</li>
          ))  }
        </ul>

   
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
          <div id="usercheckinoutshow" ><div onClick={showdiv}>
            {!showIcon&&<PersonOutlineOutlinedIcon />}
            {showIcon&&<PersonIcon/>}
            <div>{persons}</div>
            </div>
           {showdivval&& <div className="divhover">
              <Paper elevation={3}>
              <div onClick={(e)=>{setpersonandromm(e)}}>
                  {!showop
                  &&<div classname="personOptsDiv">
                  <div  className="personOpts">1 Room, 1 Adult</div>
                  <div  className="personOpts">1 Room, 2 Adults</div>
                  <div  className="personOpts">2 Rooms, 4 Adults</div>
                  <div  className="personOpts">2 Rooms, 3 Adults</div>
                  </div>}
                  {showop&&<MoreOpt setpersonandromm={setpersonandromm}/>}
                </div>
                {!showop&&<div className="moreopt" onClick={dispmore}>Add more rooms and travellers</div>}
              </Paper>
            </div> }
          </div>
        </div>
        <Button variant="contained" style={{ backgroundColor:"#da8210"}} >Search Hotels</Button> 
      </div>
    </div>
  )
}
