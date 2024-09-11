/* eslint-disable jsx-quotes */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import Header from '../components/Header';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div className='h-100'>
      <div className='d-flex flex-column h-100'>
        <Header />
        <div className='text-center'>
          <h1 className='h4 text-muted'>{t('notfound.text')}</h1>
          <p className='text-muted'>
            {t('notfound.linkText')}
            <Link to={ROUTES.home}>{t('notfound.link')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page404;
