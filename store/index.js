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
}
