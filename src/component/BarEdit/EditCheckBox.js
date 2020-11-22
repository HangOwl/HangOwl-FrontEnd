import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import './BarDetail.css'
import BarBG from '../img/BarBG(4K).jpg'

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
        color: '#E11584',
      },
    paper: {
      position: 'absolute',
      height: '500px',
      width: '280px',
      backgroundImage: `url(${BarBG})`,
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
      left: '10.00%',
      right: '25.00%',
      top: '85.7%',
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
      top: '85.7%',
      backgroundColor: '#E11584',
      color: '#fff',
    },
    
  }));
  

async function PatchData(closeOn) {
    const accessToken = JSON.parse(localStorage.getItem("user"));

    const config = {
      'Authorization' : `${accessToken.Authorization}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }

    const body = {
      "CloseWeekDay": closeOn
    };

    console.log(body)
       
      const res = await fetch(`http://35.240.130.253:3001/bars/`+accessToken.id,{
        method: 'PATCH',
        headers: config,
        body: JSON.stringify(body)
      });

      const EditCheck = await res.json()
      console.log('check box ',EditCheck);
}

export default function EditCheckBox(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const [Check, setCheck] = useState({
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false
    });
    const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = Check;
    const Getdata = props.GetData;

    const modalOpen = () => { setOpen(true) };
 
    const modalClose = () => { setOpen(false) };

    const handleChange = (event) => {
        setCheck({...Check, [event.target.name]: event.target.checked})
        console.log(Check)
    };

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
            <h1 className={classes.text}>Edit your Detail</h1>
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
            <button 
                className={classes.Submit} 
                onClick={() => { 
                    PatchData([Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]);
                    modalClose();
                    Getdata();}}>Submit
            </button>
            <button className={classes.Cancel} onClick={modalClose}>Cancel</button>
        </div>
        </Modal>
      </div>
  );

}
