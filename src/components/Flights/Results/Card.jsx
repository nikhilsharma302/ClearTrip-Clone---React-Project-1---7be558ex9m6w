import React,{useEffect,useState,useContext} from 'react'
import{useNavigate} from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {FLIGHT_SEARCH_API,PROJECT_ID} from '../../assets/Constants'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import vistara from '../../assets/icons/vistara.png'
import AirIndia from '../../assets/icons/AirIndia.png'
import spicejet from'../../assets/icons/spicejet.png'
import goair from '../../assets/icons/goair.png'
import indigo from '../../assets/icons/indigo.png'
import kingfisher from '../../assets/icons/kingfisher.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MyStore from '../../assets/Context';
const flightObj={
    "UK":{
        airline:"Vistara",
        img:vistara
    },
    "AI":{
        airline:"AirIndia",
        img:AirIndia
    },
    "SG":{
        airline:"SpiceJet",
        img:spicejet
    },
    "G8":{
        airline:"GoAir",
        img:goair
    },
    "6E":{
        airline:"IndiGo",
        img:indigo
    },
    "def":{
        airline:"KingFisher",
        img:kingfisher
    }
}
let filterObj={}
export default function Card({flightarr,setFlightArr,srci,desti,day,dateeString}) {
    const navigate=useNavigate()
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
    const[minPrice,setMinPrice]=useState();
    const[maxPrice,setMaxPrice]=useState()
    const [datachange,setdatachange]=useState(true)
    const [indidata,setIndiData]=useState([]);
    const[Dates,setDates]=useState([]);
    const {loggedIn}= useContext(MyStore)
    async function findMinAndMax(flightarr){
        if(flightarr&&flightarr.length>0){
            const newobj= await flightarr.map(single=>(
                Number(single.ticketPrice))
            )
            newobj.sort()
            setMaxPrice(newobj[newobj.length-1])
            setMinPrice(newobj[0]) 
        }  
    }
    useEffect(()=>{
        const dates=dateeString.split(" ");
        setDates(dates);
        findMinAndMax(flightarr&&flightarr.length>0?flightarr:[])
    },[])
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
                
                if(!resp.ok){
                    throw new Error("Unable to search for flight, please recheck the request")
                }
                else{
                    const response=await resp.json();
                    setFlightArr(response.data.flights);
                    setdatachange(!datachange)
                    findMinAndMax(response.data.flights)
                }
            }catch(err){
                console.log(err)
            }
        }
    }
    useEffect(()=>{
        sortFlights(paramObj)
    },[paramObj])
    async function callingdetails(iid){
        try{
            const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${iid}`,{headers:{
                projectId:"f104bi07c490"
            }})
            if(!resp.ok){
                throw new Error("Unable to fetch flight details of flight with id= ",iid)
            }
            else{
                let newdata
                const response=await resp.json();
                newdata=response.data;
                const indx = indidata.findIndex(item => item._id === newdata._id);
                
                if(indx===-1){
                    setIndiData([...indidata,newdata])
                }
                else{
                    indidata[indx]=newdata;
                    setIndiData(indidata)
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    async function flightFilter(filterObj){
        const filterParams=JSON.stringify(filterObj)
        if(srci&&srci.length>0&&desti&&desti.length>0)
        try{
            const resp=await fetch(`${FLIGHT_SEARCH_API}{"source":"${srci.slice(0,3)}","destination":"${desti.slice(0,3)}"}&day=${day}&filter=${filterParams}`
                ,{
                headers:{
                    projectID:`${PROJECT_ID}`,
                  }
                })
                
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
                "departureTime":0
            }
        }
        else if(departSort==="increase"){
            prObj={
                "departureTime":-1
            }
        }
        else{
            prObj={
                "departureTime":1
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
                "arrivalTime":-1 
            }
        }
        else if(arrivSort==="decrease"){
            prObj={
                "arrivalTime":1   
            }
        }
        else{
            prObj={
                "arrivalTime":0  
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
                "ticketPrice":-1
            }
        }
        else if(priceSort==="decrease"){
            prObj={
                "ticketPrice":1
            }
        }
        else{
            prObj={
                "ticketPrice":0
            }
        }
        const val=priceSort==="a"?"increase":(priceSort==="increase"?"decrease":"increase")
        setPriceSort(val) 
        setParamObj(prObj)
    }
    function showFlightDet(e){
        e.stopPropagation();
        let id
        if(e.target.nodeName==="P"){
           id=e.target.parentNode.id
        }
        else{
            id=e.target.id
        }
        flightarr.map(airflight=>{
            let iid;
            if(airflight.flightID===id && e.target.nodeName==="DIV"){
                    e.target.childNodes[0].classList.toggle("show")
                    e.target.childNodes[0].classList.toggle("hidden")
                    e.target.childNodes[1].classList.toggle("show")
                    e.target.childNodes[1].classList.toggle("hidden") 
                    e.target.parentNode.childNodes[2].classList.toggle("show")
                    e.target.parentNode.childNodes[2].classList.toggle("hidden")         
            }
            else if(airflight.flightID===id && e.target.nodeName==="P"){
                e.target.parentNode.childNodes[0].classList.toggle("show")
                e.target.parentNode.childNodes[0].classList.toggle("hidden")
                callingdetails(airflight._id)
                e.target.parentNode.childNodes[1].classList.toggle("show")
                e.target.parentNode.childNodes[1].classList.toggle("hidden")
                e.target.parentNode.parentNode.childNodes[2].classList.toggle("show")
                e.target.parentNode.parentNode.childNodes[2].classList.toggle("hidden")
                iid=airflight._id
            }
        })
    }
    function setfilterObj(e,{type}){
        if([type]=="ticketPrice"){
            setRangeVal(e.target.value)
            filterObj={...filterObj,[type]:{"$lte":maxPrice,"$gte":e.target.value}}
            
        }
        else{
            filterObj={...filterObj,[type]:e.target.value}
        }
          
        flightFilter(filterObj) 
    }
    function bookSeat(e){
        if(!loggedIn){
            alert("Please login before booking seats");
            window.open("/login","_blank")
        }
        else{
            const flightDetails=flightarr.find(flight=>flight._id===e.target.parentNode.parentNode. parentNode.parentNode.id)
            //console.log(e.target.parentNode.parentNode.parentNode.parentNode.id)
        
            navigate("/flight-confirm",{
                state:{
                    flightDetails,
                    srci,
                    desti,dateeString
                }
            })
        }
    }
    return (
        flightarr && flightarr.length>0 && <div className="flightmain">
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
                        <input type="checkbox" name="group1" value="0"  onSelect={(e)=>setfilterObj(e,{type:"stops"})}/><label htmlFor="Non-stop" >Non-stop</label><br/>
                        <input type="checkbox" name="group1" value="1" onChange={(e)=>setfilterObj(e,{type:"stops"})}/><label htmlFor="1stop">1 stop</label><br/>
                        <input type="checkbox" name="group1" value="2"  onChange={(e)=>setfilterObj(e,{type:"stops"})}/><label htmlFor="2stop">2 stop</label><br/>
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
                                <input type="checkbox"  value="midnight-8 am" name="group2" onChange={(e)=>setfilterObj(e,{type:"departureTime"})} /><label htmlFor="Early morning">Early morning</label>
                            </div>
                            <p >Midnight - 8 am</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2" /><label htmlFor="Morning">Morning</label>
                            </div>
                            <p>8 am - Noon</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2" /><label htmlFor="Afternoon">Afternoon</label>
                            </div>
                            <p>Noon - 4 pm</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2" /><label htmlFor="Afternoon">Afternoon</label>
                            </div>
                            <p>4 pm - 8 pm</p>
                        </div>
                        <div className="cardflex1">
                            <div>
                                <input type="checkbox" name="group2" /><label htmlFor="Night">Night</label>
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
                        <p className="cardflex1">{maxPrice&&`Up to ₹ ${maxPrice}`}  </p>
                        <input style={{width:"100%"}} type="range" value={rangeval} min={minPrice} max={maxPrice} default={(minPrice+maxPrice)/2} onChange={(e)=>setfilterObj(e,{type:"ticketPrice"})}/>
                        <div className="cardflex1">
                        <p>{minPrice>0&&`₹ ${minPrice}`}</p><p>{maxPrice>0&&`₹ ${maxPrice}`}</p>
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
            <table className="flightdetailstable" cellSpacing="0">
                <thead>
                    <tr className="flightDataHeadRow" >
                        <th>
                            <span>Airlines</span>
                            <span onClick={depart}>
                            Departure
                            { 
                                departSort==="a"?"":(departSort==="increase"? <NorthIcon sx={{fontSize:"small"}}/>
                                :<SouthIcon sx={{fontSize:"small"}} />)
                            }
                            
                            </span>
                            <span onClick={durat}>
                                Duration
                                {
                                duratSort==="a"?"":(duratSort==="increase"?<NorthIcon sx={{fontSize:"small"}}/>

                                :<SouthIcon sx={{fontSize:"small"}}/>)
                                }
                            </span>
                            <span  onClick={arriv}>
                                Arrival
                                {
                                arrivSort==="a"?"":(arrivSort==="increase"?<NorthIcon sx={{fontSize:"small"}}/>

                                :<SouthIcon sx={{fontSize:"small"}}/>)
                                }
                            </span>
                            <span onClick={pricer} >
                            Price
                                {
                                priceSort==="a"?"":( priceSort==="increase"?<NorthIcon sx={{fontSize:"small"}}/>

                                :<SouthIcon sx={{fontSize:"small"}}/>)
                                }
                            </span>
                            <span>
                                Smart sort
                                <NorthIcon sx={{fontSize:"small"}}/>

                                <SouthIcon sx={{fontSize:"small"}}/>
                            </span>
                        </th>    
                    </tr>
                </thead>
                <tbody >
                    {
                    flightarr.map(airline=>(
                        <tr key={airline._id} id={airline._id} className="flightDataBodyRow">
                            <td>
                                <div className="flexTd" >
                                    <span className="flightCard">
                                        <img className="flightImg" src={flightObj[airline.flightID.slice(0,2)]?flightObj[airline.flightID.slice(0,2)].img:flightObj["def"].img}
                                        alt={flightObj[airline.flightID.slice(0,2)]?flightObj[airline.flightID.slice(0,2)].airline:flightObj["def"].airline}/>
                                        <p>{flightObj[airline.flightID.slice(0,2)]!==undefined?flightObj[airline.flightID.slice(0,2)].airline:flightObj["def"].airline}</p> 
                                    </span>                      
                                    <span>{airline.departureTime}</span>
                                    <span >{airline.duration}h<br/>
                                        <hr style={{textAlign:"center",margin:"auto",width:"80%",height:"1px", backgroundColor:"gray"}}/>
                                        
                                            {airline. stops} stops
                                    </span>
                                    <span className="arrv">{airline.arrivalTime}</span>
                                    
                                    <span>&#8377; {airline.ticketPrice}</span>
                                     <span>
                                        <button className="bookBtn" onClick={bookSeat}>Book</button>
                                    </span>
                                </div>
                                <div onClick={(e)=>showFlightDet(e)} 
                                        id={airline.flightID}  
                                        className="flightalldetails">
                                        <p className="show">
                                            Flight Details...
                                        </p>
                                        <p className="hidden">
                                            Hide Details
                                        </p>
                                </div> 
                                <div className="hidden width-100" id={airline.flightID}>
                                    {
                                        indidata.map(singleflight=>(
                                            singleflight._id===airline._id?
                                            <div className="flightextradetails">
                                                <div className="flightCardDirection">
                                                    <div className="flex">
                                                        <span>
                                                            {/* {singleflight.source}  */}
                                                            {srci.split(" - ")[1].split(",")[0]}
                                                        </span>
                                                        
                                                        <span>
                                                            <ArrowRightAltIcon/>
                                                        </span>
                                                        <span>
                                                            {/* {singleflight.destination} */}
                                                            {desti.split(" - ")[1].split(",")[0]}
                                                        </span> 
                                                    </div>
                                                    <span>
                                                        {`${Dates[0]}, ${Dates[2]} ${Dates[1]}`}
                                                    </span> 
                                                </div>
                                                <div className="flightextradetailsflex">
                                                    <div>
                                                        <img className="flightImg" src={flightObj[singleflight.flightID.slice(0,2)]?flightObj[singleflight.flightID.slice(0,2)].img:flightObj["def"].img}
                                                        alt={flightObj[singleflight.flightID.slice(0,2)]?flightObj[singleflight.flightID.slice(0,2)].airline:flightObj["def"].airline}/>
                                                        <div>
                                                            {
                                                            flightObj[singleflight.flightID.slice(0,2)]!==undefined?flightObj[singleflight.flightID.slice(0,2)].airline:flightObj["def"].airline
                                                            }
                                                        </div>
                                                        <div>{singleflight.flightID.split("-")[0]} {singleflight.departureTime}</div>
                                                    </div>
                                                    
                                                    <div>{singleflight.source.toUpperCase()} {singleflight.departureTime}</div>
                                                    <div className="clockincon"> 
                                                        <AccessTimeIcon/>
                                                        <span>{singleflight.duration}h</span>        
                                                    </div>
                                                    <div>{singleflight.destination.toUpperCase()} {singleflight.arrivalTime}</div>
                                                    <div className="amneties">
                                                        {
                                                            singleflight.amenities.map((item)=>(
                                                                <span key={item}>{item}</span>
                                                            ))
                                                        }

                                                    </div>
                                                    
                                                   
                                                </div>
                                            </div>:null
                                        ))
                                    }
                                </div>  
                            </td>       
                        </tr>
                    ))}
                </tbody>
            </table>   
        </div>
    )
}
