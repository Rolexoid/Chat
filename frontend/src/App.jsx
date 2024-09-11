/* eslint-disable jsx-quotes */
import React from 'react';
import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import Page404 from './pages/Page404';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { ROUTES } from './utils/routes';
import SignUpPage from './pages/SignUpPage';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  return localStorage.getItem('userId') ? (
    children
  ) : (
    <Navigate to={ROUTES.login} state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={ROUTES.home}
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )}
      />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signUp} element={<SignUpPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
