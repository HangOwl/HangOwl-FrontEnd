import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom' 

import Navbar from './Nav/Navbar'
import './BarHomepage.css'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import welcome from './img/Welcome_To_HangOwl.png'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      background : "#FF7CF5",
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
    button1: {
      width: "80px",
      height: "80px",
      backgroundColor: "#E11584"
    },
  });

  export default function BarHomepage() {
    const classes = useStyles();
    const [ info, setInfo ] = useState([]);
    const [ bar, setName ] =  useState("");
    const [ errors, setErrors ] = useState(false);
    const token = localStorage.getItem("user");
    const accessToken = JSON.parse(token);

    async function fetchData() {
    
        const res = await fetch('http://35.240.130.253:3001/reservations', { headers: accessToken })
        
        
        res
          .json()
          .then( res => {setName(res[0].BarName);setInfo(res.filter((item) => {
            return item.Status === 0
          }));
        })
          .catch(err => setErrors(err));

        console.log(info)
        console.log(bar)
      }
    
      useEffect(() => {
        fetchData();
      }, []);
  
    return (
    <div className="Bar">
    <Navbar />

    <div>
      <img src={welcome} className="welcome" alt=""/>
    </div>

    <div className={classes.root}>  

    <center className="nametext"><h1>{bar}</h1><br/>
      <span className="nametext">
        Pending Reservations 
      </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to ="/reservations">
        <button className = "checkBut" variant="contained" allignItem="center">
          Check Reservations
        </button>
      </Link>
    </center>
    <br/><br/><br/><br/><br/><br/>

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
      
    </div><center>
      <Link to ="/bardetails">
        <button className = "editBut" variant="contained">
          Edit Bar's Details
        </button>
      </Link>
      </center></div>
      <br/>
      </div>

    );
  }