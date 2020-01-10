<template>
  <div class="account">
    <div class="form-group row">
      <label for="colFormLabel" class="col-sm-5 col-md-4 col-lg-3 col-form-label">Full Name</label>
      <div class="col-sm-7 col-md-8 col-lg-9">
        <input type="text" class="form-control" id="colFormLabel" v-bind:value="getUser.name" />
      </div>
      <label for="colFormLabel" class="col-sm-5 col-md-4 col-lg-3 col-form-label">Username</label>
      <div class="col-sm-7 col-md-8 col-lg-9">
        <input type="text" class="form-control" id="colFormLabel" v-bind:value="getUser.username" />
      </div>
      <label for="colFormLabel" class="col-sm-5 col-md-4 col-lg-3 col-form-label">Email</label>
      <div class="col-sm-7 col-md-8 col-lg-9">
        <input
          type="email"
          disabled
          class="form-control bg-white"
          id="colFormLabel"
          v-bind:value="getUser.email"
        />
      </div>
      <button class="btn col">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "account",
  data() {
    return {
      name: "",
      username: "",
      email: ""
    };
  },
  methods: {
    ...mapActions(["GET_USER"])
  },
  computed: mapGetters(["getUser"]),
  created() {
    this.GET_USER();
  }
};
</script>
