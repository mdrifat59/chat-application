import React from 'react'
import { Outlet, Link,useLocation  } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from '../assets/profile.png'   
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline,IoMdSettings,IoIosLogOut,IoIosHome    } from "react-icons/io"; 


const RootLayout = () => {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <>
         <Grid container spacing={2}>
        <Grid item xs={1}>
            <div className='navbar'>
              <div className="navcontainer">
                <img src={profile} />
                <ul>
                  <li>
                     <Link to="/chat/home" className={location.pathname ==  "/chat/home" ? 'active' : 'icon'}>
                        <IoIosHome />
                     </Link>
                    </li>       
                  <li>
                  <Link to="/chat/message" className={location.pathname == "/chat/message" ? 'active': 'icon'}>
                        <AiOutlineMessage />
                     </Link>
                    </li>       
                  <li><IoIosNotificationsOutline className='icon' /></li>       
                  <li><IoMdSettings className='icon' /></li>     
                  <li><IoIosLogOut className='icon' /></li>     
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