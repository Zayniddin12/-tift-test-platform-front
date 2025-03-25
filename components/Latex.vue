<template>
  <div ref="output" class="katex-wrapper"></div>
</template>

<script>
import katex from 'katex'


export default {
  name: "Latex.vue",
  props: {
    expression: {
      type: String,
      default: null,
    },
  },
  methods: {
    render() {
      const el = this.$refs.output
      if (el) {
        katex.render(this.expression, el, {
          throwOnError: false,
        })
      }
    },
  },
  mounted() {
    this.render()
  },
  watch: {
    expression() {
      this.render()
    },
  },
}
</script>
