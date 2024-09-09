import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import ru from './locales/ru.js';
import App from './App';
import store from './slices/index';
import 'react-toastify/dist/ReactToastify.css';

const init = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18nextInstance}>
            <Provider store={store}>
              <App />
              <ToastContainer />
            </Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
