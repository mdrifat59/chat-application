import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from '../assets/profile.png'  

const RootLayout = () => {
  return (
    <>
         <Grid container spacing={2}>
        <Grid item xs={1}>
            <div className='navbar'>
              <div className="navcontainer">
                <img src={profile} alt="" />
                <ul>
                  <li>one</li>
                  <li>one</li>
                  <li>one</li>
                  <li>one</li>
                </ul>
              </div>
            </div>
        </Grid>
        <Grid item xs={11}> 
          <Outlet/>
        </Grid> 
      </Grid>

    </>
  )
}

export default RootLayout