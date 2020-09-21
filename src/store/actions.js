import router from '../router'

const action = {
  //设置播放器界面显示，参数：播放列表
  setPlayShow({commit}, playList, index = 0) {
    commit('SETPLAYLIST', playList)
    commit('SETCURRENTINDEX', index)
    commit('SETFULLSCREEN', true)
    commit('SETPLAYING', true)
    commit('SETSHOWPLAYER', true)
    router.push('/player')
  },
  //设置mini播放器显示，参数：播放列表，索引
  setMiniPlayShow({commit}, playList) {
    commit('SETPLAYLIST', playList)
    commit('SETFULLSCREEN', false)
    commit('SETPLAYING', true)
    commit('SETSHOWPLAYER', true)
  }
}

export default action
