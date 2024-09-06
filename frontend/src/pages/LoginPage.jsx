/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { logIn } from '../slices/authorizationSlice';
import { useLoginUserMutation } from '../services/usersApi';
import logInImage from './logInImage.png';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async ({ username, password }) => {
      try {
        setAuthFailed(false);
        const { data } = await loginUser({ username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        dispatch(logIn(data));
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className='h-100'>
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
                    <img src={logInImage} alt='Войти' />
                  </div>
                  <Form className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={formik.handleSubmit}>
                    <h1 className='text-center mb-4'>Войти</h1>
                    <FloatingLabel label='Ваш ник' className='mb-3'>
                      <Form.Control
                        name='username'
                        autoComplete='username'
                        type='text'
                        required
                        id='username'
                        placeholder='Ваш ник'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                    <FloatingLabel label='Пароль' className='mb-4'>
                      <Form.Control
                        name='password'
                        autoComplete='current-password'
                        type='password'
                        required
                        id='password'
                        className='form-control'
                        placeholder='Пароль'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={authFailed}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Неверные имя пользователя или пароль
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      variant='outline-primary'
                      type='submit'
                      className='w-100 mb-3'
                      disabled={isLoading}
                    >
                      Войти
                    </Button>
                  </Form>
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
    </div>
  );
};

export default LoginPage;
