<template>
  <card-component title="Change Password" icon="lock">
    <form @submit.prevent="updatePassword">
      <v-row>
        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            v-model="form.old_password"
            v-validate="{ required: true }"
            :label="$t('admin.current_password')"
            name="old_password"
            icon="eye"
            type="password"
            password-reveal
            :class="{ 'is-invalid': errors.has('old_password') }"
          />
          <span v-show="errors.has('old_password')" class="text-error text-sm">
            {{ errors.first("old_password") }}
          </span>
        </v-col>

        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            v-model="form.password"
            v-validate="{ required: true }"
            icon="eye"
            type="password"
            :label="$t('admin.password')"
            name="password"
            password-reveal
            :class="{ 'is-invalid': errors.has('password') }"
          />
          <span v-show="errors.has('password')" class="text-error text-sm">
            {{ errors.first("password") }}
          </span>
        </v-col>

        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            v-model="form.password_confirmation"
            v-validate="{ required: true }"
            icon="eye"
            type="password"
            :label="$t('admin.password_confirmation')"
            name="password_confirmation"
            password-reveal
            :class="{ 'is-invalid': errors.has('password_confirmation') }"
          />
          <span v-show="errors.has('password_confirmation')" class="text-error text-sm">
            {{ errors.first("password_confirmation") }}
          </span>
        </v-col>
      </v-row>
      <b-field horizontal>
        <div class="control">
          <button
            type="submit"
            class="button is-primary"
          >
            {{ $t('admin.submit') }}
          </button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script src="./update-password.js"></script>
