import React,{useState,useEffect,useContext} from 'react'
import MyStore from './assets/Context'
export default function Hotels(){
  const {setFilteredData}=useContext(MyStore)
  
  useEffect(()=>{setFilteredData("HOTELS")
  },[])
  return (
    <div>Hello this is hotels page</div>
  )
}
