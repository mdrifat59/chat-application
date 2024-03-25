import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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

const MyGroups = () => {
    const db = getDatabase();
    let [myGroup, setMyGroup] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                        <Button onClick={handleOpen} size="small" variant="contained">Request</Button>
                    </div>
                    <div className="button">
                        <Button size="small" variant="contained">Member</Button>
                    </div>
                </div>
            ))
            }
            {/* modal */}
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

        </div>
    )
}

export default MyGroups