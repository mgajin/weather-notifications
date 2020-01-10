<template>
  <div class="service">
    <div id="info" v-for="service in getServices" :key="service">
      <div class="box">
        <h1>{{service.name}}</h1>
        <hr />
        <p>{{service.description}}</p>
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
      </div>
    </div>
    <div id="widget">
      <Weather :weather="getWeather" />
    </div>
  </div>
</template>

<script>
import Weather from "./Weather";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "service",
  components: { Weather },
  data() {
    return {
      city: ""
    };
  },
  methods: {
    ...mapActions(["LOAD_SERVICES", "GET_WEATHER"]),
    search() {
      this.GET_WEATHER(this.city);
    }
  },
  computed: mapGetters(["getServices", "getWeather"]),
  created() {
    this.GET_WEATHER("Belgrade");
    this.LOAD_SERVICES();
  }
};
</script>

<style>
</style>