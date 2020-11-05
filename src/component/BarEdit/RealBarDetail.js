import React, {useEffect, useState } from 'react';

import './BarDetail.css'
import AddPics from './AddPics'
import CheckBoxes from './CheckBoxes'
import EditContent from './EditContent'

function RealBarDetail() {
  const [ data, setData ] = useState([]);
  const [ errors, setErrors ] = useState(false)
  const [picList, setPicList] = useState([])
  const [closeDay, setCloseDay] = useState({})

  async function GetData () { 
    const headers = {
      "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjlmYjY2ZWU1MjQ5YjE0Y2UxYTIwOGYiLCJSb2xlIjoxLCJFbWFpbFZlcmlmeSI6dHJ1ZSwiaWF0IjoxNjA0NTYwOTU3LCJleHAiOjE2MDQ3MzM3NTd9.fZyR63vlM6P-yo87S3llsQgt5Q8VzDXk4dJ-r5ePHSw",
      "id": "5f9fb66ee5249b14ce1a208f",
      "Role": 1
    }

    const res = await fetch(`http://35.240.130.253:3001/bars/`+headers.id+`/profile`, { headers });

    res
    .json()
    .then(res => {  setData(res);
      setPicList(res.AdditionalPicPath);
      setCloseDay(res.CloseWeekDay);}
    )
    .catch(err => setErrors(err));

  }
      
  useEffect(() => {
    GetData();
  }, []);

  

}
