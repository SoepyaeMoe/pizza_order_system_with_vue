<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      url: 'http://localhost:8000/api',
      imgsrc: 'http://localhost:8000/storage/product_img/',
      profileImgSrc: 'http://localhost:8000/storage/profile_pic/'
    }
  }
}
</script>

<style></style>