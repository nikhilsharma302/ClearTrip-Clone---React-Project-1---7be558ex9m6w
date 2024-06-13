import React from 'react'
import {useLocation} from 'react-router-dom'
export default function HotelTicketDisplay() {
    const location=useLocation();
    const {response}=location?.state
  return (
    <>
        <div>Hotel Ticket Confirmation</div>
        <span>Status:</span><span>{response?.status}</span>
        <div>
            <span>{response?.message}</span>
        </div>
    </>    
  )
}
