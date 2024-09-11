/* eslint-disable jsx-quotes */
import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../services/usersApi';
import logInImage from '../public/logInImage.png';
import { ROUTES } from '../utils/routes';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const [unfoundUser, setUnfoundUser] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async ({ username, password }) => {
    try {
      setUnfoundUser(false);
      const data = await loginUser({ username, password }).unwrap();
      logIn(data);
      navigate(ROUTES.home);
    } catch (err) {
      if (err.status === 401) {
        setUnfoundUser(true);
        inputRef.current.select();
        console.error(err);
        return;
      }
      toast.error(t('errors.server'));
      console.error(err);
    }
  };

  return (
    <div className='h-100'>
      <div className='d-flex flex-column h-100'>
        <Header />
        <div className='container-fluid h-100'>
          <div className='row justify-content-center align-content-center h-100'>
            <div className='col-12 col-md-8 col-xxl-6'>
              <div className='card shadow-sm'>
                <div className='card-body row p-5'>
                  <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                    <img src={logInImage} alt='Войти' />
                  </div>
                  <Formik onSubmit={onSubmit} initialValues={{ username: '', password: '' }}>
                    {({
                      handleSubmit, handleChange, values,
                    }) => (
                      <Form className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={handleSubmit}>
                        <h1 className='text-center mb-4'>{t('login.title')}</h1>
                        <FloatingLabel label={t('login.username')} className='mb-3' controlId='username'>
                          <Form.Control
                            name='username'
                            autoComplete='username'
                            type='text'
                            required
                            placeholder={t('login.username')}
                            onChange={handleChange}
                            value={values.username}
                            isInvalid={unfoundUser}
                            ref={inputRef}
                          />
                        </FloatingLabel>
                        <FloatingLabel label={t('login.password')} className='mb-4' controlId='password'>
                          <Form.Control
                            name='password'
                            autoComplete='current-password'
                            type='password'
                            required
                            className='form-control'
                            placeholder={t('login.password')}
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={unfoundUser}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {unfoundUser && t('errors.login')}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        <Button
                          variant='outline-primary'
                          type='submit'
                          className='w-100 mb-3'
                          disabled={isLoading}
                        >
                          {t('login.submitButton')}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className='card-footer p-4'>
                  <div className='text-center'>
                    <span>{t('login.newUser')}</span>
                    <Link to={ROUTES.signUp}>{t('login.signUpHref')}</Link>
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
