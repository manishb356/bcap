<template>
  <v-content>
    <section class="d-none d-sm-none d-md-block">
      <v-parallax src="@/assets/hero.jpg" height="600">
        <v-layout
          column
          align-center
          justify-center
          class="white--text text-uppercase"
        >
          <h1 class="white--text mb-2 display-1 text-center">
            Bheema Concrete And Allied Products
          </h1>
          <div class="subheading mb-4 text-center">
            Construct With Confidence
          </div>
        </v-layout>
      </v-parallax>
    </section>

    <section class="hero d-md-none">
      <v-row align="center" no-gutters style="height: 100%;">
        <v-col class="white--text text-uppercase">
          <h1 class="mb-2 display-1 text-center">
            Bheema Concrete And Allied Products
          </h1>
          <div class="subheading mb-4 text-center">
            Construct With Confidence
          </div>
        </v-col>
      </v-row>
    </section>

    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="headline text-uppercase">
              Quality Blocks for Every construction need
            </h2>
          </div>
        </v-flex>

        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="primary--text text--lighten-2"
                      >mdi-factory</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Production Process</div>
                  </v-card-title>
                  <v-card-text
                    >Concrete blocks are available with a minimum compression
                    strength of 40 KGS/CM and consistent quality concrete-mix
                    output, resulting in superior concrete
                    products.</v-card-text
                  >
                </v-card>
              </v-flex>

              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="primary--text text--lighten-2"
                      >mdi-flash</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Efficency</div>
                  </v-card-title>
                  <v-card-text
                    >An Automated manufacturing unit improves labour
                    productivity by 50%, reducing labour cost, high value with
                    high quality and low price and we have an installed capacity
                    of 10000 blocks per day</v-card-text
                  >
                </v-card>
              </v-flex>

              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="primary--text text--lighten-2"
                      >mdi-leaf</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Eco Friendly</div>
                  </v-card-title>
                  <v-card-text
                    >Customized compression strength concrete products based on
                    your need Eco-friendly, Reduces cement mortar consumption by
                    60% and saves cement in masonry work and reduces cost of
                    construction</v-card-text
                  >
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section class="d-none d-sm-none d-md-block">
      <v-parallax src="@/assets/section.jpg" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-4 text-center">
            We Manufacure Multiple Concrete Products
          </div>
          <v-btn class="mt-2" color="primary" dark @click="goto"
            >Place Order</v-btn
          >
        </v-layout>
      </v-parallax>
    </section>

    <section class="section d-md-none">
      <v-row align="center" no-gutters style="height: 100%;">
        <v-col class="white--text text-center">
          <div class="headline mb-4 text-center">
            We Manufacure Multiple Concrete Products
          </div>
          <v-btn class="mt-2" color="primary" dark @click="goto"
            >Place Order</v-btn
          >
        </v-col>
      </v-row>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-12">
          <v-flex xs12 sm4>
            <v-card flat class="transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Company Info</div>
              </v-card-title>
              <v-card-text
                >State of the art machinery used in the manufacturing of
                concrete blocks. We are pioneers in manufacturing of quality
                concrete blocks, pavers, curbstones, slabs, and fly ash
                bricks.</v-card-text
              >
            </v-card>
          </v-flex>

          <v-flex xs12 sm4 offset-sm1>
            <v-card flat class="transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Contact Us</div>
              </v-card-title>
              <v-card-text
                >We’d love to hear from you. Whether you have a question about
                features, trials, pricing, need a demo, or anything else, our
                team is ready to answer all your questions</v-card-text
              >
              <v-list class="transparent">
                <v-list-item :href="phoneLink">
                  <v-list-item-action>
                    <v-icon class="primary--text text--lighten-2"
                      >mdi-phone</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>+91 {{ phone }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                  href="https://goo.gl/maps/aPtuxJwqsf1nBkEx5"
                  target="_blank"
                >
                  <v-list-item-action>
                    <v-icon class="primary--text text--lighten-2"
                      >mdi-map-marker</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>BCAP</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item :href="mailLink" target="_top">
                  <v-list-item-action>
                    <v-icon class="primary--text text--lighten-2"
                      >mdi-email</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ mail }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-content>
</template>

<script>
import { db, fb } from "@/firebase/init";
export default {
  name: "Home",
  data() {
    return {
      mail: null,
      mailLink: null,
      phone: null,
      phoneLink: null,
    };
  },
  created() {
    db.collection("contactDetails")
      .doc("primary")
      .get()
      .then((doc) => {
        this.mail = doc.data().mail;
        this.mailLink = "mailto:" + doc.data().mail + "?Subject=Contact";
        this.phone = doc.data().phone;
        this.phoneLink = "tel:+91" + doc.data().phone;
      });
  },
  methods: {
    goto() {
      let user = fb.auth().currentUser;
      if (user) {
        this.$router.push({ path: `/user/${user.uid}` });
      } else {
        this.$router.push({ path: `/login` });
      }
    },
  },
};
</script>

<style scoped>
.hero {
  background-image: url("~@/assets/hero-mobile.jpg");
  height: 544px;
  background-position: bottom;
}

.section {
  background-image: url("~@/assets/section-mobile.jpg");
  height: 480px;
  background-position: bottom;
}
</style>
