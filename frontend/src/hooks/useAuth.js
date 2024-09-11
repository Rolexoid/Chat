import { useDispatch } from 'react-redux';
import { setlogInUser, setlogOutUser } from '../slices/authorizationSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    dispatch(setlogInUser(data));
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    dispatch(setlogOutUser());
  };

  return { logIn, logOut };
};

export default useAuth;
