import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { VacationModel } from '../../VacationModel';
import './VacationCardAdminAdd.css';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../../store/store';
import { getVacations } from '../../redux/actions';

const VacationCardAdminAdd = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<VacationModel>();
  const [error, setError] = useState<string>();

  const vacations = useSelector(
    (state: RootStore) => state.Vacations.vacations!
  ) as VacationModel[];

  const addVacation = async (vacation: VacationModel) => {
    try {
      let token = sessionStorage.getItem('userToken');

      const vacationId = await Axios.post(
        'https://great-vacations.herokuapp.com/vacations/',
        vacation,
        {
          headers: { Authorization: token },
        }
      );

      //Add id to vacation
      const updatedVacation = vacation;
      updatedVacation.vacationId = vacationId.data;

      const updatedVacations = vacations;
      updatedVacations.push(updatedVacation);

      dispatch(getVacations(updatedVacations));

      history.push('/home');
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  const submit = async (data: VacationModel) => {
    addVacation(data);
  };
  return (
    <div className='addVacation'>
      {error && <div className='alert'>{error}</div>}
      <h3>Please enter vacation details:</h3>
      <form onSubmit={handleSubmit(submit)}>
        {/* Destination */}
        <div>
          <input
            placeholder='Destination: '
            type='text'
            required
            {...register('destination', {
              required: true,
            })}
          />
        </div>
        {/* Description */}
        <div>
          <input
            placeholder='Description: '
            type='text'
            required
            {...register('description', {
              required: true,
            })}
          />
        </div>
        {/* Image URL */}
        <div>
          <input
            placeholder='Image URL: '
            type='url'
            required
            {...register('image', {
              required: true,
            })}
          />
        </div>
        {/* Departure date */}
        <div>
          <input
            placeholder='Departure date: '
            type='date'
            required
            {...register('startDate', { required: true })}
          />
        </div>
        {/* Arrival date */}
        <div>
          <input
            placeholder='Arrival date: '
            type='date'
            required
            {...register('endDate', { required: true })}
          />
        </div>
        {/* Price */}
        <div>
          <input
            placeholder='Price: '
            type='number'
            required
            {...register('price', {
              required: true,
            })}
          />
        </div>
        <button type='submit'>Add vacation</button>
      </form>

      <Link className='link' to='/home'>
        if you changed your mind
      </Link>
    </div>
  );
};

export default VacationCardAdminAdd;
