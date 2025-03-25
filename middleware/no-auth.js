export default async function ({ store, redirect, route }) {
  const tokenFromQuery = route.query.token;
  console.log(tokenFromQuery)

  if (tokenFromQuery) {
    localStorage.setItem('token', tokenFromQuery);
    store.commit('auth/SET_TOKEN', tokenFromQuery);
    store.$axios.defaults.headers.common.Authorization = "Token " + tokenFromQuery;
    await store.dispatch('auth/FETCH_USER');
  }

  await store.dispatch('auth/LOAD_TOKEN')
  const tokens = store.getters['auth/getTokens']

  try {
    if (!store.getters['auth/getUser'] && tokens) {
      await store.dispatch('auth/FETCH_USER')
    }
  } catch (err) { }

  if (!!store.getters['auth/getUser']) {
    redirect('/')
  }
}
