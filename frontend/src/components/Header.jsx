import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../utils/routes';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loggedIn } = useSelector((state) => state.users);
  const { logOut } = useAuth();

  const onClick = () => {
    logOut();
    navigate(ROUTES.login);
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to={ROUTES.home} className="navbar-brand">Hexlet Chat</Link>
        {loggedIn && <Button variant="primary" onClick={() => onClick()}>{t('chat.logOut')}</Button>}
      </div>
    </nav>
  );
};

export default Header;
