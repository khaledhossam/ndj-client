<template>
  <div>
    <h1 class="text-center">
      {{ $t('website.categories') }}
      <nuxt-link :to="{ name: 'home' }" class="btn btn-success">
        back
      </nuxt-link>
    </h1>
    <hr>
    <!-- <div class="row container-fluid">
      <div v-for="category in this.categories" :key="category.id" class="col-lg-3 post-grid">
        <nuxt-link :to="{ name: 'category', params: { id: category.id, category: category }}">
          <span @click="updateSelectedPost(category)">
            {{ category.name }}
          </span>
        </nuxt-link>
      </div>
    </div> -->
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="categories"
    >
      <template slot-scope="props">
        <b-table-column class="has-no-head-mobile is-image-cell">
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
              :to="{ name: 'category', params: { id: props.row.id } }"
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
    <app-modal button-label="delete" :button-text-style="true" button-color="error">
      <template slot-scope="{close}">
        <v-card>
          <v-card-title class="headline">
            delete item?
          </v-card-title>
          <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              text
              :loading="loading"
              @click="deletePost()"
            >
              delete
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :disabled="loading"
              @click="close"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </app-modal>
  </div>
</template>
<script>
import AppModal from '@/components/shared/app-modal'
import ModalBox from '@/components/admin/ModalBox'
// import axios from 'axios'
export default {
  components: {
    AppModal,
    ModalBox
  },
  // asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error })
  // asyncData ({ $axios }) {
  //   return $axios.$get('http://jsonplaceholder.typicode.com/posts')
  //     .then((res) => {
  //       return {
  //         posts: res
  //       }
  //     })
  // },
  fetch ({ $axios, store, req, beforeNuxtRender }) {
    return $axios.$get('categories')
      .then((res) => {
        // store.commit('updatePosts', res.data)
      })
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
  mounted () {},
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
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
<style scoped>
.post-grid{
  border: 1px solid #ccc;
  margin: 5px;
  padding: 5px;
  text-align: center;
}
</style>
