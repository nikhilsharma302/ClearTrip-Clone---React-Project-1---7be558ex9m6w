import React,{useState,useEffect} from 'react'
import NavBar from '../../NavBar'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import TextField from '@mui/material/TextField'
import {DatePicker} from '@mui/x-date-pickers'
import {useLocation,useNavigate} from 'react-router-dom'
import './Hotels.css'
import { PROJECT_ID } from '../Constants';
export default function IndividualHotelDetails() {
    const location=useLocation()
    const navigate=useNavigate()
    try{
        if(location.state==null || location.state.data._id==null){
            navigate("/hotels")
        }
    }
    catch(err){
        navigate("/hotels")
    }
    function displayselected(e){
        e.stopPropagation()
        let array = Array.prototype.slice.call(e.target.parentNode.childNodes)
        array.map(child=>child.classList.remove("selected"))
        e.target.classList.add("selected")
    }
    function showimgs(){
        const images=location?.state?.data?.images;
        var encodedUrls = encodeURIComponent(JSON.stringify(images)); // 
        window.open(`/hotels/details/${location.state.data._id}/img/?images=${encodedUrls}`, "_blank");
    }
  return (
    <div className="hoteldetails">
        <NavBar className="navBar"/>
        <div className="hotelCardsNavBaritems">
            <div className="landmarkrow" 
            onClick={()=>setDivClicked(true)} 
            >
                <LocationOnOutlinedIcon/>
                <PlaceIcon style={{color:"#da8210"}}/>
                <TextField fullWidth id="outlined-basic"                  
                    variant="standard" 
                    InputProps={{disableUnderline: true }}
                />
            </div>
            <DatePicker
                label="Check-in"
                sx={{width:"20%",marginRight:"0"} }
            />
            <DatePicker
                label="Check-out"
                sx={{width:"20%"} }
            />
        </div>
      <div className="hotecardmainsection">
        <div className="hotelcardproperties">
            <ul className="hotelproperties" >
                <li onClick={displayselected}>General</li>
                <li onClick={displayselected}>Amneties</li>
                <li onClick={displayselected}>Rooms</li>
            </ul>
            <div className="General hidden">
                <h1>
                    {location?.state?.data?.name} 
                </h1>
                <p>{location?.state?.data?.location}</p>
                <p>{location?.state?.data?.rating}/5</p>
                 
            </div>
            <div className="Amneties hidden ">
            <h1>Amneties</h1>
                <div>
                {
                    location?.state?.data?.amenities.map(item=>(
                        <span key={item}>{item}</span>
                    ))
                }
                </div>  
            </div>
            <div className="Rooms hidden"></div>
        </div>
       
        <div className="hotelimgcontainer">
            <img src={location?.state?.data?.images[0]} alt="hotel image"/>
            <button onClick={showimgs}>Show all images</button>
            <div>
                <span>{`${location?.state?.data?.rooms[0]?.costDetails.baseCost} + ₹${location?.state?.data?.rooms[0]?.costDetails.taxesAndFees} tax / night`}</span>
                <button>Select Room</button>
            </div>
        </div>
      </div>
      
    </div>
  )
}
