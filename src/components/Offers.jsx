import React, {useState,useEffect,useContext} from 'react'
import FLIGHT_PAGE_BASE_API from '../components/assets/Constants'
import MyStore from './assets/Context'
import Carousel from 'react-material-ui-carousel'
export default function Offers() {
    const {filteredData}=useContext(MyStore)
    let timer;
    const[searchFilter,setSearchFilter]=useState("FLIGHTS")
    const[addata,setAdData]=useState({})
    const[resparr,setresparr]=useState([])
    let index=1
    const [current, setCurrent]=useState(0)
    const[arrl,setArrl]=useState(0)
    function displayAd(item,index){
        if(index===item.length){
            index=0;
        }
        setAdData(item[index])
        setCurrent(index)
    }
    async function calling(){  
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
                setresparr(response.data.offers)
                setAdData(response.data.offers[0])
                clearInterval(timer)
                timer=setInterval(()=>{
                        index= index===response.data.offers.length? 0:index+1   
                        console.log(index)
                        displayAd(response.data.offers,index)
                    },3000
                )   
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{calling();
        return ()=>clearInterval(timer)},
    [searchFilter])
    function carousIncrease(){
        setCurrent(prev=>(prev+1));
        console.log(current)
        displayAd(resparr,current)

    }
  return (
  
    <Carousel  autoPlay={true}  animation="slide" next={ () => {
        carousIncrease()
    } }
    prev={ () => {/* Do other stuff */} } >
        <div className='offers'>
            <div key={addata?.id} className="addisplay"  style={{backgroundImage:`url(${addata?.heroUrl})`}}>
                <div>{addata?.pTx}</div>
                <div className="addetails">    
                    <div>{addata?.pTl}</div>
                </div>
            </div>
        </div>    
    </Carousel>
  )
}
