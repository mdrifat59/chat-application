import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import {Button} from '@mui/material';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();
    let userData=useSelector((state)=>state.loggedUser.loginuser)
    let [reqList, setReqList]=useState([])
    useEffect(()=>{
        const friendRequestRef = ref(db, "friendrequest" );
        onValue(friendRequestRef, (snapshot) => {
            let arr =[]
          snapshot.forEach(item=>{
            if(item.val().whoreceiveid == userData.uid){ 
                    arr.push({...item.val(), id:item.key}) 
            }
          })
          setReqList(arr);
        });
    },[])
    let handleDelete = (id)=>{ 
        remove(ref(db, 'friendrequest/'+ id))
    }
    let handleAccept = (item)=>{
      set(push(ref(db, 'friends/')), {
         ...item,
      }).then(()=>{
        remove(ref(db, 'friendrequest/'+ item.id))
      })
    }
  return (
    <div className='box'> 
        <h3>Friend Request</h3>
        {reqList.length == 0
        ?
         <h2>No Friends Request</h2>
        : 
        reqList.map(item=>(
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>{item.value = 0 ? "no data":item.whosendname}</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button onClick={()=>handleAccept(item)} size="small" variant="contained">Accept</Button>
            </div>
            <div className="button">
            <Button onClick={()=>handleDelete(item.id)} size="small" variant="contained" color="error">Reject</Button>
            </div>
        </div> 
        ))
        }
    </div>
  )
}

export default FriendRequest