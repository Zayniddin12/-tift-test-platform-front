<template>

</template>

<script>
export default {
  middleware({ redirect, store }) {
    const user = store.getters["auth/getUser"]
    if (user.is_student) {
      redirect('/courses')
    } else {
      redirect('/crud/tests')
    }
  },
}

</script>

<style scoped>

</style>
