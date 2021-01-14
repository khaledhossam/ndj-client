<template>
  <div id="app" data-app>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component :title="titleBar" icon="ballot">
        <v-form @submit.prevent="submit" @reset="handleReset()">
          <v-row>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="form.en.title"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'en.title\']')"
                name="en.title"
                :class="{ 'is-invalid': errors.has('en.title') }"
              />
              <span
                v-show="errors.has('en.title')"
                class="text-error text-sm"
              >{{ errors.first("en.title") }}</span>
            </v-col>

            <v-col cols="12" md="9">
              <v-text-field
                v-model="form.ar.title"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'ar.title\']')"
                name="ar.title"
                :class="{ 'is-invalid': errors.has('ar.title') }"
              />
              <span
                v-show="errors.has('ar.title')"
                class="text-error text-sm"
              >{{ errors.first("ar.title") }}</span>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="form.en.body"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'en.body\']')"
                name="en.body"
                :class="{ 'is-invalid': errors.has('en.body') }"
              />
              <span
                v-show="errors.has('en.body')"
                class="text-error text-sm"
              >{{ errors.first("en.body") }}</span>
            </v-col>

            <v-col cols="12" md="9">
              <v-text-field
                v-model="form.ar.body"
                v-validate="{ required: true, max: 150 }"
                icon="account"
                :label="$t('admin[\'ar.body\']')"
                name="ar.body"
                :class="{ 'is-invalid': errors.has('ar.body') }"
              />
              <span
                v-show="errors.has('ar.body')"
                class="text-error text-sm"
              >{{ errors.first("ar.body") }}</span>
            </v-col>

            <v-col cols="12" md="9">
              <b-field horizontal>
                <b-field grouped>
                  <div class="control">
                    <b-button
                      native-type="submit"
                      type="is-primary"
                      :disabled="!enableSubmit"
                    >{{ $t('admin.submit') }}</b-button>
                  </div>
                  <div class="control">
                    <b-button
                      type="is-primary is-outlined"
                      @click="handleReset"
                    >{{ $t('admin.reset') }}</b-button>
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

<script src="./update.js"></script>
