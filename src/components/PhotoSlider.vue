<template>
  <div
    class="photo-slider"
    :class="{
      'slider-admin': admin_route,
      'slider-artworks': artworks_page,
      'slider-exh': exh_page,
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
          artwork_img: artworks_page,
          admin_img: admin_route,
          home_img: home_page,
          exh_img: exh_page,
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
    chosen_image: Object
  },
  data() {
    return {
      image: null,
      index: 0,
      admin_route: false,
      home_page: true,
      artworks_page: false,
      exh_page: false,
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
      console.log(this.$route.name)
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
    },
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
    showChosenImg() {
        for(let i = 0; i < this.images.length; i++) {
          if(this.chosen_image.cover_path === this.images[i].path) {
            this.image = this.images[i].path;
            this.index = i;
          }
        }
    }
  },
  mounted() {
    this.firstImage();
    this.checkPage();
  },
  watch: {
    chosen_image: {
      deep: true,
      handler() {
        this.showChosenImg();
      }
    }
  }
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
.slider-home{
  width: 70vw;
  margin-top: 10vh;
}
</style>