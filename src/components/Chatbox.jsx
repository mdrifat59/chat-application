import React from 'react'
import profile from '../assets/profile.png'
import registrationimg from '../assets/registrationimg.png'
import ModalImage from "react-modal-image";
const Chatbox = () => {
  return (
    <div className='chatbox'>
        <div className='msgprofile'>
            <div className="signal">
                <img width={70} src={profile} />
                <div className="round"></div>
            </div>
            <div>
            <h3>Shawon Islam</h3>
            <p>Online</p>
            </div>
            </div>
        <div className='msgbox'> 
            <div className='msg'> 
              <p className='getimg'>
                {/* <img width={70} src={registrationimg} /> */}
                <ModalImage
                  small={registrationimg}
                   large={registrationimg} 
                      />;
                </p>
              
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendimg'>
                {/* <img width={70} src={registrationimg} /> */}
                <ModalImage
                  small={registrationimg}
                   large={registrationimg} 
                      />;
                </p>
               
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendmsg'>Hello, Rifat</p>
              <p className='time'>Today, 2:01pm</p>
            </div>
        </div>
        <div> footer</div>
    </div>
  )
}

export default Chatbox