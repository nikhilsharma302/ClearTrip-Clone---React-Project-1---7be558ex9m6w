import React, {useState,useEffect,useContext} from 'react'
import FLIGHT_PAGE_BASE_API from '../components/assets/Constants'
import MyStore from './assets/Context'
export default function Offers() {
    const[ searchParams,setSearchParams]=useState("")
    const {filteredData}=useContext(MyStore)
    const newData=filteredData;
    let timer;
    useEffect(()=>{setSearchParams(filteredData)
    },[filteredData])
    const[addata,setAdData]=useState({})
    async function calling(){  
        try{
            //console.log("newData is: ",newData)
            const res=await fetch(`${FLIGHT_PAGE_BASE_API}{"type":"${newData}"}`,{
                method:"GET",
                headers:{projectID:"f104bi07c490"}
            })
            
            if(!res.ok){
                throw new Error("Unable to fetch Data");
            }
            else{
                const response=await res.json();
               // console.log(response.data.offers)
                let index=1;
                setAdData(response.data.offers[0])
                function showoffer(){
                    if(index===response.data.offers.length){
                        index=0
                    };
                    //console.log(response.data.offers[index])
                    setAdData(response.data.offers[index]);
                    index++;

                }
                function show(){
                    clearInterval(timer);
                    timer=setInterval(()=>{showoffer()},2000)
                }
                show();
                console.log(response.data.offers.map((value)=>(value.heroUrl)))
            }
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{calling()},[newData])
    
  return (
    <div className="offers">
        {
            <div key={addata?.id}>
                {addata?.heroUrl &&<img src={addata.heroUrl} alt="hro"className="heropic"/> }   
            </div>
     
        }
    </div>
  )
}
