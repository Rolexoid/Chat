/* eslint-disable jsx-quotes */
import React from 'react';

const Page404 = () => (
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
        <h1 className='h4 text-muted'>Страница не найдена</h1>
        <p className='text-muted'>Но вы можете перейти на главную страницу</p>
      </div>
    </div>
  </div>
);

export default Page404;
