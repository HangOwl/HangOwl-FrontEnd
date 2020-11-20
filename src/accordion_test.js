import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    textAlign : 'center',
    marginBottom : "10px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
  },

  card:{
      background : "powderblue",
  },

  button:{
    margin: theme.spacing(1),
    flexBasis: '25%',
    flexShrink: 100,
  }
}));



export default function ControlledAccordions(props) {
  const {getData,data} = props;
  const classes = useStyles();
  const statMap = ["Pending", "Accepted", "Rejected"]
  const [expanded, setExpanded] = React.useState(false);

  const PatchData = (id, value) => {
    console.log(value);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const patchData = (id,stat) => {
    fetch('http://35.240.130.253:3001/reservations/' + id + '/' + stat, {
    method: 'PATCH', // or 'PUT'
    headers:  {
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllNmZjNDI5ZTM1MzExYzYyZDcwYWMiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA0NTYyOTU3LCJleHAiOjE2MDQ3MzU3NTd9.fLK0FIVuzxhXRxw8AdIv9iGc8tfUgYBFASzM65P9_ME",
      "id": "5f9e6fc429e35311c62d70ac",
      "Role": 1
    },
    })

    .then(response => response.json())
    .then(() => {
    console.log('Success');
      getData();
          })    
    .catch((error) => {
    console.error('Error:', error);
    });

    
  }


  const handleButton = (Status) => {
    if (Status === 0) return "";
    else return "disabled";
  }

  const res_card = data.map((info) => (

    
    <div className={classes.root}>
      <Accordion expanded={expanded === info.ResId} onChange={handleChange(info.ResId)} className = {classes.card}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Client Name : {info.CustomerName}</Typography>
          <Typography className={classes.heading}>People : {info.NumberOfPeople} </Typography>
          <Typography className={classes.heading}>date : {info.DateReserve}</Typography>
          <Typography className={classes.heading}>{statMap[info.Status]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.heading}>
            ID : {info.ResId} <br></br>
          </Typography>
          <Typography className={classes.heading}>
            ps : {info.PostScript} <br></br>
          </Typography>

          {(info.Status===0)? <Button variant="contained" color="primary" className={classes.button} onClick={() => {patchData(info.ResId,"approve"); setExpanded(false)}}>Accept</Button>:
          <Button variant="contained" color="primary" className={classes.button} disabled>Accept</Button>}

          {(info.Status===0)? <Button variant="contained" color="secondary" className={classes.button} onClick={() => {patchData(info.ResId, "reject"); setExpanded(false);}}>Reject</Button>:
          <Button variant="contained" color="secondary" className={classes.button} disabled>Reject</Button>}
        </AccordionDetails>
      </Accordion>
    </div>
  ))


  return (

    <div className={classes.root}>
        {res_card}
    </div>
  );
 }