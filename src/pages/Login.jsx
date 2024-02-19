import React from 'react'
import { Grid,TextField,Button } from '@mui/material'
import login from '../assets/login.jpg' 
import google from '../assets/google.png' 
import Headingforreglog from '../components/Headingforreglog'

const Login = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={6}>
      <div className='regcontainer'> 
        <Headingforreglog className="headingreglog" title="Login to your account!"/> 
        <img className='google' src={google} />
        <div className='reginput'> 
        <TextField id="outlined-basic" label="Email Address" variant="outlined" />
        </div> 
        <div className='reginput'>
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        </div> 
        <Button className='loginbutton' variant="contained">Login to Continue</Button> 
      </div>
    </Grid>
    <Grid item xs={6}>
      <img className='login' src={login} />
    </Grid> 
  </Grid>
  )
}

export default Login