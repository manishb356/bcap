<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn
          elevation="0"
          color="white"
          class="font-weight-regular ml-5 success--text"
          v-on="on"
        >Delivered</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Deliver Order</v-card-title>
        <v-card-text>Are you sure you that the order is delivered ?</v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false; complete()">Yes</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { fb, db } from "@/firebase/init";
export default {
  name: "deliveerOrder",
  props: ["id"],
  data() {
    return {
      dialog: false,
      order: []
    };
  },
  methods: {
    complete() {
      let sourceRef = db.collection("verifiedOrders").doc(this.id);
      let destinationRef = db.collection("deliveredOrders").doc(this.id);
      sourceRef
        .get()
        .then(doc => {
          this.order = doc.data();
        })
        .then(() => {
          destinationRef.set({
            orderedProducts: this.order.orderedProducts,
            timestamp: this.order.timestamp,
            total: this.order.total,
            user_id: this.order.user_id,
            verified_id: fb.auth().currentUser.uid
          });
        })
        .then(() => {
          sourceRef.delete();
        })
        .then(() => {
          this.$router.push({ path: `/admin/deliveredOrders` });
        });
    }
  }
};
</script>