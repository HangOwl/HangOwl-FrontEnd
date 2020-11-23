import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FormGroup, Label, Col, Button, Modal, ModalHeader }  from 'reactstrap';
import { Formik, Form, Field, ErrorMessage , FormikHelpers } from 'formik'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import './NewPassword.css';
import * as Yup from 'yup'


const RegisterSchema = Yup.object().shape({
    newpw: Yup.string()
    .min(4, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password is Required'),
    renewpw: Yup.string()
    .min(4, 'Too Short!')
    .required('Password is Required')
    .test('Password Match!', 'Password Not Match!', function (value) {
      return this.parent.newpw === value;
    }),
});

interface Value2{
    newpw: string,
    renewpw: string,
}



function NewPassword({match}: {match:any}){
  const token = match.params.token;
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  const [password, setPassword] = useState('');
  const [renewpassword, setRenewpassword] = useState('');



  let history = useHistory();


  // const handleChange2 = () => {
  //   if(password != '' && renewpassword != ''){
  //     handleChange();
  //   }
  // }

  // useEffect(() => {
  //   console.log('[',passwordd);
  //   if(passwordd != '' && renewpassword != ''){
  //     handleChange();
  //   }
  // }, [passwordd,renewpassword]);

  const handleClick = () => {
      history.push('/')
  }


  const params = {
    "token": `${token}`,
    "Password": password
  }

  const handleChange = () => {
    console.log('password', password);
    axios.patch(`http://35.240.130.253:3001/auth/change_password`, params,{
      headers: {
          //'Authorization': `${window.Auth}`,
          'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
        console.log(response.data)
        handleClick();
    });      
  }

  return(
    <div>
        <Navbar />
        <br/><br/><br/>
        <h1 className='forgottext2'>May I ask for your new password?</h1>
        <br/><br/>
        <div className='cenbutton'>
          <Formik
            initialValues={{
                newpw: '',
                renewpw: '',
            }}
            onSubmit={(
              values: Value2,
              { setSubmitting }: FormikHelpers<Value2>
            ) => {
              setTimeout(() => {
                history.push('/')
                setSubmitting(false);
              }, 500);
              setPassword(values.newpw);
              setRenewpassword(values.renewpw);
            }}

            validationSchema={RegisterSchema}
          >
          {({ errors, touched }) => (
            <Form>
            <br/>
            <Col>
              <FormGroup className="form-inline" action="/action_page.php">
                <Label for="newpw">New Password*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
                <Field name="newpw" 
                        type="password" 
                        id="newpw" 
                        value={password}
                        onChange = {(e:any) => setPassword(e.target.value)}
                        // className={`form-control ${touched.newpw ? errors.newpw ? 'is-invalid' : 'is-valid' : ''}`}
                        placeholder="new password"/>
                <ErrorMessage component="div" name="password" className="invalid-feedback" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-inline" action="/action_page.php">
                <Label for="renewpw">Re-New Password*</Label>
                <Field name="renewpw" 
                        type="password" 
                        id="renewpw" 
                        // className={`form-control ${touched.renewpw ? errors.renewpw ? 'is-invalid' : 'is-valid' : ''}`}
                        placeholder="confirm your password"/>
                <ErrorMessage component="div" name="renewpw" className="invalid-feedback" />
              </FormGroup>
            </Col>   
            </Form>
          )}  
          </Formik>
        </div>
            <br/><br/>
            <div className='cenbutton'>
              <Button 
                className='submitbut4'
                type='submit'
                value='submit'
                onClick={handleChange}
              >
                <p className='submittext4'>Change Password</p>
              </Button>
            </div>     
            <br/> 
        </div>
  )
}

export default NewPassword;
