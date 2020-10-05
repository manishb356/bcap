<template>
  <v-content class="pt-1">
    <v-row justify="center" align="center" v-if="loading" class="mt-12">
      <v-progress-circular indeterminate color="secondary" :size="size"></v-progress-circular>
    </v-row>
    <v-container v-else>
      <div v-if="count == 0">
        <span class="grey--text display-3 font-weight-light">No Orders Yet</span>
      </div>
      <v-flex xs12 class="display" v-else>
        <v-card flat v-for="order in orders" :key="order.id">
          <v-layout :class="`pa-3 order ${order.status}`">
            <v-row>
              <v-col cols="12" md="4">
                <span class="font-weight-light grey--text body-1">Order ID:&nbsp;</span>
                <span>{{order.id}}</span>
              </v-col>

              <v-col cols="6" md="4">
                <span class="font-weight-light grey--text body-1">Estimated Cost:&nbsp;</span>
                <span>₹{{order.total}}</span>
              </v-col>

              <v-col cols="6" md="4">
                <span class="font-weight-light grey--text body-1">Status:&nbsp;</span>
                <v-chip small class="white--text" color="orange">{{order.status}}</v-chip>
              </v-col>

              <v-card-actions column align-center>
                <v-btn
                  elevation="0"
                  color="white"
                  class="font-weight-regular"
                  @click="order.orderShow = !order.orderShow"
                >Order</v-btn>
                <v-btn
                  elevation="0"
                  color="white"
                  class="font-weight-regular"
                  @click="order.userShow = !order.userShow"
                >User</v-btn>
                <CompleteOrder :id="order.id"></CompleteOrder>
              </v-card-actions>

              <v-slide-y-transition>
                <v-card-text v-show="order.orderShow" class="py-0">
                  <span class="font-weight-light grey--text body-1">Order List:&nbsp;</span>
                  <v-list class="pa-0">
                    <v-list-item-content
                      v-for="product in order.orderedProducts"
                      :key="product.id"
                      class="py-1"
                    >
                      <span>{{product.name}}: {{product.quantity}} nos @ ₹{{product.price}} each</span>
                    </v-list-item-content>
                  </v-list>
                </v-card-text>
              </v-slide-y-transition>

              <v-slide-y-transition>
                <v-card-text v-show="order.userShow" class="pb-0">
                  <span class="font-weight-light grey--text body-1">User Details:&nbsp;</span>
                  <v-row>
                    <v-col cols="10" class="pt-0">
                      <v-list class="pa-0">
                        <v-list-item-content class="py-1">
                          <span>
                            <span class="grey--text">Name:</span>
                            {{order.userDetails.name}}
                          </span>
                          <span>
                            <span class="grey--text">Phone:</span>
                            {{order.userDetails.phone}}
                          </span>
                          <span>
                            <span class="grey--text">Billing Address:</span>
                            {{order.userDetails.billingAddress.addressLine}},{{order.userDetails.billingAddress.city}},{{order.userDetails.billingAddress.pincode}}
                          </span>
                          <span>
                            <span class="grey--text">Delivery Address:</span>
                            {{order.userDetails.deliveryAddress.addressLine}},{{order.userDetails.deliveryAddress.city}},{{order.userDetails.deliveryAddress.pincode}}
                          </span>
                        </v-list-item-content>
                      </v-list>
                    </v-col>
                    <v-col cols="2">
                      <v-card-actions>
                        <v-btn
                          elevation="0"
                          text
                          icon
                          color="primary"
                          :href="`tel:${order.userDetails.phone}`"
                        >
                          <v-icon dark>mdi-phone</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-slide-y-transition>
            </v-row>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>
import CompleteOrder from "./admin-orders-dialog/CompleteOrder";

import { db } from "@/firebase/init";
export default {
  name: "deliveredOrders",
  components: { CompleteOrder },

  data() {
    return {
      count: 0,
      loading: true,
      size: 100,
      orders: []
    };
  },
  created() {
    this.loading = true;
    let orderRef = db.collection("deliveredOrders").orderBy("timestamp", "asc");

    orderRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          this.count++;
          let doc = change.doc;
          let userDetails = null;
          db.collection("users")
            .doc(doc.data().user_id)
            .get()
            .then(docu => {
              userDetails = docu.data();
            })
            .then(() => {
              this.orders.push({
                id: doc.id,
                total: doc.data().total,
                orderedProducts: doc.data().orderedProducts,
                user_id: doc.data().user_id,
                userDetails: userDetails,
                status: "delivered",
                orderShow: false,
                userShow: false
              });
            })
            .then(() => {
              this.loading = false;
            });
        }
      });
      if (this.count == 0) {
        this.loading = false;
      }
    });
  }
};
</script>

<style scoped>
.delivered {
  border-left: 4px solid orange;
}

.display {
  max-height: 70vh;
  overflow: auto;
}
.display::-webkit-scrollbar {
  width: 3px;
}

.display::-webkit-scrollbar-track {
  background: #ddd;
}

.display::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>