import React, { useState } from 'react'
import profile from '../assets/profile.png'
import registrationimg from '../assets/registrationimg.png'
import ModalImage from "react-modal-image";
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, push } from "firebase/database";
import moment from 'moment';

const Chatbox = () => {
  const db = getDatabase();
  let activeChat = useSelector((state) => state.activeChat.activeChat)
  let userData = useSelector((state) => state.loggedUser.loginuser)
  let [msg, setMsg]=useState("")

  let handleChat = ()=>{ 
    if(activeChat.type == "groupmsg"){
      console.log("groupmsg")
    }else{
      if(msg != ""){
        set(push(ref(db, 'singlemsg/')), {
          whosendname: userData.displayName,
          whosendid:userData.uid,
          whorecivename:activeChat.name,
          whoreciveid:activeChat.id,
          msg:msg,
          date:`${new Date().getFullYear()}-${new Date().getMonth() +1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      }
    } 
  }
  return (
    <div className='chatbox'>
        <div className='msgprofile'>
            <div className="signal">
                <img width={70} src={profile} />
                <div className="round"></div>
            </div>
            <div>
            <h3>{activeChat.name}</h3>
            <p>Online</p>
            </div>
            </div>
        <div className='msgbox'> 
            <div className='msg'> 
              <p className='getimg'> 
                <ModalImage
                  small={registrationimg}
                   large={registrationimg} 
                      />;
                </p>
              
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendimg'> 
                <ModalImage
                  small={registrationimg}
                   large={registrationimg} 
                      />;
                </p>               
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getaudio'>
                <audio controls></audio>
              </p>
              <p className='time'>{moment("2024-5-7 23:35", "YYYYMMDD h:mm").fromNow()}</p>
            </div>
            <div className='msg'> 
              <p className='sendaudio'>
                <audio controls></audio>
              </p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='getaudio'>
              <video width="320" height="240" controls></video>
              </p>
              <p className='time'>Today, 2:01pm</p>
            </div>
            <div className='msg'> 
              <p className='sendaudio'>
              <video width="320" height="240" controls></video>
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
        </div>
        <div className='msgcontainer'>
          <div className='msgwritecon' >
          <input onChange={(e)=>setMsg(e.target.value)} type="text" className='msgwrite' />
          </div>
          <Button variant="contained" onClick={handleChat}>send</Button>
        </div>
    </div>
  )
}

export default Chatbox