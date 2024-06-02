import React from 'react'
import{useLocation} from 'react-router-dom'
import NavBar from '../NavBar'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './booking.css'
import vistara from '../assets/icons/vistara.png'
import AirIndia from '../assets/icons/AirIndia.png'
import spicejet from '../assets/icons/spicejet.png'
import goair from '../assets/icons/goair.png'
import indigo from '../assets/icons/indigo.png'
import kingfisher from '../assets/icons/kingfisher.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const flightObj={
    "UK":{
        airline:"Vistara",
        img:vistara
    },
    "AI":{
        airline:"AirIndia",
        img:AirIndia
    },
    "SG":{
        airline:"SpiceJet",
        img:spicejet
    },
    "G8":{
        airline:"GoAir",
        img:goair
    },
    "6E":{
        airline:"IndiGo",
        img:indigo
    },
    "def":{
        airline:"KingFisher",
        img:kingfisher
    }
}
export default function FlightBookingConfirm() {
    const location=useLocation();
    const srci=location?.state.srci
    const desti=location?.state.desti   
    const dateeString=location?.state?.dateeString 
    const airline=location?.state?.flightDetails
    console.log(airline)
    return (
    <>
        <NavBar/>
        <hr/>
        <div className="flightBookingReviewSection">
            <div className="flightBookingIcon">1</div>
            <h2>Review your itinerary</h2>
        </div>
        <div className="flightBookingRouteDetail">
            <div className="flightRoute">
                <span>
                    {srci.split(" - ")[1].split(",")[0]}
                </span>
                                                        
                <ArrowRightAltIcon/>
                
                <span>
                    {desti.split(" - ")[1].split(",")[0]}
                </span>
            </div>                                          
             
            <span>{dateeString.slice(0,4)}, {dateeString.slice(4)}</span>
        </div>
        <div className="flightDetail">
            <div className="flightDetail-flight">
                <img className="flightImg" src={flightObj[airline.flightID.slice(0,2)]?flightObj[airline.   flightID.slice(0,2)].img:flightObj["def"].img}
                alt={flightObj[airline.flightID.slice(0,2)]?flightObj[airline.flightID.slice(0,2)].airline:flightObj["def"].airline}/>
                <span>{flightObj[airline.flightID.slice(0,2)]?flightObj[airline.   flightID.slice(0,2)].airline:flightObj[def].airline}</span>
                <span>{airline?.flightID.split("-")[0].slice(0,2)}-{airline?.flightID.split("-")[0].slice(2)} </span>
                <span>Economy</span>
            </div>
            <div className="flightdecor">
                <div className="dottedSpan a"/>
                <div className="dashedSpan"/>
                <div className="dottedSpan b"/>
            </div>
            <div className="flightdurationdet">
                <div className="flighttimflex">
                    <span>{airline.arrivalTime}</span>
                    <span>{airline.source}</span>
                </div>
                <div className="flighttimicon">
                    <AccessTimeIcon/>
                    <span>{`${airline.duration} h`}</span>
                </div>
                <div className="flighttimflex">
                    <span>{airline.departureTime}</span>
                    <span>{airline.destination}</span>
                </div>
            </div>
        </div>
  </>
    
  )
}
