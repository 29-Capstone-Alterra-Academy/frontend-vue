import axios from 'axios'

const state = () => ({
  threads: [],
  topics: [],
  detailTopic: {},
  detailThread: {},
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
  setDetailTopics(state, detailTopic) {
    state.detailTopic = detailTopic
  },
  setDetailThread(state, detailThread) {
    state.detailThread = detailThread
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
      .get('/thread?topicId=1&limit=10&offset=0')
      .then((res) => {
        commit('setThreads', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchThreadsByTopic({ commit }, param) {
    this.$axios
      .get('/thread?topicId=' + param + '&limit=10&offset=0')
      .then((response) => {
        commit('setThreads', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchThreadById({ commit, rootState }, param) {
    this.$axios
      .get('/thread/' + param, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((response) => {
        commit('setDetailThread', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchTopics({ commit }) {
    this.$axios
      .get('/topic?limit=10&offset=0')
      .then((res) => {
        commit('setTopics', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchTopicById({ commit, rootState }, param) {
    this.$axios
      .get('/topic/' + param, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setDetailTopics', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchUsers({ commit }) {
    axios
      .get('https://nomizo-json-server.herokuapp.com/users')
      .then((res) => {
        commit('setUsers', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchReplies({ commit }) {
    axios
      .get('https://nomizo-json-server.herokuapp.com/replies')
      .then((res) => {
        commit('setReplies', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  loggedUser({ commit, rootState }) {
    this.$axios
      .get('/profile', {
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
