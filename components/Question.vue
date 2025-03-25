<template>
  <div class="t-question">
    <template v-for="match in draw">
      <latex v-if="match.type === 'expression'" :expression="match.value" />
      <span v-if="match.type === 'text'">
        {{ match.value }}
      </span>
    </template>
  </div>
</template>

<script>
import Latex from "~/components/Latex.vue";
export default {
  name: "Question.vue",
  props: {
    question: {
      type: String,
      default: null,
    },
  },
  components: {
    Latex,
  },
  data: () => ({
    draw: [],
  }),
  methods: {
    render() {
      const regex = new RegExp("🉐([^🉐]*)🉐", "g")
      const question = this.convertHTMLEntity(this.question).replaceAll("\\(", "🉐").replaceAll("\\)", "🉐")
      const matches = [...question.matchAll(regex)]

      let delta = 0
      let tempQuestion = ''

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        tempQuestion += question.slice(delta, match.index)
        tempQuestion += `|=|===|=|`
        delta += match.index - delta + match[0].length
      }

      tempQuestion += question.slice(delta)
      tempQuestion = tempQuestion.replaceAll(/<.*?>/g, '')

      const splitted = tempQuestion.split('|=|')

      let index = 0

      this.draw = splitted.map((item, i) => {
        if (item === '===') {
          const match = matches[index++]
          if (!match) {
            return {
              type: 'text',
              value: ''
            }
          }

          let value = match[1]

          return {
            type: 'expression',
            value,
          }
        } else {
          return {
            type: 'text',
            value: item,
          }
        }
      })
    },
    convertHTMLEntity(text){
      const span = document.createElement('span');

      return text
        .replace(/&[#A-Za-z0-9]+;/gi, (entity,position,text)=> {
          span.innerHTML = entity;
          return span.innerText;
        });
    }
  },
  mounted() {
    this.render()
  },
  watch: {
    question() {
      this.render()
    },
  },
}
</script>

<style scoped lang="scss">
  .t-question {
    * {
      margin-right: 4px;
    }

    div {
      display: inline-block;
    }
  }
</style>
