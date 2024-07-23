/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-quotes */
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Page404 from './components/Page404';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  return useSelector((state) => state.authorizationReducer.loggedIn) ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        }
      />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
