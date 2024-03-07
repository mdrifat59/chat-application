import { Grid } from '@mui/material'
import React, { useEffect } from 'react' 
import { useNavigate } from "react-router-dom";
import Group from '../components/Group';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import MyGroups from '../components/MyGroups';
import UserList from '../components/UserList';
import Block from '../components/Block';
import { useSelector } from 'react-redux'

const Home = () => { 
    let navigate =useNavigate()
    let loginuser = useSelector((state)=>state.loggedUser.loginuser)

   useEffect(()=>{
    if(loginuser == null){
      navigate("/login")
    }
   },[]) 
   
  
  return (
     
    <Grid container spacing={2}>
  <Grid item xs={4}>
     <Group/>
     <FriendRequest/>
  </Grid>
  <Grid item xs={4}>
     <Friends/>
     <MyGroups/>
  </Grid>
  <Grid item xs={4}>
     <UserList/>
     <Block/>
  </Grid> 
</Grid>
    
  )
}

export default Home