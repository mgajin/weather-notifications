<template>
  <div class="container" id="page">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/profile">{{this.getUser.username}}</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Weather</li>
      </ol>
    </nav>
    <div class="weather-service">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search City"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          v-model="city"
        />
        <div class="input-group-append">
          <button class="btn" type="button" @click="search">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Weather :weather="getWeather" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Weather from "../components/WeatherAdvanced";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "weather",
  components: {
    Weather
  },
  data() {
    return {
      city: ""
    };
  },
  methods: {
    ...mapActions(["GET_WEATHER"]),
    search() {
      this.GET_WEATHER(this.city);
    }
  },
  computed: mapGetters(["getWeather", "getUser"]),
  created() {
    this.GET_WEATHER("Belgrade");
  }
};
</script>

<style>
</style>