<template>
  <div class="row">
    <div class="col-sm-7">
      <div class="card" id="weather">
        <h6 class="title">
          <i class="fas fa-cloud-sun"></i> Weather
        </h6>
        <div class="row">
          <h2 class="col-md-6">{{ this.weather.city }}</h2>
          <h6 class="col-md-6">{{ this.weather.date }}</h6>
          <h6 class="col-6">{{ this.weather.description }}</h6>
          <h1 class="col-6">{{ this.weather.temp }}&deg;</h1>
        </div>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="card" id="weather">
        <div class="row">
          <h5 class="col-6">feels like</h5>
          <p class="col-6">{{ this.weather.feels_like }}&deg;</p>
          <h5 class="col-6">max / min</h5>
          <p class="col-6">
            {{ this.weather.max_temp }}&deg; /
            {{ this.weather.min_temp }}&deg;
          </p>
          <h5 class="col-6">humidity</h5>
          <p class="col-6">{{ this.weather.humidity }}</p>
          <h5 class="col-6">wind</h5>
          <p class="col-6">{{ this.weather.wind }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "weather",
  props: {
    weather: {}
  }
};
</script>

<style></style>
