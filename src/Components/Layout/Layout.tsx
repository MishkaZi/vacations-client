import React from 'react';
import './Layout.css';
import VacationCardList from '../Vacations/VacationCardList/VacationCardList';
import logoImage from './great-vacations-logo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import { removeVacations } from '../Vacations/redux/actions';
import { logoutUser } from '../Auth/redux/actions';

export const LayoutComponent = (): JSX.Element => {
  const isAdmin = useSelector((state: RootStore) => state.Auth.isAdmin);
  const dispatch = useDispatch();

  return (
    <div className='Layout'>
      <header className='header'>
        <div className='Header'>
          <div className='Logo'>
            <img src={logoImage} alt='Logo' />
          </div>
          <h1>Great Vacations</h1>
        </div>
      </header>
      <aside className='menu'>
        <div className='Menu'>
          <NavLink to='/home'>Home</NavLink>

          {/* in case of admin */}
          {isAdmin && <NavLink to='/add-vacation'>Add Vacation</NavLink>}
          {isAdmin && <NavLink to='/chart'>Followers Chart</NavLink>}
          <NavLink
            onClick={() => {
              sessionStorage.removeItem('userToken');
              dispatch(removeVacations());
              dispatch(logoutUser());
            }}
            to='/'
          >
            Logout
          </NavLink>
        </div>
      </aside>

      <main>
        <VacationCardList />
      </main>
      <footer>
        <div className='copyrights'>
          <div className='Copyrights'>
            <p>All Rights Reserved to Michael Zinoviev &copy;</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
