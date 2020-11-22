import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';

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
    color: 'secondary',
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(255,255,224,.5)',
    },
  },
  icon: {
    borderRadius: 3,
    width: 18,
    height: 18,
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(255,255,255,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: "#FF007F",
    background: "rgba(255,0,12,.5)",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 18,
      height: 18,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""'
    },
  }
}));

export default function Checkboxes({closeOn,closeOn1,setCloseOn1}) {
  const classes = useStyles();

  const [value, setValue] = useState({
    Sunday: closeOn[0],
    Monday: closeOn[1],
    Tuesday: closeOn[2],
    Wednesday: closeOn[3],
    Thursday: closeOn[4],
    Friday: closeOn[5],
    Saturday: closeOn[6]
  });

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.checked });
    setCloseOn1({...closeOn1,[event.target.name]: event.target.checked })
  };

  const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = closeOn1;
  useEffect(() => {
    console.log(value)
  },[value])

  return (
    <div className={classes.root}>
      <FormControl 
        component="fieldset" 
        disabled
      >
        <FormGroup >
          <FormControlLabel 
            control={<Checkbox
              disableRipple 
              checked={Sunday} 
              onChange={handleChange} 
              name="Sunday" 
              icon={<span className={classes.icon}/>} 
              checkedIcon={<span className={classes.checkedIcon}/>} 
              />}
            label={"Sunday"} 
          />
          <FormControlLabel 
            control={<Checkbox
              disableRipple 
              checked={Monday} 
              onChange={handleChange} 
              name="Monday" 
              icon={<span className={classes.icon}/>} 
              checkedIcon={<span className={classes.checkedIcon}/>} 
              />}
            label="Monday" 
          />
          <FormControlLabel 
            control={<Checkbox
              disableRipple 
              checked={Tuesday} 
              onChange={handleChange} 
              name="Tuesday" 
              icon={<span className={classes.icon}/>} 
              checkedIcon={<span className={classes.checkedIcon}/>} 
              />}
            label="Tuesday" 
          />
          <FormControlLabel 
            control={<Checkbox
              disableRipple 
              checked={Wednesday} 
              onChange={handleChange} 
              name="Wednesday" 
              icon={<span className={classes.icon}/>} 
              checkedIcon={<span className={classes.checkedIcon}/>} 
              />}
            label="Wednesday" 
          />
          <FormControlLabel 
            control={<Checkbox
              disableRipple 
              checked={Thursday} 
              onChange={handleChange} 
              name="Thursday" 
              icon={<span className={classes.icon}/>} 
              checkedIcon={<span className={classes.checkedIcon}/>} 
              />}
            label="Thursday" 
          />
          <FormControlLabel 
            control={<Checkbox
              disableRipple 
              checked={Friday} 
              onChange={handleChange} 
              name="Friday" 
              icon={<span className={classes.icon}/>} 
              checkedIcon={<span className={classes.checkedIcon}/>} 
              />}
            label="Friday" 
          />
          <FormControlLabel 
            control={<Checkbox
              disableRipple 
              checked={Saturday} 
              onChange={handleChange} 
              name="Saturday" 
              icon={<span className={classes.icon}/>} 
              checkedIcon={<span className={classes.checkedIcon}/>} 
              />}
            label="Saturday" 
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}