<template>
  <div id="widget-carousel">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <Weather />
        </div>
        <div class="carousel-item">
          <div id="weather">
            <div class="row">
              <h3 class="col-12">
                <i class="fas fa-map-marker"></i> New York
              </h3>
              <label for class="col-12 col-sm-6">Saturday, 21 December</label>
              <label for class="col-12 col-sm-6">
                <i class="fas fa-cloud"></i> Mostly Cloudy
              </label>
              <h1 class="col-6">16&deg;</h1>
              <h3 class="col-6">16&deg; / 9&deg;</h3>
            </div>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import Weather from "./Weather";

export default {
  name: "widget",
  components: { Weather }
};
</script>

<style></style>
