import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { activeChat } from '../features/user/activechat/activeChatSlice'


const Friends = ({ button }) => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loggedUser.loginuser)
    let dispatch = useDispatch()
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
            if (arr[0].whosendid == userData.uid){
                dispatch(activeChat({
                    type: "singlemsg",
                    name: arr[0].whoreceivename,
                    id: arr[0].whoreceiveid
                }))
                localStorage.setItem("activeChat", JSON.stringify(
                    {
                      type:"singlemsg",
                      name:arr[0].whoreceivename,
                      id:arr[0].whoreceiveid
                  }
                  ))
            }else{
                dispatch(activeChat({
                    type: "singlemsg",
                    name: arr[0].whosendname,
                    id: arr[0].whosendid
                }))
                localStorage.setItem("activeChat", JSON.stringify(
                    {
                        type: "singlemsg",
                        name: arr[0].whosendname,
                        id: arr[0].whosendid
                    }
                ))
            }
        });
    }, [])
    let handleUnFriend = (item) => {
        remove(ref(db, 'friends/' + item.id))
    }
    let handleBlock = (item) => {
        if (userData.uid == item.whosendid) {
            set(push(ref(db, 'blocks/')), {
                blockedname: item.whoreceivename,
                blockid: item.whoreceiveid,
                blockbyid: item.whosendid,
                blockbyname: item.whosendname
            })
                .then(() => {
                    remove(ref(db, 'friends/' + item.id))
                })
        } else {
            set(push(ref(db, 'blocks/')), {
                blockedname: item.whosendname,
                blockedid: item.whosendid,
                blockbyid: item.whoreceiveid,
                blockbyname: item.whoreceivename
            }).then(() => {
                remove(ref(db, 'friends/' + item.id))
            })
        }
    }
    let handleMsg = (item) => {
        if (item.whosendid == userData.uid) {
            dispatch(activeChat({
                type: "singlemsg",
                name: item.whoreceivename,
                id: item.whoreceiveid
            }))
            localStorage.setItem("activeChat", JSON.stringify(
                {
                    type: "singlemsg",
                    name: item.whoreceivename,
                    id: item.whoreceiveid
                }
            ))
        } else {
            dispatch(activeChat({
                type: "singlemsg",
                name: item.whosendname,
                id: item.whosendid
            }))
            localStorage.setItem("activeChat", JSON.stringify(
                {
                    type: "singlemsg",
                    name: item.whosendname,
                    id: item.whosendid
                }
            ))
        }
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

                        {button == "msg"
                            ?
                            <div className="button">
                                <Button onClick={() => handleMsg(item)} size="small" variant="contained" color="error">Msg</Button>
                            </div>
                            :
                            <>
                                <div className="button">
                                    <Button onClick={() => handleBlock(item)} size="small" variant="contained" color="error">Block</Button>
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