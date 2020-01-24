<template>
  <div id="app">
    <Navbar />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { mapActions } from "vuex";

export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    ...mapActions(["GET_USER"])
  },
  created() {
    this.GET_USER();
  }
};
</script>