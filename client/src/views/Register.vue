<template>
  <div class="container landing">
    <div class="row" id="form-card">
      <div class="col-12 card-title">
        <h3>register</h3>
      </div>
      <form class="col-12" action="submit">
        <input type="text" class="form-control" placeholder="Username" required v-model="username" />

        <input type="email" class="form-control" placeholder="Email" required v-model="email" />

        <input
          type="password"
          class="form-control"
          placeholder="Password"
          required
          v-model="password"
        />

        <input
          type="password"
          class="form-control"
          placeholder="Confirm Password"
          required
          v-model="password2"
        />

        <button type="submit" class="btn" @click="register">submit</button>

        <p>
          Already have an account?
          <router-link to="/login">Sign In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    ...mapActions(["SIGN_UP"]),
    register(e) {
      e.preventDefault();

      this.SIGN_UP({
        username: this.username,
        email: this.email,
        password: this.password,
        password2: this.password2
      });

      this.$router.push("dashboard");
    }
  },
  created() {
    if (localStorage.getItem("jwt")) {
      this.$router.push("dashboard");
    }
  }
};
</script>
