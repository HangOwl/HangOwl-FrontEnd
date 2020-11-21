import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Navbar from './Nav/Navbar'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    List: {
        width: "100%",
        height: "300px",
        overflowY: "scroll",
      },
    root: {
      width: "70%",
      margin : "auto",
      allignItem : "center",
    },
  });

export default function BarHomepage() {
    const classes = useStyles();
    const [ info, setInfo ] = useState([]);
    const [bar,setName] =  useState("");
    const [ errors, setErroes] = useState(false)
    async function fetchData() {
        const headers = {
          "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllNmZjNDI5ZTM1MzExYzYyZDcwYWMiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA1ODUyODU4LCJleHAiOjE2MDYwMjU2NTh9.HMlCNly6-tTa9PrTjJxmc1vs2RQe9mcSF8RjLovC2NU",
          "id": "5f9e6fc429e35311c62d70ac",
          "Role": 1
      }
    
        const res = await fetch('http://35.240.130.253:3001/reservations', { headers })
        
        
        res
          .json()
          .then( res => {setName(res[0].BarName);setInfo(res.filter((item) => {
            return item.Status === 0
          }));
        })
          .catch(err => setErroes(err));
        //console.log(data);
        console.log(info)
        console.log(bar)
      }
    
      useEffect(() => {
        fetchData();
      }, []);
  
    return (
    
    <body className = "body">
    <Navbar />
    <div className={classes.root}>    
    <center><h1>{bar}<br></br>
        Pending Reservations 
        <Button variant="contained" color="secondary">
        Check Reserved
      </Button>
    </h1></center>
    <br></br>
    <br></br>
    <div className={classes.List}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {info.map((info) => (
              <TableRow key={info.ResId}>
                <TableCell component="th" scope="row">
                Client Name : {info.CustomerName}555
                </TableCell>
                <TableCell align="right">People : {info.NumberOfPeople}</TableCell>
                <TableCell align="right">date : {info.DateReserve}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div><center><Button variant="contained" color="secondary">
        Edit Bar's Details
      </Button></center></div>
    </body>
    );
  }