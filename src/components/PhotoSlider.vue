<template>
  <div
    class="photo-slider"
    :class="{
      'slider-admin': admin_route,
      'slider-guest': admin_route === false && home_page === false,
      'slider-home': home_page,
    }"
  >
    <div><i class="fas fa-chevron-left ctrl left" @click="prevImg()"></i></div>
    <div>
      <div class="delete-img-div" v-if="admin_route">
        <i class="far fa-trash-alt delete" @click="deleteImg()"></i>
      </div>
      <img
        :class="{
          img: admin_route === false,
          admin_img: admin_route,
          home_img: home_page,
        }"
        :src="image"
        alt=""
      />
    </div>
    <div>
      <i class="fas fa-chevron-right ctrl right" @click="nextImg()"></i>
    </div>
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
      admin_route: false,
      home_page: true,
    };
  },
  methods: {
    deleteImg() {
      for (let i = 0; i < this.images.length; i++) {
        if (this.image === this.images[i].path) {
          let image_id = this.images[i].id;
          this.$emit("delete-img", image_id);
        }
      }
    },
    firstImage() {
      this.image = this.images[0].path;
      if (this.$route.name === "Admin") {
        this.admin_route = true;
        this.home_page = false;
      }
      if (this.$route.name !== "Home") {
        this.home_page = false;
      }
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
.admin_img {
  width: 30vw;
  height: 50vh;
  object-fit: contain;
}
.delete {
  cursor: pointer;
}
.delete-img-div {
  font-size: 2rem;
  color: #ff6b00;
  position: absolute;
  width: 30vw;
  text-align: end;
  margin-top: 2rem;
}
.img {
  width: 70vw;
  height: 85vh;
  object-fit: contain;
  background-color: #474646;
  margin-top: 10vh;
  margin-bottom: 5vh;
}
.ctrl {
  font-size: 3rem;
  z-index: 1;
  color: #a7a6a7;
  cursor: pointer;
}
.home_img {
  width: 70vw;
  height: 85vh;
  object-fit: cover;
}
.left {
  position: absolute;
  margin-left: 2rem;
}
.right {
  position: absolute;
  margin-left: -4vw;
}
.photo-slider {
  display: flex;
  align-items: center;
 
}
.slider-guest {
  width: 70vw;
  margin-left: 15vw;
}
</style>