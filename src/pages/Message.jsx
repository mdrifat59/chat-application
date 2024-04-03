import React from 'react'
import { Grid } from '@mui/material'
import Group from '../components/Group';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import MyGroups from '../components/MyGroups';
import UserList from '../components/UserList';
import Block from '../components/Block';

const Message = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
       <Group/>
       <Friends/>       
    </Grid>
    <Grid item xs={8}>
      
    </Grid> 
  </Grid>
  )
}

export default Message