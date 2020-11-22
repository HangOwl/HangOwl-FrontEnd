import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BarBG from '../img/BarBG(4K).jpg';
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        height: '212px',
        width: '348px',
        backgroundImage: `url(${BarBG})`,
        backgroundColor: '#231f21',
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
        color: '#fff',
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

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: "white"
        },
        '& label': {
            color: "white"
        },
        '& input': {
            color: "white"
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "white"
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: "white"
        }
    }
})(TextField);

export default function TimePickers(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [contentKey, setcontentKey] = useState(props.contentKey);
    const [contentValue, setcontentValue] = useState('');
    const Getdata = props.GetData;
    const accessToken = JSON.parse(localStorage.getItem("user"));
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    async function PatchData(contentKey, contentValue) {
  
        const params = JSON.stringify({
            [contentKey]: contentValue,
        });
        
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
                    <CssTextField
                        id="time"
                        label={contentKey}
                        type="time"
                        defaultValue={contentValue}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        onChange={(event) => setcontentValue(event.target.value)}
                    />
                </form>
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
