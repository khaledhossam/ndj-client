<template>
  <card-component v-if="categoryProperties.length" :title="$t('admin.properties')" icon="ballot-outline">
    <b-field v-for="(property, key) in categoryProperties" :key="key" label="" horizontal>
      <!-- start text property -->
      <b-field
        v-if="property.property_type.key == 'text'"
        :label="property[currentLocale].name"
        horizontal
      >
        <b-input
          v-model.lazy="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :placeholder="property[currentLocale].name"
          :name="`property.${key}`"
          :class="{ 'is-invalid': errors.has(`property.${key}`) }"
        />
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- end text property -->

      <!-- start number property -->
      <b-field
        v-else-if="property.property_type.key == 'number'"
        :label="property[currentLocale].name"
        horizontal
      >
        <b-input
          v-model="property.value"
          v-validate="property.is_required ? 'required|numeric' : 'numeric'"
          :placeholder="property[currentLocale].name"
          :name="`property.${key}`"
          :class="{ 'is-invalid': errors.has(`property.${key}`) }"
        />
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- end number property -->

      <!-- start textarea property -->
      <b-field
        v-else-if="property.property_type.key == 'textarea'"
        :label="property[currentLocale].name"
        horizontal
      >
        <v-textarea
          v-model="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :name="`property.${key}`"
          outlined
          :label="property[currentLocale].name"
          value=""
        />
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- end textarea property -->

      <!-- start date property -->
      <b-field
        v-else-if="property.property_type.key == 'date'"
        :label="property[currentLocale].name"
        horizontal
      >
        <b-datepicker
          v-model.lazy="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :placeholder="property[currentLocale].name"
          icon="calendar-today"
          @input="dateInput"
          :name="`property.${key}`"
        />
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- end date property -->

      <!-- start checkbox property -->
      <b-field
        v-else-if="property.property_type.key == 'checkbox'"
        :label="property[currentLocale].name"
        class="has-check"
        horizontal
      >
        <b-checkbox
          v-for="(option, index) in property.options"
          :key="`pro_ch_${index}`"
          v-model.lazy="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :native-value="option.id"
          type="checkbox"
          :name="`property.${key}`"
        >
          {{ option[currentLocale].name }}
        </b-checkbox>
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- end checkbox property -->

      <!-- start radio property -->
      <b-field
        v-else-if="property.property_type.key == 'radio'"
        :label="property[currentLocale].name"
        class="has-check"
        horizontal
      >
        <b-radio
          v-for="(option, index) in property.options"
          :key="`pro_rad_${index}`"
          v-model="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :native-value="option.id"
          type="radio"
          :name="`property.${key}`"
        >
          {{ option[currentLocale].name }}
        </b-radio>
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- end radio property -->

      <!-- start multi select property -->
      <b-field
        v-else-if="property.property_type.key == 'multiple_select'"
        :label="property[currentLocale].name"
        horizontal>
        <v-autocomplete
          v-model="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :placeholder="property[currentLocale].name"
          :items="property.options"
          :menu-props="{ maxHeight: '400' }"
          :label="$t('admin.select')"
          multiple
          item-text="name"
          :item-value="'id'"
          :name="`property.${key}`"
          persistent-hint
          chips
          small-chips
        >
          <template v-slot:prepend-item>
            <v-list-item
              ripple
              @click="toggleSelectAll(property.value, property.options)"
            >
              <v-list-item-action>
                <v-icon :color="property.options.length ? 'indigo darken-4' : ''">
                  {{ icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('admin.select_all') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2" />
          </template>

          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
              @click:close="removeSelectItem(property.value, data.item)"
            >
              {{ data.item[currentLocale].name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title v-text="data.item[currentLocale].name" />
            </v-list-item-content>
          </template>
        </v-autocomplete>
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- start multi select property -->

      <!-- start select property -->
      <b-field
        v-else
        :label="property[currentLocale].name"
        horizontal
      >
        <b-form-select
          v-model="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :placeholder="property[currentLocale].name"
          :name="`property.${key}`"
        >
          <option
            v-for="(option, index) in property.options"
            :key="index"
            :value="option.id"
            :placeholder="property[currentLocale].name"
          >
            {{ option[currentLocale].name }}
          </option>
        </b-form-select>
        <p v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </p>
      </b-field>
      <!-- start select property -->
    </b-field>
  </card-component>
</template>
<script src="./category-properties.js"></script>
