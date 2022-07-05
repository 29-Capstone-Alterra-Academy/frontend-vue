import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  createPersistedState({
      key: 'auth',
      paths: ["auth.accessToken", "auth.refreshToken", "auth.profile"]
  })(store)
}