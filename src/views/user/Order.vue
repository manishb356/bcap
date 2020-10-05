<template>
  <v-content>
    <v-row justify="center" align="center" v-if="loading" class="mt-12">
      <v-progress-circular indeterminate color="secondary" :size="size"></v-progress-circular>
    </v-row>
    <v-container style="max-width:960px" v-else>
      <v-layout row wrap class="display">
        <v-flex xs12 v-for="(product, index) in products" :key="index">
          <v-card class="pa-2 mx-3 my-1" flat target="_blank">
            <v-layout row>
              <v-flex xs4 md2 class="mx-3">
                <v-img height="100" width="100" :src="product.img_src">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="secondary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-flex>

              <v-flex xs6 md7>
                <v-layout column wrap>
                  <v-flex class xs5>
                    <span class="font-weight-light title">{{product.name}}</span>
                  </v-flex>
                  <v-flex xs5>
                    <span class="font-weight-light title">₹{{product.price}} each</span>
                  </v-flex>
                  <v-flex xs5>
                    <span
                      class="font-weight-light caption"
                    >1 truckload = {{product.truckload}} units</span>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs5 md2 class="mx-3 mt-1">
                <v-layout row>
                  <v-flex class="ml-5 mt-2">
                    <span class="font-weight-light text-center">Quantity:&nbsp;</span>
                    <span class="text-center">{{quantity[index]}}</span>
                  </v-flex>
                  <v-flex class="mx-5">
                    <v-btn text icon color="red" @click="change(-50,index)">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn text icon color="green" @click="change(50,index)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      class="white pa-0 success--text"
                      elevation="0"
                      @click="change(Number(product.truckload),index)"
                    >Add Load</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <ConfirmOrder :products="products" :quantity="quantity" :check="check" />
    </v-container>
  </v-content>
</template>

<script>
import ConfirmOrder from "./user-dialog/ConfirmOrder";
import { db } from "@/firebase/init";

export default {
  name: "Order",
  components: { ConfirmOrder },
  data() {
    return {
      check: true,
      loading: null,
      size: 100,
      products: [],
      quantity: []
    };
  },
  methods: {
    change(value, index) {
      if (this.quantity[index] <= 0 && value < 0) {
        this.$set(this.quantity, index, 0);
      } else {
        value = this.quantity[index] + value;
        this.$set(this.quantity, index, value);
      }
      this.check = this.quantity.some(element => {
        if (element > 0) {
          return true;
        } else {
          return false;
        }
      });
      this.check = this.check == true ? false : true;
    }
  },
  created() {
    this.loading = true;
    let ref = db.collection("products").orderBy("name");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.products.push({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            truckload: doc.data().truckload,
            img_src: doc.data().img_src
          });
          this.quantity.push(0);
        }
      });
      this.loading = false;
    });
  }
};
</script>

<style scoped>
.display {
  max-height: 75vh;
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