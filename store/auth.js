export const state = () => ({
  accessToken: null,
  refreshToken: null,
})

export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken
  },
  logout(state) {
    localStorage.clear()
    sessionStorage.clear()
    state.accessToken = null
    state.refreshToken = null
  }
}

export const getters = {
  isLoggedIn(state) {
    return !!state.accessToken;
  },
}