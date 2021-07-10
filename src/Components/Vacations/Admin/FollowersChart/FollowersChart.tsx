import React from 'react';
import { Link } from 'react-router-dom';
import './FollowersChart.css';
import { Bar } from 'react-chartjs-2';
import { RootStore } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { VacationModel } from '../../VacationModel';

const FollowersChart = (): JSX.Element => {
  const vacations = useSelector(
    (state: RootStore) => state.Vacations.vacations
  ) as VacationModel[];

  const vacationsNames = vacations.map((vacation: VacationModel) => {
    return vacation.destination + ' (ID: ' + vacation.vacationId + ')';
  });

  const numberOfFollowers = vacations.map((vacation: VacationModel) => {
    return vacation.numOfFollowers;
  });

  return (
    <div className='followers-chart'>
      <Link className='link margin' to='/home'>
        Get back to admin homepage
      </Link>

      <Bar
        type='Bar'
        data={{
          labels: vacationsNames,

          datasets: [
            {
              label: 'Number of followers',
              data: numberOfFollowers,
              backgroundColor: 'rgba(144,206,255, 1)',
              borderColor: 'rgba(24,21,15,1)',
              borderWidth: 1,
            },
          ],
        }}
        height={300}
        width={600}
      />
    </div>
  );
};

export default FollowersChart;
