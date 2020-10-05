<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on }">
      <div
        class="primary--text mx-3"
        style="cursor:pointer; text-decoration:underline"
        dark
        v-on="on"
      >Forgot Password?</div>
    </template>

    <v-card flat>
      <v-card-title primary-title>
        <v-subheader class="display-1 primary--text pa-0">Reset Password</v-subheader>
      </v-card-title>
      <v-form ref="resetForm" class="mx-4">
        <v-text-field
          prepend-icon="mdi-email"
          v-model="email"
          label="Email"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-card-actions>
          <v-layout row class="justify-center">
            <v-card-actions>
              <v-btn primary elevation="0" block large class="primary" @click="reset">Reset Password</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card-actions>
      </v-form>
      <p class="error--text" v-if="errMessage">{{errMessage}}</p>
      <p class="success--text" v-if="sucessMessage">{{sucessMessage}}</p>
    </v-card>
  </v-dialog>
</template>

<script>
import { fb } from "@/firebase/init";

export default {
  name: "PasswordReset",
  data() {
    return {
      email: null,
      errMessage: null,
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
    reset() {
      this.errMessage = this.sucessMessage = null;
      if (this.$refs.resetForm.validate()) {
        fb.auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.sucessMessage = `Password Reset Email Sent`;
            this.$refs.resetForm.reset();
          })
          .catch(err => {
            this.errMessage = err.message;
          });
      }
    }
  }
};
</script>