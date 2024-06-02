import React,{useContext,useState} from 'react'
import NavBar from './NavBar'
import MyStore from './assets/Context'
import {useNavigate,NavLink} from 'react-router-dom'
import { PROJECT_ID } from './assets/Constants'
import { RestorePage } from '@mui/icons-material'
export default function Login() {
  const {changeUser,changeLoggedStatus}=useContext(MyStore)
  const {showportal,toggleLogin}=useContext(MyStore);
  const [userEmail,setUserEmail]=useState("");
  const [userPass,setUserPass]=useState("");
  const [errorHtml,setErrorHTML]=useState()
  const navigate=useNavigate()
  async function handleLogin(e){
    e.preventDefault();
    try{
      if(!userEmail || !userEmail.includes("@") || !userEmail.includes(".") || !userPass || userPass.length<=0){
        alert("Enter user details correctly and reverify before Submitting");
        return;
      }
      
      const userDetails={
        "email":`${userEmail}`,
        "password":`${userPass}`,
        "appType":"bookingportals"
      }
      const resp=await fetch('https://academics.newtonschool.co/api/v1/bookingportals/login',{
        method:"POST",
        headers:{
          "projectId":PROJECT_ID,
          "Content-Type": "application/json"
        },
        body:JSON.stringify(userDetails)
      })
      if(resp.status==200){
        const response=await resp.json();
        localStorage.setItem("loggedInUser",JSON.stringify(response))
        const token=response.token;
        const {name,email}=response.data.user;
       
        changeUser(name)
        changeLoggedStatus(false)
        navigate("/")
      }
      else{
        const htmlData=await resp.text()
        navigate("/login-error",{state:{htmlData}})
      }
    }catch(err){
      console.log(err)
      //alert(err);
    }finally{
      setUserEmail("");
      setUserPass("")
    }
  }
  return (
    <div>
        <NavBar/>
        {errorHtml?<div target="_blank">{errorHtml}</div>:<>
        <h1>Please Login with your credentials</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor='email'>Enter your Email</label>
            <input type="email" value={userEmail} placeholder="Enter your email Id" onChange={(e)=>setUserEmail(e.target.value)}/><br/>
            <label htmlFor='password'>Enter your Password</label>
            <input type="password" value={userPass} placeholder="Enter your password" onChange={(e)=>setUserPass(e.target.value)}/><br/>
            <button>Login</button>
        </form>
        <p>New User, click <NavLink to={{pathname:"/register"}}>here</NavLink> to Register</p>
        </>
        }
    </div>
  )
}
