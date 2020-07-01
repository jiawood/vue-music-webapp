import state from './state'

const getter = {
  fullScreen: state => state.fullScreen,
  showPlayer: state => state.showPlayer,
  playing: state => state.playing,
  playList: state => state.playList,
  lyric: state => state.lyric,
  currentIndex: state => state.currentIndex
}

export default getter
