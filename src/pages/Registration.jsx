import React, { useState } from 'react'
import { Grid,TextField,Button,Alert } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import registrationimg from '../assets/registrationimg.png' 
import Headingforreglog from '../components/Headingforreglog'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { useNavigate,Link } from 'react-router-dom';

let initialvalues ={
  email:"",
 fullName:"",
 password:"",
 loading:false,
 error:""
}

const Registration = () => {
    let navigate = useNavigate();
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
      if(!email){
        setValues({
          ...values,
           error: "Enter an Email"
        }) 
        return
      }
      if(!fullName){
        setValues({
          ...values,
           error: "Enter an Full Name"
        }) 
        return
      }
      if(!password){
        setValues({
          ...values,
           error: "Enter an password"
        }) 
        return
      }
      setValues({
        ...values,
         loagding: true
      })
      createUserWithEmailAndPassword(auth,email,password).then((user)=>{
            console.log(user)
            sendEmailVerification(auth.currentUser)
              .then(() => {
                console.log("Email send")
              });
            setValues({
              email:"",
              fullName:"",
              password:"",
               loagding: false
            })
            navigate("/login")
      })
  }
  return (
    <Grid container spacing={2}>
  <Grid item xs={6}>
    <div className='regcontainer'> 
      <Headingforreglog className="headingreglog" title="Get started with easily register"/>
      <p>Free register and you can enjoy it</p>
      <div className='reginput'> 
      <TextField value={values.email} onChange={handleValues} name='email' id="outlined-basic" label="Email Address" variant="outlined" />      
      {values.error.includes("Email")&& <Alert severity="error">{values.error}</Alert>}
      </div>
      <div className='reginput'>
      <TextField value={values.fullName} onChange={handleValues} name='fullName' id="outlined-basic" label="Full Name" variant="outlined" />
      {values.error.includes("Name")&& <Alert severity="error">{values.error}</Alert>}
      </div>
      <div className='reginput'>
      <TextField value={values.password} type='password' onChange={handleValues} name='password' id="outlined-basic" label="Password" variant="outlined" />
      {values.error.includes("password")&& <Alert severity="error">{values.error}</Alert>}
      </div>
      {values.loading
      ?
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      :
      <Button onClick={handleSubmit} className='regbutton' variant="contained">Sing up</Button> 
    }
        <Alert severity="info" style={{marginTop:"20px"}}>Already Have An Account? <strong><Link to="/login">Login</Link></strong></Alert>
    </div>
  </Grid>
  <Grid item xs={6}>
    <img className='regiimg' src={registrationimg} />
  </Grid> 
</Grid>
  )
}

export default Registration