<template>
  <div class="profile container">
    <div class="row">
      <div class="col-12">
        <h2>Services</h2>
        <div class="service-box" v-for="service in getServices" :key="service">
          <h3>{{service.name}}</h3>
          <hr />
          <p>{{service.description}}</p>
          <div class="status">
            <label for>Subscribed</label>
            <button class="border bg-light">Unsubscribe</button>
          </div>
          <router-link to="/weather">Go to service page</router-link>
        </div>
      </div>
      <div class="col-12">
        <h2>Account Details</h2>
        <Account />
      </div>
    </div>
  </div>
</template>

<script>
import Account from "../components/Account";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "menu",
  components: {
    Account
  },
  methods: {
    ...mapActions(["LOAD_SERVICES"])
  },
  computed: mapGetters(["getServices", "getUser"]),
  created() {
    if (this.getUser == "") {
      alert("no user");
    }
    this.LOAD_SERVICES();
  }
};
</script>

