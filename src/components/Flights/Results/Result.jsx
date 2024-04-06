import  React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../../assets/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import {useNavigate,useLocation} from 'react-router-dom'
import {DatePicker} from '@mui/x-date-pickers'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import Card from './Card';
import {PROJECT_ID} from '../../assets/Constants.jsx'
import ShowPort from '../../ShowPort';
import "../../../styles/App.css"
export default function ButtonAppBar() {
  const navigate=useNavigate();
  const location=useLocation();
  const[srci, setSource]=useState(location.state.source)
  const[desti, setDestination]=useState(location.state.destination)
  const[airports,setairports]=useState([])
  const [srcair, setsrcair]=useState(false)
  const [destair,setdestair]=useState(false)
  const [flightarr,setFlightArr]=useState([]);  
  function gotoHome(){
    navigate("/")
  }
  async function searchingPort(value,iptype){
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
    if(location?.state?.searchedFlights)
    setFlightArr(location.state.searchedFlights)
  },[])
  return (<>
      <Box sx={{ flexGrow: 1 }} style={{border:"none",boxShadow:"none"}}>
      <AppBar position="static" elevation={0}>
        <Toolbar style={{backgroundColor:"white",height:"1vh",color:"black",border:"1px solid white"}}>
          <IconButton
            size="xx-small"
            edge="start"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={gotoHome}
          >
          <img src={logo} alt="logo"  style={{height:"10vh", width:"10vw"}}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          
          <Button color="inherit" style={{fontWeight:"bold",display:"flex",justifyItems:"space-between"}}><AccountCircleIcon/>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <div>
    <TextField id="outlined-basic" value={srci}  variant="outlined" onChange={(e)=>searchPort(e,"src")}/>
    {srcair&&<div className="showlist">
              <ShowPort airportList={airports} type="source" searchPort={searchPort}
               setDestination={setDestination} setSource={setSource}/>
            </div>}
    <CompareArrowsIcon/>
    <TextField id="outlined-basic" value={desti} variant="outlined" onChange={(e)=>searchPort(e,"dest")} />
    {destair&&<div className="showlist">
            <ShowPort airportList={airports} type="destination" searchPort={searchPort}
               setDestination={setDestination} setSource={setSource}/>
            </div>
            }
    <DatePicker/>
    <Select
    labelId=""
    id="demo-simple-select"
    value=""
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  <Button variant="contained" style={{color:"white",backgroundColor:"black"}}>Contained</Button>
    </div>
    <hr/>
    <div className="flightResults">
      <div className="flightEdit"></div>
      <div className="flightShowContainer">
        <Card flightarr={flightarr}/>
      </div>

    </div>
    </>
  );
}
