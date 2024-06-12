import React from 'react'
import {useLocation} from 'react-router-dom' 
import "./booking.css"
export default function FlightTicket() {
    // const location=useLocation();
    // const {ticketmessage,passengername,email,mobile,passengerGender,status, airline,srci,desti,totalPrice}=location.state;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    console.log("searchParams",searchParams);
    const ticketmessage = searchParams.get('ticketmessage');
    const passengername = searchParams.get('passengername');
    const email = searchParams.get('email');
    const mobile = searchParams.get('mobile');
    const passengerGender = searchParams.get('passengerGender');
    const status = searchParams.get('status');
    const airline = JSON.parse(searchParams.get('airline'))

    //console.log("airline in 2 is ",airline)
    const srci = searchParams.get('srci');
    const desti = searchParams.get('desti');
    const totalPrice = searchParams.get('totalPrice');
    const ticket=Math.round((Math.random()*10000000)+100000000)
  return (
    <ul className="passengerTicket" target="_blank">
    <li><h1>Ticket Summary</h1></li>
    <li><p>Confirmed Ticket Status:</p>{ticketmessage}</li>
    <li><h3>Passenger Name: </h3>{passengername}</li>
    <li><h3>Email Id: </h3>{email}</li>
    <li><h3>Mobile Number: </h3>{mobile}</li>
    <li><h3>Gender: </h3>{passengerGender}</li>
    <li><h3>Ticket Status</h3>{status}</li>
    {
    status==="Confirmed" &&
    <ul>
      <li><h3>Flight Id: </h3>{airline?.flightID}</li>
      <li><h3>Ticket Number: </h3>{ticket}</li>
    </ul>}
    <li><h3>Source: </h3>{srci}</li>
    <li><h3>Departure Date and Time: </h3>{airline?.departureTime}</li>
    <li><h3>Destination :</h3>{desti}</li>
    <li><h3>Arrival Date and Time: </h3>{airline?.arrivalTime}</li> 
    <li><h3>Duration: </h3>{airline?.duration}h</li>
    <li><h3>Ticket Price(inclusive of all Taxes)</h3>{totalPrice}</li>
    
</ul>
  )
}
