import userReducer from './userReducer';
import sessionReducer from './sessionReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({users: userReducer, session: sessionReducer});

export default rootReducer;