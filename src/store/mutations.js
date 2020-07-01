const mutation = {
  //设置播放器显示
  SETSHOWPING(state, showPlayer){
    state.showPlayer = showPlayer
  },
  //播放器是否全屏显示
  SETFULLSCREEN(state, fullScreen){
    state.fullScreen = fullScreen
  },
  //设置指向播放列表第几首歌
  SETCURRENTINDEX(state, currentIndex){
    state.currentIndex = currentIndex
  },
  //设置播放列表
  SETPLAYLIST(state, playList){
    let res = []
    if(Array.isArray(playList)) {
      state.playList = playList
    }else{
      const findIndex = state.playList.findIndex(item => item.id == playList.id)
      res = state.slice(findIndex)
      state.playList = res
    }
  },
  //清空播放列表
  CLEARPLAYLIST(state) {
    state.playList = []
  },
  //设置播放状态
  SETPLAYING(state, playing) {
    state.playing = playing
  },
  //设置歌词
  SETLYRIC(state, lyric) {
    state.lyric = lyric
  }
}

export default mutation
