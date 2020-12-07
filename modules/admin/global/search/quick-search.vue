<template>
  <div>
    <b-field v-if="isSearch" grouped group-multiline>
      <b-input v-model="searchValue" :placeholder="$t('admin.quick_search')" @input="debouncedNormalSearch" />
    </b-field>
    <slot name="quick-search" />
  </div>
</template>

<script src="./quick-search.js"></script>
