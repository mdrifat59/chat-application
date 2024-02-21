import React, { useState } from 'react'
import { Grid,TextField,Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import registrationimg from '../assets/registrationimg.png' 
import Headingforreglog from '../components/Headingforreglog'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

let initialvalues ={
  email:"",
 fullName:"",
 password:"",
 loading:false
}

const Registration = () => {

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
      createUserWithEmailAndPassword(auth,email,password).then((user)=>{
            console.log(user)
            setValues({
              ...values,
               loagding: false
            })
      })
  }
  return (
    <Grid container spacing={2}>
  <Grid item xs={6}>
    <div className='regcontainer'> 
      <Headingforreglog className="headingreglog" title="Get started with easily register"/>
      <p>Free register and you can enjoy it</p>
      <div className='reginput'> 
      <TextField onChange={handleValues} name='email' id="outlined-basic" label="Email Address" variant="outlined" />
      </div>
      <div className='reginput'>
      <TextField onChange={handleValues} name='fullName' id="outlined-basic" label="Full Name" variant="outlined" />
      </div>
      <div className='reginput'>
      <TextField type='password' onChange={handleValues} name='password' id="outlined-basic" label="Password" variant="outlined" />
      </div>
      {values.loading
      ?
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      :
      <Button onClick={handleSubmit} className='regbutton' variant="contained">Sing up</Button> 
    }
      
    </div>
  </Grid>
  <Grid item xs={6}>
    <img className='regiimg' src={registrationimg} />
  </Grid> 
</Grid>
  )
}

export default Registration