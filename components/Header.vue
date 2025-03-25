<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 d-flex align-items-center justify-content-between">

          <a href="#" class="logo">
            <img src="@/static/img/whiteTift.svg" alt="" class="logo-white" style="width:100px">
          </a>

          <!-- <h2 class="user-name">{{ user.full_name }}</h2> -->



          <nav class="d-flex  align-items-center justify-content-end">



            <div class="user-box d-flex align-items-center  py-3 px-3" style="border-radius: 10px">
              <p class="mr-2 text-white text-right user-box_item" style="line-height: 1">
                <span class="d-block mb-1 font-12">{{ user.is_student ? 'student' : 'admin' }}</span>
                <span class="d-block font-12">{{ user.full_name }}</span>

              </p>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="31" height="31" x="0" y="0"
                viewBox="0 0 460.8 460.8" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
                <g>
                  <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path
                        d="M230.432,0c-65.829,0-119.641,53.812-119.641,119.641s53.812,119.641,119.641,119.641s119.641-53.812,119.641-119.641    S296.261,0,230.432,0z"
                        fill="#fff" data-original="#000000" style="" class=""></path>
                    </g>
                  </g>
                  <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path
                        d="M435.755,334.89c-3.135-7.837-7.314-15.151-12.016-21.943c-24.033-35.527-61.126-59.037-102.922-64.784    c-5.224-0.522-10.971,0.522-15.151,3.657c-21.943,16.196-48.065,24.555-75.233,24.555s-53.29-8.359-75.233-24.555    c-4.18-3.135-9.927-4.702-15.151-3.657c-41.796,5.747-79.412,29.257-102.922,64.784c-4.702,6.792-8.882,14.629-12.016,21.943    c-1.567,3.135-1.045,6.792,0.522,9.927c4.18,7.314,9.404,14.629,14.106,20.898c7.314,9.927,15.151,18.808,24.033,27.167    c7.314,7.314,15.673,14.106,24.033,20.898c41.273,30.825,90.906,47.02,142.106,47.02s100.833-16.196,142.106-47.02    c8.359-6.269,16.718-13.584,24.033-20.898c8.359-8.359,16.718-17.241,24.033-27.167c5.224-6.792,9.927-13.584,14.106-20.898    C436.8,341.682,437.322,338.024,435.755,334.89z"
                        fill="#fff" data-original="#fff" style="" class=""></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <b-button v-b-toggle.sidebar class="d-lg-none toggle ml-4 burger-icon">
              <span></span>
              <span></span>
              <span></span>
            </b-button>
            <!-- chiqish button -->

            <!-- <button class="btn logout ml-2" @click.prevent="logout">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H13M8 15L13 10M13 10L8 5M13 10H1"
                  stroke="#C2CFE0" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button> -->


          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch('auth/LOGOUT').then(() => {
        this.$router.push('/auth')
      })
    }
  },
  computed: {
    ...mapState({
      user: s => s.auth.user || {},
    }),
  },
}
</script>

<style scoped>
header {
  background-color: #30A34B;
}

.user-name {
  color: white;
  font-family: 'Ubuntu', sans-serif;
}

.logo {
  width: "100px" !important;
}

.toggle span {
  background-color: white;
  width: 25px;
}


.user-box {
  background-color: #30A34B;
}

.user-box_item {
  font-family: 'Ubuntu', sans-serif;
}

.exit-btn {
  position: absolute;
  /* width:50px; */
  z-index: 100;
}

@media (max-width:385px) {
  .burger-icon {
    transform: translateX(25px);
  }
}

@media (max-width:480px) {
  .logo-white {
    display: none;
  }
}
</style>
