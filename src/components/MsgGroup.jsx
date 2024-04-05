import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import GroupImg from '../assets/group.png'
import { Button } from '@mui/material';

const MsgGroup = () => {
  const db = getDatabase();
  let userData = useSelector((state) => state.loggedUser.loginuser)
  let [myGroup, setMyGroup] = useState([])
  let [groupMembers, setGroupMembers] = useState([])
  useEffect(() => {
    const groupRef = ref(db, 'groups/');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        arr.push({ ...item.val(), groupid: item.key })
      })
      setMyGroup(arr)
    });

    // member group ar useEffect
    const memberRef = ref(db, 'members/');
    onValue(memberRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        arr.push(item.val())
      })
      setGroupMembers(arr)
    });
  }, [])

  return (
    <div className='box'>
      <h3>Groups</h3>
      {myGroup.map((item, index) => (
        userData.uid == item.adminid ? (
          <div key={index} className="list">
            <div className="img">
              <img src={GroupImg} alt="" />
            </div>
            <div className="details">
              <h6> Admin: {item.adminname}</h6>
              <h4>{item.groupname}</h4>
              <p>{item.grouptagline}</p>
            </div>
            <div className="button">
              <Button size="small" variant="contained" color='success'>Admin</Button>
            </div>
          </div>
        ) : (
          groupMembers.map((msg) =>
            userData.uid == msg.userid &&
            item.groupid == msg.groupid &&
            <div key={index} className="list">
              <div className="img">
                <img src={GroupImg} alt="" />
              </div>
              <div className="details">
                <h6> Admin: {msg.adminname}</h6>
                <h4>{msg.groupname}</h4>
                <p>{msg.grouptagline}</p>
              </div>
              <div className="button">
                <Button size="small" variant="contained" color='secondary'>Members</Button>
              </div>
            </div>
          )
        )
      ))
      }
    </div>
  )
}

export default MsgGroup