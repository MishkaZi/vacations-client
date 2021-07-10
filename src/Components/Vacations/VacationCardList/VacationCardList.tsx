/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import VacationCard from '../VacationCard/VacationCard';
import { VacationModel } from '../VacationModel';
import Axios from 'axios';

import { RootStore } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getVacations } from '../../Vacations/redux/actions';

import './VacationCardList.css';

const VacationCardList = (): JSX.Element => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string>();

  const getVacationsFromDB = async () => {
    let token = sessionStorage.getItem('userToken');

    try {
      const vacations = await Axios.get('https://great-vacations.herokuapp.com/vacations/', {
        headers: { Authorization: token },
      });

      dispatch(getVacations(vacations.data));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    getVacationsFromDB();
  }, []);

  const vacations = useSelector(
    (state: RootStore) => state.Vacations.vacations
  ) as VacationModel[];

  return (
    <div className='vacation-card-list'>
      {error && <div className='alert'>{error}</div>}
      {vacations?.map((vacation: VacationModel, index: number) => {
        return <VacationCard key={index} {...vacation} />;
      })}
    </div>
  );
};

export default VacationCardList;
