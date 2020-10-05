<template>
  <v-dialog max-width="480px">
    <template v-slot:activator="{ on }">
      <v-layout column align-center>
        <v-btn
          class="ma-3"
          color="primary"
          v-on="on"
          @click="computeProducts"
          :disabled="check"
        >Confirm Order</v-btn>
      </v-layout>
    </template>
    <v-card flat>
      <v-container>
        <v-card-title primary-title>
          <v-subheader class="display-1 primary--text pa-0 ml-0">Checkout</v-subheader>
        </v-card-title>
        <v-list v-for="(product, index) in orderedProducts" :key="index">
          <v-list-item-content class="ml-3">
            <v-list-item-title>
              <span class="font-weight-medium">{{product.name}}:&nbsp;</span>
              <span class="font-weight-light">{{product.quantity}} nos</span>
              <span class="font-weight-light mx-3" style="float:right">Price: ₹{{product.subTotal}}</span>
            </v-list-item-title>
          </v-list-item-content>
          <v-divider></v-divider>
        </v-list>

        <p class="font-weight-medium text-right mx-3">Total: ₹{{total}}</p>

        <v-card-actions>
          <v-layout row class="justify-center">
            <v-card-actions>
              <v-btn primary elevation="0" class="primary px-5" @click="placeOrder">Place Order</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { fb, db } from "@/firebase/init";
export default {
  name: "ConfirmOrder",
  props: ["products", "quantity", "check"],
  data() {
    return {
      orderedProducts: [],
      total: null,
      user_id: fb.auth().currentUser.uid,
      user: null
    };
  },
  methods: {
    computeProducts() {
      this.total = 0;
      this.orderedProducts = this.products.filter((product, index) => {
        if (this.quantity[index] > 0) {
          product.quantity = this.quantity[index];
          product.subTotal = product.quantity * product.price;
          this.total += product.subTotal;
          return true;
        }
      });
    },
    placeOrder() {
      this.orderedProducts.forEach(element => {
        delete element.description;
        delete element.img_src;
        delete element.subTotal;
        delete element.truckload;
      });

      db.collection("placedOrders")
        .add({
          newOrder: true,
          user_id: this.user_id,
          total: this.total,
          orderedProducts: this.orderedProducts,
          timestamp: Date.now()
        })
        .then(() => {
          this.$store.state.snackbar = true;
        })
        .then(() => {
          this.$router.push({ path: `/user/${this.user_id}` });
        });
    }
  }
};
</script>