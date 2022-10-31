import {ADDACTION, REMOVEACTION} from './actionTypes';

export default (state = [], action) => {
  console.log(action, 'huh');
  switch (action.type) {
    case ADDACTION:
      return [...state, action.action];
    case REMOVEACTION:
      if (action?.action) {
        return state.filter(obj => obj.action !== action?.action?.action);
      }
      return [];
    default:
      return state;
  }
};
