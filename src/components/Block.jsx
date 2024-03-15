import React, { useEffect, useState } from 'react'
import GroupImg from '../assets/group.png'
import {Button} from '@mui/material';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Block = () => {
    const db = getDatabase();
    let userData=useSelector((state)=>state.loggedUser.loginuser)
    let [blockList, setBlockList]=useState([])
    useEffect(()=>{
        const blockRef = ref(db, 'blocks/');
                onValue(blockRef, (snapshot) => {
                    let arr =[]
                 snapshot.forEach(item=>{ 
                        arr.push({...item.val(), id:item.key})
                                      
                 })
                    setBlockList(arr)
                 
});
    },[])
    let handleUnblock =(item)=>{
        remove(ref(db, 'blocks/'+ item.id))
    }
  return (
    <div className='box'> 
    <h3>Blocked Users</h3>
    {blockList.length == 0 
    ?
    <h2>No Blocked ID</h2>
    :
    blockList.map(item=>(
    <div className="list">
        <div className="img">
            <img src={GroupImg} alt="" />
        </div>
        <div className="details">
        {item.blockbyid == userData.uid
        ?
        <h4>{item.blockedname}</h4>
        :
         <h4>{item.blockbyname}</h4>
        }
            <p>Hi Guys, Wassup!</p>
        </div>
        {item.blockbyid == userData.uid        
        &&        
        <div className="button">
        <Button onClick={()=>handleUnblock(item)} size="small" variant="contained"> unblock</Button>
        </div>
        }
    </div>
    ))
    }
    
</div>
  )
}

export default Block