<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn elevation="0" class="mx-2" v-on="on" text icon color="primary">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card flat>
      <v-container>
        <v-card-title primary-title>
          <v-subheader class="display-1 primary--text pa-0 ml-0">Edit Details</v-subheader>
        </v-card-title>
        <v-form ref="editDetailsForm">
          <v-text-field
            prepend-icon="mdi-phone"
            v-model="newPhone"
            label="Phone"
            :rules="[rules.required, rules.phone]"
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-map-marker"
            v-model="newAddress.addressLine"
            label="Address"
            :rules="[rules.required]"
          ></v-text-field>

          <v-layout row class="justify-space-around">
            <v-flex xs5 class="ma-3">
              <v-text-field v-model="newAddress.city" label="City" :rules="[rules.required]"></v-text-field>
            </v-flex>
            <v-flex xs5 class="ma-3">
              <v-text-field
                v-model="newAddress.pincode"
                label="Pincode"
                :rules="[rules.required, rules.pincode]"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-card-actions>
          <v-layout row class="justify-center">
            <v-card-actions>
              <v-btn
                primary
                elevation="0"
                class="primary px-5"
                @click="dialog = false; editDetails()"
              >Confirm</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "EditDetails",
  props: ["id", "phone", "address", "type"],
  data() {
    return {
      dialog: false,
      newAddress: this.address,
      newPhone: this.phone,
      rules: {
        required: value => !!value || "Required.",
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
    editDetails() {
      if (this.$refs.editDetailsForm.validate()) {
        if (this.type == "billing") {
          db.collection("users")
            .doc(this.id)
            .update({
              phone: this.newPhone,
              billingAddress: this.newAddress
            });
        } else if (this.type == "delivery") {
          db.collection("users")
            .doc(this.id)
            .update({
              phone: this.newPhone,
              deliveryAddress: this.newAddress
            });
        }
      }
    }
  }
};
</script>