import mapValues from "lodash/mapValues";
import TitleBar from "@/components/admin/TitleBar";
import CardComponent from "@/components/admin/CardComponent";
import FilePicker from "@/components/admin/FilePicker";
import { mapState } from "vuex";

export default {
  validate({ params, query, store }) {
    if (params.id) {
      return !isNaN(params.id);
    }
    return true;
  },
  name: "Aboutus",
  components: {
    FilePicker,
    CardComponent,
    TitleBar,
  },
  async asyncData(context) {
    const aboutus = await context.$AppContentService.aboutus();
    return { aboutus };
  },
  // fetchOnServer: false,
  data() {
    return {
      titlePage: this.$t("admin.appcontent"),
      orders: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      form: {
        en: {
          title: "",
          body: "",
        },
        ar: {
          title: "",
          body: "",
        },
      },
      enableSubmit: true,
      customEvents: [],
    };
  },
  computed: {
    titleBar() {
      return this.$t("admin.about_us");
    },
    titleStack() {
      return [this.$t("admin.app_content"), this.$t("admin.about_us")];
    },
    ...mapState({
      currentLocale: (state) => state.localization.currentLocale,
    }),
  },
  created() {
    this.customEvents.forEach(
      function (customEvent) {
        // eslint-disable-next-line no-undef
        this.$EventBus.$on(customEvent.eventName, customEvent.callback);
      }.bind(this)
    );
  },
  mounted() {
    this.aboutUsDetails();
  },
  beforeDestroy() {
    this.customEvents.forEach(
      function (customEvent) {
        // eslint-disable-next-line no-undef
        this.$EventBus.$off(customEvent.eventName, customEvent.callback);
      }.bind(this)
    );
  },
  methods: {
    aboutUsDetails() {
      this.reAssignForm(this.aboutus);
    },
    reAssignForm(data) {
      const obj = {
        en: {
          title: data?.en?.title,
          body: data?.en?.body,
        },
        ar: {
          title: data?.ar?.title,
          body: data?.ar?.body,
        },
      };
      // override of form data
      this.form = { ...data, ...obj };
    },
    async submit() {
      const validData = await this.$validator.validateAll();
      if (validData) {
        this.updateAppContentAboutus();
      }
    },
    updateAppContentAboutus() {
      this.$AppContentService.updateAboutus(this.form).then(() => {
        this.$router.push({ name: "admin.appcontent.aboutus" });
        this.buefyBar(this.$t("admin.updated_successfully"));
      });
    },
    handleReset() {
      this.form = mapValues(this.form, (item) => {
        if (item && (typeof item === "object" || Array.isArray(item))) {
          return [];
        }
        return null;
      });
      this.buefyBar(this.$t("admin.reset_successfully"));
    },
  },
  head() {
    return {
      title: this.titlePage
    };
  },
};
