import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";

//Add redux store
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//cookie
import { CookiesProvider } from 'react-cookie';

// GG Auth
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_REACT_GG_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </GoogleOAuthProvider>
)
