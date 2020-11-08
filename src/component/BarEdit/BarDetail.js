import React, {useEffect, useState } from 'react';

import './BarDetail.css'
import AddPics from './AddPics'
import CheckBoxes from './CheckBoxes'
import EditContent from './EditContent'

//import barpic from '/mnt/c/namtanii/Year3/SoftEng/fetchdata/src/component/img/bar1.jpg'

export default function BarDetail() {

  const [ data, setData ] = useState(null);
  const [ errors, setErrors ] = useState(false)
  const [picList, setPicList] = useState([])
  const [closeDay, setCloseDay] = useState([false,false,false,false,false,false,false])
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
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjlmYjY2ZWU1MjQ5YjE0Y2UxYTIwOGYiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA0NjQyMDY3LCJleHAiOjE2MDQ4MTQ4Njd9.TfF0GrjIbGw2e3qJPCK6ytLAMJFuRB8EbjTGav9EN2c",
    "id": "5f9fb66ee5249b14ce1a208f",
    "Role": 1
    }

    const res = await fetch(`http://35.240.130.253:3001/bars/`+headers.id+`/profile`, { headers });

    res
    .json()
    .then(res => {  setData(res);
      setPicList(res.AdditionalPicPath);
      console.log(res.CloseWeekDay);
      setCloseDay(res.CloseWeekDay);
      console.log(res)
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
    }
    )
    .catch(err => setErrors(err));

  }
      
  useEffect(() => {
    GetData();
  }, []);
  useEffect(() => {
    console.log(closeDay)
  },[closeDay])

  const body = (
    <React.Fragment>
      {data &&  <>
      <header className="Customer-views">
        <p className="nametext">Please type your bar details.
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="Button1" style= {{top: "2%"}}>Customer views</button>
        </p>
      </header>
      <br/><br/><br/>
      <header align="center">
        <img width="300px" src={'http://35.240.130.253:3001/pictures/'+data.ProfilePicPath} /> 
        <p className="nametext">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="Button2" style= {{top: "20%"}}>Change Bar Picture</button>
        </p>
      </header>

      <header> 
        <AddPics addpics={picList} />
        <button className="Button2" style= {{top: "50%"}}>Add Picture</button>
      </header>

      <header className="Customer-views">
        <p className="nametext">Bar's Name : {data.BarName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditContent contentKey="BarName" />
        </p>
      </header>
      <header className="Customer-views" >
        <p className="nametext">Open Time : {data.OpenTime}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditContent contentKey="OpenTime" />
        </p>
      </header>
      <header className="Customer-views">
        <p className="nametext">Close Time : {data.CloseTime}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditContent contentKey="CloseTime" />
        </p>
      </header>
      <header className="Customer-views">
        <p className="nametext">Line ID : {data.LineID}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditContent contentKey="LineID" />
        </p>
      </header>

      <header className="Customer-views">
        <p className="nametext">CLOSE ON :
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CheckBoxes setCloseDay1={setCloseDay1} closeOn1={closeDay1} closeOn={closeDay}/>
        </p>
      </header>

      <header className="Customer-views">
        <p className="nametext">Address : {data.Address}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditContent contentKey="Address" />
        </p>
      </header>

      <header className="Customer-views">
        <p className="nametext">Description : {data.BarDescription}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditContent contentKey="Description" />
        </p>
      </header>

      <header className="Customer-views">
        <p className="nametext">Bar Rules : {data.BarRule}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditContent contentKey="BarRule" />
        </p>
      </header>
      <button className="Button4" style= {{top: "158.65%" ,padding:"10px"}}>Back to Detail</button>
      <br/><br/><br/><br/>
      </>
      }
    </React.Fragment>
  );

  return (
    <div>
      {body}
    </div>
  );

}


