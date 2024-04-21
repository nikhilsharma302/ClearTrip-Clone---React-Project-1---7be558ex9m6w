import React, {useState,useEffect,useContext} from 'react'
import MyStore from './assets/Context'
import Carous from './assets/Carous'
import {PROJECT_ID,GENERAL_OFFER_URL,SECTION_OFFER_URL} from './assets/Constants'
export default function Offers() {
    const {filteredData}=useContext(MyStore)
    const data=filteredData?filteredData:"FLIGHTS"
    //console.log(filteredData)
    const[sectionfilterdata,setSectionData]=useState([])
    const [offerarr,setofferarr]=useState([])
    async function callOffers(){    
        try{
            const resp1 =await fetch(GENERAL_OFFER_URL,{
                headers:{
                    projectID:PROJECT_ID
                }
            })
            const resp2 =await fetch(`${SECTION_OFFER_URL}"${data}"}`,{
                headers:{
                    projectID:PROJECT_ID
                }
            })
            if(!resp1.ok|| !resp2.ok) throw new Error("Unable to fetch Offers, please check API request")
            else{
                const response1=await resp1.json();
                setofferarr(response1.data.offers);
                const response2=await resp2.json()
                setSectionData(response2.data.offers)

            }
        }catch(err){
            console.log(err)
        }    
    }
    useEffect(()=>{
        callOffers();
        

    },[filteredData])
           
  return (
  <>
    <Carous  offerarr={offerarr}/>
    <Carous  offerarr={sectionfilterdata}/>
  </>
 
   
  )
}
