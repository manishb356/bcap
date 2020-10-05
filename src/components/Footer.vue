<template>
  <v-footer color="footer">
    <v-row justify="center" no-gutters>
      <v-btn color="white" :href="developers" target="_blank" text>Developers</v-btn>
      <v-btn color="white" :href="mail" target="_blank" text>Feedback</v-btn>
      <v-btn color="white" href="/terms" text>Terms</v-btn>
    </v-row>
  </v-footer>
</template>

<script>
import { db } from "@/firebase/init";
export default {
  name: "Footer",
  data() {
    return {
      mail: null,
      developers: null
    };
  },
  created() {
    db.collection("contactDetails")
      .doc("primary")
      .get()
      .then(doc => {
        this.mail = "mailto:" + doc.data().mail + "?Subject=Feedback";
        this.developers = doc.data().developers;
      });
  }
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>