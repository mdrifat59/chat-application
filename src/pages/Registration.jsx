import React from 'react'
import { Grid } from '@mui/material'
import registrationimg from '../assets/registrationimg.png'

const Registration = () => {
  return (
    <Grid container spacing={2}>
  <Grid item xs={6}>
    <h1>xs=8</h1>
  </Grid>
  <Grid item xs={6}>
    <img className='regiimg' src={registrationimg} />
  </Grid> 
</Grid>
  )
}

export default Registration