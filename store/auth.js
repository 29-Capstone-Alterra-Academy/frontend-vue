export const state = () => ({
  accessToken: null,
  refreshToken: null,
  profile: [],
})

export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken
  },
  setUserProfile(state, profile) {
    state.profile = profile
  },
  logout(state) {
    localStorage.clear()
    sessionStorage.clear()
    state.profile = []
    state.accessToken = null
    state.refreshToken = null
  }
}

export const getters = {
  isLoggedIn(state) {
    return !!state.accessToken;
  },
  isMale(state) {
    return state.profile.gender === 'male';
  }
}