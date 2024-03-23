import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

const MyGroups = () => {
    const db = getDatabase();
    let [myGroup, setMyGroup] = useState([])
    let userData = useSelector((state) => state.loggedUser.loginuser)
    useEffect(() => {
        const groupRef = ref(db, 'groups/');
        onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (item.val().adminid == userData.uid) {
                    arr.push({...item.val(), groupId:item.key})
                }
            })
            setMyGroup(arr)
            console.log(arr)
        });
    }, [])
    return (
        <div className='box'>
            <h3>My Groups</h3>
            {myGroup.length == 0
            ?
                <h2>your not group yet</h2>
            :

            myGroup.map((item) => (
                   userData.uid == item.adminid &&            
                <div className="list">
                    <div className="img">
                        <img src={GroupImg} alt="" />
                    </div>
                    <div className="details">
                        <h6> Admin: {item.adminname}</h6>
                        <h4>{item.groupname}</h4>
                        <p>{item.grouptagline}</p> 
                    </div>
                    <div className="button">
                        <Button size="small" variant="contained">Request</Button>
                    </div>
                    <div className="button">
                        <Button size="small" variant="contained">Member</Button>
                    </div>
                </div>
            ))
            }

        </div>
    )
}

export default MyGroups