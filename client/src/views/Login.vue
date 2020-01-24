<template>
  <div class="container landing">
    <div class="row" id="form-card">
      <div class="col-12 card-title">
        <h3>login</h3>
      </div>
      <form class="col-12" action="submit">
        <input type="text" class="form-control" placeholder="Username" required v-model="username" />

        <input
          type="password"
          class="form-control"
          placeholder="Password"
          required
          v-model="password"
        />

        <button type="submit" class="btn" @click="login">submit</button>

        <p>
          Don't have an account?
          <router-link to="/register">Sign Up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["SIGN_IN"]),
    login(e) {
      e.preventDefault();

      this.SIGN_IN({
        username: this.username,
        password: this.password
      });

      this.$router.push("dashboard");
    }
  },
  computed: mapGetters(["getToken"]),
  created() {
    if (localStorage.getItem("jwt")) {
      this.$router.push("dashboard");
    }
  }
};
</script>
