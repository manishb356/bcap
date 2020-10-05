<template>
  <v-content>
    <v-container style="max-width:600px ">
      <v-card flat>
        <v-card-title primary-title>
          <v-subheader class="display-1 primary--text pa-0">Signup</v-subheader>
        </v-card-title>
        <v-form ref="signupForm">
          <v-text-field
            autofocus
            prepend-icon="mdi-account"
            v-model="name"
            label="Name"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
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
            :rules="[rules.required, rules.password]"
            counter
            @click:append="show = !show"
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-phone"
            v-model="phone"
            label="Phone"
            :rules="[rules.required, rules.phone]"
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-map-marker"
            v-model="billingAddress.addressLine"
            label="Billing Address"
            :rules="[rules.required]"
          ></v-text-field>

          <v-layout row class="justify-space-around">
            <v-flex xs5 class="ma-3">
              <v-text-field v-model="billingAddress.city" label="City" :rules="[rules.required]"></v-text-field>
            </v-flex>
            <v-flex xs5 class="ma-3">
              <v-text-field
                v-model="billingAddress.pincode"
                label="Pincode"
                :rules="[rules.required, rules.pincode]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <div v-if="!sameAddress">
            <v-text-field
              prepend-icon="mdi-map-marker"
              v-model="deliveryAddress.addressLine"
              label="Delivery Address"
              :rules="[rules.required]"
            ></v-text-field>

            <v-layout row class="justify-space-around">
              <v-flex xs5 class="ma-3">
                <v-text-field v-model="deliveryAddress.city" label="City" :rules="[rules.required]"></v-text-field>
              </v-flex>
              <v-flex xs5 class="ma-3">
                <v-text-field
                  v-model="deliveryAddress.pincode"
                  label="Pincode"
                  :rules="[rules.required, rules.pincode]"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </div>

          <v-switch v-model="sameAddress" label="Delivery Address Same as Billing Address"></v-switch>

          <v-layout row class="justify-center">
            <v-card-actions>
              <v-btn primary elevation="0" class="primary px-8" @click="signup">Signup</v-btn>
            </v-card-actions>
          </v-layout>
        </v-form>
        <p class="error--text">{{errMessage}}</p>
      </v-card>
    </v-container>
  </v-content>
</template> 

<script>
import { fb, db } from "@/firebase/init";
export default {
  name: "Signup",
  data() {
    return {
      name: null,
      email: null,
      errMessage: null,
      password: null,
      phone: null,
      sameAddress: true,
      show: false,

      billingAddress: {
        addressLine: null,
        city: null,
        pincode: null
      },

      deliveryAddress: {
        addressLine: null,
        city: null,
        pincode: null
      },
      rules: {
        required: value => !!value || "Required.",
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid E-mail.";
        },
        password: v => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return (
            pattern.test(v) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
        phone: v => {
          const pattern = /^\d{10}$/;
          return pattern.test(v) || "Invalid Phone No.";
        },
        pincode: v => {
          const pattern = /^\d{6}$/;
          return pattern.test(v) || "Invalid Pincode No.";
        }
      }
    };
  },
  methods: {
    signup() {
      if (this.$refs.signupForm.validate()) {
        fb.auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            let ref = db.collection("users").doc(cred.user.uid);
            if (this.sameAddress == false) {
              ref.set({
                email: this.email,
                name: this.name,
                phone: this.phone,
                billingAddress: this.billingAddress,
                deliveryAddress: this.deliveryAddress
              });
            } else {
              ref.set({
                email: this.email,
                name: this.name,
                phone: this.phone,
                billingAddress: this.billingAddress,
                deliveryAddress: this.billingAddress
              });
            }
            this.$refs.signupForm.reset();
            this.$router.push({ path: `/user/${cred.user.uid}` });
          })
          .catch(err => {
            this.errMessage = err.message;
          });
      }
    }
  }
};
</script>