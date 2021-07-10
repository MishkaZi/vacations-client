import { createStore, combineReducers, compose } from 'redux';
import { authReducer } from '../Components/Auth/redux/reducers';
import { vacationsReducer } from '../Components/Vacations/redux/reducers';

const allReducers = combineReducers({
  Auth: authReducer,
  Vacations: vacationsReducer,
});

//For development
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootStore = ReturnType<typeof allReducers>;

export const store = createStore(allReducers, composeEnhancers());
