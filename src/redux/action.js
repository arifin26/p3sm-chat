import {INFO_PANGGILAN, HEADER_SCREEN_CHAT, FEED_BACK_GAMBAR} from './type';

export const info_panggilan = counter => ({
  type: INFO_PANGGILAN,
  data: counter,
});

export const header_screen_chat = counter => ({
  type: HEADER_SCREEN_CHAT,
  data: counter,
});

export const feed_back_gambar = counter => ({
  type: FEED_BACK_GAMBAR,
  data: counter,
});
