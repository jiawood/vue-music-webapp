import router from '../router'

const action = {
  //设置播放器界面显示，参数：点击的歌曲
  setPlayShow({commit}, song) {
    commit('SETPLAYLIST', song)
    commit('SETCURRENTINDEX', 0)
    commit('SETFULLSCREEN', true)
    commit('SETPLAYING', true)
    commit('SETSHOWPLAYER', true)
    router.push('/player')
  }
}

export default action
