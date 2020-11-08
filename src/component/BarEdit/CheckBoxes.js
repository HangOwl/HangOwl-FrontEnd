import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CloseOutlined } from '@material-ui/icons';

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
      <FormControl component="fieldset" className={classes.formControl} style={{}} disabled>
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
  );
}