/* eslint-disable jsx-quotes */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import logInImage from './logInImage.png';
import { logIn } from '../slices/authorizationSlice';
import { useSignupUserMutation } from '../services/usersApi';
import { signUpShema } from '../utils/shema';

const SignUpPage = () => {
  const [existingUser, setExistingUser] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpUser, { isLoading }] = useSignupUserMutation();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async ({ username, password }) => {
    try {
      const data = await signUpUser({ username, password }).unwrap();
      localStorage.setItem('userId', JSON.stringify(data));
      dispatch(logIn(data));
      navigate('/');
    } catch (err) {
      if (err.status === 401) {
        inputRef.current.select();
        return;
      }
      if (err.status === 409) {
        setExistingUser(true);
        return;
      }
      toast.error(t('errors.server'));
      console.error(err);
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
                    validationSchema={signUpShema(t)}
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '', confirmPassword: '' }}
                  >
                    {({
                      handleSubmit, handleChange, values, errors,
                    }) => (
                      <Form className='w-50' onSubmit={handleSubmit}>
                        <h1 className='text-center mb-4'>{t('signup.title')}</h1>
                        <FloatingLabel label={t('signup.username')} className='mb-3'>
                          <Form.Control
                            name='username'
                            autoComplete='username'
                            type='text'
                            required
                            id='username'
                            placeholder={t('signup.username')}
                            onChange={handleChange}
                            value={values.username}
                            isInvalid={errors.username || existingUser}
                            ref={inputRef}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.username}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel label={t('signup.password')} className='mb-3'>
                          <Form.Control
                            name='password'
                            autoComplete='new-password'
                            type='password'
                            required
                            id='password'
                            className='form-control'
                            placeholder={t('signup.password')}
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={errors.password || existingUser}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.password}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel label={t('signup.confirm')} className='mb-4'>
                          <Form.Control
                            name='confirmPassword'
                            autoComplete='new-password'
                            type='password'
                            required
                            id='confirmPassword'
                            className='form-control'
                            placeholder={t('signup.confirm')}
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={errors.confirmPassword || existingUser}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.confirmPassword}
                            {existingUser && t('errors.signup')}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        <Button
                          variant='outline-primary'
                          type='submit'
                          className='w-100'
                          disabled={isLoading}
                        >
                          {t('signup.submit')}
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
