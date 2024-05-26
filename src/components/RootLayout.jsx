import React, { useState, createRef } from 'react'
import { Outlet, Link,useLocation, useNavigate  } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import profile from '../assets/profile.png'   
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline,IoMdSettings,IoIosLogOut,IoIosHome    } from "react-icons/io"; 
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';  
import Cropper  from "react-cropper";
import "cropperjs/dist/cropper.css"; 
import { getStorage, ref, uploadString, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { getDatabase, ref as rref, set } from "firebase/database"; 
 import { userdata } from '../features/user/userSlice';

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

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

const RootLayout = () => { 
  const auth = getAuth();
  const db = getDatabase();
  const location = useLocation(); 
  let navigate =useNavigate()
  let userData= useSelector((state)=>state.loggedUser.loginuser)
  let dispatch = useDispatch()
  const storage = getStorage();
  const storageRef = ref(storage, `profile/${userData.uid}`);
  // mordal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // cropper
 const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const handleCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
      getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url)
        set(rref(db, 'users/' + userData.uid), {
          username: userData.displayName,
          email: userData.email,
          profile_picture : url
        }).then(()=>{
          localStorage.setItem("user",JSON.stringify({...userData,photoURL:url}))
          dispatch(userdata({...userData,photoURL:url}))
        })
      })
});
    }
    setOpen(false)
    setImage("")
  }; 
  
// logout
  let handleLogOut =()=>{ 
    signOut(auth).then(() => {
      localStorage.removeItem("user")
      navigate("/login")
      }) 
} 
  return (
    <>
         <Grid container spacing={2}>
        <Grid item xs={1}>
            <div className='navbar'>
              <div className="navcontainer">
                <img onClick={handleOpen} src={userData.photoURL} />
                <h4 className='username'>{userData.displayName}</h4>
                <ul>
                  <li>
                     <Link to="/chat/home" className={location.pathname ==  "/chat/home" ? 'active' : 'icon'}>
                        <IoIosHome />
                     </Link>
                    </li>       
                  <li>
                  <Link to="/chat/message" className={location.pathname == "/chat/message" ? 'active': 'icon'}>
                        <AiOutlineMessage />
                     </Link>
                    </li>       
                  <li><IoIosNotificationsOutline className='icon' /></li>       
                  <li><IoMdSettings className='icon' /></li>     
                  <li> 
                   
                  <IoIosLogOut onClick={handleLogOut} className='icon' />
                      
                    </li>     
                </ul>
              </div>
            </div>
        </Grid>
        <Grid item xs={11}> 
          <Outlet/>
        </Grid> 
      </Grid>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Profile Pic
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className='img-preview'></div>
          <input type="file" onChange={onChange} />
          {image ?
          <>
               <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
          </>
        :
        <div className='img-preview'>

          <img style={{height:"100px",width:"100px", borderRadius:"50%"}} src={userData.photoURL}/>
        </div>
        }
         
        <button onClick={handleCropData}>upload</button> 
          </Typography>
        </Box>
      </Modal>

    </>
  )
}

export default RootLayout