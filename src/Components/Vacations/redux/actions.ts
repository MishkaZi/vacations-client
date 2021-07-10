import { VacationsActionType, VacationModel } from '../VacationModel';

export const getVacations = (vacations: VacationModel[]) => {
  return {
    type: VacationsActionType.GET_ALL_VACATIONS,
    payload: vacations,
  };
};

export const updateVacation = (vacation: VacationModel) => {
  return {
    type: VacationsActionType.UPDATE_VACATION,
    updateVacation: vacation,
  };
};

export const removeVacations = () => {
  return {
    type: VacationsActionType.LOG_OUT,
    payload: undefined,
  };
};
