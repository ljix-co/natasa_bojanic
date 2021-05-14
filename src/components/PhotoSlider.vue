<template>
  <div
    class="photo-slider"
    :class="{
      'slider-admin': admin_route,
      'slider-artworks': artworks_page || workshop_page,
      'slider-exh': exh_page,
      'slider-home': home_page,
      'slider-mob-hide': show_slider === false && home_page === false,
      'slider-mob-show': show_slider,
    }"
  >
    <div><i class="fas fa-chevron-left ctrl left" @click="prevImg()"></i></div>
    <div class="img-content">
      <div class="delete-img-div" v-if="admin_route">
        <i class="far fa-trash-alt delete" @click="deleteImg()"></i>
      </div>
      <div class="exit-div" :class="{ 'show-exit': show_slider }">
        <i class="fas fa-times exit" @click="exitSlider"></i>
      </div>
      <img
        :class="{
          artwork_img: artworks_page || workshop_page,
          admin_img: admin_route,
          home_img: home_page,
          exh_img: exh_page,
        }"
        :src="image"
        alt=""
        v-hammer:swipe.left.right="swipeFunction"
      />
      <div class="num-imgs">
        <div
          class="circle"
          v-for="(image, index) in images"
          :key="'c' + index"
          :class="{'circle-active': image.active === true}"
        ></div>
      </div>
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
    chosen_image: Object,
    mob_slider: Boolean,
    mob_width: Boolean,
  },
  data() {
    return {
      image: null,
      index: 0,
      admin_route: false,
      home_page: true,
      artworks_page: false,
      exh_page: false,
      workshop_page: false,
      show_slider: false,
      // elementKey: 0
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
    checkPage() {
      if (this.$route.name === "Admin") {
        this.admin_route = true;
      }
      if (this.$route.name !== "Home") {
        this.home_page = false;
      }
      if (this.$route.name === "Artworks") {
        this.artworks_page = true;
      }
      if (this.$route.name === "Exhibitions") {
        this.exh_page = true;
      }
      if (this.$route.name === "Workshops") {
        this.workshop_page = true;
      }
    },
    exitSlider() {
      this.show_slider = false;
      this.$emit("exit-mob-slider");
    },
    firstImage() {
      this.images[0].active = true;
      this.image = this.images[0].path;
    },
    forceRerender() {
      this.elementKey++;
    },
    nextImg() {
      if (this.index != this.images.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
      for(let i = 0; i < this.images.length; i++) {
        if(this.images[i].active === true) {
          this.images[i].active = false;
        }
      }
      this.images[this.index].active = true;
      this.image = this.images[this.index].path;
    },
    prevImg() {
      if (this.index != 0) {
        this.index--;
      } else {
        this.index = this.images.length - 1;
      }
       for(let i = 0; i < this.images.length; i++) {
        if(this.images[i].active === true) {
          this.images[i].active = false;
        }
      }
      this.images[this.index].active = true;
      this.image = this.images[this.index].path;
    },
    showChosenImg() {
      for (let i = 0; i < this.images.length; i++) {
        if (this.chosen_image.cover_path === this.images[i].path) {
          this.image = this.images[i].path;
          this.index = i;
        }
      }
    },
    showSlider() {
      if (this.mob_slider === true) {
        this.show_slider = true;
      }
    },
    swipeFunction(event) {
      if (event.type === "swipeleft") {
        this.nextImg();
      }
      if (event.type === "swiperight") {
        this.prevImg();
      }
    },
  },
  mounted() {
    this.firstImage();
    this.checkPage();
  },
  watch: {
    chosen_image: {
      deep: true,

      handler() {
        if (this.chosen_image !== null) {
          this.showChosenImg();
          this.showSlider();
        }
      },
    },
    mob_slider: {
      immediate: true,
      handler() {
        if (this.mob_slider === true && this.artworks_page === true) {
          this.showSlider();
        }
      },
    },
  },
};
</script>
<style scoped>
.admin_img {
  width: 30vw;
  height: 50vh;
  object-fit: contain;
}
.artwork_img {
  width: 70vw;
  height: 85vh;
  object-fit: contain;
  background-color: #474646;
  margin-top: 10vh;
  margin-bottom: 5vh;
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

.ctrl {
  font-size: 3rem;
  z-index: 1;
  color: #a7a6a7;
  cursor: pointer;
}
.exh_img {
  width: 45vw;
  height: 70vh;
  object-fit: contain;
  background-color: #474646;
  margin-top: 10vh;
  margin-bottom: 5vh;
}
.exit-div {
  visibility: hidden;
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
.slider-artworks {
  width: 70vw;
  margin-left: 15vw;
}
.slider-exh {
  width: 45vw;
}
.slider-home {
  width: 70vw;
  margin-top: 10vh;
}
@media only screen and (min-width: 992px) and (max-width: 1280px) {
  .home_img {
    width: 90vw;
    height: 50vh;
    object-fit: contain;
  }

  .slider-home {
    margin-top: 5vh;
    width: 90vw;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .ctrl {
    font-size: 1.5rem;
  }
  .home_img {
    width: 90vw;
    height: 50vh;
    object-fit: contain;
  }
  .exh_img {
    height: 30vh;
  }
  .slider-home {
    margin-top: 5vh;
    width: 90vw;
  }

  .delete-img-div {
    font-size: 1.5rem;
    margin-top: 0;
  }
}
@media only screen and (max-width: 768px) {
  .admin_img {
    width: 80vw;
  }
  .artwork_img,
  .exh_img {
    width: 90vw;
    height: 70vh;
    object-fit: contain;
    background-color: #474646;
    margin-top: 2rem;
    margin-bottom: 2vh;
  }
  .circle {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #ff6b00;
    
  }
  .circle-active {
    background-color: gray;
  }
  .delete-img-div {
    width: 80vw;
  }
  .exit {
    font-size: 2rem;
    color: #ff6b00;
  }

  .home_img {
    width: 90vw;
    height: 40vh;
    object-fit: contain;
  }

  .left {
    visibility: hidden;
  }
  .num-imgs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    width: 90vw;
    position: absolute;
  
   
  }
  .right {
    visibility: hidden;
  }
  .show-exit {
    visibility: visible;

    width: 89vw;
    margin-top: 2rem;
    margin-bottom: .5rem;
    text-align: end;
  }
  .slider-artworks,
  .slider-exh {
    width: 90vw;
    margin-left: 1rem;
  }
  .slider-mob-hide {
    visibility: hidden;
    height: 10vh;
  }
  .slider-mob-show {
    visibility: visible;
    position: fixed;
    top: 5vh;
    height: 100vh;
    width: 100vw;
    background-color: #474646;
    margin-left: 0%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 1;
  }
  .slider-home {
    width: 100vw;
    margin-top: 0;
  }
}
</style>