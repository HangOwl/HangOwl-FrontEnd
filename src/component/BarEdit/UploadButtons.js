import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './BarDetail.css'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    height: '212px',
    width: '348px',
    backgroundColor: '#fff',
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  text: {
    fontFamily: 'Impact', 
    fontSize: '30px',
    color: '#E11584',
    textAlign: 'center',
  },
  Submit: {
    fontFamily: 'Impact',
    height: '44px',
    width: '77px',
    position: 'absolute',
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: '#E11584',
    color: '#fff',
  },
  custom: {
    top: '70%',
    border: '1px solid #ccc',
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer',
  },
}));

async function PatchData(pictures) {
    const headers = {
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllNmZjNDI5ZTM1MzExYzYyZDcwYWMiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA0MjgyNjQyLCJleHAiOjE2MDQ0NTU0NDJ9.FV1wL8M5AT-Q22HBwwsHyyKW_CfJrQyxMNRafoHqISs",
      "id": "5f9e6fc429e35311c62d70ac",
      "Role": 1
    }
    const config = {
      'Authorization' : `${headers.Authorization}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
       
    const res = await fetch(`http://35.240.130.253:3001/bars/`+headers.id+'/pictures?profile='+pictures, {
        method: 'PATCH',
        headers: config,
        body: JSON.stringify(pictures)
    });

    const EditContent = await res.json()
    console.log(UploadButtons);
    }


export default function UploadButtons(pictures) {
  const classes = useStyles();
  const [pic, setPic] = useState(pictures)
  const [open, setOpen] = useState(false)
 

  const modalOpen = () => { setOpen(true) };
 
  const modalClose = () => { setOpen(false) };
  return (
    <div>
        <button className="Button2" onClick={modalOpen}>
            Change your profile
        </button>
        <Modal
          open={open}
          onClose={modalClose}
        >
            <div className={classes.root}>
              <h1 className={classes.text}>Upload your bar's picture</h1>
              <label className={classes.custom}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  value={pic}
                  onChange={(event) => setPic(event.target.value)}
                />
              </label>
              <button 
                className={classes.Submit} 
                onClick={() => {
                  PatchData(pic);
                  modalClose();
                  }
                }
              >
                  Submit
              </button>
              
        </div>
        </Modal>
        
    </div>
    
  );
}
