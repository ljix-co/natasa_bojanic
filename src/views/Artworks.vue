<template>
  <div class="artworks" v-scroll="checkPosition">
    <div class="nav-scroll" :class="{'hide': hideNav}">
      <p>{{ $t("nav.scroll") }}</p>
    </div>
    <div class="nav-go-to" >
      <p @click="goToDtls">{{ $t("nav.go_to_dtls") }}</p>
    </div>
    <PhotoSlider
      :key="componentKey"
      class="photo-slider"
      v-if="images.length > 0"
      :images="images"
      :mob_slider="mob_slider"
    ></PhotoSlider>
    <Gallery
      :type="type"
      :object_array="object_array"
      @choose-object="chooseObject"
    ></Gallery>
    <loader v-if="loader"></loader>
  </div>
</template>
<script>
//
import { mapState, mapActions } from "vuex";
import axios from "axios";
import PhotoSlider from "../components/PhotoSlider.vue";
import Gallery from "../components/Gallery.vue";
import Loader from "../components/Loader.vue";
export default {
  components: {
    PhotoSlider,
    Gallery,
    Loader,
  },
  data() {
    return {
      object_array: [],
      images: [],
      type: "artwork",
      componentKey: 0,
      mob_slider: false,
      hideNav: false
    };
  },
  methods: {
    ...mapActions(["changeLoader"]),
    checkLanguage() {
      if (this.curLanguage === "RS") {
        for (let i = 0; i < this.object_array.length; i++) {
          this.object_array[i].title = this.object_array[i].art_title_rs;
          this.object_array[i].material = this.object_array[i].art_material_rs;
          this.object_array[i].technique = this.object_array[i].art_tech_rs;
        }
      }
      if (this.curLanguage === "EN") {
        for (let i = 0; i < this.object_array.length; i++) {
          this.object_array[i].title = this.object_array[i].art_title_en;
          this.object_array[i].material = this.object_array[i].art_material_en;
          this.object_array[i].technique = this.object_array[i].art_tech_en;
        }
      }
    },
    checkPosition() {
      if(window.scrollY > 300) {
        this.hideNav = true;
      }
      else{
        this.hideNav = false;
      }
    },
    chooseObject(object) {
      this.mob_slider = false;
      let id = object.img_id;
      this.images = [];
      this.images[0] = {
        id: id,
        path: object.cover_path,
      };

      axios
        .get(this.baseUrl + "dtls_images", { params: { img_id: id } })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.images.push({
              id: res.data.data[i].dimg_id,
              path: res.data.data[i].img_path,
            });
            if (window.innerWidth < 769) {
              this.mob_slider = true;
            }
          }
        });

      this.forceRerender();
      if (window.innerWidth > 769) {
        this.scrollToElement();
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
    getArtworks() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "artworks").then((res) => {
        console.log(res.data.data);
        this.object_array = res.data.data;
        this.object_array[0].chosen = true;
        this.checkLanguage();
        let id = res.data.data[0].img_id;
        this.images.push({
          id: id,
          path: res.data.data[0].cover_path,
        });

        axios
          .get(this.baseUrl + "dtls_images", { params: { img_id: id } })
          .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.data.length; i++) {
              this.images.push({
                id: res.data.data[i].dimg_id,
                path: res.data.data[i].img_path,
              });
            }
            this.changeLoader(false);
          });
      });
    },
    goToDtls() {
      const el = this.$el.getElementsByClassName("chosen-obj")[0];
      console.log(el)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    scrollToElement() {
      const el = this.$el.getElementsByClassName("photo-slider")[0];

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  mounted() {
    this.getArtworks();
  },
  computed: {
    ...mapState(["baseUrl", "curLanguage", "loader"]),
  },
  watch: {
    curLanguage: {
      handler() {
        this.checkLanguage();
      },
    },
  },
};
</script>
<style scoped>
p {
  color: #ff6b00;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.hide{
opacity: .1;

}
.nav-scroll {
  position: absolute;
  left: 2rem;
  top: 90vh;
  width: 10vw;
  border-bottom: 5px solid white;
}
.nav-go-to {
  position: absolute;
  left: 87vw;
  top: 90vh;
  width: 10vw;
  border-bottom: 5px solid white;
  cursor: pointer;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
p{
font-size: .7rem;
}
}
@media only screen and (max-width: 768px) {
.nav-scroll, .nav-go-to{
visibility: hidden;
}  
}
</style>