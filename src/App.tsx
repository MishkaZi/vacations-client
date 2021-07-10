/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './App.css';
import Router from './Router/Router';
import { RootStore } from './store/store';

function App() {
  const history = useHistory();

  const auth: boolean = useSelector((state: RootStore) => state.Auth.isAdmin);

  //In case of refresh page
  useEffect(() => {
    if (auth === undefined) {
      history.push('/');
    }
  }, []);

  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
