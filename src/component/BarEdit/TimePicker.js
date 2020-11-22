import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BarBG from '../img/BarBG(4K).jpg';
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        height: '212px',
        width: '348px',
        backgroundImage: `url(${BarBG})`,
        backgroundColor: '#fff',
        border: '2px solid #000',
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        color: 'secondary',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        color: 'secondary',
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

export default function TimePickers(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [contentKey, setcontentKey] = useState(props.contentKey);
    const [contentValue, setcontentValue] = useState('');
    const Getdata = props.GetData;

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    async function PatchData(contentKey, contentValue) {
        const headers = {
            "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllNmZjNDI5ZTM1MzExYzYyZDcwYWMiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA1OTQwODg2LCJleHAiOjE2MDYxMTM2ODZ9.WY9LbucQdGIYA2oDq4MLtcSKxGDCuvNQWuEtjV8m9K8",
            "id": "5f9e6fc429e35311c62d70ac",
            "Role": 1
        }
  
        const params = JSON.stringify({
            [contentKey]: contentValue,
        });
        
        const config = {
            'Authorization' : `${headers.Authorization}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
      
        const res = await fetch(`http://35.240.130.253:3001/bars/`+headers.id,{
            method: 'PATCH',
            headers: config,
            body: params,
        })
        .then(Getdata());
      
        const CheckTime = await res.json()
        console.log(CheckTime);
    }

    return (
        <div>
            <button className="Button3" onClick={handleOpen}>Edit</button>

            <Modal
            open={open}
            onClose={handleClose}
            
            >
             <div className={classes.paper}>
                <h1 className={classes.text}>Edit your Detail</h1>
                <form className={classes.container} noValidate>
                    <TextField
                        id="time"
                        label={contentKey}
                        type="time"
                        defaultValue={contentValue}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        color: 'secondary'
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        onChange={(event) => setcontentValue(event.target.value)}
                    />
                </form>
                console.log({contentValue});
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
