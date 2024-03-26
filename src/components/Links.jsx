import React from 'react'
import{Link} from 'react-router-dom'
export default function Links() {
  return (
    <div className="links">
        <Link to ="/" className="link">Flights</Link>
        <Link to ="/hotels" className="link">Hotels</Link>
        <Link to ="#" className="link">Offers</Link>
        <Link to ="/mytrips" className="link">My Trips</Link>
    </div>
  )
}
