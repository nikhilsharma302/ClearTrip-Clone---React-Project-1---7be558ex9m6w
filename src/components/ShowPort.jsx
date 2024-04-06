import React,{useState} from 'react'
import '../styles/App.css'
export default function ShowPort({airportList,type,searchPort,setDestination,setSource}) {
    const [showUl,setShowUl]=useState(true)
    function setVal({item},type){
        if(type==="source"){
            let newStr=`${item.iata_code} - ${item.city}, ${item.country.slice(0,2).toUpperCase()}`
            setSource(newStr)
        }
        if(type==="destination"){
            let newStr=`${item.iata_code} - ${item.city}, ${item.country.slice(0,2).toUpperCase()}`
            setDestination(newStr)
        }
        setShowUl(false)
    }
  return (
    showUl&&
    <ul>
        {
            airportList.map(item=>(
                <li key={item.name} className="ports"  onClick={()=>setVal({item},type)}>
                    <span className="portcode">
                        <span>{item.iata_code}</span>
                    </span>
                    <span className="portdetails">
                        <span >
                            {`${item.city}, `}
                        </span>
                        <span >
                            {`${item.country.slice(0,2).toUpperCase()} -`}
                        </span>
                        <span >{item.name.length>11?`${item.name.slice(0,12)}...`:`${item.name}`}
                        </span>
                    </span>  
                </li>
            ))
        }
    </ul>
  )
}
