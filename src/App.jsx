import * as React from 'react'
import {useEffect,useState } from 'react';

import './App.css'


function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Initial theme load from Local Storage.
  useEffect(() => {
      const storedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(storedDarkMode);
      setIsInitialLoad(false);
  }, []);

  // Synchronize state with Local Storage when it changes.
  useEffect(() => {
      // Check if it's not the initial load before updating Local Storage
      if (!isInitialLoad) {
          document.documentElement.classList.toggle('dark', darkMode);
          localStorage.setItem('darkMode', darkMode);
      }
  }, [darkMode, isInitialLoad]);

  const handleSetDarkMode = () => {
      setDarkMode(true);
  };

  const handleSetLightMode = () => {
      setDarkMode(false);
  };

  return (
    <>
      <div className='text-lg font-bold bg-black text-white dark:text-black dark:bg-amber-50'>Hello world</div>
      <button onClick={handleSetDarkMode}>dark</button>
      <br />
      <button onClick={handleSetLightMode}>light</button>
    </>
  )
}

export default App
