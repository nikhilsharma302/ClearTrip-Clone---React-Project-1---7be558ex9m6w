import React,{useEffect,useState} from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {FLIGHT_SEARCH_API,PROJECT_ID} from '../../assets/Constants'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
export default function Card({flightarr,setFlightArr,srci,desti,day}) {
    const [paramObj,setParamObj]=useState({})
    const [stopar,setStopar]=useState(false)
    const [tim,setTim]=useState(false)
    const [pr,setPr]=useState(false)
    const [ar,setAr]=useState(false)
    const [stopClass,setStopClass]=useState("stopsfilter")
    const [departClass,setDepartClass]=useState("departurefilter")
    const[prClass, setPrClass]=useState("pricerange")
    const [rangeval,setRangeVal]=useState(40000)
    const [arClass, setArClass]=useState("airlinesfilter")
    const [departSort,setDepartSort]=useState("a")
    const [duratSort,setDuratSort]=useState("a")
    const[arrivSort,setArrivSort]=useState("a")
    const[priceSort, setPriceSort]=useState("a");

    async function sortFlights(paramObj){
        setFlightArr([])
        const params=JSON.stringify(paramObj)
        if(srci&&srci.length>0&&desti&&desti.length>0){
            try{
                const resp=await fetch(`${FLIGHT_SEARCH_API}{"source":"${srci.slice(0,3)}","destination":"${desti.slice(0,3)}"}&day=${day}&sort=${params}`
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
        sortFlights(paramObj)
    },[paramObj])
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
        setStopar(!stopar) 
        const val=stopClass==="stopsfilter"?"hidden":"stopsfilter"
        setStopClass(val)
    }
    function toggleTim(){ 
        setTim(!tim)
        const stoping=departClass==="departurefilter"?"hidden":"departurefilter"
        setDepartClass(stoping)
        
    }
    function togglePr(){ 
        setPr(!pr)
        const stoping=prClass==="pricerange"?"hidden":"pricerange"
        setPrClass(stoping)
        
    }
    function toggleAr(){ 
        setAr(!ar)
        const stoping=arClass==="airlinesfilter"?"hidden":"airlinesfilter"
        setArClass(stoping)  
    }
    function depart(){
        let prObj;
        if(departSort==="a"){
            prObj={
            "timings":0
            }
        }
        else if(departSort==="increase"){
            prObj={
                "timings":-1
            }
        }
        else{
            prObj={
                "timings":1
            }
        }
        const val=departSort==="a"?"increase":(departSort==="increase"?"decrease":"increase")
        setDepartSort(val) 
        setParamObj(prObj) 
    }
    function durat(){
        let prObj;
        if(duratSort==="a"){
            prObj={
            "duration":0
            }
        }
        else if(duratSort==="increase"){
            prObj={
                "duration":-1
            }
        }
        else{
            prObj={
                "duration":1
            }
        }
        const val=duratSort==="a"?"increase":(duratSort==="increase"?"decrease":"increase")
        setDuratSort(val) 
        setParamObj(prObj)
    }
    function arriv(){
        let prObj;
        if(arrivSort==="increase"){
            prObj={
                "timings":-1 
            }
        }
        else if(arrivSort==="decrease"){
            prObj={
                "timings":1   
            }
        }
        else{
            prObj={
                "timings":0  
            }
        }
        const val=arrivSort==="a"?"increase":(arrivSort==="increase"?"decrease":"increase")
        setArrivSort(val) 
        setParamObj(prObj)
    }
    
    function pricer(){
        let prObj;
        if(priceSort==="increase"){
            prObj={
                "price":-1
            }
        }
        else if(priceSort==="decrease"){
            prObj={
                "price":1
            }
        }
        else{
            prObj={
                "price":0
            }
        }
        const val=priceSort==="a"?"increase":(priceSort==="increase"?"decrease":"increase")
        setPriceSort(val) 
        setParamObj(prObj)
    }
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
                    <div className={stopClass}>
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
                    <div className={departClass}>
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
                    <div className={prClass}>
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
                    <div className={arClass}>
                        <input type="checkbox" name="group3[]" /><label htmlFor="itenarary">Show multi-airline itineraries</label><br/>
                    </div>
                </div>
            </div>
            <table className="flightdetailstable" cellspacing="0">
                <thead>
                    <tr className="flightDataHeadRow" >
                        
                        <th>Airlines</th>
                        <th onClick={depart}>
                            Departure
                            { 
                                departSort==="a"?"":(departSort==="increase"? <NorthIcon sx={{fontSize:"small"}}/>
                                :<SouthIcon sx={{fontSize:"small"}} />)
                            }
                            
                        </th>
                        <th onClick={durat}>
                            Duration
                            {
                               duratSort==="a"?"":(duratSort==="increase"?<NorthIcon sx={{fontSize:"small"}}/>

                                :<SouthIcon sx={{fontSize:"small"}}/>)
                            }
                        </th>
                        <th  onClick={arriv}>
                            Arrival
                            {
                                arrivSort==="a"?"":(arrivSort==="increase"?<NorthIcon sx={{fontSize:"small"}}/>

                                :<SouthIcon sx={{fontSize:"small"}}/>)
                            }
                        </th>
                        <th onClick={pricer} >
                            Price
                            {
                               priceSort==="a"?"":( priceSort==="increase"?<NorthIcon sx={{fontSize:"small"}}/>

                                :<SouthIcon sx={{fontSize:"small"}}/>)
                            }
                        </th>
                        <th>
                            Smart sort
                            <NorthIcon sx={{fontSize:"small"}}/>

                            <SouthIcon sx={{fontSize:"small"}}/>
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        flightarr.map(airline=>(
                            <tr key={airline._id} className="flightDataBodyRow">
                                <td >{airline.airline}</td>
                                <td>{airline.departureTime}</td>
                                <td >{airline.duration}h<div style={{textAlign:"center",margin:"auto",width:"80%",height:"1px", backgroundColor:"gray"}}></div>{airline. stops} stops</td>
                                <td>{airline.arrivalTime}</td>
                                <td>{airline.ticketPrice}</td>
                                <td ><button className="bookBtn">Book</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>   
        </div>
    )
}
