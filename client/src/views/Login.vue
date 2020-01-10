<template>
  <div class="page">
    <form>
      <div class="form-group">
        <label for>Email address</label>
        <input type="text" placeholder="Enter email" v-model="email" class="form-control" />
      </div>
      <div class="form-group">
        <label for>Password</label>
        <input type="password" placeholder="Enter password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn" @click="login">Log in</button>
      <router-link to="/register">Create an account</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["SIGN_IN"]),
    login(e) {
      e.preventDefault();

      this.SIGN_IN({ email: this.email, password: this.password });

      if (localStorage.getItem("jwt") != null) {
        this.$emit("loggedIn");
        if (this.$route.params.nextUrl != null) {
          this.$router.push(this.$route.params.nextUrl);
        } else {
          this.$router.push("profile");
        }
      }
    }
  }
};
</script>
