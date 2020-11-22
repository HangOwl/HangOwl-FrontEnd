import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import BarPic from '../components/BarCard/BarPic';
import Navbar2 from '../components/Navbar/Navbar2';
import CustomerBarForm from '../pages/CustomerBarForm';
import '../pages/CustomerHome.css'
import CustomerBarPic from '../pages/CustomerBarPic';
import Rating from '@material-ui/lab/Rating';
import FavBar from '../pages/FavBar';


function Customerviews() {
    
    const [images,setImages] = useState<any>('');
    const [value,setValue] = useState<any>('');
    const token:any = localStorage.getItem("user");
    const accessToken:any = JSON.parse(token);

    
   useEffect(() => {
    axios.get(`http://35.240.130.253:3001/bars/${accessToken.id}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then((response) => {
                    // console.log(response.data);
                    setImages(response.data);
                });      
    },[])
    return (
        <div>
            <Navbar2 />
            <div className="bgg">
                {/*<ul>{bardetail && bardetail.map(item => <li key={item._id}> {item._id} </li>)} </ul>*/}
                <br/><br/>
                <header>
                    <h1 className='nametext'>{images.BarName}
                    <Rating name="customized-1"
                            defaultValue={0} 
                            max={1}     
                            value={value}
                            size="large"
                            
                    />
                    </h1>
                </header>
                <br/>                    
                <CustomerBarPic barID={accessToken.id}/>
                <p className='destext'>
                    Bar's Description: {images.BarDescription}<br/><br/>
                    Open-Time/Close-Time: {images.OpenTime}/{images.CloseTime}<br/><br/>
                    Close On: {images.CloseWeekDay}<br/><br/>
                    
                    LINE ID: {images.LineID}<br/>
                    {/* Tel: 012-345-6789<br/><br/> */}
                    Address: {images.Address}<br/><br/>
                    Bar's Rule: {images.BarRule}<br/><br />
                    {/* Bar's Rule: If you want larger table, please tell us<br/> one day before your reserved date<br/><br/> */}
                </p>
                
                <br/>

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
    );
}

/*
function BarDetail(props: { isLogin: any; }) {
    const isLogin = props.isLogin;
    return(<BarDescription/>);
    if (isLogin){
        return <ReserveForm/>;
    }return <Login/>;
}
*/

export default Customerviews;
