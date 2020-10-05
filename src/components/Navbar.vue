<template>
  <nav class="pr-0">
    <v-app-bar
      app
      fixed
      elevate-on-scroll
      color="bar"
      scroll-threshold="50"
      class="d-none d-sm-none d-md-block"
    >
      <v-toolbar-title class="text-uppercase title">
        <router-link to="/" class="link">
          <span class="headline">B</span>
          <span class="font-weight-light headline">cap</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn elevation="0" text class="mx-1 px-2" @click="goto">Order</v-btn>
      <v-btn elevation="0" text class="mx-1 px-2" v-if="!user" to="/login">Login</v-btn>
      <v-btn elevation="0" text class="mx-1 px-2" v-if="user" @click="signout">Logout</v-btn>
    </v-app-bar>

    <v-app-bar
      app
      fixed
      elevate-on-scroll
      fade-img-on-scroll
      color="bar"
      scroll-threshold="50"
      class="hero d-md-none"
    >
      <template v-slot:img="{ props }" v-if="home">
        <v-img v-bind="props" class="navbar" position="top"></v-img>
      </template>
      <v-toolbar-title class="text-uppercase title">
        <router-link to="/" class="link">
          <span class="headline">B</span>
          <span class="font-weight-light headline">cap</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn elevation="0" text class="mx-1 px-2" @click="goto">Order</v-btn>
      <v-btn elevation="0" text class="mx-1 px-2" v-if="!user" to="/login">Login</v-btn>
      <v-btn elevation="0" text class="mx-1 px-2" v-if="user" @click="signout">Logout</v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { fb } from "@/firebase/init";

export default {
  name: "Navbar",
  data() {
    return {
      home: null,
      user: null
    };
  },
  created() {
    this.checkHome();
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    checkHome() {
      if (this.$route.name == "home") {
        this.home = true;
      } else {
        this.home = false;
      }
    },
    signout() {
      fb.auth()
        .signOut()
        .then(() => {
          if (this.$route.name != "home") {
            this.$router.push({ path: "/" });
          }
        });
    },
    goto() {
      let user = fb.auth().currentUser;
      if (user) {
        if (this.$route.name != "user") {
          this.$router.push({ path: `/user/${user.uid}` });
        }
      } else {
        if (this.$route.name != "login") {
          this.$router.push({ path: `/login` });
        }
      }
    }
  },
  watch: {
    $route: "checkHome"
  }
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.navbar {
  background-image: url("~@/assets/hero-mobile.jpg");
  background-position: top;
}
</style>