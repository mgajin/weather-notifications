<template>
  <div class="home">
    <div class="container">
      <h1>Don't have an account?</h1>
      <router-link to="/register">
        <h5>Sign up here</h5>
      </router-link>
    </div>
    <div class="container">
      <Service />
    </div>
  </div>
</template>

<script>
import Service from "../components/Service";

export default {
  name: "home",
  components: { Service }
};
</script>
