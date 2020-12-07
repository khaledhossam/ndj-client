<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Create Admin" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Name" horizontal>
            <b-field>
              <b-input
                v-model="form.name"
                icon="account"
                placeholder="Name"
                name="name"
                required
              />
            </b-field>
            <b-field>
              <b-input
                v-model="form.email"
                icon="email"
                type="email"
                placeholder="E-mail"
                name="email"
                required
              />
            </b-field>
          </b-field>
          <b-field message="Do not enter the leading zero" horizontal>
            <b-field>
              <p class="control">
                <a class="button is-static">
                  +
                </a>
              </p>
              <b-input v-model="form.phone" type="tel" placeholder="Phone" name="phone" expanded />
            </b-field>
          </b-field>
          <b-field label="Roles" horizontal>
            <v-autocomplete
              v-model="form.roles"
              :items="roles"
              :menu-props="{ maxHeight: '400' }"
              label="Select"
              multiple
              item-text="name"
              :item-value="'id'"
              persistent-hint
              chips
              small-chips
            />
          </b-field>
          <hr>
          <b-field label="Password" horizontal>
            <b-input
              v-model="form.password"
              type="password"
              placeholder="password"
            />
          </b-field>
          <b-field label="Confirm Password" horizontal>
            <b-input
              v-model="form.password_confirmation"
              type="password"
              placeholder="password confirmation"
            />
          </b-field>
          <hr>
          <b-field label="Active" horizontal>
            <b-switch v-model="form.is_active" />
          </b-field>
          <hr>
          <b-field v-if="form.avatar" label="Preview" horizontal>
            <v-img
              :lazy-src="form.avatar"
              :src="form.avatar"
              max-height="100"
              max-width="150"
            />
          </b-field>
          <b-field label="File" horizontal>
            <file-picker v-model="form.avatar" />
          </b-field>
          <hr>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button
                  native-type="submit"
                  type="is-primary"
                >
                  Submit
                </b-button>
              </div>
              <div class="control">
                <b-button
                  type="is-primary is-outlined"
                  @click="reset"
                >
                  Reset
                </b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script src="./create.js"></script>
<style lang="scss" scoped src="./create.scss"></style>
