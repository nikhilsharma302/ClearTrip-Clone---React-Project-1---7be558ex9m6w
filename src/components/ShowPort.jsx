import React from 'react'
import '../styles/App.css'
export default function ShowPort({airportList,type,searchPort}) {
  return (
    <div>
        {
            airportList.map(item=>(
                <div key={item.name} className="ports" place={`${item.iata_code} - ${item.city}, ${item.country.slice(0,2).toUpperCase()}`} onClick={(ee)=>searchPort({ee,type})}>
                    <span className="portcode">
                        <span>{item.iata_code}</span>
                    </span>
                    <span className="portdetails">
                        <span>
                            {`${item.city}, `}
                        </span>
                        <span>
                            {`${item.country.slice(0,2).toUpperCase()} -`}
                        </span>
                        <span>{item.name.length>11?`${item.name.slice(0,12)}...`:`${item.name}`}
                        </span>
                    </span>
                    
                </div>
            ))
        }
    </div>
  )
}
