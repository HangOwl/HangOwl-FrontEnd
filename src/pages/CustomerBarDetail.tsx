import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import BarPic from '../components/BarCard/BarPic';
import Navbar2 from '../components/Navbar/Navbar2';
import CustomerBarForm from './CustomerBarForm';
import './CustomerHome.css'
import CustomerBarPic from './CustomerBarPic';
import Rating from '@material-ui/lab/Rating';
import FavBar from './FavBar';


function CustomerBarDetail({match} : {match:any}) {
    
    const barID = match.params.barID;
    const [images,setImages] = useState<any>('');
    const [value,setValue] = useState<any>('');
    const token:any = localStorage.getItem("user");
    const accessToken:any = JSON.parse(token);
    const [closeday, setCloseday] = useState<any>([]);
    const [favbar, setFavbar] = useState<any>([]);

    var Week = [
        {id: '0', name: 'Sunday'},
        {id: '1', name: 'Monday'},
        {id: '2', name: 'Tuesday'},
        {id: '3', name: 'Wednesday'},
        {id: '4', name: 'Thursday'},
        {id: '5', name: 'Friday'},
        {id: '6', name: 'Saturday'},
      ];

    const MapDay = () => {
        for(var i = 0; i < closeday.length; i++) {
            if(closeday[i] == true) {
                return (Week[i].name);
            }
        }        
    };



    const params = (
        {
            "barId": `${barID}`,
        }
    );

    useEffect(() => {
        axios.get(`http://35.240.130.253:3001/customers/${accessToken.id}/favbars`, {
                headers: {
                    'Authorization': `${accessToken.Authorization}`,
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((response) => {
                setFavbar(response.data);
                console.log(response.data);
            });            

    // }
    }, []);

    const favCLick = () => {
        axios.post(`http://35.240.130.253:3001/customers/${accessToken.id}/favbars`, params,{
            headers: {
                'Authorization' : `${accessToken.Authorization}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            console.log(response.data);
        });          
    }

    const favCLick2 = () => {
        axios.delete(`http://35.240.130.253:3001/customers/${accessToken.id}/favbars/${barID}`,{
            headers: {
                'Authorization' : `${accessToken.Authorization}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            console.log(response.data);
        });          
    }

    useEffect(()=> {
            if(value == 1){
                favCLick();
            }
            if(value === null){
                favCLick2();
            }        
    }, [value]);



   useEffect(() => {
    axios.get(`http://35.240.130.253:3001/bars/${barID}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then((response) => {
                    // console.log(response.data);
                    setImages(response.data);
                    setCloseday(response.data.CloseWeekDay);

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
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                console.log('value ', value)
                                // CheckValue();
                            }}
                    />
                    </h1>
                </header>
                <br/>                    
                <CustomerBarPic barID={barID}/>
                <p className='destext'>
                    Bar's Description: {images.BarDescription}<br/><br/>
                    Open-Time/Close-Time: {images.OpenTime}/{images.CloseTime}<br/><br/>
                    Close On: {MapDay()}<br/><br/>

                    LINE ID: {images.LineID}<br/>
                    {/* Tel: 012-345-6789<br/><br/> */}
                    OpenTime: {images.OpenTime}<br /><br />
                    Address: {images.Address}<br/><br/>
                    Bar's Rule: {images.BarRule}<br/><br />
                    {/* Bar's Rule: If you want larger table, please tell us<br/> one day before your reserved date<br/><br/> */}
                </p>
                <div className='rsdiv'>
                    <CustomerBarForm barID={`${barID}`}/>
                </div>
                <br/><br/><br/>
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

export default CustomerBarDetail;
