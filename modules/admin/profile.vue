<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Profile
      <nuxt-link slot="right" to="/" class="button">
        Dashboard
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <profile-update-form class="tile is-child" />
        <card-component title="Profile" icon="account" class="tile is-child">
          <user-avatar class="image has-max-width is-aligned-center" />
          <hr>
          <b-field label="Name">
            <b-input :value="userName" custom-class="is-static" readonly />
          </b-field>
          <hr>
          <b-field label="E-mail">
            <b-input :value="userEmail" custom-class="is-static" readonly />
          </b-field>
        </card-component>
      </tiles>
      <password-update-form />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/admin/CardComponent'
import TitleBar from '@/components/admin/TitleBar'
import HeroBar from '@/components/admin/HeroBar'
import ProfileUpdateForm from '@/components/admin/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/admin/PasswordUpdateForm'
import Tiles from '@/components/admin/Tiles'
import UserAvatar from '@/components/admin/UserAvatar'
export default {
  name: 'Profile',
  components: {
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent
  },
  computed: {
    titleStack () {
      return ['Admin', 'Profile']
    },
    // ...mapState(['userName', 'userEmail'])
    ...mapState({
      userName: state => state.admin.userName,
      userEmail: state => state.admin.userEmail
    })
  },
  head () {
    return {
      title: 'Profile — Admin One Nuxt.js'
    }
  }
}
</script>
