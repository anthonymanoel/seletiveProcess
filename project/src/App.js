import { ErrorMessage, Field, Form, Formik } from 'formik';
import './App.css';
import * as yup from 'yup';
import imgbg from './img/LOGO_ACADEMIA_FAMILIA_SIMBOLO.png'
import Axios from 'axios'
import { useHref, useLinkClickHandler, useNavigate } from 'react-router-dom';
import { useState } from 'react';




function App() {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
    });
  };
  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };
  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("incorrect email")
      .required("Email is mandatory"),
    password: yup
      .string()
  });
  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("Incorrect email")
      .required("Email is mandatory"),
    password: yup
      .string()
      .min(8, "Password must need have 8 caracteres")
      .required("Password is mandatory"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Diferent password")
      .required("Confirm password is mandatory"),
  });
  return (
    <div className="container">
      <div className="d-forms">
        <div className='af-stp'>
          <img className='imgbg' src={imgbg} alt='logo'></img>
          <h6 className='ent-acess'>Enterprise Acess</h6>
        </div>
        <Formik
        initialValues={{}}
         onSubmit={handleLogin}
         validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          <div className="form-group">
            <Field name="password" className="form-field" type="password" placeholder="Password" />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>
      <div className='record'>
        <h1 className='submit'>Register</h1>
      <Formik
        initialValues={{}}
         onSubmit={handleRegister}
         validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <div className="register-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="password" className="form-field" type="password" placeholder="Password" />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field
              name="confirmation"
              className="form-field"
              placeholder="Password"
              type="password"
            />

            <ErrorMessage
              component="span"
              name="confirmation"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
      </div>
      </div>
    </div>
  );
}

export default App;
