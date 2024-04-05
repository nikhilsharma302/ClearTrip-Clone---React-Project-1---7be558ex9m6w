import React, {useState,useEffect,useContext} from 'react'
import FLIGHT_PAGE_BASE_API from '../components/assets/Constants'
import MyStore from './assets/Context'
import Carous from './assets/Carous'
import {PROJECT_ID} from './assets/Constants'
export default function Offers() {
    const [offerarr,setofferarr]=useState([])
    async function callOffers(){
        try{
            const resp =await fetch('https://academics.newtonschool.co/api/v1/bookingportals/offers?limit=50',{
                headers:{
                    projectId:PROJECT_ID
                }
            })
            if(!resp.ok) throw new Error("Unable to fetch Offers, please check API request")
            else{
                const response=await resp.json();
                setofferarr(response.data.offers)
            }
        }catch(err){
            console.log(err)
        }    
    }
    useEffect(()=>{
        callOffers();
    },[])
           
  return (
   <Carous  offerarr={offerarr}/>
  )
}
