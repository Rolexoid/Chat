/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import logInImage from './logInImage.png';
import { logIn } from '../slices/authorizationSlice';
import { useSignupUserMutation } from '../services/usersApi';

const schema = yup.object().shape({
  username: yup.string().min(3, 'От 3 до 20 символов').max(20).required('Обязательное поле'),
  password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

const SignUpPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpUser, { isLoading }] = useSignupUserMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async ({ username, password }) => {
    try {
      setAuthFailed(false);
      const response = await signUpUser({ username, password });
      const { data } = response;
      localStorage.setItem('userId', JSON.stringify(data));
      dispatch(logIn(data));
      navigate('/');
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        inputRef.current.select();
        return;
      }
      if (err.response.status === 409) {
        console.log('user exists yet');
        setAuthFailed(true);
        return;
      }
      throw err;
    }
  };

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
                <div className='card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5 '>
                  <div className='rounded-circle'>
                    <img src={logInImage} alt='Регистрация' />
                  </div>
                  <Formik
                    validationSchema={schema}
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '', confirmPassword: '' }}
                  >
                    {({
                      handleSubmit, handleChange, values, touched, errors,
                    }) => (
                      <Form noValidate className='w-50' onSubmit={handleSubmit}>
                        <h1 className='text-center mb-4'>Регистрация</h1>
                        <FloatingLabel label='Имя пользователя' className='mb-3'>
                          <Form.Control
                            name='username'
                            autoComplete='username'
                            type='text'
                            required
                            id='username'
                            placeholder='Имя пользователя'
                            onChange={handleChange}
                            value={values.username}
                            isInvalid={errors.username}
                            ref={inputRef}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.username}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel label='Пароль' className='mb-3'>
                          <Form.Control
                            name='password'
                            autoComplete='new-password'
                            type='password'
                            required
                            id='password'
                            className='form-control'
                            placeholder='Пароль'
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={errors.password}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.password}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel label='Подтвердите пароль' className='mb-4'>
                          <Form.Control
                            name='confirmPassword'
                            autoComplete='new-password'
                            type='password'
                            required
                            id='confirmPassword'
                            className='form-control'
                            placeholder='Пароли должны совпадать'
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={errors.confirmPassword}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        <Button
                          variant='outline-primary'
                          type='submit'
                          className='w-100'
                        >
                          Зарегистрироваться
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
