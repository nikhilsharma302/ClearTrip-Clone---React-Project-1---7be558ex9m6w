import React,{useRef,useContext,useState} from 'react'
import NavBar from '../../NavBar'
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import PlaceIcon from '@mui/icons-material/Place';
// import TextField from '@mui/material/TextField'
// import {DatePicker} from '@mui/x-date-pickers'
import {useLocation,useNavigate} from 'react-router-dom'
import MyStore from '../Context';
import './Hotels.css'

export default function IndividualHotelDetails({}) {
    const {loggedIn}=useContext(MyStore)
    const ref1=useRef()
    const ref2=useRef()
    const ref3=useRef()
    const location=useLocation()
    const navigate=useNavigate()
    const hotelId=location?.state?.data?._id
    //const {departDate,setDepartDate,arrivDate,setArrivDate}=useContext(MyStore)
    if(location?.state==null || location?.state?.data?._id==null){
        navigate("/hotels")
    }
    function bookSeat(hotelId,roomType,costPerNight,roomSize,price,bedDetail,baseCost,taxesAndFees,discount){
        if(!loggedIn){
            alert("Please login before booking seats");
            window.open("/login","_blank")
        }
        else{
           console.log(baseCost,taxesAndFees,discount)
            navigate(`/hotel-confirm/hotel=${hotelId}`,{
                state:{
                    "locate":location?.state,
                    
                    hotelId,roomType,costPerNight,roomSize,price,
                    bedDetail,baseCost,taxesAndFees,discount
                }
            })
        }
    }
    function displayselected(e){
        e.stopPropagation()
        let array = Array.prototype.slice.call(e.target.parentNode.childNodes)
        array.map(child=>child.classList.remove("selected"))
        e.target.classList.add("selected")
        if(e.target.innerText==="General"){
            ref1.current.classList.remove("hidden");
            ref1.current.classList.add("show");
            ref2.current.classList.add("hidden");
            ref2.current.classList.remove("show");
            ref3.current.classList.add("hidden");
            ref3.current.classList.remove("show");
        }
        else if(e.target.innerText==="Amneties"){
            ref1.current.classList.add("hidden");
            ref1.current.classList.remove("show");
            ref2.current.classList.remove("hidden");
            ref2.current.classList.add("show");
            ref3.current.classList.add("hidden");
            ref3.current.classList.remove("show");

        }
        else if(e.target.innerText==="Rooms"){
            ref1.current.classList.add("hidden");
            ref1.current.classList.remove("show");
            ref2.current.classList.add("hidden");
            ref2.current.classList.remove("show");
            ref3.current.classList.remove("hidden");
            ref3.current.classList.add("show");

        }
        
    }
    function showimgs(){
        const images=location?.state?.data?.images;
        var encodedUrls = encodeURIComponent(JSON.stringify(images)); // 
        window.open(`/hotels/details/${location.state.data._id}/img/?images=${encodedUrls}`, "_blank");
    }
  return (
    <React.Fragment>
        <NavBar className="navBar"/>
        <div className="hoteldetails">
        {/*  */}
            <div className="hotelCardsNavBaritems">
                {/* <div className="landmarkrow" 
                    onClick={()=>setDivClicked(true)} 
                >
                    <LocationOnOutlinedIcon/>
                    <PlaceIcon style={{color:"#da8210"}}/>
                    <TextField fullWidth id="outlined-basic"                  
                        variant="standard" 
                        InputProps={{disableUnderline: true }}   
                    />
                </div> */}
            
            {/* <div>
                Check-In */}
            
            {/* <DatePicker
                sx={{width:"20%",marginRight:"0"} }
                onChange={(e)=>setDepartDate(e.$d)}
                label={departDate}
            />
            </div>
            <div>
            Check-out
            <DatePicker
                sx={{width:"20%"} }
                label={arrivDate}
                onChange={(e)=>setArriveDate(e.$d)}
            />
            </div> */}
           
        </div>
      <div className="hotecardmainsection">
        <div className="hotelcardproperties">
            <ul className="hotelproperties" >
                <li onClick={displayselected}>General</li>
                <li onClick={displayselected}>Amneties</li>
                <li onClick={displayselected}>Rooms</li>
            </ul>
            <div className="General" ref={ref1}>
                <h1>
                    {location?.state?.data?.name} 
                </h1>
                <p>{location?.state?.data?.location}</p>
                <p>{location?.state?.data?.rating}/5</p>
                 
            </div>
            <div className="Amneties hidden " ref={ref2}>
            <h1>Amneties</h1>
                <ul style={{listStyleType:"none",textAlign:"left",lineHeight:"1.5",fontSize:"large",fontWeight:"bold"}}>
                {
                    location?.state?.data?.amenities.map(item=>(
                        <li key={item}>{item}</li>
                    ))
                }
                </ul>  
            </div>
            <div className="Rooms hidden" ref={ref3}>
                <div className="hotelflexbox">
                    {
                        location?.state?.data?.rooms.map(room=>(
                            <div key={room.roomNumber} className="hotelbox">
                                <span>Room Type: {room.roomType}</span>
                                <span>Price: {room.costPerNight}/night</span>
                                <span>Room Size: {room.roomSize}</span>
                                <span>Bed Details: {room.bedDetail}</span>
                                <span>Room Price: {room.price}</span>
                                <span>Cancellation Policy: {room.cancellationPolicy}</span>
                                <span>Meals Offered: {room.meals.map((item,index)=>(<span key={index}>{item}</span>))}</span>
                                <div className="hotelboxprice">
                                    <div><b>Base Cost:</b> {room.costDetails.baseCost}</div>
                                    <div> Taxes: {room.costDetails.taxesAndFees}</div>
                                    <div> Discount: {room.costDetails.discount}</div>
                                </div>
                                <button onClick={()=>bookSeat(hotelId,room.roomType,room.costPerNight,room.roomSize,room.price,room.bedDetail,room.costDetails.baseCost,room.costDetails.taxesAndFees,room.costDetails.discount)}>Book Now</button>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <div className="hotelimgcontainer">
            <img src={location?.state?.data?.images[0]} alt="hotel image"/>
            <button onClick={showimgs}>Show all images</button>
            <div className="hoteroomprice">
                <span>{`${location?.state?.data?.rooms[0]?.costDetails.baseCost} + ₹${location?.state?.data?.rooms[0]?.costDetails.taxesAndFees} tax / night`}</span>
                <button >Select Room</button>
            </div>
        </div>
      </div>
      
    </div>
    </React.Fragment>
  )
}
