<template>
  <modal
    v-if="modalProps"
    :adaptive="true"
    :height="modalProps.height"
    :width="modalProps.width"
    :min-height="modalProps.minHeight"
    :scrollable="modalProps.scrollable"
    name="activationCode"
    :click-to-close="false"
  >
    <div slot="top-right">
      <b-button @click="hideModal">
        x
      </b-button>
    </div>
    <div class="vs-modal">
      <!--Modal Header-->
      <div class="modal-header">
        <h4>{{ $t('front.activation_code') }}</h4>
      </div>
      <v-form class="activate-form" @submit="verifyCode">
        <!--Modal Body-->
        <div class="modal-body">
          <v-row class="text-center">
            <v-col
              cols="12"
            >
              <img src="~/assets/front/images/lock.svg" alt="" class="img-fluid text-center">
            </v-col>
            <v-col
              cols="12"
            >
              <div class="alert alert-info">
                <span class="text-center">
                  {{ $t('front.activation_code') }}: {{ code }}
                </span>
              </div>
            </v-col>
            <v-col
              cols="12"
            >
              <p>{{ $t('front.send_code_hint') }}: {{ form.phone }}</p>
            </v-col>
            <v-col
              cols="12"
            >
              <input
                v-for="(key,idx) in requiredCells"
                :key="idx"
                ref="codeRef"
                v-validate="{ required: true, numeric: true }"
                type="text"
                maxlength="1"
                :value="activationCells[idx]"
                class="input-code"
                @input="inputActivationCode($event.target.value, idx)"
              >
            </v-col>
          </v-row>
        </div>

        <!--Modal Footer-->
        <div class="modal-footer">
          <v-col
            cols="12"
            md="9"
          >
            <b-field horizontal>
              <b-field grouped>
                <div class="control">
                  <b-button
                    type="is-primary"
                    @click="verifyCode"
                  >
                    {{ $t('admin.save') }}
                  </b-button>
                </div>
                <div class="control">
                  <b-button
                    type="is-primary is-outlined"
                    @click="hideModal"
                  >
                    {{ $t('admin.cancel') }}
                  </b-button>
                </div>
              </b-field>
            </b-field>
          </v-col>
        </div>
      </v-form>
    </div>
  </modal>
</template>

<script src="./code.js"></script>
<style lang="scss" scoped src="./code.scss"></style>
