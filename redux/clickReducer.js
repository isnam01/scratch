import {ADDCLICKACTION, REMOVECLICKACTION, SETREPEATMODE} from './actionTypes';

export default (state = {isEnabledClick: false, repeatMode: false}, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case ADDCLICKACTION:
      return {...state, isEnabledClick: true};
    case REMOVECLICKACTION:
      return {...state, isEnabledClick: false};
    case SETREPEATMODE:
      return {...state, repeatMode: action.isRepeat};
    default:
      return state;
  }
};
