<template>
  <v-dialog max-width="360px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn elevation="0" text icon v-on="on" color="primary" class="mx-3">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card flat>
      <v-container>
        <v-card-title class="display-1 primary--text px-0 py-2">Edit</v-card-title>
        <v-form ref="editProductForm">
          <v-col class="pa-0 pt-3" cols="12">
            <v-text-field label="New Name" v-model="newName" :rules="[rules.required]" outlined></v-text-field>
          </v-col>
          <v-layout row class="justify-space-around">
            <v-col class="pa-0" cols="4">
              <v-text-field label="New Price" v-model="newPrice" :rules="[rules.required]" outlined></v-text-field>
            </v-col>
            <v-col class="pa-0" cols="6">
              <v-text-field
                label="New Truckload"
                v-model="newTruckload"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
            </v-col>
          </v-layout>
        </v-form>

        <v-card-actions>
          <v-layout row class="justify-center">
            <v-btn
              primary
              elevation="0"
              class="primary px-5"
              @click="dialog = false; editProduct()"
            >Confirm</v-btn>
          </v-layout>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "EditProduct",
  props: ["id", "price", "name", "truckload"],
  data() {
    return {
      dialog: false,
      newName: this.name,
      newPrice: this.price,
      newTruckload: this.truckload,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    editProduct() {
      if (this.$refs.editProductForm.validate()) {
        db.collection("products")
          .doc(this.id)
          .update({
            name: this.newName,
            price: this.newPrice,
            truckload: this.newTruckload
          });
      }
    }
  }
};
</script>