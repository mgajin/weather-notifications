<template>
  <div>
    <nav>
      <div class="container">
        <div class="row" id="menu">
          <div class="col-md-6">
            <div class="breadcrumb">
              <a href class="breadcrumb-item">
                {{
                this.getUser.username
                }}
              </a>
              <a href class="breadcrumb-item active">Dashboard</a>
            </div>
          </div>
          <div class="col-md-6">
            <form class="input-group" id="search" action>
              <button type="submit" @click="search">
                <i class="fas fa-search"></i>
              </button>
              <input type="text" class="form-control" placeholder="Search City" v-model="city" />
            </form>
          </div>
        </div>
      </div>
    </nav>

    <section class="dashboard">
      <div class="container">
        <Weather :weather="getWeather" />
        <div class="row">
          <div class="col-sm-6">
            <Notifications />
          </div>
          <div class="col-sm-6">
            <Account :user="getUser" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Weather from "../components/Weather";
import Notifications from "../components/Notifications";
import Account from "../components/Account";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "dahsboard",
  components: {
    Weather,
    Notifications,
    Account
  },
  data() {
    return {
      city: ""
    };
  },
  methods: {
    ...mapActions(["GET_WEATHER", "GET_USER"]),
    search(e) {
      e.preventDefault();

      this.GET_WEATHER(this.city);
    }
  },
  computed: mapGetters(["getWeather", "getUser"]),
  created() {
    if (!localStorage.getItem("jwt")) {
      this.$router.push("/");
    }
    this.GET_WEATHER("Belgrade");
  }
};
</script>
