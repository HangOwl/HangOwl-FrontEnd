import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar2 from '../components/Navbar/Navbar2';
import { Button}  from 'reactstrap';
import EditProfile from '../pages/EditProfile';
import EditEmail from '../pages/EditEmail';
import axios from 'axios';
import EditPassword from '../pages/EditPassword';
import './Edit.css'
import Axios from 'axios';


function Edit() {

    const [profile, setProfile] = useState({
        Name: "",
        Email: "",
        Password: ""
    });
    const token:any = localStorage.getItem("user");
    const accessToken:any = JSON.parse(token);


    const handleChange = () => {
        return<div>{`${profile.Name}`}</div>
    }

    useEffect(() => {
        axios.get(`http://35.240.130.253:3001/customers/${accessToken.id}`, {
                headers: {
                    'Authorization': accessToken.Authorization
                }
            }).then((response) => {
                setProfile({
                    Name: response.data.Name,
                    Email: response.data.Email,
                    Password: response.data.Password
                })
            });
    }, [])
    return (
        <div className="bgg">
            <Navbar2 />
            <br/><br/><br/>
            <header>
                <h1 className='edittoptext'>Your Profile</h1>
            </header>
            <div className='centext'>
                <p className='edittext'>Name : {profile.Name}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p className='edittext'>&nbsp;< EditProfile /></p>
                <br/><br />
                <p className='edittext'>E-mail :{profile.Email}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <p className='edittext'>&nbsp;< EditEmail /></p> */}
                <br/>
                <p className='edittext'>Password : **********</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p className='edittext'>&nbsp;<EditPassword emaill={profile.Email}/></p>
                <br/>
            </div>
            <br/>
            <div className='cenbutton'>
                <NavLink to='/'>
                    <Button className='submitbut2'>
                        <p className='submittext3'>Save Edit</p>
                    </Button>
                </NavLink>
            </div>  
            <br/><br/>
        </div>
    );
}

export default Edit;
