/* eslint-disable jsx-quotes */
import React from 'react';
import { Formik, Field, Form } from 'formik';
import signUp from './signUp.png';

const FormPage = () => (
  <div className='d-flex flex-column h-100'>
    <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          Hexlet Chat
        </a>
      </div>
    </nav>
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img src={signUp} className='rounded-circle' alt='Войти' />
              </div>
              <Formik initialValues={{ login: '', password: '' }}>
                {() => (
                  <Form className='col-12 col-md-6 mt-3 mt-mb-0'>
                    <h1 className='text-center mb-4'>Войти</h1>
                    <div className='form-floaing mb-3'>
                      <Field
                        name='username'
                        autoComplete='username'
                        type='text'
                        required
                        id='username'
                        className='form-control'
                        placeholder='Ваш ник'
                      />
                    </div>
                    <div className='form-floaing mb-4'>
                      <Field
                        name='password'
                        autoComplete='current-password'
                        type='password'
                        required
                        id='password'
                        className='form-control'
                        placeholder='Пароль'
                      />
                    </div>
                    <button type='submit' className='w-100 mb-3 btn btn-outline-primary'>
                      Войти
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span>
                <a href='/signup'>Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FormPage;
