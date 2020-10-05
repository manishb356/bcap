<template>
  <v-content class="grey lighten-3">
    <v-row justify="center" align="center" v-if="loading" class="mt-12">
      <v-progress-circular indeterminate color="secondary" :size="size"></v-progress-circular>
    </v-row>
    <v-container v-else>
      <v-content class="pa-0 mb-1">
        <span class="title">Hey {{profile.name}},</span>
        <v-card elevation="0" class="grey lighten-3" v-if="profile">
          <v-card-subtitle class="pa-0 mb-2">Phone: {{profile.phone}}</v-card-subtitle>
          <v-row>
            <v-col cols="12" md="6" class="py-0">
              <v-row>
                <v-col cols="10" class="py-0">
                  <v-card-subtitle
                    class="pa-0"
                  >Billing Address: {{profile.billingAddress.addressLine}},{{profile.billingAddress.city}},{{profile.billingAddress.pincode}}</v-card-subtitle>
                </v-col>
                <v-col cols="1" class="pl-0" align-self="end">
                  <v-row justify="center">
                    <EditDetails
                      :id="user.uid"
                      :phone="profile.phone"
                      :address="profile.billingAddress"
                      type="billing"
                    />
                  </v-row>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-row>
                <v-col cols="10" class="py-0">
                  <v-card-subtitle
                    class="pa-0"
                  >Delivery Address: {{profile.deliveryAddress.addressLine}},{{profile.deliveryAddress.city}},{{profile.deliveryAddress.pincode}}</v-card-subtitle>
                </v-col>
                <v-col cols="1" class="pl-0" align-self="end">
                  <v-row justify="center">
                    <EditDetails
                      :id="user.uid"
                      :phone="profile.phone"
                      :address="profile.deliveryAddress"
                      type="delivery"
                    />
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-content>

      <v-subheader class="pl-0">Previous Orders:</v-subheader>

      <div v-if="count == 0" style="min-height:360px">
        <p class="grey--text text-center display-1 font-weight-light">Your Orders Will Apperar Here</p>
      </div>

      <v-flex xs12 class="display" v-else>
        <v-card flat v-for="order in orders" :key="order.id">
          <v-layout :class="`pa-3 order ${order.status}`">
            <v-row>
              <v-col cols="12" md="4">
                <span class="font-weight-light grey--text body-2">Order ID:&nbsp;</span>
                <span>{{order.id}}</span>
              </v-col>

              <v-col cols="6" md="4">
                <span class="font-weight-light grey--text body-2">Estimated Cost:&nbsp;</span>
                <span>₹{{order.total}}</span>
              </v-col>

              <v-col cols="6" md="4">
                <span class="font-weight-light grey--text body-2">Status:&nbsp;</span>
                <v-chip small class="white--text" :color="check(order.status)">{{order.status}}</v-chip>
                <v-tooltip bottom max-width="240px">
                  <template v-slot:activator="{ on }">
                    <v-icon color="grey" small v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  <span v-text="tooltipText(order.status)"></span>
                </v-tooltip>
              </v-col>

              <v-card-actions column align-center>
                <v-btn
                  elevation="0"
                  color="white"
                  @click="order.show = !order.show"
                >View order details</v-btn>
              </v-card-actions>

              <v-slide-y-transition>
                <v-card-text v-show="order.show" class="pb-0">
                  <span class="font-weight-light grey--text body-2">Order List:&nbsp;</span>
                  <v-list class="pa-0">
                    <v-list-item-content
                      class="py-1"
                      v-for="product in order.orderedProducts"
                      :key="product.id"
                    >
                      <v-list-item-title>{{product.name}}: {{product.quantity}} nos @ ₹{{product.price}} each</v-list-item-title>
                    </v-list-item-content>
                  </v-list>
                </v-card-text>
              </v-slide-y-transition>
            </v-row>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
      <v-layout column align-center>
        <v-btn class="ma-3" color="primary" @click="goto">Place A New Order</v-btn>
      </v-layout>
      <v-snackbar v-model="snackbar" :timeout="4000">
        Order Placed
        <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </v-content>
</template>

<script>
import { fb, db } from "@/firebase/init";
import EditDetails from "./user-dialog/EditDetails";

export default {
  name: "User",
  components: { EditDetails },
  data() {
    return {
      count: 0,
      id: this.$route.params.id,
      loading: null,
      profile: null,
      size: 100,
      snackbar: this.$store.state.snackbar,
      user: fb.auth().currentUser,
      orders: [],
      types: ["placed", "verified", "delivered", "completed"]
    };
  },
  methods: {
    check(status) {
      if (status == "placed") {
        return "blue";
      } else if (status == "verified") {
        return "yellow";
      } else if (status == "delivered") {
        return "orange";
      } else if (status == "completed") {
        return "green";
      }
    },
    goto() {
      this.$router.push({ path: `/order/${this.user.uid}` });
    },
    tooltipText(status) {
      if (status == "placed") {
        return "Your order has been placed but not acknowledged yet";
      } else if (status == "verified") {
        return "Your order is verified and will soon be delivered";
      } else if (status == "delivered") {
        return "Your order has been delivered but we haven't recived any payment yet";
      } else if (status == "completed") {
        return "Your order is completed!";
      }
    }
  },
  created() {
    this.loading = true;
    this.orders = [];

    let userRef = db.collection("users").doc(this.id);
    userRef.onSnapshot(doc => {
      this.profile = doc.data();
      this.loading = false;
    });

    this.types.forEach(type => {
      let orderRef = db
        .collection(`${type}Orders`)
        .orderBy("timestamp", "desc");
      orderRef.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (
            change.type == "added" &&
            change.doc.data().user_id == this.user.uid
          ) {
            this.count++;
            let doc = change.doc;
            let index = -1;
            this.orders.forEach(order => {
              if (doc.id === order.id) {
                index = this.orders.findIndex(order => {
                  return order.id === doc.id;
                });
                this.orders.splice(index, 1);
                this.orders.splice(index, 0, {
                  id: doc.id,
                  total: doc.data().total,
                  orderedProducts: doc.data().orderedProducts,
                  status: type,
                  show: false
                });
              }
            });
            if (index == -1) {
              this.orders.push({
                id: doc.id,
                total: doc.data().total,
                orderedProducts: doc.data().orderedProducts,
                status: type,
                show: false
              });
            }
          }
        });
      });
    });
  }
};
</script>

<style scoped>
.placed {
  border-left: 4px solid blue;
}

.verified {
  border-left: 4px solid yellow;
}

.delivered {
  border-left: 4px solid orange;
}

.completed {
  border-left: 4px solid green;
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