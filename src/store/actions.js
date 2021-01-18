import { ADD_TO_PLAYLIST, SET_CURRENT_SONG } from "./mutations-types";

import { _getSongUrlById, _getSongInfoById, Song } from "network/song";
import { _getAlbumById } from "network/album";
export default {
  async addToPlayList({ state, getters, commit }, payload) {
    // 获取单个id信息:payload为专辑内歌曲信息
    let id = payload.songmid;
    let song = getters.getSongById(id);
    // 若当前播放列表已经有,则不获取歌曲信息,直接设置当前歌曲
    if (!song) {
      let urlResponse = await _getSongUrlById(id);
      let infoResponse = await _getSongInfoById(id);
      let url = urlResponse.data.data[id];
      let info = infoResponse.data.data[id];

      let albumID = info.track_info.album.mid;
      let albumResponse = await _getAlbumById(albumID);
      let album = albumResponse.data.data;

      song = new Song(info, url, album);
      commit(ADD_TO_PLAYLIST, song);
    }
    // TODO 若没有选择自动播放,直接添加至播放列表.否则改变当前歌曲
    // commit(SET_CURRENT_SONG, song);
    return new Promise((resolve, reject) => {
      resolve(song);
    });
  },

  switchByOrder({ state, getters, commit }, payload) {
    let length = getters.listLength;
    if (!length || length === 1) {
      // TODO: toast提醒
      console.log("请多添加点歌曲哟~");
      return;
    }
    let index = getters.currentSongIndex;
    // 考虑边界情况
    if (payload === "last") {
      let last = (index - 1 + length) % length;
      commit(SET_CURRENT_SONG, state.playList[last]);
    } else if (payload === "next") {
      let next = (index + 1) % length;
      commit(SET_CURRENT_SONG, state.playList[next]);
    }
  },
  switchByShuffle({ state, getters, commit }) {
    let length = getters.listLength;
    if (!length || length === 1) {
      console.log("请多添加点歌曲哟~");
      return;
    }
    let origin = getters.currentSongIndex;
    let index = origin;
    //排除切换自身
    while (index === origin) {
      index = Math.floor(Math.random() * length);
    }
    commit(SET_CURRENT_SONG, state.playList[index]);
  }
};