import React,{useState,useEffect,useContext} from 'react'
import ReactDOM from 'react-dom'
import '../../styles/App.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { PROJECT_ID } from '../assets/Constants';
import {useNavigate} from "react-router-dom"
import MyStore from '../assets/Context';

export default function SignUp() {
  const navigate=useNavigate()
  const {showportal,toggleLogin}=useContext(MyStore)
  const [disp,setDisp]=useState("block")
  const [user,setUser]=useState("");
  const [userEmail,setUserEmail]=useState("");
  const [userPass, setUserPass]=useState("");
  const [zVal,setZVal]=useState(1)

  useEffect(()=>{
    setDisp("block")
    toggleLogin(false)
    setZVal(999)
    return ()=>{
      setDisp("none")
      setZVal(1)
    }
  },[])
  function hideModal(e){
    setDisp("none")
    toggleLogin(true)
    setZVal(1)
    navigate("/")
  }
  // async function postUser(){
  //   try{
  //     const userdata={
  //       "name":`${user}`,
  //       "email":`${userEmail}`,
  //       "password":`${userPass}`,
  //       "appType":'bookingportals'
  //     }
  //     const resp=await fetch('https://academics.newtonschool.co/api/v1/bookingportals/signup',{
  //       method:"POST",
  //       mode:"cors",
  //       headers:{
  //         "projectID":PROJECT_ID,
  //         "content-type" : "application/json",
  //         //"Access-Control-Allow-Origin" : "*"
  //       },
  //       body:JSON.stringify(userdata)
  //     })
  //     if(!resp.ok){
  //       throw new Error("unable to post user data")
  //     }
  //     else{
  //       const response=await resp.json();
  //       console.log(response)
  //     }
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  async function postUser() {
    try {
      const userdata = {
    
        "name": user,
    
        "email": userEmail,
    
        "password": userPass,
    
        "appType": 'bookingportals'
      };
      const resp = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/signup', {
      method: 'POST',
      headers: {
        "projectID": PROJECT_ID,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userdata)
      });
      //console.log(resp) 
      const response = await resp.json();
      if(resp.status===403){
        alert(`${response.message}, Please Login with your credentials` )
      }
      else if(resp.status===201){
        alert("User has been registered, Please Login with your credentials")
        //localStorage.setItem("userZWTToken",response.token)
      }
      else{   
        throw new Error("Some error occurred please try again")
      } 
    }catch(err){
      alert(err)
    }
  }
  function registerUser(e){
    e.preventDefault();
    if(!user || !userEmail || !userPass){
      alert("Enter all Details")
    }
    else{
      postUser()
    }
  }
  return ReactDOM.createPortal(
    <div className="portal" style={{display:disp}}>
      <div className="hidebackground" onClick={hideModal}></div>
        <div className="signupcard" style={{zIndex:zVal}}>
          <div className="crossdiv">
              <IconButton onClick={hideModal}>
                <CloseIcon />
              </IconButton>
          </div>
          <h1>Welcome to Cleartrip.com</h1>
          <h3>New User, Register here</h3>
          <form onSubmit={(e)=>registerUser(e)}>
            <label htmlFor='username'>Name: </label>
            <input type="text" placeholder="Enter your fullname" value={user} onChange={(e)=>setUser(e.target.value)}/><br/>
            <label htmlFor='email'>Email Id: </label>
            <input type="email" placeholder="Enter your Emaid Id" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/><br/>
            <label htmlFor='password'>Enter your Password: </label>
            <input type="password" placeholder="Enter your fullname" value={userPass} onChange={(e)=>setUserPass(e.target.value)}/><br/>
            <button type="submit">Register</button>
          </form>
          <p>Already a user, click <a href="/login" target="_blank">here</a> to
          Login</p>     
        </div>
    </div>, document.getElementById('portal')
  )
}



  