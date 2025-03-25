<template>
  <div class="page">
    <div class="row mt-4">
      <div class="col-6">
        <multiselect :options="testOptions" v-model="testValue" track-by="id" label="label" />
      </div>

      <div class="col-12 mt-3">
        <div ref="table"></div>
      </div>
      <div class="col-9 mt-4  d-flex justify-content-start gap-3">

        <label class="btn btn-excel"> <img src="@/static/img/icon-file.svg" alt="exel icon" class="excel-icon">
          Export File <input type="file" accept=".csv, .xml, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="file-input" @change="downloadExcelFile" /></label>
        <button class="btn btn-blue btn-download ml-3" @click="submit"> Save</button>

        <label class="btn btn-excel add-user-file ml-3"> <img src="@/static/img/excel-icon.png" alt="exel icon"
            class="excel-icon">
          Add Students <input type="file" class="file-input" @change="downlaodExcelStudent($event)" />
        </label>
        <div class="dropdown-box d-flex align-items-center">
          <div class="import-student">
            <div class="btn btn-blue add-user ml-3" @click="downloadUserFile">Import Students</div>
            <div class="dropdown">
              <multiselect class="select" :options="cities" label="name" v-model="groupValue" track-by="id"
                placeholder="Guruhni tanlang!" />
            </div>
          </div>

        </div>
      </div>


    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'
import shuffle from "~/functions/shuffle";


export default {
  name: "tests",
  middleware: ['admin-only'],
  components: {
    Multiselect,
  },



  async fetch() {
    await this.$store.dispatch('crud/FETCH_TESTS')
  },
  data: () => ({
    file: "",
    studentFile: "",
    testId: "",
    excelFile: "",
    cities: [],
    options: {
      data: [[]],
      columns: [
        {
          type: 'text',
          title: 'Саволлар',
          width: 160,
        },
        {
          type: 'text',
          title: 'Тўғри жавоб',
          width: 160,
        },
        {
          type: 'text',
          title: 'Вариант',
          width: 160,
        },
        {
          type: 'text',
          title: 'Вариант',
          width: 160,
        },
      ],
      minDimensions: [4, 10],
    },
    spreadsheet: undefined,
    test: undefined,
    groupVal: undefined,
  }),
  computed: {
    ...mapState({
      tests: s => s.crud.tests,

    }),
    testOptions() {

      return this.tests.map(t => ({
        id: t.id,
        label: `${t.id}. ${t.name}`
      }))
    },
    testValue: {
      get(el) {
        const test = this.tests.find(t => t.id === this.test)
        this.testId = test ? test.id : 1
        return test ? {
          id: test.id,
          label: `${test.id}. ${test.name}`
        } : undefined
      },
      set(value) {
        this.test = value ? value.id : undefined
      },
    },
    groupValue: {
      get(el) {
        const group = this.cities.find(t => t.id === this.groupVal)
        return group ? {
          id: group.id,
          name: `${group.id}. ${group.name}`
        } : undefined
      },
      set(value) {
        this.groupVal = value ? value.id : undefined
      },
    },
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    async downloadUserFile() {
      let url = "export_students/"
      if (this.groupVal !== undefined) {
        url = `export_students?group_id=${this.groupVal}`
      }

      await this.$axios
        .get(`${url}`, {
          responseType: "blob",
        })
        .then((response) => {
          const file = new File([response.data], 'students.xls')

          this.toBase64(file).then((data) => {
            const a = document.createElement('a')
            document.body.appendChild(a)
            a.target = '_blank'
            a.download = this.groupVal ? this.groupValue.name + '.xls' : 'students.xls'
            a.href = data
            a.click()
            a.remove()
          })
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.$toast.error(err.response.data.message, {
              hideProgressBar: true,
            });
          } else {
            this.$toast.error("Хатолик! Қайтадан уриниб кўринг.", {
              hideProgressBar: true,
            });
          }
        });
    },

    submitExcilFile(file) {
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('subject', this.testId);


      this.$axios.$post(`/import_excel/`, formData).then(res => {
        this.$toast.success(res.msg)
      })
        .catch(err => {
          if (err.response.status == 400) {
            this.$toast.error(err.response.data.message, {
              hideProgressBar: true,
            });
          } else {
            this.$toast.error("Хатолик! Қайтадан уриниб кўринг.", {
              hideProgressBar: true,
            });
          }
        });

    },

    downloadExcelFile(event) {
      if (this.test === undefined) {
        this.$toast.error("Bitta categoriyani tanlang!", {
          hideProgressBar: true,
        })
        return;
      }
      this.file = event.target.files ? event.target.files[0] : null;

      if (this.file) {
        this.submitExcilFile()
      }
    },
    submitExcilFileStudents() {
      let formData = new FormData();
      formData.append('file', this.studentFile);

      this.$axios.$post(`/add_students/`, formData).then(res => {
        this.$toast.success(res.msg)
      })
        .catch(err => {
          if (err.response.status == 400) {
            this.$toast.error(err.response.data.message, {
              hideProgressBar: true,
            });
          } else {
            this.$toast.error("Хатолик! Қайтадан уриниб кўринг.", {
              hideProgressBar: true,
            });
          }
        });
    },

    downlaodExcelStudent(event) {
      this.studentFile = event.target.files ? event.target.files[0] : null;
      if (this.studentFile) {
        this.submitExcilFileStudents()
      }

    },

    submit() {
      console.log(this.test,'this.test')
      if (this.test === undefined) {
        this.$toast.error("Bitta testni tanlang!", {
          hideProgressBar: true,
        })
        // alert('Битта тестни танланг')
        return;
      }

      const rawData = this.spreadsheet.getData()
      let data = rawData.filter(d => {
        return !d.map(i => i && i.length > 0).some(i => !i)
      })

      if (data.length === 0) {
        alert('Камида битта савол киритинг')
        return;
      }

      data = data.map(d => ({
        question: d[0],
        answers: shuffle([
          {
            answer: d[1],
            isCorrect: true,
          },
          {
            answer: d[2],
            isCorrect: false,
          },
          {
            answer: d[3],
            isCorrect: false,
          },
        ]),
      }))

      const request = {
        subject: this.test,
        data,
      }


      this.$axios.post('q-create/', request)
        .then(res => {
          // alert('Муваффақиятли сақланди')
          this.$toast.success("Muvaffaqiyatli saqlandi!")
          this.spreadsheet.setData([])
          this.test = undefined
        })
        .catch(e => {
          alert('Хатолик юз берди')
        })
    },

    async fetchAcordionItem() {
      await this.$axios.get("groups/").then((res) => {
        this.cities = res.data
      })
    }
  },
  mounted() {
    this.spreadsheet = jexcel(this.$refs.table, this.options);
    this.fetchAcordionItem()
  },
}
</script>

<style scoped lang="scss">
// dropdow

.dropdown {
  width: 150px;
  height: 100%;
  position: absolute;
  right: -150px;
  top: -2px;
  // z-index:-1;
  cursor: pointer;
}

.import-student {
  position: relative;
}



.add-user {
  border-radius: 4px 0 0 4px !important;
}

.excel-icon {
  width: 30px;
}

.download-file {
  margin: 0;
}

.btn-excel {
  border-radius: 4px;
  line-height: 38px;
  padding: 0 15px;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Ubuntu', sans-serif;
  background-color: #6aeb7e;
  border: 1px solid green;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 0;

  &:hover {
    background-color: white;
  }

}

.add-user-file {
  background-color: #d8d506;
}

.btn-download {
  width: 160px;
  background-color: #007BFF;
  border: 1px solid blue;

  &:hover {
    background-color: white;
  }


}

.file-input {
  width: 10px;
  position: absolute;
  z-index: -1;
  height: 5px;
}
</style>
