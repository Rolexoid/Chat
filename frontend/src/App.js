import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './components/Page404';
import FormPage from './components/Form';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/login" element={<FormPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
