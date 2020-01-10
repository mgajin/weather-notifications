<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
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
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="fas fa-home"></i> home
              </router-link>
            </li>
            <li class="nav-item">
              <div class="dropdown" v-if="getUser">
                <button
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-user-circle"></i>
                  {{getUser.username}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <router-link to="/profile" v-model="username" class="dropdown-item">Account</router-link>
                  <button @click="logout" class="dropdown-item" type="button">Logout</button>
                </div>
              </div>
              <router-link to="/login" class="nav-link" v-else>
                <i class="fas fa-sign-in-alt"></i> login
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    ...mapActions(["SIGN_OUT"]),
    logout() {
      this.SIGN_OUT();

      this.$router.push("/login");
    }
  },
  computed: mapGetters(["getUser"])
};
</script>
