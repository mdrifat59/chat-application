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
    let [friends, setFriends]=useState([]) 
    let [block, setBlock]=useState([]) 
    // get data from Database
    useEffect(() => {
        const  usersRef = ref(db, 'friendrequest/' );
        onValue(usersRef, (snapshot) => {
            let arr=[] 
            snapshot.forEach(item=>{               
                arr.push(item.val().whoreceiveid+item.val().whosendid)
            }) 
            setFriendRequest(arr)
        }); 
    }, [ ])
    useEffect(() => {
        const  blockRef = ref(db, 'blocks/' );
        onValue(blockRef, (snapshot) => {
            let arr=[] 
            snapshot.forEach(item=>{               
                arr.push(item.val().blockedid + item.val().blockbyid)
            }) 
            setBlock(arr)
        }); 
    }, [ ])
    useEffect(() => {
        const  usersRef = ref(db, 'friends/' );
        onValue(usersRef, (snapshot) => {
            let arr=[] 
            snapshot.forEach(item=>{               
                arr.push(item.val().whoreceiveid+item.val().whosendid)
            }) 
            setFriends(arr)
        }); 
    }, [ ])

    useEffect(() => {
        const  usersRef = ref(db, 'users/' );
        onValue(usersRef, (snapshot) => {
            let arr=[] 
            snapshot.forEach(item=>{
                if(userData.uid != item.key){
                    arr.push({...item.val(), id:item.key})
                }
            }) 
            setUserList(arr)
        }); 
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
                    friendRequest.includes(auth.currentUser.uid+item.id) 
                    ?
                    <Button  size="small" variant="contained"> Pending </Button>
                    : 
                    friends.includes(auth.currentUser.uid+item.id) ||
                     friends.includes(item.id + auth.currentUser.uid) 
                    ?
                    <Button  size="small" variant="contained" color='success'> Friends </Button>                    
                    :
                    block.includes(userData.uid + item.id) ||
                     block.includes(item.id + userData.uid) 
                    ?
                    <Button  size="small" variant="contained" color='error'> Block </Button>                    
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