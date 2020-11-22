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



export default function UploadButtons(props) {
  const classes = useStyles();
  const [pic, setPic] = useState(null)
  const [open, setOpen] = useState(false)
  const Getdata = props.GetData;

  const accessToken = JSON.parse(localStorage.getItem("user"));

  const modalOpen = () => { setOpen(true) };
 
  const modalClose = () => { setOpen(false) };

  async function PatchData(isProfile, pic) {
    const config = {
      'Authorization' : `${accessToken.Authorization}`,
      'Access-Control-Allow-Origin': '*',
    }

    // const input = document.querySelector('input[type="file"]')

    const data = new FormData();
    data.append('image', pic);

       
    const res = await fetch(`http://35.240.130.253:3001/bars/`+accessToken.id+'/pictures?profile='+isProfile, {
        method: 'PATCH',
        headers: config,
        body: data,
        redirect: 'follow',
        
    })
    .then(Getdata);
    }


  return (
    <div>
        <button className="Button2" onClick={modalOpen}>
            Change your picture
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
                  onChange={event => setPic(event.target.files[0])}
                />
              </label>
              <button 
                className={classes.Submit} 
                onClick={() => {
                  PatchData(props.profile, pic);
                  modalClose();
                  Getdata();
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
