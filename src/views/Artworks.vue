<template>
  <div class="artworks">
    <PhotoSlider
      :key="componentKey"
      class="photo-slider"
      v-if="images.length > 0"
      :images="images"
    ></PhotoSlider>
    <Gallery
      :type="type"
      :object_array="object_array"
      @choose-object="chooseObject"
    ></Gallery>
  </div>
</template>
<script>
//
import { mapState } from "vuex";
import axios from "axios";
import PhotoSlider from "../components/PhotoSlider.vue";
import Gallery from "../components/Gallery.vue";
export default {
  components: {
    PhotoSlider,
    Gallery,
  },
  data() {
    return {
      object_array: [],
      images: [],
      type: "artwork",
      componentKey: 0,
    };
  },
  methods: {
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
    chooseObject(object) {
      let id = object.img_id;
      this.images = [];
      this.images[0] = {
        id: id,
        path: object.cover_path,
      };
      console.log(this.images);
      axios
        .get(this.baseUrl + "dtls_images", { params: { img_id: id } })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.images.push({
              id: res.data.data[i].dimg_id,
              path: res.data.data[i].img_path,
            });
            this.forceRerender();
          }
        });
      this.forceRerender();
      this.scrollToElement();
    },
    forceRerender() {
      this.componentKey += 1;
    },
    getArtworks() {
      axios.get(this.baseUrl + "artworks").then((res) => {
        console.log(res.data.data);
        this.object_array = res.data.data;
        this.checkLanguage();
        let id = res.data.data[0].img_id;
        this.images.push({
          id: id,
          path: res.data.data[0].cover_path,
        });
        // console.log(this.images)
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
          });
      });
    },
    scrollToElement() {
      const el = this.$el.getElementsByClassName("photo-slider")[0];

      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  mounted() {
    this.getArtworks();
  },
  computed: {
    ...mapState(["baseUrl", "curLanguage"]),
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
</style>