export default async function ({ store, redirect, $axios, route }) {
  try {
    const response = await $axios.$get("tests/test-in-process/")
    if (response.has_test && route.path !== `/tests/${response?.test}`) {
      redirect("/tests/" + response.test)
    }
  } catch(err) {}
}
