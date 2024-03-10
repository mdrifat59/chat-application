import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';


const Friends = () => {
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
        }, []);
    })
    let handleUnFriend =(item)=>{
        remove(ref(db, 'friends/'+ item.id))
    }
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
                    {/* <div className="button">
                        <p>Today, 8:56pm</p>
                    </div> */}
                    <div className="button">
                        <Button size="small" variant="contained" color="error">Block</Button>
                    </div>
                    <div className="button">
                        <Button onClick={() => handleUnFriend(item)} size="small" variant="contained" >Cencel</Button>
                    </div>
                </div>
            ))
        }

        </div>
    )
}

export default Friends