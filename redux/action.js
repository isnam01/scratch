import {
  ADDACTION,
  REMOVEACTION,
  ADDCLICKACTION,
  REMOVECLICKACTION,
  SETREPEATMODE,
} from './actionTypes';

export const addAction = action => {
  return {type: ADDACTION, action: action};
};

export const removeAction = action => {
  return {type: REMOVEACTION, action: action};
};

export const addClickAction = () => {
  return {type: ADDCLICKACTION};
};

export const removeClickAction = () => {
  return {type: REMOVECLICKACTION};
};

export const setRepeatMode = val => {
  return {type: SETREPEATMODE, isRepeat: val};
};


