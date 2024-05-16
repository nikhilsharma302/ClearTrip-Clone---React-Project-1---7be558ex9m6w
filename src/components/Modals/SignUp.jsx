import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import '../../styles/App.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { PROJECT_ID } from '../assets/Constants';

export default function SignUp({setShowportal}) {
  const [z,setZ]=useState("block")
  const [user,setUser]=useState("");
  const [userEmail,setUserEmail]=useState("");
  const [userPass, setUserPass]=useState("");
  useEffect(()=>{
    setZ("block")
    return ()=>setZ("none")
  },[])
  function hideModal(e){
    //console.log("btn pressed")
    setZ("none")
    setShowportal(false)
  }
  async function postUser(){
    const resp=await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/signup`,{
      method:POST,
      body:JSON.stringify({
        name:`${user}`,
        email:`${userEmail}`,
        password:`${userPass}`,
        appType:'bookingportals'
      }),
      headers:{
        projectID:PROJECT_ID
      }
    })
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
    <div className="portal" style={{display:z}}>
      <div className="hidebackground" onClick={hideModal}></div>
        <div className="signupcard">
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
          {/* <div className="signupcarous"></div>
          <div className="signupotp">
            
            <div className="otpsection"> */}
              {/* <div className="phonedetails">
                <select className="phonecode">
                  <option value="+91" default>India(+91)</option>
                </select>
                <input  className="phonenumber" type="tel" placeholder ="Please enter your mobile number"/>
              </div>
              <button type="submit" id="otpbtn">Get OTP</button>
              <h6>We no more support email based login. You can now login via mobile number & link email to access your account.</h6>
            </div> */}
            {/* <div className="signuppolicy">
              <hr className="signuphr"/>
              <h6>
              By continuing, you agree to Cleartrip's <a href="/privacy-policy" target="_blank">privacy policy</a> & <a href="/privacy-policy" target="_blank">terms of use.</a>
              </h6>
            </div>
          </div> */}
        </div>
    </div>, document.getElementById('portal')
  )
}



  