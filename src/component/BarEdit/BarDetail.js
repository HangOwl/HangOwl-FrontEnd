import React, {useEffect, useState } from 'react';
import Navbar from '../Nav/Navbar'
import { Link } from 'react-router-dom'

import './BarDetail.css'
import AddPics from './AddPics'
import CheckBoxes from './CheckBoxes'
import EditContent from './EditContent'
import UploadButtons from './UploadButtons';
import EditCheckBox from './EditCheckBox';


export default function BarDetail() {
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
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllNmZjNDI5ZTM1MzExYzYyZDcwYWMiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA1OTQwODg2LCJleHAiOjE2MDYxMTM2ODZ9.WY9LbucQdGIYA2oDq4MLtcSKxGDCuvNQWuEtjV8m9K8",
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
    <div>
    <Navbar />
    <div className="bgg">
      <div className="centext">
        <p className="edittext">Please type your bar details.</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <Link to="/customerviews">
            <button className="Button1">Customer Views</button>
          </Link>
        </p>
        <br/><br/>
      </div>

      <div className="centext">
        <img className="editpic" src={'http://35.240.130.253:3001/pictures/'+data.ProfilePicPath} /> 
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <UploadButtons profile={"true"} GetData = {GetData}/>
        </p>
        <br/><br/>
      </div>

      <div className="centext">
        <AddPics addpics={picList} />
        <p className="edittext">
          <UploadButtons profile={"false"} GetData = {GetData}/>
        </p>
      </div>

      <div className="centext">
        <p className="edittext">Bar's Name : {data.BarName}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <EditContent contentKey="BarName" GetData = {GetData}/>
        </p>
        <br/>

        <p className="edittext">Open Time : {data.OpenTime}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <EditContent contentKey="OpenTime" GetData = {GetData}/>
        </p>
        <br/>

        <p className="edittext">Close Time : {data.CloseTime}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <EditContent contentKey="CloseTime" GetData = {GetData}/>
        </p>
        <br/>

        <p className="edittext">Line ID : {data.LineID}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <EditContent contentKey="LineID" GetData = {GetData}/>
        </p>
        <br/>

        <p className="edittext">Close ON : 
        <CheckBoxes setCloseDay1={setCloseDay1} closeOn1={closeDay1} closeOn={closeDay}/>
        <p className="edittext">
          <EditCheckBox GetData = {GetData}/>
        </p>
        </p>
        <br/>

        <p className="edittext">Address : {data.Address}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <EditContent contentKey="Address" GetData = {GetData}/>
        </p>
        <br/>

        <p className="edittext">Description: {data.BarDescription}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <EditContent contentKey="BarDescription" GetData = {GetData}/>
        </p>
        <br/>

        <p className="edittext">Bar Rules: {data.BarRule}</p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className="edittext">
          <EditContent contentKey="BarRule" GetData = {GetData}/>
        </p>
        <br/>
      </div>

      <div className="centext">
        <p className="edittext">
          <Link to="/">
            <button className="Button1">Back to Bar Detail</button>
          </Link>
        </p>
        <br/><br/>
      </div>

    </div>
    </div>
  )

  

}
