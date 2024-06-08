import React from 'react'
import{useLocation,useNavigate} from 'react-router-dom'
import {useContext,useState,useEffect} from 'react'
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
import MyStore from '../assets/Context';
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
        const navigate=useNavigate()
        const location=useLocation();
        let {loggedIn,departDate}=useContext(MyStore)
        const [srci,setSrci]=useState("")
        const [desti,setDesti]=useState("")   
        const [dateeString,setDateeString]=useState("")
        const [airline,setAirLine]=useState("")
        const [email,setEmail]=useState("");
        const [mobile,setMobile]=useState("")
        const [err,setErr]=useState("")
        const [passengername,setPassengerName]=useState("")
        const[pincode,setPinCode]=useState("");
        const [area,setArea]=useState("")
        const [passengerGender,setPassengerGender]=useState("")
        const [btnClicked,setBtnClicked]=useState(false)
        const totalPrice=Math.round(Number(airline?.ticketPrice)*1.18);
        useEffect(()=>{
            setSrci(location?.state?.srci)
            setDesti(location?.state?.desti)
            setDateeString(location?.state?.dateeString)
            setAirLine(location?.state?.flightDetails)
        },[])
        if(!loggedIn){
            navigate("/login")
            return
        }
        if(!srci || !desti || !dateeString || ! airline){
            navigate("/flights")
            return
        }
        async function continueProcess(e){
            e.preventDefault();
            if(email.length<=0|| !email || !mobile || mobile.length!==10 || !passengerGender || !passengername || !btnClicked){
                setErr("*Please fill all details");
            }
            else{
                setErr("");
                navigate("/flightBooking/confirm",{
                    state:{
                        "data":{
                            email,mobile,airline,departDate,passengername,passengerGender,srci,desti,totalPrice,btnClicked
                        }
                    }
                })                
            }
        }
        const handleChange=(e)=>{
            setPassengerGender(e.target.value)
            setBtnClicked(true)
        }
    return (
    <>
    <NavBar/>
    <hr/>
    <div className="flightBookingPage">
      <div id="flightbookingDetailsSection">   
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
                <div className="dashedSpan a"/>
                <div className="dashedSpan b"/>
                <div className="dashedSpan c"/>
                <div className="dashedSpan d"/>
                <div className="dashedSpan e"/>
                <div className="dashedSpan f"/>
                <div className="dashedSpan g"/>
                <div className="dashedSpan h"/>
                <div className="dashedSpan i"/>
                <div className="dottedSpan b"/>
            </div>
            <div className="flightdurationdet">
                <div className="flighttimflex">
                    <span>{`${airline.departureTime} `}</span>
                    <span>{airline.source}</span>
                </div>
                <div className="flighttimicon">
                    <AccessTimeIcon/>
                    <span>{`${airline.duration} h`}</span>
                </div>
                <div className="flighttimflex">
                    <span>{airline.arrivalTime}</span>
                    <span>{airline.destination}</span>
                </div>
            </div>
            <hr/>
        </div>
        <div id="userDetails">
            <div className="flightBookingReviewSection">
                <div className="flightBookingIcon">3</div>
                <h2>Add Contact Details</h2>
            </div>
            <p>E-ticket will be sent to this email and phone number</p>
            <h6>Fields marked * are compulsory</h6>
            <form onSubmit={continueProcess}>
                <div>
                    <label htmlFor="phone">Mobile number*</label><br/>
                    <select >
                        <option value="91">+91</option>
                    </select>
                    <input type="tel" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter your mobile number"/>
                </div>
                <div>
                    <label htmlFor="passengername">Passenger Name*</label><br/>
                    <input type="text" value={passengername} onChange={(e)=>setPassengerName(e.target.value)} placeholder="Enter Passenger Name"/>
                </div>
                <div>
                    <label htmlFor="gender">Gender*</label><br/>
                    <label htmlFor="gender">Male</label>
                    <input type="radio" 
                        checked={passengerGender === 'male'}
                        onChange={handleChange} 
                        name="gender"
                        value="male"
                     />
                    <br/>
                    <label htmlFor="gender">Female</label>
                    <input type="radio" 
                        checked={passengerGender === 'female'}
                        onChange={handleChange}
                        value="female"
                        name="gender"
                    />
                    <br/>
                    <label htmlFor="gender">Other</label>
                    <input type="radio"
                        checked={passengerGender === 'other'}
                        onChange={handleChange}
                        name="gender"
                        value="other"
                    />
                    <br/>
                    
                </div>
                <div>
                    <label htmlFor="email">Email Address*</label><br/>
                    <input type="email" placeholder="Enter your email adrress" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="address">Passenger's Postal Address</label><br/>
                    <textarea placeholder="Enter your full address" value={area} onChange={(e)=>setArea(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="pincode">Pincode</label><br/>
                    <input type="text"  value={pincode} onChange={(e)=>setPinCode(e.target.value)}/><br/>
                </div>
                <div>  
                    <button type="submit">Continue</button><br/>
                    {err}
                </div>
            </form>
        </div>
        
      </div>
      <div className="ticketPricediv">
        <div className="flightBookingReviewSection">
            <div className="flightBookingIcon">3</div>
            <h2>Ticket Price Summary</h2>
        </div>
        <p className="flexP colorRed">{airline.availableSeats} seat left</p>
        <h4 className="flexP">Total Price: {totalPrice}</h4>
        <p className="flexP">1 Adult</p>
        <hr/>
        <p className="flexP">Base fare: {airline.ticketPrice}</p>
        <p className="flexP">Taxes and fees: {(Number(airline.ticketPrice)*.18).toFixed(2)}</p>
        <div className="flexP"><h4 >Total Price: {totalPrice}</h4><p>(* Inclusive of all charges)</p></div>
      </div>
    </div>
  </>
    
  )
}
