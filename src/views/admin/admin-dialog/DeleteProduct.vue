<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn elevation="0" text icon v-on="on" color="primary" class="mx-3">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Delete Order</v-card-title>
        <v-card-text>Are you sure you want to delete the product ?</v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false; deleteProduct()">Yes</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { st, db } from "@/firebase/init";
export default {
  name: "DeleteProduct",
  props: ["id", "name"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteProduct() {
      var storageRef = st.ref();

      db.collection("products")
        .doc(this.id)
        .delete()
        .then(() => {
          var desertRef = storageRef.child(`products/${this.name}`);
          desertRef.delete();
        });
    }
  }
};
</script>