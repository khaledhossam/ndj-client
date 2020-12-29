<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <v-form @submit.prevent="submit" @reset="handleReset()">
          <v-row>
            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.en.name"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'en.name\']')"
                name="en.name"
                :class="{ 'is-invalid': errors.has('en.name') }"
              >
              </v-text-field>
              <span v-show="errors.has('en.name')" class="text-error text-sm">
                {{ errors.first("en.name") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                v-model="form.ar.name"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'ar.name\']')"
                name="ar.name"
                :class="{ 'is-invalid': errors.has('ar.name') }"
              >
              </v-text-field>
              <span v-show="errors.has('ar.name')" class="text-error text-sm">
                {{ errors.first("ar.name") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-file-input
                v-model="image"
                accept="image/*"
                :label="$t('admin.image')"
                v-validate="{ required: true }"
                name="image"
                @change="handleUploadFile"
                :class="{ 'is-invalid': errors.has('image') }"
                small-chips
              ></v-file-input>

              <a v-if="form.image" :href="form.image" target="_blank">
                <v-img
                  :lazy-src="form.image"
                  :src="form.image"
                  max-height="100"
                  max-width="150"
                  class="img-fluid"
                />
              </a>

              <span v-show="errors.has('image')" class="text-error text-sm">
                {{ errors.first("image") }}
              </span>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <b-field :label="$t('admin.status')" horizontal>
                <b-switch v-model="form.is_active" />
              </b-field>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <b-field horizontal>
                <b-field grouped>
                  <div class="control">
                    <b-button
                      native-type="submit"
                      type="is-primary"
                      :disabled="!enableSubmit"
                    >
                      {{ $t('admin.submit') }}
                    </b-button>
                  </div>
                  <div class="control">
                    <b-button
                      type="is-primary is-outlined"
                      @click="handleReset"
                    >
                      {{ $t('admin.reset') }}
                    </b-button>
                  </div>
                </b-field>
              </b-field>
            </v-col>

          </v-row>

        </v-form>
      </card-component>
    </section>
  </div>
</template>

<script src="./create.js"></script>
