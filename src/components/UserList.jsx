import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { Button } from '@mui/material';
import { getDatabase, ref, onValue, set  } from "firebase/database";
import { getAuth } from "firebase/auth";


const UserList = () => {
    const auth = getAuth();
    const db = getDatabase();
    let [userList, setUserList]=useState([])
    console.log(auth.currentUser)
    useEffect(() => {
        const  usersRef = ref(db, 'users/' );
        onValue(usersRef, (snapshot) => {
            let arr=[]
            // const data = snapshot.val();
            snapshot.forEach(item=>{
                arr.push({...item.val(), id:item.key})
            }) 
            setUserList(arr)
        });
        console.log(userList)
    }, [ ])

    let handleFriendRequest =(item)=>{ 
            set(ref(db, 'friendrequest/'), {
                whosendid: auth.currentUser.uid, 
                whosendname: auth.currentUser.displayName, 
                whoreceiveid: item.id, 
                whoreceivename: item.username, 
              });
    }

    return (
        <div className='box'>
            <h3>User List</h3>
            {userList.map(item=>(

            <div className="list">
                <div className="img">
                    <img src={GroupImg} alt="" />
                </div>
                <div className="details">
                    <h4>{item.username}</h4>
                    <p>{item.email}</p>
                </div>
                <div className="button">
                    <Button onClick={()=>handleFriendRequest(item)} size="small" variant="contained"> Add </Button>
                </div>
            </div> 
            ))}
        </div>
    )
}

export default UserList