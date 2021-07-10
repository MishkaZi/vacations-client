import { VacationModel, VacationsActionType } from '../VacationModel';

export interface VacationAction {
  type: string;
  payload?: VacationModel[] | VacationModel;
  updateVacation?: VacationModel;
}

interface defaultStateI {
  vacations?: VacationModel[] | VacationModel;
  updateVacation?: VacationModel;
}

const initialState: defaultStateI = {};

export const vacationsReducer = (
  state: defaultStateI = initialState,
  action: VacationAction
): defaultStateI => {
  const newAppState = { ...state };

  switch (action.type) {
    case VacationsActionType.GET_ALL_VACATIONS:
      newAppState.vacations = action.payload;
      return newAppState;
    case VacationsActionType.UPDATE_VACATION:
      newAppState.updateVacation = action.updateVacation;
      return newAppState;
    case VacationsActionType.LOG_OUT:
      newAppState.vacations = action.payload;
      return newAppState;
    default:
      return newAppState;
  }
};
