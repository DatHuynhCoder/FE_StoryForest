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

createRoot(document.getElementById('root')).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
)
