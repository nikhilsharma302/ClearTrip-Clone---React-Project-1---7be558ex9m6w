import React from 'react'
import {useLocation, createSearchParams} from 'react-router-dom'
export default function Result() {
  const location=useLocation();
  console.log(location)
  return (
    <>Hello this is flight search result page</>
   
  )
}
