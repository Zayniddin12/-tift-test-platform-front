<template>
  <div
    class="page test test-question"
    @mousedown="mousedown"
    @selectstart="selectstart"
  >
    <!-- Not showed -->
    <div v-if="false" class="w-100 text-center bg-white py-5 rounded mt-5">
      <p class="submitted_text">Сиз бу тестни топширгансиз</p>
      <RouterLink to="/courses" class="submitted_link">Тестлар</RouterLink>
    </div>

    <div class="main-content">
      <div class="row" v-if="!loading">
        <div class="col-md-8">
          <div v-if="loadingFinish" class="w-100 h-100 d-flex justify-content-center align-items-center">
            <div class="progress"></div>
          </div>
          <div v-else>
            <transition mode="out-in" name="fade">
              <div v-if="!testSubmitted && refreshTest" class="test-content">
                <div class="test-container">
                  <div v-if="activeQuestion">
                    <div class="test_title">
                      {{ activeQuestionIndex + 1 }}.&nbsp;
                      <question :question="activeQuestion.question" />
                    </div>
                    <!--                    <div class="test_title">-->
                    <!--                      {{ activeQuestionIndex + 1 }}.&nbsp;-->
                    <!--                      <vue-mathjax-->
                    <!--                        :formula="renderLatex(activeQuestion.question)"-->
                    <!--                      >-->
                    <!--                      </vue-mathjax>-->
                    <!--                    </div>-->
                    <div class="answer-options">
                      <div class="row">
                        <div
                          class="col-sm-6 mt-2 mb-2"
                          v-for="(option, index) in activeQuestion.options"
                          :key="index"
                        >
                          <label
                            class="item-temp"
                            :class="{ active: option.id === selectedOption }"
                          >
                            <!-- <label> -->
                            <span>{{ index + 1 }} )</span>
                            <input
                              name="test-options"
                              type="radio"
                              :value="option.id"
                              id="radio-1"
                              class="test-options"
                              v-model="selectedOption"
                            />
                            <div>
                              <question :question="option.value" />
                              <!--                              <vue-mathjax-->
                              <!--                                :formula="renderLatex(option.value)"-->
                              <!--                              ></vue-mathjax>-->
                            </div>
                            <!-- </label> -->
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-blue mt-3"
                  :class="{ pointer: isClick }"
                  :disabled="selectedOption === null"
                  @click="submitTest"
                >
                  Тасдиқлаш
                </button>
              </div>
              <!-- preventing blocks jumpings -->
              <div v-if="!refreshTest">
                <div
                  style="
                    display: absolute;
                    top: 0;
                    left: 0;
                    z-index: 100;
                    width: 100vh;
                    height: 100vh;
                    background: white;
                  "
                ></div>
              </div>
            </transition>

            <div v-if="testSubmitted">
              <div class="test-content">
                <div class="test-result">
                  <div class="test-container test-result-wrap">
                    <h4
                      class="balls"
                      :class="
                        results.percentage >= 50 ? 'correct' : 'incorrect'
                      "
                    >
                      {{ results.percentage }}%
                    </h4>
                    <span>{{ questions.questions_count }} саволдан</span>
                    <p>{{ results.correct_answers_count }} та тугри жавоб</p>
                    <button class="btn btn-blue" @click="returnToTest">
                      Тестларга қайтиш
                    </button>
                    <!--                  <button-->
                    <!--                    class="btn btn-blue"-->
                    <!--                    style="display: none"-->
                    <!--                    @click="getPDF(results.id)"-->
                    <!--                  >-->
                    <!--                    Чоп этиш-->
                    <!--                  </button>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4" v-if="questions && questions.subjects">
          <div class="right-sidebar">
            <div v-if="!testSubmitted"
              class="timer d-flex align-items-center justify-content-between"
            >
              <p class="timer-title d-flex align-items-center">
                <i>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                      stroke="#90A0B7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11 5V11L15 13"
                      stroke="#90A0B7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </i>
                <span>Қолган вақт:</span>
              </p>
              <div class="time-left test-timer d-flex">
                {{ countdownData(timer) }}
              </div>
            </div>
            <div v-if="!testSubmitted" class="tests-steps">
              <div class="tests-head">
                <h5>{{ questions.name }}</h5>
              </div>
              <div class="tests-body">
                <div
                  class="subjects"
                  :key="subject_index"
                  v-for="(subject, subject_index) in questions.subjects"
                >
                  <h6
                    style="
                      text-align: center;
                      font-weight: normal;
                      font-size: 24px;
                      line-height: 29px;
                    "
                  >
                    {{ subject.name }}
                  </h6>
                  <div class="items">
                    <div
                      v-for="(item, index) in questions.subjects[subject_index]
                        .questions"
                      :class="setColor(item, subject_index, index)"
                      class="item"
                      :key="index"
                      @click="chosenQuestion(subject_index, index)"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="answers && questions.subjects && !testSubmitted"
                class="tests-foot"
              >
                <button
                  class="btn btn-blue"
                  :disabled="allCompleted"
                  @click="submitAllTest"
                >
                  Тестни якунлаш
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-else>
        <div class="col-12 mt-5">
          <div class="d-flex align-items-center flex-column">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="
                  margin: auto;
                  background: #f5f6f8 none repeat scroll 0 0;
                  display: block;
                  shape-rendering: auto;
                "
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <g transform="translate(50 50)">
                  <g transform="scale(0.8)">
                    <g transform="translate(-50 -50)">
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          repeatCount="indefinite"
                          dur="1s"
                          values="-20 -20;20 -20;0 20;-20 -20"
                          keyTimes="0;0.33;0.66;1"
                        />
                        <path
                          fill="#f5f6f8"
                          d="M44.19 26.158c-4.817 0-9.345 1.876-12.751 5.282c-3.406 3.406-5.282 7.934-5.282 12.751 c0 4.817 1.876 9.345 5.282 12.751c3.406 3.406 7.934 5.282 12.751 5.282s9.345-1.876 12.751-5.282 c3.406-3.406 5.282-7.934 5.282-12.751c0-4.817-1.876-9.345-5.282-12.751C53.536 28.033 49.007 26.158 44.19 26.158z"
                        />
                        <path
                          fill="#109cf1"
                          d="M78.712 72.492L67.593 61.373l-3.475-3.475c1.621-2.352 2.779-4.926 3.475-7.596c1.044-4.008 1.044-8.23 0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572 22.362 50.381 20 44.19 20C38 20 31.809 22.362 27.085 27.085 c-9.447 9.447-9.447 24.763 0 34.21C31.809 66.019 38 68.381 44.19 68.381c4.798 0 9.593-1.425 13.708-4.262l9.695 9.695 l4.899 4.899C73.351 79.571 74.476 80 75.602 80s2.251-0.429 3.11-1.288C80.429 76.994 80.429 74.209 78.712 72.492z M56.942 56.942 c-3.406 3.406-7.934 5.282-12.751 5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817 1.876-9.345 5.282-12.751c3.406-3.406 7.934-5.282 12.751-5.282c4.817 0 9.345 1.876 12.751 5.282 c3.406 3.406 5.282 7.934 5.282 12.751C62.223 49.007 60.347 53.536 56.942 56.942z"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <h3>Саволлар юкланмоқда</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueMathjax } from 'vue-mathjax'
import RightSidebar from '@/components/RightSidebar'
import { mapState } from 'vuex'
import Question from '~/components/Question.vue'

export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css',
        },
      ],
    }
  },
  name: 'testQuestion',
  middleware: ['auth', 'student-only', 'test'],

  async fetch() {
    // this.renderLatex()
    this.$store.commit('test/clearAll')

    renderMathInElement(document.body)
    this.loading = true
    await this.$store
      .dispatch('test/fetchDuration', this.routeId)
      .then((data) => {
        this.startDate = +new Date(data.time)
        this.endDate = +new Date(data.due_time)
      })
    await this.$store
      .dispatch('test/fetchTestSingle', this.routeId)
      .then((data) => {
        this.timeLeft = Math.floor(+data.left_time)
        this.startInterval(this.timeLeft)
      })

    if (
      (this.questions.test_status && this.questions.test_status === 2) ||
      this.questions.test_status === 3
    ) {
      await this.$router.push(`/courses`)
    } else {
      await this.$store.dispatch('test/fetchAnswers', this.routeId)
      if (
        (this.results && this.results.submitted === true) ||
        this.questions.test_status === 1
      ) {
        this.testSubmitted = true
        await this.$store.dispatch('test/fetchResults', this.routeId)
      }
      if (!this.testSubmitted) {
        let questions = [
          ...this.questions.subjects[this.activeSubjectIndex].questions,
        ]
        let sorted = [
          ...this.questions.subjects[this.activeSubjectIndex].questions,
        ]
        if (this.answers) {
          for (let i = 0; i < questions.length; i++) {
            for (let ii = 0; ii < this.answers.length; ii++) {
              if (questions[i].id === this.answers[ii].question) {
                sorted.splice(i, 1)
              }
            }
          }
          this.activeQuestionIndex = questions.findIndex(
            (element) => element.id === sorted[0].id
          )
        }
        this.answers.find((object) =>
          object.question === this.activeQuestion.id
            ? (this.selectedOption = object.answer)
            : (this.selectedOption = null)
        )
      }
    }

    this.loading = false
  },

  components: {
    RightSidebar,
    VueMathjax,
    Question,
  },
  data() {
    return {
      latexText: '',
      isClick: false,
      loading: false,
      testSubmitted: false,
      activeSubjectIndex: 0,
      activeQuestionIndex: 0,
      answered: [],
      selectedOption: null,
      questionId: null,
      refreshTest: true,
      startDate: undefined,
      endDate: undefined,
      timeLeft: undefined,
      timeOut: false,
      refresh: false,
      isStripeLoaded: false,
      routeId: this.$route.params.id,
      interval: undefined,
      timer: undefined,
      loadingFinish: false,
    }
  },
  watch: {
    async timeOut() {
      await this.$store
        .dispatch('test/fetchDuration', this.routeId)
        .then((data) => {
          this.startDate = +new Date(data.time)
          this.endDate = +new Date(data.due_time)
        })
    },
    activeQuestionIndex() {
      this.refreshTest = false
      setTimeout(() => (this.refreshTest = true), 300)
    },
    '$nuxt.isOffline'(newValue) {
      if (newValue) {
        this.$toast.error('Internet aloqasini tekshiring', {
          hideProgressBar: true,
        })
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    next((vm) => {
      vm.$store.commit('test/clearAll')
    })
  },
  methods: {
    async finishTest() {
      try {
        this.loadingFinish = true
        await this.$store.dispatch('test/submitTest', this.routeId)
        this.timeOut = true
        this.loadingFinish = false
        await this.$router.push({
          path: '/courses',
        })
        this.testSubmitted = true
        await this.$store.dispatch('test/fetchAnswers', this.routeId)
      } catch (e) {
        await this.$store.dispatch('test/fetchResults', this.routeId)
        await this.$store.dispatch('test/fetchAnswers', this.routeId)
        // this.loadingFinish = true
        this.timeOut = true
        this.loadingFinish = false
        await this.$router.push({
          path: '/courses',
        })
        this.testSubmitted = true
      }
    },
    renderLatex(latex) {
      return latex
        .replace(/(<([^>]+)>)/gi, ' ')
        .replaceAll(/\\\(/gim, '(')
        .replaceAll(/\\\)/gim, ')')
    },
    getPDF(id) {
      this.$axios
        .get(`pdf/${id}/`, {
          responseType: 'blob',
        })
        .then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]))

          const fileLink = document.createElement('a')

          fileLink.href = fileURL

          fileLink.setAttribute('download', 'file.pdf')

          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.$toast.error(err.response.data.message, {
              hideProgressBar: true,
            })
          } else {
            this.$toast.error('Хатолик! Қайтадан уриниб кўринг.', {
              hideProgressBar: true,
            })
          }
        })
    },
    async submitAllTest() {
      if (this.timeOut === false) {
        this.loadingFinish = true
        await this.$store.dispatch('test/submitTest', this.$route.params.id)
        await this.$store.dispatch('test/fetchAnswers', this.$route.params.id)
        this.loadingFinish = false
        this.timeOut = true
        // await this.$router.push({
        //   path: '/courses',
        // })
        this.testSubmitted = true
      }
    },

    chosenQuestion(subject_index, index) {
      if (!this.testSubmitted) {
        this.$store.dispatch('test/fetchAnswers', this.$route.params.id)
        this.activeQuestionIndex = index
        this.activeSubjectIndex = subject_index
        this.answers.find((object) =>
          object.question === this.activeQuestion.id
            ? (this.selectedOption = object.answer)
            : (this.selectedOption = null)
        )
      }
    },
    async submitTest() {
      this.isClick = true
      this.$store.dispatch('test/fetchAnswers', this.$route.params.id)
      if (
        this.selectedOption !== null &&
        this.answers.find((r) => r.question === this.activeQuestion.id)
      ) {
        this.answers.find((r) =>
          r.question === this.activeQuestion.id
            ? (this.questionId = r.id)
            : (this.questionId = null)
        )

        this.$axios
          .put(`question-answer/${this.questionId}/`, {
            question: this.activeQuestion.id,
            answer: this.selectedOption,
          })
          .then((response) => {
            if (
              this.questions?.subjects[this.activeSubjectIndex]?.questions
                ?.length !==
              this.activeQuestionIndex + 1
            ) {
              this.activeQuestionIndex++
            } else {
              this.activeQuestionIndex = 0
              if (
                this.questions.subjects.length !==
                this.activeSubjectIndex + 1
              ) {
                this.activeSubjectIndex++
              } else {
                this.activeSubjectIndex = 0
              }
            }

            const index = this.answers.findIndex(
              (object) => object.question === response?.data?.question
            )

            if (index !== -1) {
              let answers = [...this.answers]
              answers[index] = response.data
              this.$store.commit('test/setAnswers', answers)
              this.answers.find((object) =>
                object.question === this.activeQuestion.id
                  ? (this.selectedOption = object.answer)
                  : (this.selectedOption = null)
              )
            }
          })
          .catch((err) => {
            if (err.response?.status === 400) {
              this.$toast.error(err.response.data.message, {
                hideProgressBar: true,
              })
            } else if (!err.response) {
              this.$toast.error('Internet aloqasini tekshiring', {
                hideProgressBar: true,
              })
            } else {
              this.$toast.error(
                `Хатолик! Қайтадан уриниб кўринг. ${err?.response?.data?.message}\n${err}`,
                {
                  hideProgressBar: true,
                }
              )
            }
          })
      } else if (this.selectedOption !== null) {
        await this.$axios
          .post(`tests/${this.$route.params.id}/question-answer/`, {
            question: this.activeQuestion.id,
            answer: this.selectedOption,
          })
          .then((res) => {
            if (res) {
              if (
                this.questions.subjects[this.activeSubjectIndex].questions
                  .length !==
                this.activeQuestionIndex + 1
              ) {
                this.activeQuestionIndex++
              } else if (
                this.questions.subjects[this.activeSubjectIndex].questions
                  .length -
                  1 ===
                this.activeQuestionIndex
              ) {
                this.activeQuestionIndex = 0
              }

              this.$store.commit('test/setAnswers', [...this.answers, res.data])
              this.answers.find((object) =>
                object.question === this.activeQuestion.id
                  ? (this.selectedOption = object.answer)
                  : (this.selectedOption = null)
              )
            }
          })
          .catch((err) => {
            if (err.response?.status === 400) {
              this.$toast.error(err?.response?.data?.message || '', {
                hideProgressBar: true,
              })
            } else if (!err.response) {
              this.$toast.error('Internet aloqasini tekshiring', {
                hideProgressBar: true,
              })
            } else {
              this.$toast.error(
                `Хатолик! Қайтадан уриниб кўринг.\n ${err?.response?.data?.message}`,
                {
                  hideProgressBar: true,
                }
              )
            }
          })
      }
      this.isClick = false
    },
    returnToTest() {
      this.$router.push('/courses')
    },
    async onEndCountdown() {
      if (this.timeLeft < 0) {
        this.timeOut = true
        setTimeout(async () => {
          await this.$store.dispatch('test/fetchAnswers', this.routeId)
          await this.$store.dispatch('test/fetchResults', this.routeId)
          this.testSubmitted = true
        }, 1000)
      }
    },
    mousedown(e) {
      e.preventDefault()
    },
    selectstart(e) {
      e.preventDefault()
    },
    formatTime(time) {
      return time > 9 ? time : `0${time}`
    },
    startInterval(time) {
      this.timer = Math.floor(time)
      if (this.timer > 0) {
        this.interval = setInterval(() => {
          this.timer--
        }, 1000)
      } else if (!isNaN(time) && this.timer <= 0) {
        clearInterval(this.interval)
      }
    },
  },
  computed: {
    ...mapState({
      questions: (state) => state.test.questions,
      answers: (state) => state.test.answers,
      results: (state) => state.test.results,
      testDuration: (state) => state.test.duration,
    }),
    resultUserAnswer() {
      return (question) => {
        return this.answers.find((o) => o.question === question)
      }
    },
    resultAnswer() {
      return (questionObj, answer) => {
        return questionObj.options.find((o) => o.id === answer)
      }
    },
    setColor() {
      return (item, subject_index, index) => {
        if (this.testSubmitted) {
          const answer = this.answers.find((a) => a.question === item.id)

          if (answer) {
            return {
              finished: true,
              success: answer.correct_answer,
              failed: !answer.correct_answer,
            }
          } else {
            return {
              finished: true,
            }
          }
        } else {
          return {
            active:
              index === this.activeQuestionIndex &&
              subject_index === this.activeSubjectIndex,
            answered: this.answers.find((a) => a.question === item.id),
          }
        }
      }
    },
    activeQuestion() {
      return this.questions.subjects
        ? this.questions.subjects[this.activeSubjectIndex].questions[
            this.activeQuestionIndex
          ]
        : null
    },
    allCompleted() {
      return (
        this.answers.length < this.questions.questions_count &&
        this.timeOut === false
      )
    },
    isOnline() {
      return navigator?.onLine
    },
    countdownData() {
      return function (time) {
        if (this.timer && !isNaN(this.timer) && this.timer > 0) {
          let totalSeconds = time
          const hours = Math.floor(totalSeconds / 3600)
          totalSeconds %= 3600
          const minutes = Math.floor(totalSeconds / 60)
          const seconds = Math.floor(totalSeconds % 60)
          return `${this.formatTime(hours)}:${this.formatTime(
            minutes
          )}:${this.formatTime(seconds)}`
        } else if (this.timer <= 0 && !this.loadingFinish) {
          this.finishTest()
        } else {
          return '00:00:00'
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.main-content {
  margin-top: 50px;
}

.answer-options {
  .test-options {
    opacity: 0;
  }

  .item {
    height: calc(100% - 30px);

    &.active {
      border: 1px solid #109cf1 !important;

      span {
        border: 1px solid #109cf1 !important;
        color: #109cf1 !important;
      }

      p {
        color: #109cf1;
      }
    }
  }
}

.item-lab {
  cursor: pointer;
}

.item-temp {
  height: 100%;
  width: 100%;
  padding: 10px;
  transition: all 0.5s;
  border: 1px solid #cecfd0;
  display: inline-block;
  cursor: pointer;

  &.active {
    border: 1px solid #109cf1 !important;

    p {
      color: #109cf1;
    }
  }
}

.test_title {
  font-weight: 500;
  font-size: 24px;
  color: #334d6e;
  margin-bottom: 60px;
  display: flex;
}

.tests-foot {
  button {
    padding: 5px 0;
  }
}

.time-left.test-timer {
  font-weight: 600;
  font-size: 52px;
  color: #405877;

  .timer-title div {
    font-weight: 600;
    font-size: 52px;
    color: #30a34b;
  }
}

.btn {
  width: 360px;

  &:disabled {
    background: #90a0b7;
    border: #90a0b7;
    cursor: not-allowed;

    &:hover {
      color: #fff;
    }
  }
}

.tests-steps {
  .btn {
    align-self: center;
  }
}

.results {
  margin-top: 32px;

  .balls {
    &.correct {
      color: #2ed47a;
    }

    &.incorrect {
      color: #e53e3e;
    }
  }

  & > .heading {
    font-size: 15px;
    line-height: 18px;
    color: #90a0b7;
    margin-bottom: 12px;
  }

  .result {
    padding: 16px 20px;
    margin-bottom: 4px;
    background: #ffffff;
    border: 1px solid #f0f5fa;
    box-sizing: border-box;
    box-shadow: 0 0 2px rgba(194, 207, 224, 0.1),
      0 4px 8px rgba(194, 207, 224, 0.12);
    border-radius: 4px;

    .question {
      display: flex;
      font-size: 15px;
      line-height: 140%;
      color: #90a0b7;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f5fa;
      margin: 0 0 12px;
    }

    .label {
      color: #90a0b7;
      font-size: 13px;
      line-height: 16px;
      margin: 0 0 4px;

      &.correct {
        color: #2ed47a;
      }

      &.incorrect {
        color: #e53e3e;
      }
    }

    .answer {
      font-weight: 500;
      font-size: 15px;
      color: #334d6e;
    }
  }
}

.pointer {
  pointer-events: none;
}

.progress {
  width: 100.8px;
  height: 16.8px;
  -webkit-mask: radial-gradient(circle closest-side, #30a34b 94%, #0000)
    left/20% 100%;
  background: linear-gradient(#30a34b 0 0) left/0% 100% no-repeat #dbdcef;
  animation: progress-c3ir73 2s infinite steps(6);
}

@keyframes progress-c3ir73 {
  100% {
    background-size: 120% 100%;
  }
}

.submitted_text {
  font-size: 36px;
  line-height: 140%;
  margin-bottom: 12px;
}

.submitted_link {
  font-size: 15px;
  line-height: 140%;
  color: #971837;
  text-decoration: underline;
  cursor: pointer;
}
button {
  background: #30a34b !important;
  border: #30a34b;
}
</style>


<!--commit-->
