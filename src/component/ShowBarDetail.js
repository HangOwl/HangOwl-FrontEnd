import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './Nav/Navbar'

import './BarEdit/BarDetail.css'
import AddPics from './BarEdit/AddPics'
import CheckBoxes from './BarEdit/CheckBoxes'

export default function ShowBarDetail() {
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

  const accessToken = JSON.parse(localStorage.getItem("user"));

  async function GetData () { 

    const res = await fetch(`http://35.240.130.253:3001/bars/`+accessToken.id+`/profile`, { headers: accessToken });

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
        <p className="edittext">{data.BarName}</p>
        <br/>
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
          <Link to = "/bardetails">
            <button className="Button1">Back to Edit Bar Detail</button>
          </Link>
        </p>
        <br/><br/>
      </div>

    </div>
    </div>
  )

  

}
