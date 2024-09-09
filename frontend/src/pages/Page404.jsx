/* eslint-disable jsx-quotes */
import React from 'react';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
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
        <div className='text-center'>
          <h1 className='h4 text-muted'>{t('notfound.text')}</h1>
          <p className='text-muted'>
            {t('notfound.linkText')}
            <a href='/'>{t('notfound.link')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page404;
