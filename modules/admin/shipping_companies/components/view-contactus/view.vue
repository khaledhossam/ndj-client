<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      @confirm="trashConfirm('event-delete-msg')"
      @cancel="trashCancel"
    />

    <modal name="reply-msg">
      <v-form @submit.prevent="submit" @reset="handleReset()">
        <v-row>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="form.body"
              v-validate="{ required: true, max: 150 }"
              icon="account"
              :label="$t('admin.reply')"
              name="body"
              :class="{ 'is-invalid': errors.has('body') }"
            />
            <span
              v-show="errors.has('reply')"
              class="text-error text-sm"
            >{{ errors.first("reply") }}</span>
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
              </b-field>
            </b-field>
          </v-col>
        </v-row>
      </v-form>
    </modal>

    <title-bar :title-stack="titleStack" />

    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('admin.details')"
        icon="account-multiple"
      >
        <section class="hero is-hero-bar">
          <div class="hero-body">
            <div class="level">
              <div class="level-right">
                <div class="level-item">
                  <button @click.prevent="replyBtn" class="btn btn-success">{{ $t('admin.reply') }}</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <v-row>
            <v-col cols="12" md="9">{{ $t('admin.title') }}: {{ message.title }}</v-col>
            <v-col cols="12" md="9">{{ $t('admin.body') }}: {{ message.body }}</v-col>
            <v-col cols="12" md="9">{{ $t('admin.email') }}: {{ message.email }}</v-col>
            <v-col cols="12" md="9">{{ $t('admin.phone') }}: {{ message.phone }}</v-col>
          </v-row>
          <br />
          <v-h2>Replies:</v-h2>
          <br />
          <v-row v-for="(reply, index) in message.replies" :key="index">
            <v-col cols="12" md="9">{{ $t('admin.body') }}: {{ reply.body }}</v-col>
          </v-row>
        </section>
      </card-component>
    </section>
  </div>
</template>

<script src="./view.js"></script>
