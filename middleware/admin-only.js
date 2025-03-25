export default async function ({ store, redirect }) {
  let user = store.state.auth.user
  if (user.is_student) {
    redirect('/courses')
  }
}
