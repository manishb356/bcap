<template>
  <v-content>
    <v-container>
      <v-card flat max-width="480px" outlined class="mx-auto">
        <v-card-title primary-title>
          <v-subheader class="display-1 primary--text pa-0">Make Admin</v-subheader>
        </v-card-title>
        <v-form ref="makeAdminForm" class="mx-2">
          <v-text-field
            autofocus
            prepend-icon="mdi-email"
            v-model="email"
            label="Email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-card-actions>
            <v-layout row class="justify-center">
              <v-card-actions>
                <v-btn
                  primary
                  elevation="0"
                  class="primary px-8 mb-2"
                  @click="makeAdmin"
                  :loading="loading"
                >Proceed</v-btn>
              </v-card-actions>
            </v-layout>
          </v-card-actions>
        </v-form>
        <p class="error--text text-center" v-if="errMessage">{{errMessage}}</p>
        <p class="success--text text-center" v-if="sucessMessage">{{sucessMessage}}</p>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { fb, fu } from "@/firebase/init";

export default {
  name: "Options",
  data() {
    return {
      email: null,
      errMessage: null,
      loading: false,
      sucessMessage: null,
      rules: {
        required: value => !!value || "Required.",
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid E-mail.";
        }
      }
    };
  },

  methods: {
    makeAdmin() {
      if (this.$refs.makeAdminForm.validate()) {
        this.loading = true;
        this.errMessage = null;
        this.sucessMessage = null;
        let user = fb.auth().currentUser;
        user.getIdTokenResult().then(idTokenResult => {
          if (idTokenResult.claims.admin) {
            const addAdmin = fu.httpsCallable("addAdminRole");
            addAdmin({ email: this.email }).then(result => {
              if (result.data.errorInfo != undefined) {
                this.errMessage = result.data.errorInfo.message;
              } else {
                this.sucessMessage = result.data.message;
              }
              this.loading = false;
            });
          }
        });
      }
    }
  }
};
</script>