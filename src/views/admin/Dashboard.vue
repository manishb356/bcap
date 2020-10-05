<template>
  <v-content class="grey lighten-3">
    <v-content class="pt-0" style="min-height:77vh">
      <Orders />
    </v-content>
    <v-layout justify-end>
      <div class="pa-2">
        <router-link to="/admin/options" style="text-decoration:none">Add Admin</router-link>&nbsp;|&nbsp;
        <router-link to="/admin/updateProducts" style="text-decoration:none">Product List</router-link>
      </div>
    </v-layout>
  </v-content>
</template>

<script>
import Orders from "./admin-orders/Orders";
export default {
  name: "Dashboard",
  components: { Orders },
  data() {
    return {
      tab: null,
      tabs: [
        { name: "Options", link: "/admin/options" },
        { name: "Orders", link: "/admin/orders" },
        { name: "Update Products", link: "/admin/updateProducts" }
      ]
    };
  },
  created() {
    if (this.$route.name === "admin") {
      this.$router.push({ path: "admin/placedOrders" });
    }
  }
};
</script>