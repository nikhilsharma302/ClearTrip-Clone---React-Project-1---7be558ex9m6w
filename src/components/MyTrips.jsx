import React,{useState,useEffect,useContext} from 'react'
import MyStore from './assets/Context'
export default function MyTrips() {
  const {setFilteredData}=useContext(MyStore)
  
  useEffect(()=>{setFilteredData("ALL")
  },[])
  return (
    <div>Hello this is MyTrip page</div>
  )
}
