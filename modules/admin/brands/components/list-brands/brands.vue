<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      @confirm="trashConfirm('event-delete-category')"
      @cancel="trashCancel"
    />
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('admin.categories')"
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
                  <nuxt-link :to="{ name: 'createBrand' }" class="btn btn-success">
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
                  :src="props.row.image"
                  :alt="props.row[currentLocale].name"
                  class="is-rounded"
                >
              </div>
            </b-table-column>

            <b-table-column field="name" :label="$t('admin.name')" sortable>
              <span class="tag">
                {{ props.row[currentLocale].name }}
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
                  :to="{ name: 'updateBrand', params: { id: props.row.id } }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <button
                  :class="`button is-small ${props.row.is_active ? 'is-warning' : 'is-success'}`"
                  type="button"
                  :title="`${props.row.is_active ? $t('admin.inactiveTitle') : $t('admin.activeTitle')}`"
                  @click.prevent="handleToggleStatus(props.row.id)"
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

<script src="./brands.js"></script>
