import React,{useState,useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'
import '../../styles/App.css'

export default function ShowPort({airportList,type,searchPort,setDestination,setSource,positionLeft,positionTop,width,blur}) {
    const ref1=useRef()
    
    useEffect(()=>{
        ref1.current.style.position="absolute";
        ref1.current.style.left=positionLeft
        ref1.current.style.top=positionTop
        ref1.current.style.width=width;
       
    },[])
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
  return ReactDOM.createPortal (
    showUl&&
    <div className="ports">
        {blur&&<div className="hidebackground"></div> }
        <ul ref={ref1} className="portlist" >
        {
            airportList.map(item=>(
                <li className="liflex" key={item.name}   onClick={()=>setVal({item},type)}>
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
    </div>,document.getElementById("port")
  )
}
