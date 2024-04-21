import React,{useEffect,useState} from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {FLIGHT_SEARCH_API,PROJECT_ID} from '../../assets/Constants'
import { useSearchParams } from 'react-router-dom';
export default function Card({flightarr,setFlightArr,srci,desti,day}) {
    const searchparam=useSearchParams();
    const [stopar,setStopar]=useState(false)
    const [tim,setTim]=useState(false)
    const [pr,setPr]=useState(false)
    const [ar,setAr]=useState(false)
    const [sortstop, setSortStop]=useState(1);
    const [sorttime,setSortTime]=useState(1);
    const [sortpr,setSortPr]=useState(1);
    const [sortar,setSortAr]=useState(1)
    const [rangeval,setRangeVal]=useState(40000)
    const [sort,setSort]=useState(0)
    async function searchFlights(searchparamobj){
        setFlightArr([])
        console.log(day)
        const params = JSON.stringify(searchparamobj)
        if(srci&&srci.length>0&&desti&&desti.length>0){
            try{
                const resp=await fetch(`${FLIGHT_SEARCH_API}{"source":"${srci.slice(0,3)}","destination":"${desti.slice(0,3)}"}&day=${day}&filter=${params}`
                ,{
                headers:{
                    projectID:`${PROJECT_ID}`,
                  }
                })
                console.log(`${FLIGHT_SEARCH_API}{"source":"${srci.slice(0,3)}","destination":"${desti.slice(0,3)}"}&day=${day}&sort=${params}`)
                if(!resp.ok){
                throw new Error("Unable to search for flight, please recheck the request")
                }
                else{
                const response=await resp.json();
                setFlightArr(response.data.flights);
                }
            }catch(err){
                console.log(err)
            }
        }
    }
    useEffect(()=>{
        const searchparamobj={
            "stops":sortstop,
            "price":-sortpr,
            "ticketPrice":{"$lte":rangeval}
        } 
        searchFlights(searchparamobj)
    },[sort])
    const flightId=flightarr.map(item=>(item._id))
    let arr=[]
    async function callingdetails(i){
        try{
            const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId[i]}`,{headers:{
                projectId:"f104bi07c490"
            }})
            if(!resp.ok){
                throw new Error("Unable to fetch flight details at index",i)
            }
            else{
                const response=await resp.json();
                 arr=[...arr,response.data]
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        for(let i=0;i<flightId.length;i++)
            callingdetails(i)
    },[flightarr])
    function toggleStop(){  
        setSort(prev=>prev+1)
        setStopar(!stopar)
        const stoping=stopar?1:-1
        setSortStop(stoping)   
    }
    function toggleTim(){ 
        setTim(!tim)
        const stoping=tim?1:-1
        setSortTime(stoping)
        setSort(prev=>prev+1)
    }
    function togglePr(){ 
        setPr(!pr)
        const stoping=pr?1:-1
        setSortPr(stoping)
        setSort(prev=>prev+1)
    }
    function toggleAr(){ 
        setAr(!ar)
        const stoping=ar?1:-1
        setSortAr(stoping)
        console.log("div is clicked")
        setSort(prev=>prev+1)
    }
    console.log(sort)
  return (
        flightarr.length>0&&<div className="flightmain">
            <div className="flightFilter">
                <div className="stops">  
                    <div className="cardflex">
                        <p>Stops</p>
                        <div onClick={toggleStop}>
                            {
                            stopar?<KeyboardArrowUpIcon/>:
                            <KeyboardArrowDownIcon/>
                            }</div>
                    </div>  
                    <div className="stopsfilter">
                        <input type="checkbox" name="group1[]" /><label htmlFor="Non-stop">Non-stop</label><br/>
                        <input type="checkbox" name="group1[]" /><label htmlFor="1stop">1 stop</label><br/>
                        <input type="checkbox" name="group1[]" /><label htmlFor="2stop">2 stop</label><br/>
                    </div>  
                </div>
                <div className="departure">
                    <div className="cardflex">
                        <p>Departure Time</p>
                        <div onClick={toggleTim}>
                            {
                            tim?<KeyboardArrowUpIcon/>:
                            <KeyboardArrowDownIcon/>
                            }
                        </div>
                    </div>
                    <div className="departurefilter">
                        <div className="cardflex1 ">
                            <div>
                                <input type="checkbox"  name="group2[]" /><label htmlFor="Early morning">Early morning</label>
                            </div>
                            <p >Midnight - 8 am</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2[]" /><label htmlFor="Morning">Morning</label>
                            </div>
                            <p>8 am - Noon</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2[]" /><label htmlFor="Afternoon">Afternoon</label>
                            </div>
                            <p>Noon - 4 pm</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2[]" /><label htmlFor="Afternoon">Afternoon</label>
                            </div>
                            <p>4 pm - 8 pm</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2[]" /><label htmlFor="Night">Night</label>
                            </div>
                            <p>8 pm - Midnight</p>
                        </div>
                    </div>
                </div>
                <div className="price"> 
                    <div  className="cardflex">
                        <p>One-way price</p>
                        <div onClick={togglePr}>{pr?<KeyboardArrowUpIcon/>:
                        <KeyboardArrowDownIcon/>}</div>
                    </div>
                    <div className="pricerange">
                        <p className="cardflex1">Up to 60000</p>
                        <input style={{width:"100%"}} type="range" value={rangeval} min="20000" max="60000" default="40000" onChange={(e)=>setRangeVal(e.target.value)}/>
                        <div className="cardflex1">
                        <p>₹ 20000</p><p>₹ 60000</p>
                        </div>
                             
                    </div>
                </div>
                <div className="airline">
                    <div  className="cardflex">
                        <p>Airlines</p>
                        <div  onClick={toggleAr}>{ar?<KeyboardArrowUpIcon/>:
                        <KeyboardArrowDownIcon/>}</div>
                    </div>
                    <div className="airlinesfilter">
                        <input type="checkbox" name="group3[]" /><label htmlFor="itenarary">Show multi-airline itineraries</label><br/>
                    </div>
                </div>
            </div>
            <table className="flightdetailstable">
                <thead>
                    <tr>
                        <th>Airlines</th>
                        <th>Departure</th>
                        <th>Duration</th>
                        <th>Arrival</th>
                        <th>Price</th>
                        <th>Smart sort</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flightarr.map(airline=>(
                            <tr key={airline._id}>
                                <td>{airline.airline}</td>
                                <td>{airline.departureTime}</td>
                                <td>{airline.duration}</td>
                                <td>{airline.arrivalTime}</td>
                                <td>{airline.ticketPrice}</td>
                                <td><button>Book</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>   
        </div>
    )
}
