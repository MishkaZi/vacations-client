import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store/store';
import './VacationCard.css';
import { VacationModel } from '../VacationModel';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { updateVacation, getVacations } from '../redux/actions';

const VacationCard = (vacation: VacationModel): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = sessionStorage.getItem('userToken');

  const isAdmin = useSelector((state: RootStore) => state.Auth.isAdmin);
  const vacations = useSelector(
    (state: RootStore) => state.Vacations.vacations
  ) as VacationModel[];

  const [isFollowed, setIsFollowed] = useState(
    vacation.userId !== null ? true : false
  );

  const [error, setError] = useState<string>();

  const followVacation = async (vacation: VacationModel) => {
    //if Followed - unfollow
    if (isFollowed) {
      try {
        await Axios.post(
          'https://great-vacations.herokuapp.com/followed-vacations/unfollow',
          vacation,
          {
            headers: { Authorization: token },
          }
        );
        const vacationId = vacation.vacationId;

        const updatedVacations = vacations.map((vacation: VacationModel) => {
          if (vacation.vacationId === vacationId) {
            vacation.userId = +!null;
            vacation.numOfFollowers--;
          }
          return vacation;
        });
        
        dispatch(getVacations(updatedVacations));
        setIsFollowed(false);
      } catch (error) {
        setError(error.response.data.error);
      }
      //If unfollowed - follow
    } else {
      //follow vacation
      try {
        const response = await Axios.post(
          'http://https://great-vacations.herokuapp.com/followed-vacations/follow',
          vacation,
          {
            headers: { Authorization: token },
          }
        );
        const vacationId = vacation.vacationId;

        const userId = response.data;

        const updatedVacations = vacations.map((vacation: VacationModel) => {
          if (vacation.vacationId === vacationId) {
            vacation.userId = userId;
            vacation.numOfFollowers++;
          }
          return vacation;
        });

        dispatch(getVacations(updatedVacations));

        setIsFollowed(true);
      } catch (error) {
        setError(error.response.data.error);
      }
    }
  };

  const editVacation = (vacationToUpdate: VacationModel) => {
    dispatch(updateVacation(vacationToUpdate));
    history.push('/edit-vacation');
  };

  const deleteVacationFunction = async (vacationId: number) => {
    try {
      await Axios.delete('https://great-vacations.herokuapp.com/vacations/' + vacationId, {
        headers: { Authorization: token },
      });

      const filteredVacations = vacations.filter((vacation: VacationModel) => {
        return vacation.vacationId !== vacationId;
      });

      dispatch(getVacations(filteredVacations));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className='vacation-card'>
      {error && <div className='alert'>{error}</div>}
      <div>
        <img src={vacation.image} alt='' />
        <p>
          <b>Destination: </b>
          {vacation.destination}
        </p>
        <b>Description: </b>
        <div className='description'>{vacation.description}</div>
      </div>
      <div className='bottom-vacation-card'>
        <div className='dates-price'>
          <p>
            <b>Departure and arrival dates: </b>
            {vacation.startDate} - {vacation.endDate}
          </p>
          <p>
            <b>Price: </b>
            {vacation.price}
          </p>
        </div>
      </div>
      <div className='buttons'>
        {/* In case of regular user */}
        {!isAdmin && vacation.numOfFollowers}
        {/* Follow button */}
        {!isAdmin && (
          <button onClick={() => followVacation(vacation)}>
            {!isFollowed && (
              <img
                id='follow'
                src='../../../followed.png'
                width='50'
                height='50'
                alt=''
              />
            )}
            {isFollowed && (
              <img
                id='follow'
                src='../../../not-followed.png'
                width='50'
                height='50'
                alt=''
              />
            )}
          </button>
        )}

        {/* In case of Admin user */}
        {/* Edit vacation button */}
        {isAdmin && (
          <button onClick={() => editVacation(vacation)}>
            <i className='fas fa-edit fa-3x'></i>
          </button>
        )}
        {/* Delete vacation button */}
        {isAdmin && (
          <button onClick={() => deleteVacationFunction(vacation.vacationId)}>
            <i className='fas fa-trash-alt fa-3x'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default VacationCard;
