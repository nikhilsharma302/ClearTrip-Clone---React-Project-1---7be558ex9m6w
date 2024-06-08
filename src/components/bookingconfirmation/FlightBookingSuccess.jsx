import React,{useState} from 'react'
import {useLocation,useNavigate,Link} from 'react-router-dom'
import { PROJECT_ID } from '../assets/Constants';
import { FLIGHT_BOOKING_API } from '../assets/Constants';
import FlightDetails from './FlightDetails';
export default function FlightBookingSuccess() {
    const location =useLocation();
    const navigate=useNavigate();
    const email=location?.state?.data?.email;
    const mobile=location?.state?.data?.mobile;
    const passengername=location?.state?.data?.passengername;
    const passengerGender=location?.state?.data?.passengerGender;
    const departDate=location?.state?.data?.departDate;
    const srci=location?.state?.data?.srci
    const desti=location?.state?.data?.desti
    const airline=location?.state?.data?.airline
    const totalPrice=location?.state?.data?.totalPrice
    const [payment,setPayment]=useState("")
    const [btnCheck,setBtnCheck]=useState(false)
    async function confirmBooking(){    
        try{ 
            const userdata=JSON.parse(localStorage.getItem("loggedInUser"))
            const token= userdata.token
            const timeString=`${departDate}${airline["departureTime"]}:00.000+00:00`;
            const flightDetails={
                "bookingType":"flight",
                "bookingDetails":{
                "flightId":airline["_id"],
                "startDate":`${timeString}`,
                "endDate": `${timeString}`,  
                }
            }
            const resp=await fetch(FLIGHT_BOOKING_API,
                {
                    method:"POST",
                    headers:{
                        "Authorization":`Bearer ${token}`,
                        "projectId":PROJECT_ID,
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(flightDetails)
                }
            )
            if(!resp.ok){
                throw new Error("Something went wrong, Please try again after few minutes")
            }
            else{
                if(btnCheck){
                    // <Link to={{pathname:"/flightBooking/confirm/ticket",
                    //         state:{
                    //                 "ticketmessage":"Confirmed",
                    //                 passengername,
                    //                 email,
                    //                 mobile,
                    //                 passengerGender,
                    //                 "status":"Confirmed",
                    //                 airline,
                    //                 srci, 
                    //                 desti,
                    //                 totalPrice,
                    //         }
                    //     }}target="_blank"
                    // />  
                    // const ticketURL = `/flightBooking/confirm/ticket?ticketmessage=Confirmed&passengername=${passengername}&email=${email}&mobile=${mobile}&passengerGender=${passengerGender}&status=Confirmed&srci=${srci}&desti=${desti}&totalPrice=${totalPrice}`;
                    // window.open(ticketURL, '_blank');
                    //const ticketData = await resp.json(); // Assuming the response contains ticket details
                  
                    const airlineString=JSON.stringify(airline);
                    const ticketURL = `/flightBooking/confirm/ticket?ticketmessage=Confirmed&passengername=${passengername}&email=${email}&mobile=${mobile}&passengerGender=${passengerGender}&status=Confirmed&srci=${srci}&desti=${desti}&totalPrice=${totalPrice}&airline=${airlineString}`;
                    const newTab = window.open(ticketURL, '_blank');
                    if (!newTab) {
                        throw new Error('Unable to open the ticket page in a new tab. Please check your browser settings.');
                    }
                }
                else{
                    alert("Please select one Payment Mode")
                }     
            }
        }catch(err){
            alert(err)
            navigate("/flights")
            return
        }
    }
    const cancelBooking=()=>{
        const msg=confirm("Are your sure, you want to cancel booking process")
        if(msg){
            navigate("/flights")
        }
    }
    const setPaymentMode=(e)=>{
        setPayment(e.target.value)   
        setBtnCheck(true)
    }
    return (
    <div className="paymentpage">
        <div>
            <h1>Seat Summary</h1>
            <FlightDetails ticketmessage={"pending"} passengername={passengername} email={email} mobile={mobile} passengerGender={passengerGender} status={"pending"} airline={airline} srci={srci} desti={desti} totalPrice={totalPrice}/>
        </div>
        <div className="flightPayment">
            <h1>Add Payment Details:</h1>
            <h3>Payment Mode</h3>
            <ul className="rdbtn">
                <li>
                    <label htmlFor="Upi">
                        <input type="radio" 
                            name="payment" value="Upi"
                            onChange={setPaymentMode}
                            checked={payment==="Upi"}
                        />
                        UPI
                    </label>
                </li>
                <li>
                    <label htmlFor="debitCard">
                        <input type="radio" name="payment"
                            value="debit" 
                            onChange={setPaymentMode}
                            checked={payment==="debit"}
                        />
                            Debit Card
                    </label>
                </li>
                <li>
                    <label htmlFor="credit">
                        <input type="radio"
                            name="payment"
                            value="credit" 
                            onChange={setPaymentMode}
                            checked={payment==="credit"}
                        />
                        Credit Card
                    </label>
                </li>
                <li>
                    <label htmlFor="inb">
                        <input type="radio" 
                            name="payment" 
                            value="inb"
                            onChange={setPaymentMode}
                            checked={payment==="inb"}
                        />
                        Internet Banking
                    </label>
                </li>
            </ul>
            <button onClick={confirmBooking}>Confirm Booking</button> 
            <button onClick={cancelBooking}>Cancel</button>    
        </div>
    </div>)     
}

