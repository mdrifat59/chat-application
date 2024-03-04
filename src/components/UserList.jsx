import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { Button } from '@mui/material';
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
    const db = getDatabase();
    let [userList, setUserList]=useState([])
    useEffect(() => {
        const  usersRef = ref(db, 'users/' );
        onValue(usersRef, (snapshot) => {
            let arr=[]
            // const data = snapshot.val();
            snapshot.forEach(item=>{
                arr.push(item.val())
            }) 
            setUserList(arr)
        });
        console.log(userList)
    }, [ ])
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
                    <Button size="small" variant="contained">Accept</Button>
                </div>
            </div> 
            ))}
        </div>
    )
}

export default UserList