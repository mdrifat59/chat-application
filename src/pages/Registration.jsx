import React from 'react'
import { Grid } from '@mui/material'
import registrationimg from '../assets/registrationimg.png' 
import Headingforreglog from '../components/Headingforreglog'

const Registration = () => {
  return (
    <Grid container spacing={2}>
  <Grid item xs={6}>
    <div className='regcontainer'> 
      <Headingforreglog className="headingreglog" title="Get started with easily register"/>
    </div>
  </Grid>
  <Grid item xs={6}>
    <img className='regiimg' src={registrationimg} />
  </Grid> 
</Grid>
  )
}

export default Registration