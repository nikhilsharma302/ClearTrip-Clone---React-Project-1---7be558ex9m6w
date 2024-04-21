import  React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import { FLIGHT_SEARCH_API } from '../../assets/Constants.jsx';
import {useLocation} from 'react-router-dom'
import {DatePicker} from '@mui/x-date-pickers'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import Card from './Card';
import NavBar from '../../NavBar.jsx';
import {PROJECT_ID} from '../../assets/Constants.jsx'
import ShowPort from '../../Modals/ShowPort.jsx';
import "../../../styles/App.css"
export default function Result() {
 
  const location=useLocation();
  const[srci, setSource]=useState(location?.state?.source)
  const[desti, setDestination]=useState(location?.state?.destination)
  const[airports,setairports]=useState([])
  const [srcair, setsrcair]=useState(false)
  const [destair,setdestair]=useState(false)
  const [flightarr,setFlightArr]=useState([]);  
  const [sel,setSel]=useState("1 Traveller")
  const[label,setLabel]=useState(location?.state?.fulldate)
  const[day,setDay]=useState("")
  async function searchingPort(value,iptype){
    setsrcair(false);
    setdestair(false);
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${value}"}`,{
        headers:{
          projectID:`${PROJECT_ID}`
        }
      })
      if(!resp.ok){
        throw new Error("unable to search airport")
      }
      else{
        const response=await resp.json();
        setairports(response.data.airports)
        if(iptype==="src"){
          setsrcair(true);
          setdestair(false);
        }
        else{
          setsrcair(false);
          setdestair(true);
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  function searchPort(e,iptype){
    if(iptype==="src"){
      setSource(e.target.value);
      searchingPort(e.target.value,iptype)
    }
    else if(iptype==="dest"){
      setDestination(e.target.value);
      searchingPort(e.target.value,iptype)  
    }
}
  useEffect(()=>{
    if(location?.state?.searchedFlights){
      setFlightArr(location.state.searchedFlights)
      const splitarr=(location?.state?.fulldate).split('/');
      let day = parseInt(splitarr[0], 10);
      let month = parseInt(splitarr[1], 10) - 1;
      let year = parseInt(splitarr[2], 10);
      let dateObject = new Date(year, month, day);
      //console.log("dateObject is",dateObject)
      setCalenderDate({"$d":dateObject})
    }

  },[]) 
  function changetofromvals(){
    const dest=srci;
    setSource(desti);
    setDestination(dest)
  }
  function setCalenderDate(e){
    const date = e?.$d
    //console.log("typeof date in reults",typeof date)
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const reqday= daysOfWeek[date.getDay()];
    //console.log("reqday ",reqday)
    setDay(reqday)
  }
  async function searchFlights(){
    setFlightArr([])
    //console.log("day in flight page is",day)
    if(srci&&srci.length>0&&desti&&desti.length>0){
      try{
        const resp=await fetch(`${FLIGHT_SEARCH_API}{"source":"${srci.slice(0,3)}","destination":"${desti.slice(0,3)}"}&day=${day}`
        ,{
          headers:{
            projectID:`${PROJECT_ID}`,
          }
        })
        if(!resp.ok){
          throw new Error("Unable to search for flight, please recheck the request")
        }
        else{
          //console.log(`${FLIGHT_SEARCH_API}{"source":"${srci.slice(0,3)}","destination":"${desti.slice(0,3)}"}&day=${day}`)
          const response=await resp.json();
          setFlightArr(response.data.flights);
        }
      }catch(err){
        console.log(err)
      }
    }
  }
  return (
      <>
       <NavBar pageType={true}/> 
        <div className="resultips">
          <div className="resultsinps">
            <div className="inpsteags">
            <input type="text" value={srci} className="resinps" onChange={(e)=>searchPort(e,"src")}/>
            {
              srcair&&
              <div className="showlist">
                <ShowPort airportList={airports} type="source" searchPort={searchPort}
                  setDestination={setDestination} setSource={setSource} positionLeft={"1%"} positionTop={"15%"}/>
              </div>
            }
            </div>
            
            <CompareArrowsIcon onClick={changetofromvals}/>
            <div className="inpsteags">
            <input type="text" value={desti} className="resinps" onChange={(e)=>searchPort(e,"dest")} />
            {
              destair&&
              <div className="showlist">
                <ShowPort airportList={airports} 
                  type="destination" searchPort={searchPort}
                  setDestination={setDestination}
                  setSource={setSource}
                  positionLeft={"10%"} positionTop={"15%"}
                  />
              </div>
            }
            </div>
            
            <DatePicker label={label} onChange={(e)=>setCalenderDate(e)} sx={{width: '1/3',height: '2.8',mb:"2%"}}/>
          </div>
          <div className="resultsBtnsel">
            <Select labelId="" id="demo-simple-select" value={sel} sx={{minWidth: '100',height: '90%'}} onChange={(e)=>setSel(e.target.value)} renderValue={(sel) => (
                            sel
                        )} >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Button variant="contained"
              style={{color:"white",backgroundColor:"black"}}
              onClick={searchFlights}  
            >
              Search
            </Button>
          </div> 
        </div>
        <hr/>
        <div className="flightResults">
          {/*<div className="flightEdit"></div>*/}
          <div className="flightShowContainer">
            <Card flightarr={flightarr} setFlightArr={setFlightArr} srci={srci} desti={desti} day={day}/>
          </div>
        </div>
      </>
  );
}
