import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './BarDetail.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
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
        body: pictures,
    });

    const EditContent = await res.json()
    console.log(UploadButtons);
    }


export default function UploadButtons( { pictures } ) {
  const classes = useStyles();
  const [pic, setPic] = useState('')
  const [open, setOpen] = useState(false)
  const [contentKey, setcontentKey] = useState(pictures);
  const [contentValue, setcontentValue] = useState('');

    const modalOpen = () => { setOpen(true) };
 
    const modalClose = () => { setOpen(false) };
  return (
    <div>
        <button ariant="contained" color="primary" component="span" onClick={modalOpen}>
            Change Bar Picture
        </button>
        <Modal>
            <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => setPic(event.target.value)}
            />
            <label htmlFor="contained-button-file">
            <button variant="contained" color="primary" component="span" onClick={() => console.log(pic)}>
                browse
            </button>
            </label>
        </div>
        </Modal>
        
    </div>
    
  );
}
