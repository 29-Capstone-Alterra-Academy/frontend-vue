import axios from 'axios'

const state = () => ({
  threads: [],
  topics: [],
  users: [],
  replies: [],
  profile: [],
})

const mutations = {
  setThreads(state, threads) {
    state.threads = [...threads]
  },
  setTopics(state, topics) {
    state.topics = [...topics]
  },
  setUsers(state, users) {
    state.users = [...users]
  },
  setReplies(state, replies) {
    state.replies = [...replies]
  },
  setProfile(state, profile) {
    state.profile = profile
  },
}

const actions = {
  fetchThreads({ commit }) {
    this.$axios
      .get('/threads')
      .then((res) => {
        commit('setThreads', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchTopics({ commit }) {
    this.$axios
      .get('/topics')
      .then((res) => {
        commit('setTopics', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchUsers({ commit }) {
    this.$axios
      .get('/users')
      .then((res) => {
        commit('setUsers', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchReplies({ commit }) {
    this.$axios
      .get('/replies')
      .then((res) => {
        commit('setReplies', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  loggedUser({ commit, rootState }) {
    axios
      .get('https://staking-spade-production.up.railway.app/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((response) => {
        commit('setProfile', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}

const getters = {
  isMale(state) {
    return state.profile.username !== null
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
