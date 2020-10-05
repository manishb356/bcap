<template>
  <v-dialog max-width="360px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-layout column align-center>
        <v-btn class="ma-3" color="primary" v-on="on">Add Product</v-btn>
      </v-layout>
    </template>

    <v-card flat>
      <v-container>
        <v-card-title class="display-1 primary--text px-0 py-2">Add</v-card-title>

        <v-form ref="addProductForm">
          <v-col class="pa-0 pt-3" cols="12">
            <v-text-field label="Name" v-model="name" :rules="[rules.required]" outlined></v-text-field>
          </v-col>
          <v-layout row class="justify-space-around">
            <v-col class="pa-0" cols="4">
              <v-text-field label="Price" v-model="price" :rules="[rules.required]" outlined></v-text-field>
            </v-col>
            <v-col class="pa-0" cols="6">
              <v-text-field
                label="Truckload"
                v-model="truckload"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
            </v-col>
          </v-layout>
          <v-col class="pa-0 pt-3" cols="12">
            <v-file-input
              accept="image/*"
              label="Image"
              :rules="[rules.required]"
              v-model="image"
              outlined
            ></v-file-input>
          </v-col>
          <v-col cols="12" v-if="errMessage">
            <p class="error--text text-center mb-0" v-text="errMessage"></p>
          </v-col>
        </v-form>

        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              primary
              elevation="0"
              class="primary px-5"
              :loading="loading"
              @click="addProduct()"
            >Confirm</v-btn>
          </v-layout>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { db, st } from "@/firebase/init";
export default {
  name: "AddProduct",
  data() {
    return {
      dialog: false,
      image: null,
      img_src: null,
      loading: false,
      errMessage: null,
      name: null,
      price: null,
      truckload: null,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    addProduct() {
      if (this.$refs.addProductForm.validate()) {
        var storageRef = st.ref();
        var uploadTask = storageRef
          .child(`products/${this.name}`)
          .put(this.image);

        uploadTask.on(
          "state_changed",
          snapshot => {
            if (snapshot.state == "running") {
              this.loading = true;
            }
          },
          error => {
            if (error) {
              this.loading = false;
              this.errMessage = "Error uploading file";
            }
          },
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => {
                this.img_src = downloadURL;
              })
              .then(() => {
                db.collection("products").add({
                  name: this.name,
                  price: this.price,
                  truckload: this.truckload,
                  img_src: this.img_src
                });
              })
              .then(() => {
                this.loading = false;
                this.dialog = false;
                this.$refs.addProductForm.reset();
              });
          }
        );
      }
    }
  }
};
</script>