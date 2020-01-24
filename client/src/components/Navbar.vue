<template>
  <div class>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">WeatherAPI</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">home</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href>Docs</a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!this.getUser">
              <router-link to="/login" class="nav-link">
                <i class="fas fa-sign-in-alt"></i> login
              </router-link>
            </li>
            <li class="nav-item" v-if="!this.getUser">
              <router-link to="/register" class="nav-link">
                <i class="fas fa-user-plus"></i> register
              </router-link>
            </li>
            <li class="nav-item" v-if="this.getUser">
              <router-link to="/dashboard" class="nav-link">{{this.getUser.username}}</router-link>
            </li>
            <li class="nav-item" v-if="this.getUser">
              <button class="nav-link" @click="this.logout">
                <i class="fas fa-sign-out-alt"></i> log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "navbar",
  methods: {
    ...mapActions(["SIGN_OUT"]),
    logout(e) {
      e.preventDefault();
      this.SIGN_OUT();

      if (!this.getUser) {
        this.$router.push("/");
      }
    }
  },
  computed: mapGetters(["getUser"])
};
</script>
