import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Container, FormGroup, Label, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import { Formik, Form, Field, ErrorMessage , FormikHelpers } from 'formik'
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup'
import axios from 'axios';
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import './CustomerBarForm.css'

const RegisterSchema = Yup.object().shape({
  nopp: Yup.string()
    .required('Required'),
  ps: Yup.string(),
  acceptrule: Yup.bool().oneOf([true], "Please accept the Bar's Rule first!")
});

interface Value2{
  nopp: string,
  ps: string,
  acceptrule: false,
}

function BarForm({barID} : {barID:any}){
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  var Date = '';
  const toggle2 = () => setModal(true);
  const closeBtn = <button className="close" onClick={() => {toggle(); clearvalue();}}>&times;</button>;
  const [datereserve, setDatereserve] = useState('');
  const [numberofpeople, setNumberOfPeople]= useState('');
  const [postscript, setPostscript] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const token:any = localStorage.getItem("user");
  const accessToken:any = JSON.parse(token);
  let history = useHistory();

  const formatInputValue = () => {
    if (!day) return '';
    Date = `${day.year}`+'-'+`${day.month<10? `0${day.month}`:`${day.month}`}`+'-'+`${day.month<10? `0${day.day}`:`${day.day}`}`.toString();
    setDatereserve(Date);
    return datereserve;
  };

  const handleClick = () => {
    setCheckbox(!checkbox);
    console.log('check box: ', checkbox);
  }

  const handleClick2 = () => {
    console.log('handle 2 checkbox: ',checkbox);
    console.log(datereserve);
    if(checkbox === true && datereserve !== '' && numberofpeople !== '' && postscript !== ''){
      handleChange();
      setModal(!modal);
      setDatereserve('');
      setNumberOfPeople('');
      setPostscript('');
      setCheckbox(false);
    }else{
      toggle2();
    }

  }

  const clearvalue = () => {
      setDatereserve('');
      setNumberOfPeople('');
      setPostscript('');
      setCheckbox(false);
  }
  
  const handleChange = () => {
    console.log('1', datereserve);
    console.log('2', numberofpeople);
    const params = JSON.stringify(
      {
          barId: `${barID}`,
          DateReserve: datereserve,
          NumberOfPeople: numberofpeople,
          Postscript: postscript
      }
    );
    
    axios.post("http://35.240.130.253:3001/reservations", params,{
      headers: {
        'Authorization' : accessToken.Authorization,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response);
      window.Reserveid = response.data.ResId;
      console.log(window.Reserveid);
      if(response.data == 'Bar not open due to Emergency.'){
        window.location.replace(`/cannotreserve/${barID}`);

      }else if(response.data == 'Bar not open due to CloseWeekDay.'){
        // window.location.replace('/cannotreserve/');
        window.location.replace(`/cannotreserve/${barID}`);
      }else{
        history.push('/CustomerReserveii');
      }

    });
  }

  const [day, setDay] = React.useState<DayValue>(null)


  return(
    <div>
      <Button className='rsbutton' onClick={toggle}>
        <p className='rstext'> Reserve </p>
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className='modalbg' aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader toggle={toggle} close={closeBtn}>
          <b className='formtext'>Reservation Form</b>
        </ModalHeader>
          <Formik
            initialValues={{
              // date: '',
              nopp: '',
              ps: '',
              acceptrule: false,
            }}
            onSubmit={(
              values: Value2,
              { setSubmitting }: FormikHelpers<Value2>
            ) => {
              setTimeout(() => {
                {/*alert(JSON.stringify(values, null, 2));*/}
                //history.push('/Reserveii')
                setSubmitting(false);
              }, 500);
              // setDatereserve(values.date);
              setNumberOfPeople(values.nopp);
              setPostscript(values.ps);
            }}
            validationSchema={RegisterSchema}
          >
          {({ errors, touched }) => (
            <Form>
            <br/>
            <Col>
              <FormGroup className="form-inline">
                <Label for="date">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
                {/* <Field name="date" 
                        type="text" 
                        id="date" 
                        // value={datereserve}
                        // onChange={(e:any) => setDatereserve(e.target.value)}
                        className={`form-control ${touched.date ? errors.date ? 'is-invalid' : 'is-valid' : ''}`}
                        placeholder="YYYY-MM-DD"/> */}
                <DatePicker value={day} 
                  onChange={setDay}
                  shouldHighlightWeekends
                  inputPlaceholder="Select a date"
                  formatInputText={formatInputValue}
                />
                <ErrorMessage component="div" name="date" className="invalid-feedback" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-inline" action="/action_page.php">
                <Label for="nopp">No.People</Label>
                <Field name="nopp" 
                        type="text" 
                        id="nopp" 
                        // value={numberofpeople}
                        // onChange = {(e:any) => setNumberOfPeople(e.target.value)}
                        className={`form-control ${touched.nopp ? errors.nopp ? 'is-invalid' : 'is-valid' : ''}`}
                        placeholder=""/>
                <ErrorMessage component="div" name="nopp" className="invalid-feedback" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="ps" className='cbtext'>Ps.</Label>
                <Field name="ps" 
                        type="text" 
                        id="ps" 
                        // value={postscript}
                        // onChange={(e:any) => setPostscript(e.target.value)}
                        // className={`form-control ${touched.ps ? touched.ps ? 'is-invalid' : 'is-valid' : ''}`}
                        placeholder="Anything you want?"/>
              </FormGroup>
            </Col>
            <Col>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Field type="checkbox" 
                      name="acceptrule"
                      id="acceptrule"
                      //value={checkbox}
                      onClick={handleClick}
                      className={'form-check-input' + (errors.acceptrule && touched.acceptrule ? ' is-invalid' : '')} 
              />
              <Label for="acceptrule" className="accepttext">&nbsp;&nbsp;&nbsp;Do you accept the Bar's Rules?</Label>
              <ErrorMessage name="acceptrule" component="div" className="invalid-feedback" />
            </Col>
            <br/>
            <div className='cenbutton'>
              <Button
                className='submitbut2'
                type='submit'
                value='submit'
                onClick={handleClick2}
              >
                <p className='submittext2'>Reserve Now</p>
              </Button>
            </div>     
            <br/>     
            </Form>
          )}  
          </Formik>
      </Modal>
    </div>
  )
};

export default BarForm;
