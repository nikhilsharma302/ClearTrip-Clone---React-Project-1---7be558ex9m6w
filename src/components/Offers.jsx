import React, {useState,useEffect,useContext} from 'react'
import FLIGHT_PAGE_BASE_API from '../components/assets/Constants'
import MyStore from './assets/Context'
export default function Offers() {
    const {filteredData}=useContext(MyStore)
    let timer;
    const[searchFilter,setSearchFilter]=useState("FLIGHTS")
    const[addata,setAdData]=useState({})
    async function calling(){  
        clearInterval(timer)
        setSearchFilter(filteredData)
        try{
            const res=await fetch(`${FLIGHT_PAGE_BASE_API}{"type":"${searchFilter}"}`,{
                method:"GET",
                headers:{projectID:"f104bi07c490"}
            })
            
            if(!res.ok){
                throw new Error("Unable to fetch Data");
            }
            else{
                const response=await res.json();
                //console.log(response.data.offers)
                let index=1;
                setAdData(response.data.offers[0])
                function showoffer(){
                    if(index===response.data.offers.length){
                        index=0
                    };
                    setAdData(response.data.offers[index]);  
                    index++;
                }
                function show(){
                    clearInterval(timer);
                    timer=setInterval(()=>{showoffer()},2500)
                }
                show();
            }
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{calling();
        return ()=>clearInterval(timer)},
    [searchFilter])
    //console.log(addata)
  return (
    <div className="offers">
        <div key={addata?.id} className="addisplay"  style={{backgroundImage:`url(${addata?.heroUrl})`}}>
            <div>{addata?.pTx}</div>
            <div className="addetails">    
                <div>{addata?.pTl}</div>
            </div>
        </div>     
    </div>
  )
}
