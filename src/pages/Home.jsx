import { Button,Grid } from '@mui/material'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Group from '../components/Group';

const Home = () => {
    const auth = getAuth();
    let navigate =useNavigate()
    let handleLogOut =()=>{ 
        signOut(auth).then(() => {
            navigate("/login")
          }).catch((error) => {
            // An error happened.
          });
    }
  return (
    
    //  <Button onClick={handleLogOut} variant='contained'>Log Out</Button> 
    <Grid container spacing={2}>
  <Grid item xs={4}>
     <Group/>
  </Grid>
  <Grid item xs={4}>
    <h1>xs=4</h1>
  </Grid>
  <Grid item xs={4}>
    <h1>xs=4</h1>
  </Grid> 
</Grid>
    
  )
}

export default Home