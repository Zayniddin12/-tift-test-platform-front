<template>
  <div class="main-grid">
    <div class="auth-container">
      <div class="center-block">
        <!-- <h1 class="text-center mb-4">Тест</h1> -->
        <div class="text-center mb-4">
          <img src="@/static/img/tiftLogo.webp" alt="Logo " class="logo-img" />
        </div>

        <div class="main-bock auth">
          <!-- <pre>{{ error }}</pre> -->
          <form @submit.prevent="submit">
            <div
              class="form-group"
              :class="{
                'form-group--error': $v.username.$error || isAuth,
                'form-group--loading': $v.username.$pending,
              }"
            >
              <label>Login</label>

              <b-form-input
                v-model.trim="$v.username.$model"
                id="input-live"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Loginni kiriting"
              ></b-form-input>
              <div class="error" v-if="$v.username.$error">
                Login kiritishingiz shart!
              </div>
              <!-- <div class="error" v-else-if="isAuth">
                Login yoki parol xato!
              </div> -->
            </div>
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.password.$error || isAuth }"
            >
              <label>Parol</label>
              <div class="d-flex">
                <b-form-input
                  v-model.trim="$v.password.$model"
                  id="password"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Parolni kiriting"
                  type="password"
                  class="input-password"
                >
                </b-form-input>
                <div class="pass-hide" id="togglePassword">
                  <HideButton
                    :typePassword="isClick"
                    @on-click="isClick = !isClick"
                  />
                </div>
              </div>
              <div class="error" v-if="$v.password.$error">
                Parol kiritishingiz shart!
              </div>
              <!-- <div class="error" v-else-if="isAuth">
                Login yoki parol xato!
              </div> -->
            </div>
            <button
              type="button"
              class="exam-rules-btn"
              @click="dialogExamRules = true"
            >
              Imtihon qonun qoidalari!
            </button>

            <div class="d-flex flex-column align-items-center mt-3">
              <button class="mb-3 auth-button" type="submit">Kirish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="main-right">
      <svg
        viewBox="0 0 220 192"
        width="220"
        height="192"
        fill="none"
        class="inset-1"
      >
        <defs class="ng-tns-c131-1">
          <pattern
            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            class="ng-tns-c131-1"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              fill="currentColor"
              class="ng-tns-c131-1"
            ></rect>
          </pattern>
        </defs>
        <rect
          width="220"
          height="192"
          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          class="ng-tns-c131-1"
        ></rect>
      </svg>
      <svg
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute inset-0 pointer-events-none ng-tns-c131-1"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="100"
          class="text-gray-700 opacity-25 ng-tns-c131-1"
        >
          <circle r="54" cx="586" cy="63" class="ng-tns-c131-1"></circle>
          <circle r="234" cx="990" cy="641" class="ng-tns-c131-1"></circle>
        </g>
      </svg>
      <div class="login__desc">
        <h3>
          Welcome to <br />
          the TIFT test portal
        </h3>
        <!-- <p>We are a global institution that develops leaders of tomorrow by delivering future-ready and
          industry-relevant courses.</p> -->
      </div>
    </div>
    <div :class="{ active: dialogExamRules }" class="exam-rules-dialog">
      <div class="exam-rules-dialog-bg" @click="dialogExamRules = false"></div>
      <div class="exam-rules-dialog-content">
        <span
          class="exam-rules-dialog-content-close"
          @click="dialogExamRules = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="#33B34A"
          >
            <path
              d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"
            ></path>
          </svg>
        </span>
        <h4>
          TIFT Universiteti yakuniy imtihonlar o‘tkazish bo‘yicha talabalarga
          qo‘yiladigan talablar
        </h4>
        <p>
          Quyidagi talablarga bo‘ysunmaslik imtihondan chetlashtirilishga sabab
          bo‘ladi:
        </p>
        <ul>
          <li>
            1. Imtihon platformasiga kirish uchun beriladigan ma’lumotlarni
            boshqalar bilan bo‘lishish;
          </li>
          <li>
            2. Imtihon nazoratchilari tomonidan foydalanish uchun ochib berilgan
            brauzerdan boshqa dasturlardan foydalanish;
          </li>
          <li>
            3. Imtihon paytida ruxsatsiz veb-saytlarga yoki tashqi manbalarga
            kirishga urinish;
          </li>
          <li>4. O‘zaro suhbatlashish, savollar almashish;</li>
          <li>
            5. Imtihonga tayyorgarlik ko‘rish uchun berilgan materiallardan
            imtihon jarayonida foydalanish;
          </li>
          <li>
            6. Imtihon davomida “smartphone”, “smartwatch” kabi qurilmalardan
            foydalanish;
          </li>
        </ul>
        <div class="exam-rules-dialog-content-accept">
          <b-button @click="dialogExamRules = false">Tushundim</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { mapState } from 'vuex'
Vue.use(Vuelidate)
import { required } from 'vuelidate/lib/validators'
import HideButton from '@/components/HideButton.vue'

export default {
  middleware: ['no-auth'],
  name: 'auth',
  layout: 'auth',
  data() {
    return {
      username: '',
      password: '',
      isAuth: false,
      isClick: false,
      dialogExamRules: false,
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
    }),
  },
  methods: {
    changeInputType() {
      const togglePassword = document.querySelector('#togglePassword')
      const password = document.querySelector('#password')

      togglePassword.addEventListener('click', function () {
        const type =
          password.getAttribute('type') === 'password' ? 'text' : 'password'
        password.setAttribute('type', type)
      })
    },
    async submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        await this.$store
          .dispatch('auth/LOGIN', {
            username: this.username,
            password: this.password,
          })
          .then(async () => {
            await this.$store.dispatch('auth/FETCH_USER')
          })
          .catch(() => {
            this.isAuth = true
            this.$toast.error(
              'Логин ёки пароль хато! Бошқатдан уриниб кўринг',
              {
                hideProgressBar: true,
              }
            )
            this.$router.push('/')
          })
      }
    },
  },
  mounted() {
    this.changeInputType()

    const token = this.$route.query.token

    if (token) {
      localStorage.setItem('token', token)
      this.$store.commit('auth/SET_TOKEN', token)
      this.$store.$axios.defaults.headers.common.Authorization =
        'Token ' + token

      this.$store.dispatch('auth/FETCH_USER').then(() => {
        this.$router.push('/')
      })
    }
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
}
</script>
<style scoped lang="scss">
@media only screen and (max-width: 900px) {
  .exam-rules-dialog-content {
    width: 90% !important;
  }
}

.exam-rules {
  &-btn {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    margin-top: -10px;
    display: block;
    color: #90a0b7;
    border-bottom: 1px solid #90a0b7;
    &:focus {
      outline: none;
    }
  }
  &-dialog {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    transform: scale(0);
    transition: all 0.5s;
    &.active {
      transform: scale(1);
    }
    &-bg {
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    &-content {
      background-color: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40%;
      border-radius: 10px;
      padding: 40px 20px;
      overflow-y: auto;
      &-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        svg {
          width: 20px;
          height: 20px;
        }
      }
      h4 {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.2;
        color: #33b34a;
        margin-bottom: 20px;
        text-align: center;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        color: #33b34a;
        margin-bottom: 20px;
        padding-left: 20px;
      }
      ul {
        padding-left: 20px;
        li {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          color: #33b34a;
          margin-bottom: 10px;
        }
      }

      &-accept {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          background-color: #33b34a;
          border: none;
          padding: 10px 20px;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
          border-radius: 5px;
          margin-top: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
// new style
.main-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.main-right {
  background: linear-gradient(128.26deg, #30a34b -47.36%, #070707 108.26%);
  height: 100vh;
}

.inset-1 {
  right: 0;
  top: -4rem !important;
  position: absolute !important;
  color: #33b34a;
}

.inset-0 {
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  position: absolute !important;
  color: #33b34a;
  // z-index: -1;
}

.logo-img {
  width: 200px;
}

.login__desc {
  padding: 80px 120px;
  position: relative;
  z-index: 10;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  font-family: 'Ubuntu', sans-serif;
}

.login__desc h3 {
  color: #f1f5f9;
  font-size: 50px;
  line-height: 1;
  font-weight: 700;
  margin-bottom: 30px;
}

.login__desc p {
  color: #d2a4af;
  font-size: 18px;
}

// new style
.form-group {
  position: relative;
}

.form-group--error {
  label {
    color: #eb5757;
  }

  input {
    background: #ffffff;
    border: 1px solid #eb5757;
    box-sizing: border-box;
    border-radius: 4px;
  }
}

.auth-button {
  border: 1px solid #33b34a;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.08px;
  color: #ffffff;
  background-color: #33b34a;
  width: 100%;

  &:focus {
    outline: none;
  }
}

label {
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: -0.24px;

  /* TextGreyC-0 */

  color: #90a0b7;
}

input {
  padding: 25px 18px;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.36px;
  background: #ffffff;
}

.error {
  color: #eb5757;
}

.top-rigth {
  position: absolute;
  right: 0;
  top: 0;
}

.pass-hide {
  border: 1px solid #ced4da;
  border-radius: 0 5px 5px 0;
  margin-left: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
}

.input-password {
  border-radius: 5px 0 0 5px !important;
}

@media (max-width: 800px) {
  .main-grid {
    grid-template-columns: 1fr;
  }

  .main-right {
    display: none;
  }
}
</style>
