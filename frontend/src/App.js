/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-quotes */
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Page404 from './pages/Page404';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { ROUTES } from './routes';
import SignUpPage from './pages/SignUpPage';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  return localStorage.getItem('userId') ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );

  /* return useSelector((state) => state.users.loggedIn) ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  ); */
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.home}
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signUp} element={<SignUpPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
