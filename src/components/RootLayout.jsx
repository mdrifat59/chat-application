import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';

const RootLayout = () => {
  return (
    <>
         <Grid container spacing={2}>
        <Grid item xs={2}>
          <h1>Navbar</h1>
        </Grid>
        <Grid item xs={10}> 
          <Outlet/>
        </Grid> 
      </Grid>

    </>
  )
}

export default RootLayout