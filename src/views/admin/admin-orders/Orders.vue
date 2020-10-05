<template>
  <v-content class="pt-0">
    <v-tabs v-model="tab" fixed-tabs center-active show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.tab" :to="tab.link">{{ tab.name }}</v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-content>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      tab: null,
      tabs: [
        { name: "Placed Orders", link: "placedOrders" },
        { name: "Verifed Orders", link: "verifiedOrders" },
        { name: "Delivered Orders", link: "deliveredOrders" },
        { name: "Completed Orders", link: "completedOrders" }
      ]
    };
  }
};
</script>