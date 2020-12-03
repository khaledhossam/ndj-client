<template>
  <div>
    <card-component
      title="Categories"
      class="tile is-child"
    >
      <modal-box
        :is-active="isModalActive"
        :trash-object-name="trashObjectName"
        @confirm="trashConfirm()"
        @cancel="trashCancel"
      />
      <b-table
        :checked-rows.sync="checkedRows"
        :checkable="checkable"
        :loading="isLoading"
        :striped="true"
        :hoverable="true"
        default-sort="name"
        :data="categories"
      >
        <template slot-scope="props">
          <b-table-column class="has-no-head-mobile iss-image-cell">
            <div class="image">
              <img
                :src="props.row.image"
                :alt="props.row.name"
                class="is-rounded"
              >
            </div>
          </b-table-column>
          <b-table-column label="Name" field="name" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column label="Description" field="description" sortable>
            {{ props.row.description }}
          </b-table-column>
          <b-table-column label="Status" field="is_active" sortable>
            {{ props.row.is_active == 1 ? 'active' : 'inactive' }}
          </b-table-column>

          <b-table-column label="Order">
            <small
              class="has-text-grey is-abbr-like"
              :title="props.row.level"
            >
              {{ props.row.level }}
            </small>
          </b-table-column>
          <b-table-column custom-key="actions" class="is-actions-cell">
            <div class="buttons is-right">
              <nuxt-link
                :to="{ name: 'edit_category', params: { id: props.row.id, 'category': props.row } }"
                class="button is-small is-primary"
              >
                <b-icon icon="account-edit" size="is-small" />
              </nuxt-link>
              <button
                class="button is-small is-danger"
                type="button"
                @click.prevent="trashModal(props.row)"
              >
                <b-icon icon="trash-can" size="is-small" />
              </button>
            </div>
          </b-table-column>
        </template>

        <section slot="empty" class="section">
          <div class="content has-text-grey has-text-centered">
            <template v-if="isLoading">
              <p>
                <b-icon icon="dots-horizontal" size="is-large" />
              </p>
              <p>Fetching data...</p>
            </template>
            <template v-else>
              <p>
                <b-icon icon="emoticon-sad" size="is-large" />
              </p>
              <p>Nothing's here&hellip;</p>
            </template>
          </div>
        </section>
      </b-table>
    </card-component>
  </div>
</template>

<script>
// import TitleBar from '@/components/admin/TitleBar'
// import HeroBar from '@/components/admin/HeroBar'
import ModalBox from '@/components/admin/ModalBox'

export default {
  name: 'categories',
  components: {
    ModalBox
  },
  data () {
    return {
      // posts: this.store.state.posts,
      loading: false,
      categories: [],
      isModalActive: false,
      trashObject: null,
      isLoading: false
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Tables']
    }
  },
  mounted () {
    this.loadCategoriess()
    // console.log('base url:', process.env.BROWSER_BASE_URL)
  },
  methods: {
    loadCategoriess () {
      //* * call axios from module nuxt */
      this.$axios.$get('/categories')
        .then((res) => {
          this.categories = res.response.data
          console.log(res)
        })
    },
    updateSelectedPost (post) {
      // this.$store.commit('selectedPost', post)
    },
    deletePost (post) {
      this.loading = true
      // this.$axios.$delete(`/posts/${post.id}`).finally(() => {
      //   this.loading = false
      // })
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$axios.$delete(`/admin/categories/${this.trashObject.id}`)
        .then((res) => {
          this.categories = this.categories.filter(function (category) {
            return category.id !== this.trashObject.id
          })
          this.$buefy.snackbar.open({
            message: 'Confirmed',
            queue: false
          })
        })
        .catch((error) => {
          console.log('error:', error)
          this.$buefy.snackbar.open({
            message: error.response.data.error,
            queue: false,
            type: 'is-danger'
          })
        })
    },
    trashCancel () {
      this.isModalActive = false
    }
  },
  head () {
    return {
      title: 'Categories — Admin One Nuxt.js'
    }
  }
}
</script>
