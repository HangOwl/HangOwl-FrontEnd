import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FormGroup, Label, Col, Button, Modal, ModalHeader }  from 'reactstrap';
import { Formik, Form, Field, ErrorMessage , FormikHelpers } from 'formik'
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup'
import axios from 'axios';
import './EditProfile.css'

interface Props {
  emaill: any
}

const RegisterSchema = Yup.object().shape({
  detail: Yup.string(),
});

interface Value2{
  detail: string,
}

function EditPassword(props: Props){
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  const [email,setEmail] = useState(props.emaill);
  console.log('email', email);

  let Auth = window.Auth;
  



  // const handleChange = () => {
  //   const params = JSON.stringify(
  //     {
  //       barId: "5f8d33c8f736c01bd4619bfb",
  //       DateReserve: datereserve,
  //       NumberOfPeople: numberofpeople,
  //       Postscript: postscript
  //     }
  //   );
  //   }
      const param = JSON.stringify(
          {
              Email: email
          }
  
      )   

    useEffect(() => {
      axios.post("http://35.240.130.253:3001/auth/change_password", param,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });      
    })
         
      
      // history.push('/ConfirmLink');


  return(
    <div>
      <Button className='edbutton' onClick={toggle}>
        <p className='edtext'> Edit </p>
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className='editbg' aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader toggle={toggle} close={closeBtn}>
        </ModalHeader>
          <Formik
            initialValues={{
              detail: '',
            }}
            onSubmit={(
              values: Value2,
              { setSubmitting }: FormikHelpers<Value2>
            ) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={RegisterSchema}
          >
          {({ errors, touched }) => (
            <Form>
            <br/>
            <div className='centext'>
                <p className='edittoptext2'>We've sent your
                <br/>changed password link
                <br/>to your current email.</p>
            </div>   
            <br/>     
            </Form>
          )}  
          </Formik>
      </Modal>
    </div>
  )
};

export default EditPassword;
