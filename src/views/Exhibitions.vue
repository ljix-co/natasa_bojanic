<template>
  <div class="exhibitions">
    <div class="exhibitions" v-if="chosen_exh === null">
      <div
        class="l-title"
        :class="{
          'l-title-en': curLanguage === 'EN',
          'l-title-rs': curLanguage === 'RS',
        }"
      >
        <h1>{{ $t("exhibitions[0].title") }}</h1>
      </div>
      <div class="list-exh">
        <div
          class="exh"
          v-for="(exh, index) in solo_exhs"
          :key="index"
          @click="showExh(exh)"
        >
          <div v-lazyload>
            <img
              :data-url="exh.cover_path"
              src="../../public/images/placeholder.gif"
              alt=""
            />
          </div>
          <div class="exh-txt">
            <h2>{{ exh.title }}</h2>
            <p>{{ exh.place }}</p>
            <div class="date">
              <p>{{ exh.exh_date_start }}</p>
              <p>-</p>
              <p>{{ exh.exh_date_finish }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="r-title">
        <h1>{{ $t("exhibitions[1].title") }}</h1>
      </div>
      <div class="list-exh">
        <div
          class="exh"
          v-for="(exh, index) in group_exhs"
          :key="'g' + index"
          @click="showExh(exh)"
        >
          <div v-lazyload>
            <img
              :data-url="exh.cover_path"
              src="../../public/images/placeholder.gif"
              alt=""
            />
          </div>
          <div class="exh-txt">
            <h2>{{ exh.title }}</h2>
            <p>{{ exh.place }}</p>
            <div class="date">
              <p>{{ exh.exh_date_start }}</p>
              <p>-</p>
              <p>{{ exh.exh_date_finish }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="exhibition" v-if="chosen_exh !== null">
      <button class="btn-back" @click="goBack()">
        <i class="far fa-arrow-alt-circle-left"></i>
      </button>
      <div
        class="l-title-exh"
        :class="{
          'l-title-exh-en': curLanguage === 'EN',
          'l-title-exh-rs': curLanguage === 'RS',
        }"
      >
        <h1>{{ chosen_exh.title }}</h1>
      </div>
      <div class="des-rev" v-if="chosen_exh.dsc != '' || chosen_exh.rev != ''">
        <h2 class="txt-title" v-if="chosen_exh.dsc != ''">
          {{ $t("frq_words.description") }}
        </h2>
        <div class="txt" v-html="chosen_exh.dsc"></div>
        <h2 class="txt-title" v-if="chosen_exh.rev != ''">
          {{ $t("frq_words.review") }}
        </h2>
        <div class="txt" v-html="chosen_exh.rev"></div>
      </div>
      <div class="gallery">
        <PhotoSlider
          class="photo-slider"
          v-if="images.length > 0"
          :images="images"
          :chosen_image="chosen_image"
          :mob_slider="mob_slider"
        ></PhotoSlider>
        <Gallery
          v-if="object_array.length > 0"
          :object_array="object_array"
          @choose-object="chooseImage"
        ></Gallery>
      </div>
    </div>
    <loader v-if="loader"></loader>
  </div>
</template>
<script>
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
      type: "exhibtion",
      componentKey: 0,
      group_exhs: [],
      solo_exhs: [],
      chosen_exh: null,
      chosen_image: null,
      mob_slider: false,
      mob_width: false,
    };
  },
  methods: {
    ...mapActions(["changeLoader"]),
    checkLanguage() {
      if (this.curLanguage === "RS") {
        for (let i = 0; i < this.solo_exhs.length; i++) {
          this.solo_exhs[i].title = this.solo_exhs[i].exh_title_rs;
          this.solo_exhs[i].place = this.solo_exhs[i].exh_place_rs;
          this.solo_exhs[i].dsc = this.solo_exhs[i].exh_dsc_rs;
          this.solo_exhs[i].rev = this.solo_exhs[i].exh_rev_rs;
        }
        for (let i = 0; i < this.group_exhs.length; i++) {
          this.group_exhs[i].title = this.group_exhs[i].exh_title_rs;
          this.group_exhs[i].place = this.group_exhs[i].exh_place_rs;
          this.group_exhs[i].dsc = this.group_exhs[i].exh_dsc_rs;
          this.group_exhs[i].rev = this.group_exhs[i].exh_rev_rs;
        }
      }
      if (this.curLanguage === "EN") {
        for (let i = 0; i < this.solo_exhs.length; i++) {
          this.solo_exhs[i].title = this.solo_exhs[i].exh_title_en;
          this.solo_exhs[i].place = this.solo_exhs[i].exh_place_en;
          this.solo_exhs[i].dsc = this.solo_exhs[i].exh_dsc_en;
          this.solo_exhs[i].rev = this.solo_exhs[i].exh_rev_en;
        }
        for (let i = 0; i < this.group_exhs.length; i++) {
          this.group_exhs[i].title = this.group_exhs[i].exh_title_en;
          this.group_exhs[i].place = this.group_exhs[i].exh_place_en;
          this.group_exhs[i].dsc = this.group_exhs[i].exh_dsc_en;
          this.group_exhs[i].rev = this.group_exhs[i].exh_rev_en;
        }
      }
    },
    checkWindowWidth() {
      if (window.innerWidth < 769) {
        this.mob_width = true;
      }
    },
    chooseImage(object) {
     
      this.chosen_image = object;

      if (window.innerWidth > 769) {
        this.scrollToElement();
      }
      if (this.mob_width) {
        this.mob_slider = true;
  
      }
    },
    exitMobSlider() {
      this.mob_slider = false;
      this.chosen_image = null;
      
    },
   
    getExhibitions() {
      this.changeLoader(true);
      axios
        .get(this.baseUrl + "exhibitions", { params: { exh_type: "solo" } })
        .then((res) => {
          console.log(res);
          this.solo_exhs = res.data.data;
          this.checkLanguage();
        });
      axios
        .get(this.baseUrl + "exhibitions", { params: { exh_type: "group" } })
        .then((res) => {
          console.log(res);
          this.group_exhs = res.data.data;
          this.checkLanguage();
          this.changeLoader(false);
        });
    },
    goBack() {
      this.chosen_exh = null;
      window.scrollTo(0, 0);
      this.images = [];
      this.object_array = [];
    },
    showExh(exh) {
      this.mob_slider = false;
      this.chosen_exh = exh;
      let id = exh.exh_id;
      this.changeLoader(true);
      axios
        .get(this.baseUrl + "exh_images", { params: { exh_id: id } })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            
            this.images.push({
              id: res.data.data[i].img_id,
              path: res.data.data[i].img_path,
            });
            this.object_array.push({
              id: res.data.data[i].img_id,
              cover_path: res.data.data[i].img_path,
            });
          }
          this.changeLoader(false);
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
  computed: {
    ...mapState(["baseUrl", "curLanguage", "loader"]),
  },
  mounted() {
    this.getExhibitions();
    this.checkWindowWidth();
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
h1 {
  font-size: 5rem;
  font-weight: 800;
}
img {
  width: 20vw;
  cursor: pointer;
}
.btn-back {
  position: fixed;
  left: 7vw;
  top: 10vh;
  background-color: transparent;
  border: none;
  font-size: 3rem;
  color: #ff6b00;
  z-index: 2;
  cursor: pointer;
}
.btn-back:focus {
  outline: none;
}
.date {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
.des-rev {
  display: flex;
  flex-direction: column;
  width: 30vw;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  margin-left: 15vw;
}
.exh {
  background-color: #777674;
  /* height: 45vh;*/
  width: 20vw;
}

.exh-txt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
}
.exhibition {
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
}
.exhibitions {
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10vw;
}
.gallery {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  width: 50vw;
  margin-top: 10vh;
}
.l-title {
  position: fixed;
  transform: rotate(270deg);
  top: 50vh;
}
.l-title-en {
  width: 20vw;
  left: 0;
}
.l-title-exh {
  position: fixed;
  transform: rotate(270deg);
  top: 45vh;
  width: 35vw;

  left: -9vw;
}

.l-title-rs {
  width: 40vw;
  left: -8vw;
}
.list-exh {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 20vw;
  min-height: 100vh;
  margin-top: 10vh;
}
.r-title {
  position: fixed;
  transform: rotate(90deg);
  width: 20vw;
  left: 80vw;
  top: 50vh;
}
.txt {
  text-align: justify;
}
.txt-title {
  width: 30vw;
  text-align: start;
  font-size: 26pt;
  font-weight: 400;
  margin-bottom: 5vh;
}
@media only screen and (min-width: 768px) and (max-width: 1280px) {
  h1 {
    font-size: 2.5rem;
  }
  h2{
  font-size: .8rem;
  width: 15vw;
  }
  p{
  font-size: .6rem;
  }
  .btn-back {
    font-size: 2rem;
  }
  .exh-txt {
    height: 15vh;
  }
  .txt-title {
    font-size: 1.5rem;
  }
}
@media only screen and (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  img {
    width: 90vw;
  }
  .btn-back {
    font-size: 2rem;
    top: 10vh;
    left: 8vw;
    background-color: #474646;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .des-rev {
    width: 95vw;
    margin-left: 0;
    margin-top: 2rem;
    background-color: #777674;
  }
  .exhibition {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .exhibitions {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100vw;
    align-items: center;
    justify-content: center;
  }
  .exh {
    width: 90vw;
    height: fit-content;
  }
  .gallery {
    width: 100vw;
  }
  .l-title {
    position: static;
    transform: none;
    margin-top: 10vh;
  }
  .l-title-en {
    width: 90vw;
  }
  .l-title-rs {
    width: 90vw;
  }
  .l-title-exh {
    position: static;
    transform: none;
    margin-top: 20vh;
    width: 90vw;
    text-align: center;
  }
  .list-exh {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100vw;
    min-height: 50vh;
    margin-top: 0;
  }

  .r-title {
    position: static;
    transform: none;
    margin-top: 0;
    width: 90vw;
  }
  .txt {
    width: 85vw;
  }
  .txt-title {
    width: 95vw;
    margin-left: 0;
    background-color: #555;
    text-align: center;
    font-size: 1.5rem;
  }
}
</style>