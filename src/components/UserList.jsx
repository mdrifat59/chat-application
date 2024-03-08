import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { Button } from '@mui/material';
import { getDatabase, ref, onValue, set, push, remove  } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from 'react-redux';


const UserList = () => {
    const auth = getAuth();
    const db = getDatabase();
    let userData=useSelector((state)=>state.loggedUser.loginuser)
    let [userList, setUserList]=useState([])
    let [friendRequest, setFriendRequest]=useState([])
    console.log(auth.currentUser)
    useEffect(() => {
        const  usersRef = ref(db, 'friendrequest/' );
        onValue(usersRef, (snapshot) => {
            let arr=[]
            // const data = snapshot.val();
            snapshot.forEach(item=>{               
                arr.push(item.val().whoreceiveid+item.val().whosendid)
            }) 
            setFriendRequest(arr)
        });
        // console.log(userList)
    }, [ ])

    useEffect(() => {
        const  usersRef = ref(db, 'users/' );
        onValue(usersRef, (snapshot) => {
            let arr=[]
            // const data = snapshot.val();
            snapshot.forEach(item=>{
                if(userData.uid != item.key){
                    arr.push({...item.val(), id:item.key})
                }
            }) 
            setUserList(arr)
        });
        // console.log(userList)
    }, [ ])

    let handleFriendRequest =(item)=>{ 
            set(push(ref(db, 'friendrequest/')), {
                whosendid: auth.currentUser.uid, 
                whosendname: auth.currentUser.displayName, 
                whoreceiveid: item.id, 
                whoreceivename: item.username, 
              });
    }
    let handleCencel =(item)=>{
        console.log(item.id)
        let cencel = "";
        onValue(ref(db, "friendrequest/"), (snapshot) => {
            snapshot.forEach((item) => {
                if (
                    item.val().whosendid == auth.currentUser.uid &&
                    item.id == item.val().whoreceiveid
                ) {
                    cencel = item.key;
                }
            });
        });
        remove(ref(db, 'friendrequest/'+ cencel))
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
                    {friendRequest.includes(item.id+auth.currentUser.uid)
                    ? 
                    <Button onClick={()=>handleCencel(item)} size="small" variant="contained"> Cencel </Button>
                    :
                    <Button onClick={()=>handleFriendRequest(item)} size="small" variant="contained"> Add </Button>

                    }
                </div>
            </div> 
            ))}
        </div>
    )
}

export default UserList