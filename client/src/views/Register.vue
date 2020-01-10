<template>
  <div class="page">
    <form>
      <div class="form-group">
        <label for>Name</label>
        <input type="text" v-model="name" placeholder="Enter your name" class="form-control" />
      </div>
      <div class="form-group">
        <label for>Username</label>
        <input type="text" v-model="username" placeholder="Enter username" class="form-control" />
      </div>
      <div class="form-group">
        <label for>Email address</label>
        <input type="text" v-model="email" placeholder="Enter email" class="form-control" />
      </div>

      <div class="form-group">
        <label for>Password</label>
        <input type="password" v-model="password" placeholder="Enter password" class="form-control" />
      </div>
      <div class="form-group">
        <label for>Confirm password</label>
        <input
          type="password"
          v-model="password2"
          placeholder="Enter password"
          class="form-control"
        />
      </div>
      <button type="submit" @click="register" class="btn btn-primary">Register</button>
      <div>
        <label for>Have an account?</label>
        <router-link to="/login">Log in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      name: "",
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
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        password2: this.password2
      });

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
