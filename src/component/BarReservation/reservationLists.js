import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../Nav/Navbar'
import '../../App.css';

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EmergencyButton from './emerBut';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import List from './ResListField';
import './BarReservation.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
    
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    margin : "auto",
  },
  reserveList: {
    width: "100%",
    height: "400px",
    overflowY: "scroll",
  },
  header:{
    display : 'flex',
  },
  emerTabs: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
    marginRight : "10px"
  },
  tab:{
    background : "#b30059",
  },

  label:{
    textColor : "#ffffff",
  }
}));

export default function ResList() {
  
  
  // GET Reservation List
  const [ info, setInfo ] = useState([])
  const [ errors, setErrors ] = useState(false)
  const [date,setDate] = React.useState('');
  const [value, setValue] = useState(0);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState(-1)
  const [data, setData] = useState(info);

  const accessToken = JSON.parse(localStorage.getItem("user"));

  const handleChangeData = (status) => {
    setState(status)
    if (status === -1) {
      if (date === ""){
        setData(info)
      }
      else{
        setData(p => {
          return info.filter((item) => {
              return item.DateReserve === date
          })
      })
      }
  
      }
    else  {
      if (date === ""){
        setData(p => {
          return info.filter((item) => {
              return item.Status === status
          })
        })
      }
      else{
        setData(p => {
          return info.filter((item) => {
              return item.DateReserve === date && item.Status === status
          })
      })
      }
    }
    
}

  async function fetchData() {

    const res = await fetch('http://35.240.130.253:3001/reservations', { headers: accessToken })
    
    
    res
      .json()
      .then( res => {setInfo(res.filter((item) => {
        return item.Status !== 3 && item.Status !== 2
      }));
      if (state === -1) {
        if (date === ""){
          setData(res.filter((item) => {
            return item.Status !== 3 && item.Status !== 2
          }))
        }
        else{
          setData(p => {
            return res.filter((item) => {
                return item.DateReserve === date && item.Status !== 3 && item.Status !== 2
            })
        })
        }
    
        }
      else  {
        if (date === ""){
          setData(p => {
            return res.filter((item) => {
                return item.Status === state && item.Status !== 3 && item.Status !== 2
            })
          })
        }
        else{
          setData(p => {
            return res.filter((item) => {
                return item.DateReserve === date && item.Status === state && item.Status !== 3 && item.Status !== 2
            })
        })
        }
      }
        // setData(res.filter((item) => {
        //   return item.Status !== 3 && item.Status !== 2
        // }));
  
      })
      .then(console.log(value))
      .then(handleChangeData(state))
      .catch(err => setErrors(err));
    //console.log(data);
    console.log(data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  //const test = [{"_id":"5f8d3ff1dffb372a0d30e1d3","CustomerId":"5f8d347df736c01bd4619bfc","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"Mata","BarName":"DrunkOrca","DateReserve":"2020-10-20T00:00:00.000Z","NumberOfPeople":12,"PostScript":"10","Status":1,"LastModified":"2020-10-19T14:31:56.000Z","__v":0},{"_id":"5f8d411f08e35f2d01e1acf9","CustomerId":"5f8d347df736c01bd4619bfc","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"Mata","BarName":"DrunkOrca","DateReserve":"2020-10-21T00:00:00.000Z","NumberOfPeople":10,"PostScript":"Same with yesterday","Status":0,"LastModified":"2020-10-19T14:32:47.000Z","__v":0},{"_id":"5f8d49d887526c2f14798ba9","CustomerId":"5f8d347df736c01bd4619bfc","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"Mota","BarName":"DrunkOrca","DateReserve":"2020-10-22T00:00:00.000Z","NumberOfPeople":10,"PostScript":"Same with yesterday","Status":0,"LastModified":"2020-10-19T15:10:00.000Z","__v":0},{"_id":"5f93bdc5102550a35d026d9b","CustomerId":"5f93b5ec1315ad72fd1a6658","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"1970-01-01T05:35:22.020Z","NumberOfPeople":2,"PostScript":"2","Status":0,"LastModified":"2020-10-24T12:38:13.000Z","__v":0},{"_id":"5f959749102550a35d026dd3","CustomerId":"5f930bf51315ad72fd1a6657","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"Nabar","BarName":"DrunkOrca","DateReserve":"1970-01-01T05:18:42.020Z","NumberOfPeople":3,"PostScript":"3","Status":0,"LastModified":"2020-10-25T22:18:33.000Z","__v":0},{"_id":"5f95a1cf102550a35d026dd5","CustomerId":"5f930bf51315ad72fd1a6657","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"Nabar","BarName":"DrunkOrca","DateReserve":"1970-01-01T05:52:02.020Z","NumberOfPeople":1,"PostScript":"1","Status":0,"LastModified":"2020-10-25T23:03:27.000Z","__v":0},{"_id":"5f95d4f73cfff9062c80905d","CustomerId":"5f95ce333cfff9062c80905c","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2020-12-21T00:00:00.000Z","NumberOfPeople":5,"PostScript":"fafd","Status":0,"LastModified":"2020-10-25T19:41:43.000Z","__v":0},{"_id":"5f95d8fb3cfff9062c809062","CustomerId":"5f95d8cf3cfff9062c809061","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2021-02-02T00:00:00.000Z","NumberOfPeople":2,"PostScript":"balloon","Status":1,"LastModified":"2020-10-25T19:58:51.000Z","__v":0},{"_id":"5f95da443cfff9062c809063","CustomerId":"5f95d8cf3cfff9062c809061","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2021-02-02T00:00:00.000Z","NumberOfPeople":2,"PostScript":"candle","Status":0,"LastModified":"2020-10-25T20:04:20.000Z","__v":0},{"_id":"5f9667d83cfff9062c809065","CustomerId":"5f9666eb3cfff9062c809064","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"GGG","BarName":"DrunkOrca","DateReserve":"2020-11-04T00:00:00.000Z","NumberOfPeople":5,"PostScript":"1 โต๊ะใหญ่","Status":0,"LastModified":"2020-10-26T06:08:24.000Z","__v":0},{"_id":"5f9668c03cfff9062c809066","CustomerId":"5f9666eb3cfff9062c809064","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"GGG","BarName":"DrunkOrca","DateReserve":"2020-12-21T00:00:00.000Z","NumberOfPeople":2,"PostScript":"cola","Status":0,"LastModified":"2020-10-26T06:12:16.000Z","__v":0},{"_id":"5f966b0b3cfff9062c809067","CustomerId":"5f9666eb3cfff9062c809064","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"GGG","BarName":"DrunkOrca","DateReserve":"2020-12-21T00:00:00.000Z","NumberOfPeople":5,"PostScript":"aaa","Status":0,"LastModified":"2020-10-26T06:22:03.000Z","__v":0},{"_id":"5f966b313cfff9062c809068","CustomerId":"5f9666eb3cfff9062c809064","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"GGG","BarName":"DrunkOrca","DateReserve":"2020-12-22T00:00:00.000Z","NumberOfPeople":4,"PostScript":"cola","Status":0,"LastModified":"2020-10-26T06:22:41.000Z","__v":0},{"_id":"5f9676853cfff9062c80906c","CustomerId":"5f95ce333cfff9062c80905c","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2020-12-21T00:00:00.000Z","NumberOfPeople":3,"PostScript":"cola","Status":0,"LastModified":"2020-10-26T07:11:01.000Z","__v":0},{"_id":"5f96796a3cfff9062c809071","CustomerId":"5f9679353cfff9062c809070","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2020-12-18T00:00:00.000Z","NumberOfPeople":2,"PostScript":"cola","Status":0,"LastModified":"2020-10-26T07:23:22.000Z","__v":0},{"_id":"5f967a9f3cfff9062c809072","CustomerId":"5f9679353cfff9062c809070","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2020-12-01T00:00:00.000Z","NumberOfPeople":2,"PostScript":"cola","Status":0,"LastModified":"2020-10-26T07:28:31.000Z","__v":0},{"_id":"5f967e5e3cfff9062c809073","CustomerId":"5f9679353cfff9062c809070","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2020-12-02T00:00:00.000Z","NumberOfPeople":3,"PostScript":"colaa","Status":0,"LastModified":"2020-10-26T07:44:30.000Z","__v":0},{"_id":"5f9683763cfff9062c809075","CustomerId":"5f96833d3cfff9062c809074","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2021-02-02T00:00:00.000Z","NumberOfPeople":2,"PostScript":"birthday party","Status":0,"LastModified":"2020-10-26T08:06:14.000Z","__v":0},{"_id":"5f9688e13cfff9062c809077","CustomerId":"5f96833d3cfff9062c809074","BarId":"5f8d33c8f736c01bd4619bfb","CustomerName":"naboon","BarName":"DrunkOrca","DateReserve":"2020-03-01T00:00:00.000Z","NumberOfPeople":4,"PostScript":"","Status":0,"LastModified":"2020-10-26T08:29:21.000Z","__v":0}]
  const acceptReserve = info.filter((item) => {
    return item.Status === 1
  })
  const seats = acceptReserve.reduce((seat, acceptReserve) => seat + acceptReserve.NumberOfPeople,0) 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const handleFilter = () => {
    if (date === ""){
      setData(info)
    }
    else{
      setData(p => {
        return info.filter((item) => {
            return item.DateReserve === date
        })
    })
    }
  } ; 

   const handleChangeIndex = (index) => {
     setValue(index);
   };

  const allReserve = info.length;
  return (
    <body className = "body">
    <Navbar />
    <div className={classes.root}>
    <center className="nametext"><h1>List Of Reservations</h1><br/></center>
      <AppBar position="static" color="default" className = {classes.tab}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="#ffffff"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab onClick={()=> {
              setIndex(0)
              handleChangeData(-1)
          }} label="All Reservation" {...a11yProps(0)} className = {classes.label}/>
          <Tab onClick={()=> {
              setIndex(1)
              handleChangeData(1)
          }}  label="Accepted Reservation" {...a11yProps(1)} />
          <Tab onClick={()=> {
              setIndex(2)
              handleChangeData(0)
          }} label="Pending Reservation" {...a11yProps(2)} />

        </Tabs>

      </AppBar>
      <br></br>
      <br></br>
      <div>
      
      <center><p className="emerBut"><EmergencyButton getData={fetchData}/></p>
      <FormControl variant="outlined" className = {classes.emerTabs}>
      <TextField
          id="standard-textarea"
          label="Filter By Date"
          placeholder="DD-MM-YYYY"
          multiline
          value={date} onChange={(event) => {setDate(event.target.value);console.log(event.target.value)}}
        />
        {/* <InputLabel htmlFor="component-outlined">Filter Date</InputLabel>
        <OutlinedInput id="component-outlined" value={date} onChange={(event) => {setDate(event.target.value);console.log(event.target.value)}} label="Date" /> */}
      </FormControl>
      <p className = "filterBut"><Button variant="contained" color="primary" onClick={() => {handleChangeData(state);}}>
        Filer By Date
      </Button></p></center>
      </div>
        <TabPanel value={value} index={index} dir={theme.direction}>
        <p className="Accepttext">Total Accepted Seats : {seats}</p>
        <p className="Totaltext">All Reservation : {allReserve}</p>
        <br></br>
        <div className={classes.reserveList}>
          <List getData={fetchData} data={data}/>
        </div>
        </TabPanel>
    </div>
    </body>
  );
}