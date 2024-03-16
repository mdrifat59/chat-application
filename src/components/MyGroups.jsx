import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroups = () => {
    const db = getDatabase();
    let [group, setGroup]=useState([])
    let userData = useSelector((state) => state.loggedUser.loginuser)
    useEffect(() => {
        const groupRef = ref(db, 'groups/');
        let arr = []
        onValue(groupRef, (snapshot) => {
            snapshot.forEach(item=>{
                if(item.val().adminid == userData.uid){
                    arr.push({...item.val(), id:item.key})
                }
            })
            setGroup(arr)
        });
    },[])
    return (
        <div className='box'>
            <h3>My Groups</h3>
            {group.length == 0
            ?
                <h2>your not group yet</h2>
            :
            
            group.map(item=>(
                userData.uid == item.adminid &&
            <div className="list">
                <div className="img">
                    <img src={GroupImg} alt="" />
                </div>
                <div className="details">
                    <h5> Admin: {item.adminname}</h5>
                    <h4>{item.groupname}</h4>
                    <p>{item.grouptagline}</p>
                </div>
                <div className="button">
                    <p>Today, 8:56pm</p>
                </div>
            </div>
            ))
            }

        </div>
    )
}

export default MyGroups