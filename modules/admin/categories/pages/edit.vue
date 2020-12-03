<template>
  <div>
        <card-component
          title="edit category"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <b-field label="ID" horizontal>
              <b-input v-model="form.id" custom-class="is-static" readonly />
            </b-field>
            <hr>
            <user-avatar
                :avatar="form.image"
                class="image has-max-width is-aligned-center"
            />
            <b-field label="Image" horizontal>
              <file-picker />
            </b-field>
            <hr>
            <b-field label="Ar Name" message="Category Ar name" horizontal>
              <b-input
                v-model="form.ar.name"
                placeholder=""
                required
              />
            </b-field>
            <b-field label="En Name" message="Category En name" horizontal>
              <b-input
                v-model="form.en.name"
                placeholder=""
                required
              />
            </b-field>
            <b-field label="Category" horizontal v-show="form.parent_id !==null">
              <b-select
                v-model="form.department"
                placeholder="Select a category"
                required
              >
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </b-select>
            </b-field>
            <b-field label="order" message="category order" horizontal>
              <b-input
                v-model="form.level"
                placeholder="2"
                required
              />
            </b-field>
            <b-field label="Active" class="has-check" horizontal>
              <radio-picker
                v-model="form.is_active"
                :options="{ 1: 'Active', 0: 'In Active' }"
              />
            </b-field>
            <hr>
            <b-field horizontal>
              <b-button
                type="is-primary"
                :loading="isLoading"
                native-type="submit"
              >
                Submit
              </b-button>
            </b-field>
          </form>
        </card-component>
  </div>
</template>

<script>
import CardComponent from '@/components/admin/CardComponent'
import FilePicker from '@/components/admin/FilePicker'
import UserAvatar from '@/components/admin/UserAvatar'

export default {
  name: 'Category',
  validate ({ params, query, store }) {
    return !isNaN(params.id)
  },
  components: {
    FilePicker,
    UserAvatar,
    CardComponent
  },
  data () {
    return {
      id: null,
      isLoading: false,
      form: this.getClearFormObject()
    }
  },
  computed: {
  },
  created () {
    this.getData()
    this.$on('uploadedFile', this.updateImage)
  },
  methods: {
    getClearFormObject () {
      return {
        id: null,
        ar: {
          name: null
        },
        en: {
          name: null
        },
        image: null,
        level: null,
        parent_id: null,
        is_active: null
      }
    },
    getData () {
      if (this.$route.params.category) {
        this.form = this.$route.params.category
      }
    },
    updateImage (file) {
      this.form.image = file.file
      console.log('listenEvent', file.file)
    },
    submit () {
      this.isLoading = true
      this.$axios
        .$put(`/admin/categories/${this.$route.params.id}`, this.form)
        .then((res) => {
          this.isLoading = false
          this.$buefy.snackbar.open({
            message: 'updated successfully'
          })
          this.$router.replace({
            name: 'categories'
          })
        })
        .catch((err) => {
          this.isLoading = false
          this.$buefy.snackbar.open({
            message: `Error: ${err.response.data.error}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
