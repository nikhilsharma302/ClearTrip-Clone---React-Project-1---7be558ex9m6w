import React,{useState,useEffect,useContext} from 'react'
import NavBar from '../../NavBar'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import TextField from '@mui/material/TextField'
import {DatePicker} from '@mui/x-date-pickers'
import {useLocation,useNavigate} from 'react-router-dom'
import { PROJECT_ID } from '../Constants';
import Carous1 from './Carous1';
import MyStore from '../Context';
import "./Hotels.css"
let obj={"price":1,"rating":1}
export default function HotelCards() {
  const[hotellist,sethotellist]=useState([])
  const location=useLocation();
  const navigate=useNavigate();
  const [pricesort,setPriceSort]=useState(1)
  const [ratingsort,setRatingSort]=useState(1)
  const [sortobj,setsortobj]=useState({})
  const [city, setcity]=useState("")
  const {departDate, setDepartDate,arrivDate,setArriveDate}=useContext(MyStore)
  const {fulldepartdate,fullarrivedate}=location?.state
  useEffect(()=>{ 
    if(!location?.state?.redirected|| !location || !location.state){
      navigate("/hotels")
      return
    };
    sethotellist(location?.state?.resarray);
    setcity(location?.state?.city)
    // setDepartDate(departDate),
    // setArriveDate(arriveDate)
  },[])
  async function callfilteredData(obj){
    //console.log(obj)
    let neobj=JSON.stringify(obj)
    //alert(neobj)
    console.log(neobj)
    try{
      const resp=await fetch(`
      https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city.split(",")[0]}"}&sort=${neobj}`
      // const resp=await fetch('https://academics.newtonschool.co/api/v1/bookingportals/hotel/?search={"location":"MUMBAI"}&sort={"price":1}'
        ,{
            headers:{
              projectID:`${PROJECT_ID}`
            }
          }
      )
      console.log(`
      https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city.split(",")[0]}"}&sort=${neobj}`)
      if(!resp.ok){
        throw new Error("Unable to sort data please recheck the api")
      }
      else{
        const response= await resp.json();
        sethotellist(response?.data?.hotels)
        console.log(response.data.hotels)
      }
    }catch(err){
      console.log(err)
    }
  }
  function ratingsorting(e){
    console.log(e.target.value)
    setRatingSort(e.target.value);
    // setsortobj({...sortobj,"rating":Number(e.target.value)})
    // const newobj={...sortobj,"rating":Number(e.target.value)}
    callfilteredData({"rating":Number(e.target.value)})
  }
  function pricesorting(e){
    //console.log(e.target.value)
    setPriceSort(e.target.value);
    console.log(e.target.value)
    // setsortobj({...sortobj,"price":Number(e.target.value)})
    // const newobj={...sortobj,"price":Number(e.target.value)}
    callfilteredData({"price":Number(e.target.value)})
  }
  async function fetchsinglehoteldata(id){
    try{
      const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`
     ,{
        headers:{
          projectID:PROJECT_ID
        }
      })
      if(!resp.ok){
        throw new Error("Unable to fetch selected Hotel details")
      }
      else{
        const response=await resp.json();
        navigate(`/hotels/details/hotel-ID=${id}&hotelname=${response.data.name}`,{
          state:{
            data:response.data,
            departDate,arrivDate
          }
        })
      };
    }
    catch(err){
      alert(err)
    } 
  }
  return (
    <div className="hotelCards">
      <NavBar className="navBar"/>
      <div className="hotelCardsNavBaritems">
        <div className="landmarkrow" 
          onClick={()=>setDivClicked(true)} 
         >
          <PlaceIcon style={{color:"#da8210"}}/>
          <TextField id="outlined-basic"                  
            variant="standard" 
            InputProps={{disableUnderline: true }}
            style={{ minWidth: '300px',padding:"auto 1%" }}
            value={city}
            onChange={(e)=>setcity(e.target.value)}
          />
          
        </div>
        <div>
          Check-In date:
          <DatePicker
            sx={{width:"80%",marginRight:"0"} }
            label={fulldepartdate}
            onChange={(e)=>setDepartDate(e.$d)}
        />
        </div>
       <div>
        Check-out
        <DatePicker
          sx={{width:"80%"} }
          label={fullarrivedate}
          onChange={(e)=>{
            console.log(e)
            setArriveDate(e.$d)}}
        />
       </div>
       
      </div>
      <div className="hotelSort">
        Sort By :
        <span> Price:
          <select onChange={pricesorting} >
            <option value="1">Low to High</option>
            <option value="-1">High to Low</option>
          </select>
        </span>
        <span> Rating:
          <select onChange={ratingsorting}>
            <option value="1">Low to High</option>
            <option value="-1">High to Low</option>
          </select>
        </span>
      </div>
      {location?.state?.resarray?<h4>Showing hotels in {location.state.resarray[0].location}</h4>:null}
      <div className="hotelsdisplay">
          {
            hotellist.map(hotel=>(
              <div key={hotel._id} className="hotelcard" onClick={()=>fetchsinglehoteldata(hotel?._id)}>
                {/* <img src={hotel.images[0]} alt={hotel.name} className="hotelimage"/> */}
                {hotel?.images&&
                <Carous1 images={hotel.images}/>
                }
                <div className="hotelflex">
                  <span>{hotel.name}</span>
                  <span className="hotelrating">{hotel.rating}</span>
                </div>
                <div>
                  <span className="hotelocation">{hotel.location}</span>
                </div>
                <div className="hotechargesdiv"><span className="hotelchagesspan">₹{parseInt(hotel.avgCostPerNight)}</span><span className="hoteltaxspan">+ Taxes extra per Night</span></div>
              </div>
            ))
          }
      </div>
    </div>
  )
}
