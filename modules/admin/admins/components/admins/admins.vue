<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      @confirm="trashConfirm('event-delete-admin')"
      @cancel="trashCancel"
    />
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Clients"
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
                  <nuxt-link :to="{ name: 'createAdmin' }" class="btn btn-success">
                    Create
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
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"

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
            <b-table-column field="name" label="Name" sortable>
              <span class="tag">
                {{ props.row.name }}
              </span>
            </b-table-column>

            <b-table-column field="email" label="email" sortable>
              {{ props.row.email }}
            </b-table-column>

            <b-table-column
              field="phone"
              class="has-text-grey is-abbr-like"
              label="Phone"
              numeric
              sortable
              centered
            >
              {{ props.row.phone || '---' }}
            </b-table-column>

            <b-table-column
              field="created_at"
              class="has-text-grey is-abbr-like"
              label="Created At"
              sortable
              centered
            >
              {{ props.row.created_at }}
            </b-table-column>

            <b-table-column label="actions" custom-key="actions" class="is-actions-cell">
              <div class="buttons is-right">
                <nuxt-link
                  :to="{ name: 'updateAdmin', params: { id: props.row.id } }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
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

<style lang="scss" scoped src="./admins.scss"></style>
<script src="./admins.js"></script>
