<template>
  <div id="reccomand">
    <h3>{{ username }}님이 좋아할 만한 영화</h3>
    <v-carousel
      align="center"
      justify="center"
    >
      <v-carousel-item
        v-for="movie in movies"
        :key="movie.id"
      >
        <v-img
          :src="movie.img_url"
          width="314px"
          margin="auto"
        >
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {

  props: {
    movies: {
      type: Array,
      required: false,
    },
    username: String
  }

}
</script>

<style>

</style>