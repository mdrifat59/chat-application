import {React,useEffect,useState} from 'react'
import GroupImg from '../assets/group.png'  
import {Button, Typography, Modal, Box, TextField  } from '@mui/material'; 
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
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

  let groupData ={
    groupname:"",
    grouptagline:""
  }

const Group = () => {
    const db = getDatabase();
    let userData = useSelector((state)=>state.loggedUser.loginuser)
    let [groupInfo, setGroupInfo]=useState(groupData)
    let [groupList, setGroupList]=useState([])
    let [groupMemberList, setGroupMemberList]=useState([])
    let [memberList, setMemberList]=useState([])
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  
  let handleChange = (e)=>{

    setGroupInfo({
        ...groupInfo,
        [e.target.name]: e.target.value
    })
  }
  let handleSubmit =()=>{
    set(push(ref(db, 'groups/')), {
        groupname: groupInfo.groupname,
        grouptagline: groupInfo.grouptagline,
        adminid: userData.uid,
        adminname:userData.displayName
      }).then(()=>{
        setOpen(false)
      }) 
  }
  let handleGroupJoin = (item)=>{ 
    set(push(ref(db, 'grouprequests/')), {
      adminid:item.adminid,
      adminname:item.adminname,
      groupid:item.groupid,
      groupname:item.groupname,
      userid: userData.uid,
      username:userData.displayName
   })  
  }
  useEffect(()=>{
    const groupRef = ref(db, 'groups/');
    onValue(groupRef, (snapshot) => {
        let arr=[]
       snapshot.forEach(item=>{            
              arr.push({...item.val(), groupid:item.key})            
       })
              setGroupList(arr)
  });
},[])
  useEffect(()=>{
    const groupRef = ref(db, 'grouprequests/');
    onValue(groupRef, (snapshot) => {
        let arr=[]
       snapshot.forEach(item=>{          
        if(item.val().userid == userData.uid){
          arr.push(item.val().groupid)            
        }  
       })
              setGroupMemberList(arr)
  });
},[ ])
  useEffect(()=>{
    const groupRef = ref(db, 'members/');
    onValue(groupRef, (snapshot) => {
        let arr=[]
       snapshot.forEach(item=>{          
        if(item.val().userid == userData.uid){
          arr.push(item.val().groupid)            
        }  
       })
              setMemberList(arr)
  });
},[ ])
  return (
    <div className='box'> 
        <h3 className='title'>Group List
        <Button size="small" variant="contained"  onClick={handleOpen}>Create group</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Creat your group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField onChange={handleChange} name='groupname' margin="dense"  id="outlined-basic" label="Group Name" variant="outlined" />
                <TextField onChange={handleChange} name='grouptagline' id="outlined-basic" margin="dense"  label="Group Tagline" variant="outlined" />
          <br/>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
          </Typography>
        </Box>
      </Modal>
        </h3>
        {groupList.map(item =>(
          userData.uid !== item.adminid &&
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>{item.groupname}</h4>
                <p>{item.grouptagline}</p>
            </div>
            <div className="button">              
              {groupMemberList.indexOf(item.groupid) !== -1 
               ?
                 <Button  size="small" variant="contained">Request send</Button>               
               :
                 memberList.indexOf(item.groupid) !== -1
                 ?
                 <Button onClick={()=>handleGroupJoin(item)} size="small" variant="contained">Joined </Button>
                 :
                 <Button onClick={()=>handleGroupJoin(item)} size="small" variant="contained">Join </Button>
               
               }                  
            </div>
        </div>
        ))}
         
    </div>
  )
}

export default Group