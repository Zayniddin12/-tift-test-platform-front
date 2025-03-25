export const state = () => ({
  tests: [],
  questions: {},
  results: {},
  results2: [],
  answers: [],
  duration: {},

  total: null,
  perPage: null,
  currentPage: 1
});

export const mutations = {
  clearAll(state) {
    state.tests = []
    state.questions = {}
    state.results = {}
    state.results2 = []
    state.answers = []
    state.duration = {}
    state.total = null
    state.perPage = null
    state.currentPage = 1
  },
  setQuestions(state, questions) {
    state.questions = questions;
  },
  setDuration(state, payload) {
    state.duration = payload;
  },
  SET_TESTS(state, payload) {
    state.tests = payload;
  },
  setResults(state, results) {
    state.results = results;
  },
  setResults2(state, results2) {
    state.results2 = results2;
  },
  setAnswers(state, answers) {
    state.answers = answers;
  },
  SET_CURRENT_PAGE(state, payload) {
    state.currentPage = payload;
  },
  SET_TOTAL_ITEMS(state, payload) {
    state.totalItems = payload;
  }
};
export const actions = {
  fetchDuration({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`tests/${id}/start/`)
        .then(res => {
          commit("setDuration", res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchTests({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`tests/`, {
          headers: {},
          params: {
            page: state.currentPage,
          },
        })
        .then(res => {
          commit("SET_TESTS", res.results);
          commit("SET_CURRENT_PAGE", res.current_page);
          commit("SET_TOTAL_ITEMS", res.total);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchTestSingle({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`tests/${id}/`, {
          headers: {}
        })
        .then(res => {
          commit("setQuestions", res);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchResults({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`tests/${id}/result/`)
        .then(res => {
          commit("setResults", res);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // to get full results
  fetchResults2({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`results/`)
        .then(res => {
          commit("setResults2", res);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  submitTest({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`tests/${id}/submit/`, { res: 'result' })
        .then(res => {
          this.$axios.$get(`tests/${id}/result/`)
            .then(response => {
              commit("setResults", response);
              resolve(response);
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAnswers({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`tests/${id}/question-answer/`)
        .then(res => {
          commit("setAnswers", res);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
