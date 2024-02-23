import React, { useState } from 'react'
import { Grid,TextField,Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import login from '../assets/login.jpg' 
import google from '../assets/google.png' 
import Headingforreglog from '../components/Headingforreglog'
import { getAuth, signInWithEmailAndPassword,signInWithPopup } from "firebase/auth"; 
import { GoogleAuthProvider } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import { FaEye,FaRegEyeSlash } from "react-icons/fa";


let initialvalues ={
  email:"", 
 password:"",
 loading:false,
 eye:false
}


const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let [values,setValues]=useState(initialvalues)
  let handleValues = (e)=>{
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  let handleSubmit=()=>{
    let {email, fullName, password}=values
    setValues({
      ...values,
       loagding: true
    })
    signInWithEmailAndPassword(auth,email,password).then((user)=>{
          console.log(user)
          setValues({
            email:"", 
            password:"",
             loagding: false
          }) 
          console.log(user)
    })
  }
  let handleGoogleLogin =()=>{
    signInWithPopup(auth, provider).then((result) => {
     console.log(result)
    })
  }
  return (
    <Grid container spacing={2}>
    <Grid item xs={6}>
      <div className='regcontainer'> 
        <Headingforreglog className="headingreglog" title="Login to your account!"/> 
        <img onClick={handleGoogleLogin} className='google' src={google} />
        <div className='reginput'> 
        <TextField value={values.email} onChange={handleValues} name='email' id="outlined-basic" label="Email Address" variant="outlined" />
        </div> 
        <div className='reginput'>
        <TextField style={{position:"relative"}} value={values.password} type={values.eye ? 'text' : 'password'} onChange={handleValues} name='password' id="outlined-basic" label="Password" variant="outlined" />
        <div onClick={()=>setValues({...values,eye:!values.eye})} className='eye'>
        {values.eye
          ?
          <FaEye style={{position:"absolute", top:"225px", right:"75px"}}/>
          :
          <FaRegEyeSlash style={{position:"absolute", top:"225px", right:"75px"}} />
        }
      </div>
        </div>  
        {values.loading
      ?
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      :
      <Button onClick={handleSubmit} className='regbutton' variant="contained">Login to Continue</Button> 
    } 
      <Alert severity="info" style={{marginTop:"20px"}}>Don't Have An Account? <strong><Link to="/">Sing up</Link></strong></Alert>
      <Alert severity="warning" style={{marginTop:"20px"}}>Forgot Password <strong><Link to="/forgotpassword">Click Here</Link></strong></Alert>
      </div>
    </Grid>
    <Grid item xs={6}>
      <img className='login' src={login} />
    </Grid> 
  </Grid>
  )
}

export default Login