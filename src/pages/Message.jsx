import React from 'react'
import { Grid } from '@mui/material' 
import Friends from '../components/Friends'; 
import MsgGroup from '../components/MsgGroup';
import Chatbox from '../components/Chatbox';

const Message = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
       <MsgGroup/>
       <Friends button="msg"/>       
    </Grid>
    <Grid item xs={8}>
        <Chatbox/>
    </Grid> 
  </Grid>
  )
}

export default Message