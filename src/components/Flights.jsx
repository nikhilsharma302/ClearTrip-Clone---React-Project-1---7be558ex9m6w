import React,{useState,useEffect} from 'react'
import { Button } from '@mui/material'
import '../styles/App.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {useContext} from'react'
import MyStore from './assets/Context';
export default function Flights() {
  const[quantity,setQuantity]=useState(1);
  const[person,setPerson]=useState("Adults");
  const[classes,setClasses]=useState("Economy");
  const {setFilteredData}=useContext(MyStore)
  useEffect(()=>{setFilteredData("FLIGHTS")
  },[])
    return (
    <div >
      <div className="flightHomeHeading">   
        <h1>Search Flights</h1>
        <h5>Enjoy hassle free bookings with ClearTrip</h5>
      </div>
      <div className="userinput">
        <div className="seatdetails">
        <PersonOutlineOutlinedIcon/>
          <select >
            <div>{quantity} {person}, {classes}</div>
            <optgroup value={person} onChange={(e)=>{setPerson(e.target.value)}} selected>
              <option value="selected">{quantity} {person}, {classes}</option>
              <option value="adults">Adults
                <div className="flexOption">
                  <div>1</div>
                  <div className="plusIcon"></div>
                </div>
              </option>
              <option value="children">Children
                <div className="flexOption"> 
                  <div>0</div>
                  <div className="plusIcon"></div>
                </div>
              </option>
              <option value="infants">Infants
                <div className="flexOption">
                 
                  <div>0</div>
                  <div className="plusIcon"></div>
                </div>
              </option>
            </optgroup>
            <option>
              <Button variant="outlined">Economy</Button> {"\t"}
            </option>
            <option>
              <Button variant="outlined">Business Class</Button> {"\t"}
            </option>
            <option>
              <Button variant="outlined">First Class</Button> {"\t"}
            </option>
            <option>
              <Button variant="outlined">Premium Economy</Button> {"\t"}
            </option>  
          </select>
        </div>
        <div className="faredetails">
          <Button variant="outlined" 
            style={{borderRadius: "10px"}}>Regular fare
          </Button>
          <Button variant="outlined"
            style={{borderRadius: "10px"}}>Senior Citizen fare
          </Button>
          <Button variant="outlined"
            style={{borderRadius: "10px"}}>Student fare
          </Button>
          <Button variant="outlined"
            style={{borderRadius: "10px"}}>Armed forces fare
          </Button>
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
            <input type="date" placeholder="MM/DD/YYYY"></input>
            <input type="date" placeholder="Return"></input>
            <Button variant="contained" style={{ backgroundColor:"#da8210"}}>Search Flights</Button>
        </div>
      </div>
    </div>
    
  )
}
