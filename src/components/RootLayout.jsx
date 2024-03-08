import React from 'react'
import { Outlet, Link,useLocation, useNavigate  } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from '../assets/profile.png'   
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline,IoMdSettings,IoIosLogOut,IoIosHome    } from "react-icons/io"; 
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from 'react-redux';


const RootLayout = () => {
  const auth = getAuth();
  const location = useLocation(); 
  let navigate =useNavigate()
  let userData= useSelector((state)=>state.loggedUser.loginuser)
  let handleLogOut =()=>{ 
    signOut(auth).then(() => {
      localStorage.removeItem("user")
      navigate("/login")
      }) 
}
  return (
    <>
         <Grid container spacing={2}>
        <Grid item xs={1}>
            <div className='navbar'>
              <div className="navcontainer">
                <img src={profile} />
                <h4 className='username'>{userData.displayName}</h4>
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
                  <li> 
                   
                  <IoIosLogOut onClick={handleLogOut} className='icon' />
                      
                    </li>     
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