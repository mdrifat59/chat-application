import React, { useState } from 'react'
import { Grid,TextField,Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import login from '../assets/login.jpg' 
import google from '../assets/google.png' 
import Headingforreglog from '../components/Headingforreglog'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

let initialvalues ={
  email:"", 
 password:"",
 loading:false
}


const Login = () => {
  const auth = getAuth();
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
  return (
    <Grid container spacing={2}>
    <Grid item xs={6}>
      <div className='regcontainer'> 
        <Headingforreglog className="headingreglog" title="Login to your account!"/> 
        <img className='google' src={google} />
        <div className='reginput'> 
        <TextField value={values.email} onChange={handleValues} name='email' id="outlined-basic" label="Email Address" variant="outlined" />
        </div> 
        <div className='reginput'>
        <TextField type='password' value={values.password} onChange={handleValues} name='password' id="outlined-basic" label="Password" variant="outlined" />
        </div> 
        {values.loading
      ?
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      :
      <Button onClick={handleSubmit} className='regbutton' variant="contained">Login to Continue</Button> 
    } 
      </div>
    </Grid>
    <Grid item xs={6}>
      <img className='login' src={login} />
    </Grid> 
  </Grid>
  )
}

export default Login