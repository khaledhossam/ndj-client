<template>
    <card-component v-if="offerProducts.length" :title="$t('admin.products')" icon="ballot-outline">
      <v-row v-for="(product, key) in offerProducts" :key="key">

      </v-row>
    </card-component>
</template>
