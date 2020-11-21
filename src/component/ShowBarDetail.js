import React, {useEffect, useState } from 'react';
import { Link } from 'react'
import Navbar from './Nav/Navbar'

import './BarEdit/BarDetail.css'
import AddPics from './BarEdit/AddPics'
import CheckBoxes from './BarEdit/CheckBoxes'
import EditContent from './BarEdit/EditContent'
import UploadButtons from './BarEdit/UploadButtons';
import EditCheckBox from './BarEdit/EditCheckBox';


export default function RealBarDetail() {
  const [ data, setData ] = useState([]);
  const [ errors, setErrors ] = useState(false)
  const [picList, setPicList] = useState([])
  const [closeDay, setCloseDay] = useState({})
  const [closeDay1,setCloseDay1] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false
  });

  async function GetData () { 
    const headers = {
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllNmZjNDI5ZTM1MzExYzYyZDcwYWMiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA1ODU5MDE5LCJleHAiOjE2MDYwMzE4MTl9.KVisloy5nozDml6ZbUwKRIM9ugO5yyar9rnnAYVEysU",
    "id": "5f9e6fc429e35311c62d70ac",
    "Role": 1
    }

    const res = await fetch(`http://35.240.130.253:3001/bars/`+headers.id+`/profile`, { headers });

    res
    .json()
    .then(res => {  setData(res);
      setPicList(res.AdditionalPicPath);
      setCloseDay(res.CloseWeekDay);
      setCloseDay1(
        {
          Sunday: res.CloseWeekDay[0],
          Monday: res.CloseWeekDay[1],
          Tuesday: res.CloseWeekDay[2],
          Wednesday: res.CloseWeekDay[3],
          Thursday: res.CloseWeekDay[4],
          Friday: res.CloseWeekDay[5],
          Saturday: res.CloseWeekDay[6]
        }
      )
    })
    .catch(err => setErrors(err));

  }
      
  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="bgg">
      <Navbar />
      <div className="centext">
        <p className="edittext">Please type your bar details.</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <button className="Button1">Customer Views</button>
        </p>
        <br/><br/>
      </div>

      <div className="centext">
        <img className="editpic" src={'http://35.240.130.253:3001/pictures/'+data.ProfilePicPath} /> 
        <br/><br/>
      </div>

      <div className="centext">
        <AddPics addpics={picList} />
      </div>

      <div className="centext">
        <p className="edittext">Bar's Name : {data.BarName}</p>
        <br/>

        <p className="edittext">Open Time : {data.OpenTime}</p>
        <br/>

        <p className="edittext">Close Time : {data.CloseTime}</p>
        <br/>

        <p className="edittext">Line ID : {data.LineID}</p>
        <br/>

        <p className="edittext">Close ON : 
        <CheckBoxes setCloseDay1={setCloseDay1} closeOn1={closeDay1} closeOn={closeDay}/>
        </p>
        <br/>

        <p className="edittext">Address : {data.Address}</p>
        <br/>

        <p className="edittext">Description: {data.BarDescription}</p>
        <br/>

        <p className="edittext">Bar Rules: {data.BarRule}</p>
        <br/>
      </div>

      <div className="centext">
        <p className="edittext">
          <button className="Button1">Back to Bar Detail</button>
        </p>
        <br/><br/>
      </div>

    </div>
  )

  

}
