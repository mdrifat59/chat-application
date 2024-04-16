import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { getDatabase, ref, onValue, remove, push,set } from "firebase/database";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';


const Friends = ({button}) => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loggedUser.loginuser)
    let [friends, setFriends] = useState([])
    useEffect(() => {
        const friendsRef = ref(db, 'friends/');
        onValue(friendsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (item.val().whosendid == userData.uid || item.val().whoreceiveid == userData.uid) {
                    arr.push({ ...item.val(), id: item.key })
                }
            })
            setFriends(arr);
        });
    },[])
    let handleUnFriend =(item)=>{
        remove(ref(db, 'friends/'+ item.id)) 
    }
    let handleBlock =(item)=>{
        if(userData.uid == item.whosendid){
            set(push(ref(db, 'blocks/')), {
                 blockedname: item.whoreceivename,
                 blockid:item.whoreceiveid,
                 blockbyid:item.whosendid,
                 blockbyname:item.whosendname
              })
              .then(()=>{
                remove(ref(db, 'friends/'+ item.id))
              })
        }else{
            set(push(ref(db, 'blocks/')), {
                blockedname:item.whosendname ,
                blockedid:item.whosendid,
                blockbyid: item.whoreceiveid,
                blockbyname: item.whoreceivename
             }).then(()=>{
                remove(ref(db, 'friends/'+ item.id))
             }) 
        }
    }
    // let handleMsg =(item)=>{
        
    // }
    return (
        <div className='box'>
            <h3>Friends </h3>
            {friends.length == 0
            ?
        <h2>No Friends</h2>
        :
            friends.map(item => (
                <div className="list">
                    <div className="img">
                        <img src={GroupImg} alt="" />
                    </div>
                    <div className="details">
                        {item.whoreceiveid == userData.uid
                            ?
                            <h4>{item.whosendname}</h4>
                            :
                            <h4>{item.whoreceivename}</h4>
                        }
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    
                    {button == "msg"
                    ?
                    <div className="button">
                        <Button size="small" variant="contained" color="error">Msg</Button>
                    </div>
                    :
                    <>
                    <div className="button">
                        <Button onClick={()=>handleBlock(item)} size="small" variant="contained" color="error">Block</Button>
                    </div>
                    <div className="button">
                        <Button onClick={() => handleUnFriend(item)} size="small" variant="contained" >Cencel</Button>
                    </div>
                    </>
                        }
                </div>
            ))
        }

        </div>
    )
}

export default Friends