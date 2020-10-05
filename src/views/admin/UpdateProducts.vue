<template>
  <v-content>
    <v-row justify="center" align="center" v-if="loading" class="mt-12">
      <v-progress-circular indeterminate color="secondary" :size="size"></v-progress-circular>
    </v-row>
    <v-container class="mt-5" v-else>
      <v-container class="display">
        <v-flex xs12 v-for="(product, index) in products" :key="index">
          <v-card class="pa-2 mx-3 my-1" flat target="_blank">
            <v-layout>
              <v-row>
                <v-col cols="4" md="2">
                  <v-img height="100" width="100" :src="product.img_src">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>

                <v-col cols="8" md="8">
                  <v-row>
                    <span class="font-weight-light title">{{product.name}}</span>
                  </v-row>
                  <v-row>
                    <span class="font-weight-light title">₹{{product.price}} each</span>
                  </v-row>
                  <v-row>
                    <span
                      class="font-weight-light caption"
                    >1 truckload = {{product.truckload}} units</span>
                  </v-row>
                </v-col>

                <v-col cols="2" class="pa-0" align-self="center">
                  <v-card-actions>
                    <EditProduct
                      :id="product.id"
                      :name="product.name"
                      :price="product.price"
                      :truckload="product.truckload"
                    />
                    <DeleteProduct :id="product.id" :name="product.name" />
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-layout>
          </v-card>
          <v-divider></v-divider>
        </v-flex>
      </v-container>
      <AddProduct />
    </v-container>
  </v-content>
</template>

<script>
import { db } from "@/firebase/init";
import AddProduct from "./admin-dialog/AddProduct";
import EditProduct from "./admin-dialog/EditProduct";
import DeleteProduct from "./admin-dialog/DeleteProduct";
export default {
  name: "UpdateProducts",
  components: { AddProduct, EditProduct, DeleteProduct },
  data() {
    return {
      loading: null,
      size: 100,
      products: []
    };
  },
  created() {
    this.loading = true;
    let ref = db.collection("products").orderBy("name");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc;
        let index = this.products.findIndex(product => {
          return product.id === doc.id;
        });
        if (change.type == "added") {
          this.products.push({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            truckload: doc.data().truckload,
            img_src: doc.data().img_src
          });
        } else if (change.type == "modified") {
          this.products.splice(index, 1);
          this.products.splice(index, 0, {
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            truckload: doc.data().truckload,
            img_src: doc.data().img_src
          });
        } else if (change.type == "removed") {
          this.products.splice(index, 1);
        }
      });
      this.loading = false;
    });
  }
};
</script>

<style scoped>
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