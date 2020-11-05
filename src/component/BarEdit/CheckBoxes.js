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
  },

}));

export default function Checkboxes({closeOn}) {
  const classes = useStyles();

  const [value, setValue] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false
  });

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.checked });
  };

  const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = value;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
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