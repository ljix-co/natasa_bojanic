<template>
  <div class="photo-slider">
    <div><i class="fas fa-chevron-left ctrl left" @click="prevImg()"></i></div>
    <div>
      <img :src="image" alt="" />
    </div>
    <div><i class="fas fa-chevron-right ctrl right" @click="nextImg()"></i></div>
  </div>
</template>
<script>
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      image: null,
      index: 0,
    };
  },
  methods: {
    firstImage() {
      this.image = this.images[0].path;
    },
    nextImg() {
      if (this.index != this.images.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }

      this.image = this.images[this.index].path;
    },
    prevImg() {
      if (this.index != 0) {
        this.index--;
      } else {
        this.index = this.images.length - 1;
      }
      this.image = this.images[this.index].path;
    },
  },
  mounted() {
    this.firstImage();
  },
};
</script>
<style scoped>
img{
    width: 70vw;
    height: 85vh;
    object-fit: cover;
}
.ctrl {
  font-size: 3rem;
  z-index: 1;
  color: #A7A6A7;
  cursor: pointer;
}
.left{
    position: absolute;
    margin-left: 2rem;
}
.right{
    position: absolute;
    margin-left: -4vw;
}
.photo-slider {
  display: flex;
  align-items: center;
}
</style>