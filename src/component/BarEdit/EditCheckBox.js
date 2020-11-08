import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import './BarDetail.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px auto',
      },
    formControl: {
        display: 'flex',
        margin: theme.spacing(3),
        alignItems: 'center',
        margin: '0px auto',
        color: 'white',
      },
    paper: {
      position: 'absolute',
      height: '500px',
      width: '500px',
      // backgroundImage: `url(${BarBG})`,
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
  

async function PatchData() {
    const headers = {
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjlmYjY2ZWU1MjQ5YjE0Y2UxYTIwOGYiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA0NzU4MTY2LCJleHAiOjE2MDQ5MzA5NjZ9.4-dmdVxy-hPH9Hvzm3TWNJ91-aYIOzSyMP2jqULriJA",
      "id": "5f9fb66ee5249b14ce1a208f",
      "Role": 1
    }

    const config = {
      'Authorization' : `${headers.Authorization}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
       
      const res = await fetch(`http://35.240.130.253:3001/bars/`+headers.id,{
        method: 'PATCH',
        headers: config,
      });

      const EditCheck = await res.json()
      console.log('check box ',EditCheck);
}

export default function EditCheckBox() {
    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const [Check, setCheck] = useState(false);
    const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = Check;

    const modalOpen = () => { setOpen(true) };
 
    const modalClose = () => { setOpen(false) };

    const handleChange = (event) => {
        setCheck(event.target.value)
    }

    return (
      <div>
        <button className="Button3" onClick={modalOpen}>
          Edit
        </button>
        <Modal
          open={open}
          onClose={modalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        <div className={classes.paper}>
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}  >
                <FormGroup>
                <FormControlLabel 
                    control={<Checkbox checked={Sunday} onChange={handleChange} name="Sunday" />}
                    label="Sunday"
                />
                <FormControlLabel
                    control={<Checkbox checked={Monday} onChange={handleChange} name="Monday" />}
                    label="Monday"
                />
                <FormControlLabel
                    control={<Checkbox checked={Tuesday} onChange={handleChange} name="Tuesday" />}
                    label="Tuesday"
                />
                <FormControlLabel
                    control={<Checkbox checked={Wednesday} onChange={handleChange} name="Wednesday" />}
                    label="Wednesday"
                />
                <FormControlLabel
                    control={<Checkbox checked={Thursday} onChange={handleChange} name="Thursday" />}
                    label="Thursday"
                />
                <FormControlLabel
                    control={<Checkbox checked={Friday} onChange={handleChange} name="Friday" />}
                    label="Friday"
                />
                <FormControlLabel
                    control={<Checkbox checked={Saturday} onChange={handleChange} name="Saturday" />}
                    label="Saturday"
                />
                </FormGroup>
            </FormControl>
        </div>
        </div>
        </Modal>
      </div>
  );

}
