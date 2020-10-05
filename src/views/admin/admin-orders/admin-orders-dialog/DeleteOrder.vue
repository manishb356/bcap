<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn elevation="0" v-on="on" class="ml-3" text icon color="primary">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Delete Order</v-card-title>
        <v-card-text>Are you sure you want to delete the order ?</v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false; deleteOrder()">Yes</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "DeleteOrder",
  props: ["id"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteOrder() {
      db.collection("placedOrders")
        .doc(this.id)
        .delete();
    }
  }
};
</script>