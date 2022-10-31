import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducer from './reducer';
import clickReducer from './clickReducer';

const rootReducer = combineReducers({
  actionReducer: reducer,
  clickReducer: clickReducer,
});

export const store = createStore(rootReducer);
