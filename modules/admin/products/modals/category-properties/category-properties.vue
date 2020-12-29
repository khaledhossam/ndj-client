<template>
  <card-component v-if="categoryProperties.length" :title="$t('admin.properties')" icon="ballot-outline">
    <v-row v-for="(property, key) in categoryProperties" :key="key">
      <!-- start text property -->
      <v-col
        v-if="property.property_type.key == 'text'"
        cols="12"
        md="12"
        :label="property[currentLocale].name"
      >
        <v-text-field
          v-model.lazy="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :placeholder="property[currentLocale].name"
          :name="`property.${key}`"
          :class="{ 'is-invalid': errors.has(`property.${key}`) }"
        />
        <span v-show="errors.has(`property.${key}`)" class="text-error text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- end text property -->

      <!-- start number property -->
      <v-col
        v-else-if="property.property_type.key == 'number'"
        cols="12"
        md="12"
        :label="property[currentLocale].name"
      >
        <v-text-field
          v-model="property.value"
          v-validate="property.is_required ? 'required|numeric' : 'numeric'"
          :placeholder="property[currentLocale].name"
          :name="`property.${key}`"
          :class="{ 'is-invalid': errors.has(`property.${key}`) }"
        />
        <span v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- end number property -->

      <!-- start textarea property -->
      <v-col
        v-else-if="property.property_type.key == 'textarea'"
        cols="12"
        md="12"
        :label="property[currentLocale].name"
      >
        <v-textarea
          v-model="property.value"
          v-validate="property.is_required ? 'required' : ''"
          :name="`property.${key}`"
          :label="property[currentLocale].name"
        />
        <span v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- end textarea property -->

      <!-- start date property -->
      <v-col
        v-else-if="property.property_type.key == 'date'"
        cols="12"
        md="12"
        :label="property[currentLocale].name"
      >
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="property.value"
              :value="computedDateFormattedMomentjs"
              clearable
              :label="property[currentLocale].name"
              readonly
              v-bind="attrs"
              prepend-icon="mdi-calendar"
              v-on="on"
              @click:clear="property.value = null"
            />
          </template>
          <v-date-picker
            v-model="property.value"
            @change="menu1 = false"
          />
        </v-menu>
        <span v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- end date property -->

      <!-- start checkbox property -->
      <v-col
        v-else-if="property.property_type.key == 'checkbox'"
        cols="12"
        md="12"
        :label="property[currentLocale].name"
        class="has-check"
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
        <span v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- end checkbox property -->

      <!-- start radio property -->
      <v-col
        v-else-if="property.property_type.key == 'radio'"
        cols="12"
        md="12"
        :label="property[currentLocale].name"
        class="has-check"
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
        <span v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- end radio property -->

      <!-- start multi select property -->
      <v-col
        v-else-if="property.property_type.key == 'multiple_select'"
        cols="12"
        md="12"
        :label="property[currentLocale].name"
      >
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
              @click="toggleSelectAll(categoryProperties[key].value, property.options)"
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
        <span v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- start multi select property -->

      <!-- start select property -->
      <v-col
        v-else
        cols="12"
        md="12"
        :label="property[currentLocale].name"
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
        <span v-show="errors.has(`property.${key}`)" class="text-danger text-sm">
          {{ errors.first(`property.${key}`) }}
        </span>
      </v-col>
      <!-- start select property -->
    </v-row>
  </card-component>
</template>
<script src="./category-properties.js"></script>
