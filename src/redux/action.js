import {INFO_PANGGILAN, HEADER_SCREEN_CHAT} from './type';

export const info_panggilan = counter => ({
  type: INFO_PANGGILAN,
  data: counter,
});

export const header_screen_chat = counter => ({
  type: HEADER_SCREEN_CHAT,
  data: counter,
});
