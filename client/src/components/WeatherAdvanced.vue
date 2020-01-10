<template>
  <div id="weather">
    <div class="row">
      <h1 class="col-12">{{this.weather.city}}</h1>

      <h1 class="col-12">{{this.weather.temp}}&deg;</h1>
      <h5 class="col-6">{{this.weather.description}}</h5>

      <h5 class="col-6">12 pm</h5>
      <h5 class="col-6">Feels like: {{this.weather.feels_like}}</h5>
      <h5 class="col-6">Humidity: {{this.weather.humidity}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "advanced",
  props: {
    weather: {}
  }
};
</script>
