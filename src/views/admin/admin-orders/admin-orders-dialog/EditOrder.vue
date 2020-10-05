<template>
  <v-dialog max-width="360px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn elevation="0" v-on="on" class="ml-5" text icon color="primary">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card flat>
      <v-container>
        <v-card-title class="display-1 primary--text px-0 py-2">Edit</v-card-title>
        <v-form ref="editOrderForm" class="display">
          <div v-for="newOrderedProduct in newOrderedProducts" :key="newOrderedProduct.id">
            <v-col class="pa-0 pt-3" cols="12">
              <v-text-field
                label="Name"
                readonly
                v-model="newOrderedProduct.name"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
            </v-col>
            <v-layout row class="justify-space-around">
              <v-col class="pa-0" cols="4">
                <v-text-field
                  label="Price"
                  v-model="newOrderedProduct.price"
                  :rules="[rules.required]"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="pa-0" cols="6">
                <v-text-field
                  label="Quantity"
                  v-model="newOrderedProduct.quantity"
                  :rules="[rules.required]"
                  outlined
                ></v-text-field>
              </v-col>
            </v-layout>
          </div>
        </v-form>

        <v-card-actions>
          <v-layout row class="justify-center">
            <v-btn
              primary
              elevation="0"
              class="primary px-5"
              @click="dialog = false; editOrder()"
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
  name: "EditOrder",
  props: ["id", "orderedProducts", "total"],
  data() {
    return {
      dialog: false,
      newOrderedProducts: this.orderedProducts,
      newTotal: null,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    editOrder() {
      if (this.$refs.editOrderForm.validate()) {
        this.newOrderedProducts.forEach(element => {
          this.newTotal += element.price * element.quantity;
        });
        db.collection("placedOrders")
          .doc(this.id)
          .update({
            orderedProducts: this.newOrderedProducts,
            total: this.newTotal
          });
      }
    }
  }
};
</script>

<style scoped>
.display {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
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