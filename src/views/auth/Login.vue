<template>
  <v-content>
    <v-container style="max-width:600px">
      <v-card flat>
        <v-card-title primary-title>
          <v-subheader class="display-1 primary--text pa-0">Login</v-subheader>
        </v-card-title>
        <v-form ref="loginForm">
          <v-text-field
            autofocus
            prepend-icon="mdi-email"
            v-model="email"
            label="Email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            label="Password"
            counter
            :rules="[rules.required]"
            @click:append="show = !show"
          ></v-text-field>
          <PasswordReset v-if="errMessage" />

          <v-card-actions>
            <v-layout row class="justify-center">
              <v-card-actions>
                <v-btn primary elevation="0" class="primary px-8" @click="login">Login</v-btn>
              </v-card-actions>
            </v-layout>
          </v-card-actions>
        </v-form>
        <p class="error--text" v-if="errMessage">{{errMessage}}</p>
      </v-card>
      <span class="mx-3">
        Don't have an account?
        <router-link to="/signup">Sign up</router-link>
      </span>
    </v-container>
  </v-content>
</template>

<script>
import PasswordReset from "./auth-dialog/PasswordReset";
import { fb } from "@/firebase/init";
export default {
  name: "Login",
  components: { PasswordReset },
  data() {
    return {
      email: null,
      password: null,
      errMessage: null,
      show: false,
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
    login() {
      if (this.$refs.loginForm.validate()) {
        fb.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$refs.loginForm.reset();
            let admin = undefined;
            cred.user
              .getIdTokenResult()
              .then(idTokenResult => {
                admin = idTokenResult.claims.admin;
              })
              .then(() => {
                if (admin) {
                  this.$router.push({ path: `/admin/placedOrders` });
                } else {
                  this.$router.push({ path: `/user/${cred.user.uid}` });
                }
              });
          })
          .catch(err => {
            this.errMessage = err.message;
          });
      }
    }
  }
};
</script>