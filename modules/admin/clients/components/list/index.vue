<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      @confirm="trashConfirm('event-delete-clients')"
      @cancel="trashCancel"
    />

    <modal name="reason-inactive">
      

      <v-form @submit.prevent="deactivateClient" @reset="handleReset()">
        <v-row>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="form.reason"
              v-validate="{ required: true, max: 150 }"
              icon="account"
              :label="$t('admin.reason')"
              name="reason"
              :class="{ 'is-invalid': errors.has('reason') }"
            />
            <span
              v-show="errors.has('reason')"
              class="text-error text-sm"
            >{{ errors.first("reason") }}</span>
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
        :title="$t('admin.advertisements')"
        icon="account-multiple"
      >
        <section class="hero is-hero-bar">
          <div class="hero-body">
            <div class="level">
              <div class="level-left">
                <quick-search />
              </div>
              <div class="level-right">
                <div class="level-item">
                  <nuxt-link :to="{ name: 'create.advertisements' }" class="btn btn-success">
                    {{ $t('admin.create') }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <b-table
          :data="collection"
          :loading="loading"

          paginated
          backend-pagination
          :total="total"
          :per-page="perPage"
          :aria-next-label="$t('admin.next_page')"
          :aria-previous-label="$t('admin.previous_page')"
          :aria-page-label="$t('admin.page')"
          :aria-current-label="$t('admin.current_page')"

          :striped="true"
          :hoverable="true"
          backend-sorting
          :default-sort-direction="defaultSortOrder"
          :default-sort="[sortField, sortOrder]"
          :sticky-header="true"
          @page-change="onPageChange"
          @sort="onSort"
        >
          <template slot-scope="props">
            <b-table-column class="has-no-head-mobile is-image-cell">
              <div class="image">
                <img
                  :src="props.row.avatar"
                  :alt="props.row.name"
                  class="is-rounded"
                >
              </div>
            </b-table-column>

            <b-table-column field="title" :label="$t('admin.name')" sortable>
              <span class="tag">
                {{ props.row.name }}
              </span>
            </b-table-column>

            <b-table-column field="phone" :label="$t('admin.phone')" sortable>
              <span class="tag">
                {{ props.row.phone }}
              </span>
            </b-table-column>

            <b-table-column field="email" :label="$t('admin.email')" sortable>
              <span class="tag">
                {{ props.row.email }}
              </span>
            </b-table-column>

             <b-table-column field="gender" :label="$t('admin.gender')" sortable>
              <span class="tag">
                {{ props.row.gender == "male" ? $t('admin.male'): $t('admin.female') }}
              </span>
            </b-table-column>

            <b-table-column field="is_active" :label="$t('admin.status')">
              <span :class="`custom-alert alert ${type(props.row.is_active)}`">
                {{ props.row.is_active ? $t('admin.active') : $t('admin.inactive') }}
              </span>
            </b-table-column>

            <b-table-column :label="$t('admin.action')" custom-key="actions" class="is-actions-cell">
              <div class="buttons">
                <nuxt-link
                  :to="{ name: 'update.advertisements', params: { id: props.row.id } }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <button
                  :class="`button is-small ${props.row.is_active ? 'is-warning' : 'is-success'}`"
                  type="button"
                  :title="`${props.row.is_active ? $t('admin.inactiveTitle') : $t('admin.activeTitle')}`"
                  @click.prevent="handleToggleStatus(props.row.id,props.row.is_active )"
                >
                  <b-icon class="text-white" :icon="`${props.row.is_active ? 'close-circle' : 'check-circle'}`" size="is-small" />
                </button>
                <button
                  class="button is-small is-danger"
                  type="button"
                  @click.prevent="trashModal(props.row.id)"
                >
                  <b-icon icon="trash-can" size="is-small" />
                </button>
              </div>
            </b-table-column>
          </template>
        </b-table>
      </card-component>
    </section>
  </div>
</template>

<script src="./index.js"></script>
