import {combineReducers} from 'redux';
import {loadImageReducer} from '../Redux/Reducer';

const RootReducer = combineReducers({
  loadImageReducer,
});

export default RootReducer;
