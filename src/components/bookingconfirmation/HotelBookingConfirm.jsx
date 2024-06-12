import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import NavBar from '../NavBar'
import { PROJECT_ID } from '../assets/Constants'
import "./booking.css"

export default function HotelBookingConfirm() {
  // const {setDepartDate,setArriveDate,arrivDate,departDate} =useContext(MyStore)
  const location=useLocation();
  const navigate=useNavigate();
  const data=location.state.locate
   const {hotelId,roomType,costPerNight,roomSize,price,bedDetail,baseCost,taxesAndFees,discount}=location?.state
  const findDateString=(dtObj)=>{
    const monthArr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let monthCode=monthArr.findIndex(str=>str===dtObj.toString().split(" ")[1])
    const day=dtObj.toString().split(" ")[2];
    if(day<10){
      day="0"+day
    }
    monthCode++;
    if(monthCode<10){
      monthCode="0"+monthCode
    }
    return `${dtObj.toString().split(" ")[3]}-${monthCode}-${day}T${dtObj.toString().split(" ")[4]}.000+05:30`
  }
  const confirmBooking=async (e)=>{
    e.preventDefault();
    const checkIn=findDateString(data?.departDate)
    const checkOut=findDateString(data?.arrivDate)
    //console.log(hotelId,checkIn,checkOut)
    try{
      const hotelData={
        "bookingType" : "hotel",
        "bookingDetails" : {
            "hotelId" : `${hotelId}`,
            "startDate" : checkIn, 
            "endDate" : checkOut
        }
      }
    
      const userdata=JSON.parse(localStorage.getItem("loggedInUser"))  
      const token= userdata.token  
      const resp=await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking',
          {
            method:"POST",
            headers:{
              "projectID":PROJECT_ID,
              "Authorization":`Bearer ${token}`,
              "Content-Type":"application/json"
            },
            body:JSON.stringify(hotelData)
          }
      )
    if(!resp.ok){
      throw new Error(resp.toString())
    }
    else{
      const response=await resp.json();
      navigate("/hotels/booking/confirm-ticket",{
        state:{response}
      })
      
    }
  }catch(err){
    console.log(err)
    alert("There is some error while booking hotel, please try again!")
  }
}
  return (
    <div>
      <NavBar/>
      <hr/>
      <h3>Enter Traveller's details:</h3>
      <div className="hotebookingmain">
        <form onSubmit={(e)=>{confirmBooking(e)}} className="hotelclientdetails">
        <label htmlFor="traveller Name">Traveller's Name: </label>
        <input type="text" placeholder="Enter your full name" required/>
        <br/>
        <label htmlFor="email">Email Id: </label>
        <input type="email" placeholder="Enter your Email address" required/>
        <br/>
        <label htmlFor="telephone" >Contact Number: </label>
        <input type="tel" placeholder="Enter your Mobile number" required/>
        <br/>
        <label htmlFor="address">Postal Address: </label>
        <textarea placeholder="Enter your complete address including pincode"></textarea>
        <br/>
        <label htmlFor="hotel name" >Hotel Name: </label>
        <input type="text" value={data.data.name} disabled/>
        <br/>
        <label htmlFor="hotel city" >Hotel City: </label>
        <input type="text" value={data.data.location} disabled/>
        <br/>
        <label htmlFor="checkIn" >Check-In Date: </label>
        <input type="text" value={data.arrivDate}  disabled/>
        <br/>
        <label htmlFor="checkOut" >Check-Out Date:</label> 
        <input type="text" value={data.departDate}  disabled/>
        <br/>
        <button>Confirm Booking</button>
        </form>
        <div className="bookingsummarysection">
          <h3>Room Summary:</h3>
          <div>
            <div>
              <h4>Hotel Name:</h4>
              <p>{data.data.name}</p>  
            </div>
            <div>  
              <h4>Room Type:</h4>
              <p>{roomType}</p>
            </div>
          </div>
          <div>
            <div>
              <h4>Room Size:</h4>
              <p>{roomSize}</p>
            </div>
            <div>
              <h4>Cost per Night:</h4>
              <p>{costPerNight}</p>
            </div>
          </div>
          <div>
            <div>
              <h4>Bed Details:</h4>
              <p>{bedDetail}</p>
            </div>
            <div>
              <h4>Base Fare:</h4>
              <p>{baseCost}</p>
            </div>
          </div>
          <div>
            <div>
              <h4>Taxes and Other Charges:</h4>
              <p>{taxesAndFees}</p>
            </div>
            <div>
              <h4>Discount:</h4>
              <p>{discount}</p>
            </div>
          </div>
          <div>
            <div id="total">
              <h4>Total Charges:</h4>
              <p>₹{` ${baseCost+taxesAndFees-discount}`}</p>
            </div>
          </div>  
        </div>
      </div>    
    </div>
  )
}
