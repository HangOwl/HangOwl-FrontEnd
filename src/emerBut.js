import Button from '@material-ui/core/Button';
import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import './App.css';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      border: '2px solid #000',
      backgroundColor: "#FF33CC",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      allignItem : "center",
    },

    doc:{

    },
    button:{
        margin: theme.spacing(1),
        flexBasis: '25%',
        flexShrink: 100,
      },

    modal:{
        allignItem : "center",
    }

  }));

  

export default function EmergencyButton(props){
  const {getData} = props;
  const classes = useStyles();
  const [date,setDate] = React.useState('');
  const [reason,setReason] = React.useState('');
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const delData = () => {
    fetch('http://35.240.130.253:3001/reservations', {
    method: 'DELETE',
    headers:  {
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllNmZjNDI5ZTM1MzExYzYyZDcwYWMiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA1ODUyODU4LCJleHAiOjE2MDYwMjU2NTh9.HMlCNly6-tTa9PrTjJxmc1vs2RQe9mcSF8RjLovC2NU",
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      "date": date
    })
    })
    .then(res => console.log(res)) // or res.json()
    .then(() => {
    console.log('Success');
      getData();
          })    
    .catch((error) => {
    console.error('Error:', error);
    });

    
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" className = "center_txt">Emergency Close</h2>
      <p id="simple-modal-description" style={{padding : "10px"}} >
        1. All reservation will be canceled <br></br> [include accepted and pending orders]<br></br>
        2. No customer will able reserve in this day
      </p>
      <br></br>
      <p style={{padding : "10px"}}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Date</InputLabel>
        <OutlinedInput id="component-outlined" value={date} onChange={(event) => {setDate(event.target.value);}} label="Date" />
      </FormControl></p>
      <p style={{padding : "10px"}}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">P.S.</InputLabel>
        <OutlinedInput id="component-outlined" value={reason} onChange={(event) => {setReason(event.target.value);}} label="Reason" />
      </FormControl></p>
      <Button variant="contained" color="secondary" href="#contained-buttons" className={classes.button} onClick={() => {delData(); handleClose();}}>
            Cencel all Reservation
          </Button>
          <Button variant="contained" color="primary" href="#contained-buttons" classname={classes.button} onClick={handleClose} style = {{backgroundColor :"purple"}}>
            Back to Reservation List
          </Button>
    </div>
  );


  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        EMEGENCY CLOSE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        classNames = "body"

      >
        {body}
      </Modal>
    </div>
  );
}
