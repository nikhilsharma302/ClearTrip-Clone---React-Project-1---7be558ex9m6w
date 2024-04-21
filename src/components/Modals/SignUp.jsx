import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import '../../styles/App.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
export default function SignUp({setShowportal}) {
  const [z,setZ]=useState("block")
  useEffect(()=>{
    setZ("block")
    return ()=>setZ("none")
  },[])
  function hideModal(e){
    //console.log("btn pressed")
    setZ("none")
    setShowportal(false)
  }
  return ReactDOM.createPortal(
    <div className="portal" style={{display:z}}>
      <div className="hidebackground">
        <div className="signupcard">
          <div className="signupcarous"></div>
          <div className="signupotp">
            <div className="crossdiv">
              <IconButton onClick={hideModal}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="otpsection">
              <div className="phonedetails">
                <select className="phonecode">
                  <option value="+91" default>India(+91)</option>
                </select>
                <input  className="phonenumber" type="tel" placeholder ="Please enter your mobile number"/>
              </div>
              <button type="submit" id="otpbtn">Get OTP</button>
              <h6>We no more support email based login. You can now login via mobile number & link email to access your account.</h6>
            </div>
            <div className="signuppolicy">
              <hr className="signuphr"/>
              <h6>
              By continuing, you agree to Cleartrip's <a href="/privacy-policy" target="_blank">privacy policy</a> & <a href="/privacy-policy" target="_blank">terms of use.</a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>, document.getElementById('portal')
  )
}



  