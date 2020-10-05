import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#03A9F4",
        secondary: colors.grey.lighten2,
        bar: colors.blue.lighten4,
        footer: colors.blue.lighten1,
        error: colors.red.darken2,
        success: colors.green,
      },
    },
  },
})