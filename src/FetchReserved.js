import React, { useEffect, useState } from 'react';

const FetchReserved = () => {
    const [data, setData] = useState([]);
    const [ errors, setErrors] = useState(false)
    
    async function FetchData() {
        const headers = {
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhkMzNjOGY3MzZjMDFiZDQ2MTliZmIiLCJSb2xlIjoxLCJpYXQiOjE2MDM4MDc5NzIsImV4cCI6MTYwMzgxODc3Mn0.IPDi3JOlyAVvXIn_pG8O9x3WS9EKk7JkY3BuR2LbpmY',
        }
            
        const res = await fetch('http://35.240.130.253:3001/reservations', { headers });

        res
         .json()
         .then(res => setData(res))
         .catch(err => setErrors(err));
    }

    useEffect(async () => {
        FetchData();
    }, []);

    const reserved = data.map( d => (
        <div>
            reserve_id: {d._id}
            Customer's Name: {d.CustomerName}
            People
        </div>
    ))

    return (
        <div> 
            {reserved}
        </div>
    );

}
export default FetchReserved;