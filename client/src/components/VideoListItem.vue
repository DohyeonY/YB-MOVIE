<template>
  <div id="div1" @click="goApp">
    <img :src="thumbnails" alt="" style="width:150px">
  </div>
</template>

<script>
export default {
  name: 'VideoListItem',
  props: {
    video: Object,
    thumbnails: String,
  },
  methods: {
    goApp() {
      this.$emit('goApp', this.video.id.videoId)
    }
  }
}
</script>

<style>
#div1 {
  /* display: flex; */
  margin-top: 20px;
}
</style>