const state = () => ({
  threads: [],
  reportedThreads: [],
  topics: [],
  reportedTopics: [],
  detailTopic: {},
  detailThread: {},
  detailUser: {},
  users: [],
  reportedUsers: [],
  replies: [],
  reportedReplies: [],
  profile: [],
  reasons: [],
  isAdmin: null,
})

const mutations = {
  setThreads(state, threads) {
    state.threads = [...threads]
  },
  setReportedThreads(state, reportedThreads) {
    state.reportedThreads = [...reportedThreads]
  },
  setTopics(state, topics) {
    state.topics = [...topics]
  },
  setReportedTopics(state, reportedTopics) {
    state.reportedTopics = [...reportedTopics]
  },
  setDetailTopics(state, detailTopic) {
    state.detailTopic = detailTopic
  },
  setDetailThread(state, detailThread) {
    state.detailThread = detailThread
  },
  setDetailUser(state, detailUser) {
    state.detailUser = detailUser
  },
  setUsers(state, users) {
    state.users = [...users]
  },
  setReportedUsers(state, reportedUsers) {
    state.reportedUsers = [...reportedUsers]
  },
  setReplies(state, replies) {
    state.replies = [...replies]
  },
  setReportedReplies(state, reportedReplies) {
    state.reportedReplies = [...reportedReplies]
  },
  setReasons(state, reasons) {
    state.reasons = [...reasons]
  },
  setProfile(state, profile) {
    state.profile = profile
  },
  setUserRole(state, isAdmin) {
    state.isAdmin = isAdmin
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
  fetchThreadsByUser({ commit }, param) {
    this.$axios
      .get('/thread?userId=' + param + '&limit=10&offset=0')
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
      .get('/topic?limit=100&offset=0')
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
  fetchModeratorsByTopic({ commit, rootState }, param) {
    this.$axios
      .get('/topic/' + param + '/moderator', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setUsers', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchUserById({ commit, rootState }, param) {
    this.$axios
      .get('/user/' + param, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setDetailUser', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchRepliesByThreadId({ commit, rootState }, param) {
    this.$axios
      .get('reply?scope=thread&limit=5&offset=0&threadId=' + param, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setReplies', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchReportReasons({ commit, rootState }) {
    this.$axios
      .get('/report/reason', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setReasons', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchReportedThreads({ commit, rootState }) {
    this.$axios
      .get('/report?scope=thread&limit=100&offset=0', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setReportedThreads', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchReportedTopics({ commit, rootState }) {
    this.$axios
      .get('/report?scope=topic&limit=100&offset=0', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setReportedTopics', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchReportedUsers({ commit, rootState }) {
    this.$axios
      .get('/report?scope=user&limit=100&offset=0', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setReportedUsers', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchReportedReplies({ commit, rootState }) {
    this.$axios
      .get('/report?scope=reply&limit=100&offset=0', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((res) => {
        commit('setReportedReplies', res.data)
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
        console.log(response.data)
        commit('setProfile', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  updateLoggedUser({ commit, rootState }, data) {
    this.$axios
      .put('/profile', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rootState.auth.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data)
        commit('setProfile', response.data)
        this.snackbar = true
      })
      .catch((error) => {
        console.log(error)
        this.snackbarFalse = true
      })
  },
  isAdmin({ commit, rootState }) {
    const base64Payload = rootState.auth.accessToken.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    const tkData = JSON.parse(payload.toString())
    console.log(tkData)
    commit('setUserRole', tkData.IsAdmin)
  },
}

const getters = {
  isAdmin(state) {
    return state.isAdmin
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
