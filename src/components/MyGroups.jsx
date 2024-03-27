import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar'; 


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const MyGroups = () => {
    const db = getDatabase();
    let [myGroup, setMyGroup] = useState([])
    let [myGroupReq, setMyGroupReq] = useState([])
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
    const handleOpen = (group) =>{
      const groupRef = ref(db, 'grouprequests/');
      onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item => {  
                    if ( userData.uid == item.val().adminid && item.val().groupid == group.groupid) {
                        arr.push({...item.val(), groupreqid:item.key})
                    }
                })
                setMyGroupReq(arr) 
      });
      setOpen(true);
    } 
      
    const handleClose = () => setOpen(false);
    let userData = useSelector((state) => state.loggedUser.loginuser)
    useEffect(() => {
        const groupRef = ref(db, 'groups/');
        onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (item.val().adminid == userData.uid) {
                    arr.push({...item.val(), groupid:item.key})
                }
            })
            setMyGroup(arr) 
        });
    }, []) 
    let handleGroupRequestDelete = (item)=>{
      remove(ref(db, 'grouprequests/'+ item.groupreqid))
      setOpen(false)
    }
    let handleAccept = (item)=>{
      set(push(ref(db, 'members/')), {
         ...item
      }).then(()=>{
        remove(ref(db, 'grouprequests/'+ item.groupreqid))
        setOpen(false)
      })
    }
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
                        <Button onClick={()=>handleOpen(item)} size="small" variant="contained">Request</Button>
                    </div>
                    <div className="button">
                        <Button onClick={handleOpen2} size="small" variant="contained">Member</Button>
                    </div>
                </div>
            ))
            }

            {/* Group Request modal start */}
           
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Request List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {myGroupReq.map(item =>(
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.username}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          > 
                          </Typography>
                          {" Wants to join your group"}
                          <br/>
                          <Button onClick={()=>handleAccept(item)} style={{marginRight:"20px"}}  size="small" variant="contained" color='success'>Accept</Button>
                          <Button onClick={()=>handleGroupRequestDelete(item)}  size="small" variant="contained" color='error'>Delete</Button> 
                        </React.Fragment>
                      } 
                    /> 

                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
          ))}
     
    </List>
          </Typography>
        </Box>
      </Modal>
       {/* Group Request modal end */}
       {/* Member show modal start */}
       <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This is me
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
       {/* Member show modal end */}
        </div>
    )
}

export default MyGroups