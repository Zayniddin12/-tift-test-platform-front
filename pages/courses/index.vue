<template>
  <div class="page materials">
    <div class="main-content no-side-bar">
      <div class="row">
        <div class="col-md-12">
          <h1 v-if="!noTests && !isActive" class="heading">Тестлар:</h1>
          <h1 v-if="noTests && !isActive">Тестлар мавжуд емас.</h1>
          <transition mode="out-in" name="fade">
            <div :key="isActive" :class="{ 'is-loading': isActive }">
              <div class="items" v-if="tests.length && !isActive">
                <div class="" v-for="(test, index) in tests" :key="index">
                  <div
                    @click="routerPushId(test.id, test.test_status)"
                    class="item d-flex align-items-center justify-content-between test-id"
                  >
                    <div>
                      <p>
                        <strong class="mr-1">
                          {{ (currentPage - 1) * perPage + (index + 1) }}.
                        </strong>
                        {{ test.name }}
                      </p>
                    </div>
                    <!--                    <pre>{{ test.test_status }} this is test status</pre>-->
                    <div
                      v-if="
                        test.test_status === 2 ||
                        test.test_status === 3 ||
                        test.test_status === 5
                      "
                      class="test_error"
                      :class="{ 'error-five': test.test_status === 5 }"
                    >
                      {{
                        test.test_status === 2
                          ? 'Тест бошланмади'
                          : test.test_status === 5
                          ? 'Тестда иштирок эта олмайсиз'
                          : 'Тест топширилинмади'
                      }}
                    </div>
                    <div
                      @click="routerPushId(test.id, test.test_status)"
                      :class="{ submitted: test.test_status === 1 }"
                      v-else
                    >
                      {{
                        test.test_status === 4
                          ? 'Тестни бошлаш'
                          : 'Тест топширилди'
                      }}
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <BPagination
                    :value="currentPage"
                    :total-rows="totalItems"
                    :per-page="perPage"
                    @change="switchPage"
                    v-if="tests.length > 10"
                  />
                </div>
              </div>
              <div class="items" v-else-if="isActive">
                <div class="" v-for="test in 8" :key="test">
                  <div
                    class="item preloader-item d-flex align-items-center justify-content-between test-id h-25"
                  />
                </div>
              </div>
              <div
                style="margin-top: 20px"
                v-if="allTestsPassed && !noTests && !isActive"
              >
                <div v-if="allTestsPassedSuccess">
                  <h3>Tabriklaymiz!</h3>
                  <p>
                    Toshkent xalqaro moliyaviy boshqaruv va texnologiyalar
                    universitetiga kirish imtihonlaridan muvaffaqiyatli
                    o‘tdingiz. Shartnomani yuklab olish uchun shaxsiy
                    kabinetingizga kiring.
                  </p>
                </div>
                <div v-else>
                  <p>
                    Test sinovlaridan muvaffaqiyatli o‘ta olmadingiz, qayta
                    imtihon topshirish uchun Aloqa markazi operatorlari bilan
                    bog'laning: <a href="tel:+998712029229">(71) 202 9229</a>
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth', 'student-only', 'test'],
  data() {
    return {
      isActive: true,
    }
  },
  async fetch() {
    this.isActive = true
    await this.$store.dispatch('test/fetchTests')
    await this.$store.dispatch('test/fetchResults2')
    setTimeout(() => {
      this.isActive = false
    }, 500)
  },
  computed: {
    ...mapState({
      tests: (state) => state.test.tests,
      currentPage: (state) => state.test.currentPage,
      perPage: (state) => state.test.perPage,
      totalItems: (state) => state.test.total,
      noTests: (state) => state.test.tests.length === 0,
      allTestsPassed: (state) => {
        const filteredResults = state.test.results2.filter((result) =>
          state.test.tests.some((test) => test.name === result.name)
        )

        if (filteredResults.length < state.test.tests.length) {
          return false
        } else {
          return true
        }
      },
      allTestsPassedSuccess: (state) => {
        const filteredResults = state.test.results2.filter((result) =>
          state.test.tests.some((test) => test.name === result.name)
        )

        if (filteredResults.length < state.test.tests.length) {
          return false
        }

        return filteredResults.every((result) => result.is_passed)
      },
    }),
  },
  methods: {
    switchPage(page) {
      this.$store.commit('courses/SET_CURRENT_PAGE', page)
      this.$fetch()
    },
    routerPushId(id, status) {
      // console.log(id, 'id', status, 'status')
      if (status === 3) {
        this.$toast.error('Тест вақти ўтиб кетган!')
      } else if (status === 2) {
        this.$toast.error('Тест вақти етиб келмаган!')
      } else if (status === 5) {
        this.$toast.error('Сиз бу тестда қатнаша олмайсиз!')
      } else if (status === 1) {
        // this.$router.push(`/tests/${id}`)
        return
      } else if (status !== 3) {
        this.$router.push(`/tests/${id}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.heading {
  font-size: 26px;
  margin-bottom: 12px;
}

.test_error {
  color: #ff0000;
}
.error-five {
  color: #7d142e;
}

.preloader {
  height: 70px;
  width: 100%;
  margin-bottom: 12px;
  box-shadow: 0 0 2px rgba(194, 207, 224, 0.1),
    0 4px 8px rgba(194, 207, 224, 0.12);
  border-radius: 4px;
}

.auth-button {
  background: #109cf1;
  font-family: 'SF Pro Display Semibold', sans-serif;
  width: 100%;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.08px;
  color: #ffffff;
  border: none;

  &:focus {
    outline: none;
  }
}

.go-to-lesson {
  background: #ffffff;
  padding: 24px;
  margin-top: 43px;

  h6 {
    margin-left: 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    font-family: 'SF Pro Display Semibold', sans-serif;
  }

  span {
    font-family: 'SF Pro Text', sans-serif;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.24px;
    color: #90a0b7;
  }

  p {
    margin: 22px 0 29px 0;
    font-size: 14px;
    line-height: 16px;
    font-family: 'SF Pro Display Medium', sans-serif;
    letter-spacing: 0.01em;
  }
}

::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-track {
  display: none;
}

.materials {
  margin-top: 50px;

  .items {
    .item {
      max-width: initial;

      p {
        max-width: initial;
        line-height: 140%;
      }
    }
  }
}

.submitted {
  color: rgb(16, 214, 16);
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 48px;

  svg {
    height: 96px;
    width: 96px;
    margin: 12px 0;
  }

  span {
    font-size: 24px;
  }
}

.test-id {
  color: #3392cb;
  font-family: 'Ubuntu', serif;
  cursor: pointer;
}

// isloadin
.is-loading {
  .item {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

.preloader-item {
  height: 59px !important;
}
</style>
