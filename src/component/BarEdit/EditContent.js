import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './BarDetail.css'
// import BarBG from '/mnt/c/namtanii/Year3/SoftEng/fetchdata/src/component/img/BarBG(4K).jpg'

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      height: '212px',
      width: '348px',
      // backgroundImage: `url(${BarBG})`,
      backgroundColor: '#231f21',
      border: '2px solid #000',
      padding: theme.spacing(2, 4, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    text: {
      fontFamily: 'Impact', 
      fontSize: '30px',
      color: '#fff',
      textAlign: 'center',
    },
    box: {
      position: 'absolute',
      width: '212px', 
      height: '63px',
      margin: 'auto',
      left: '25%',
    },
    Submit: {
      fontFamily: 'Impact',
      height: '44px',
      width: '77px',
      position: 'absolute',
      left: '25.00%',
      right: '29.08%',
      top: '71.7%',
      backgroundColor: '#E11584',
      color: '#fff',
    },
    Cancel: {
      fontFamily: 'Impact',
      height: '44px',
      width: '77px',
      position: 'absolute',
      left: '58.79%',
      right: '60.35%',
      top: '71.7%',
      backgroundColor: '#E11584',
      color: '#fff',
    },
    
  }));
  

function EditContent(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const [contentKey, setcontentKey] = useState(props.contentKey);
    const [contentValue, setcontentValue] = useState('');
    const Getdata = props.GetData;
    const accessToken = JSON.parse(localStorage.getItem("user"));

    const handleOpen = () => { setOpen(true) };
 
    const handleClose = () => { setOpen(false) };

    async function PatchData(contentKey, contentValue) {
  
      const params = JSON.stringify(
        {
            [contentKey]: contentValue,
        }
      );
  
      const config = {
        'Authorization' : `${accessToken.Authorization}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
  
         
        const res = await fetch(`http://35.240.130.253:3001/bars/`+accessToken.id,{
          method: 'PATCH',
          headers: config,
          body: params,
        })
        .then(Getdata());
  
        const EditContent = await res.json()
        console.log(EditContent);
      }

    return (
      <div>
        <button className="Button3" onClick={handleOpen}>
          Edit
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                  <h1 className={classes.text}>Edit your Detail</h1>
                  <textarea 
                    className={classes.box}
                    cols="10" 
                    rows="5"
                    value={contentValue}
                    onChange={(event) => setcontentValue(event.target.value)}
                  />
                  <br/>
                  <button 
                    className={classes.Submit} 
                    onClick={() => { 
                      PatchData(contentKey, contentValue);
                      handleClose();}}>Submit
                  </button>
                  <button className={classes.Cancel} onClick={handleClose}>Cancel</button>
            </div>
        </Modal>
      </div>
  );

}



export default EditContent;