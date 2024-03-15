import {React,useState} from 'react'
import GroupImg from '../assets/group.png'  
import {Button, Typography, Modal, Box, TextField  } from '@mui/material'; 
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

const Group = () => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='box'> 
        <h3 className='title'>Group List
        <Button size="small" variant="contained"  onClick={handleOpen}>Join</Button>
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
          <TextField margin="dense"  id="outlined-basic" label="Group Name" variant="outlined" />
          <TextField id="outlined-basic" margin="dense"  label="Group Tagline" variant="outlined" />
          </Typography>
        </Box>
      </Modal>
        </h3>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
        <div className="list">
            <div className="img">
                <img src={GroupImg} alt="" />
            </div>
            <div className="details">
                <h4>Friends Reunion</h4>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div className="button">
            <Button size="small" variant="contained">Join</Button>
            </div>
        </div>
    </div>
  )
}

export default Group