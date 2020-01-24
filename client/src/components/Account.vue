<template>
  <div class="card" id="account">
    <h6 class="title">
      <i class="fas fa-user-alt"></i> account details
    </h6>
    <div class="row">
      <h5 class="col-5">username</h5>
      <p class="col-7">{{ this.user.username }}</p>
      <h5 class="col-5">email</h5>
      <p class="col-7">{{ this.user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "account",
  props: { user: {} }
};
</script>

<style></style>
