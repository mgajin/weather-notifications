<template>
  <div class="card" id="notifications">
    <h6 class="title">
      <i class="fas fa-bell"></i> notifications
    </h6>
    <div class="row">
      <div class="input-group col-12">
        <select class="custom-select" v-model="city">
          <option
            v-for="weather in this.getWeathers"
            :key="weather"
            v-bind="weather.city"
          >{{weather.city}}</option>
        </select>
        <button type="button" @click="load">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
      <button class="col-12" @click="subscribe">subscribe</button>
      <div class="col-12" v-bind="city" v-for="city in getUser.subscription.list" :key="city">
        <h5>{{city}}</h5>
        <button @click="remove(city)">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "notifications",
  data() {
    return {
      city: ""
    };
  },
  methods: {
    ...mapActions(["GET_ALL", "SUBSCRIBE", "REMOVE"]),
    load() {
      this.GET_ALL();
    },
    subscribe() {
      this.SUBSCRIBE({ username: this.getUser.username, city: this.city });
    },
    remove(city) {
      this.REMOVE({ username: this.getUser.username, city: city });
    }
  },
  computed: mapGetters(["getWeathers", "getUser"])
};
</script>

<style></style>
