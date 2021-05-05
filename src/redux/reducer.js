import {INFO_PANGGILAN, HEADER_SCREEN_CHAT} from './type';

const initData = {
  data_info_panggilan: null,
  data_header_screen_chat: null,
};

export const reducerCounter = (state = initData, action) => {
  switch (action.type) {
    case INFO_PANGGILAN:
      return {...state, counter: action.data};
    case HEADER_SCREEN_CHAT:
      return {...state, counter: action.data};
    default:
      return state;
  }
};
