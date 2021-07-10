export interface VacationModel {
  vacationId: number;
  description: string;
  destination: string;
  image: string;
  startDate: Date;
  endDate: Date;
  price: string;
  userId: number;
  numOfFollowers: number;
}

export const VacationsActionType = {
  GET_ALL_VACATIONS: 'GET_ALL_VACATIONS',
  UPDATE_VACATION: 'UPDATE_VACATION',
  DELETE_VACATION: 'DELETE_VACATION',
  LOG_OUT: 'LOG_OUT',
};
