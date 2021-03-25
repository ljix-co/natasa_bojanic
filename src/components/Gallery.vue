<template>
  <div class="gallery">
    <div class="list-items">
      <div
        class="item"
        v-for="(object, index) in object_array"
        :key="index"
        v-lazyload
      >
        <div class="delete-img-div" v-if="admin_page">
          <i class="far fa-trash-alt delete" @click="deleteObject(object)"></i>
        </div>
        <img :data-url="object.cover_path" src="../../public/images/placeholder.gif" alt="" @click="chooseObject(object)"/>

        <div class="item-dtls">
          <div class="dtl">
            <p>{{ $t("frq_words.title") }}:</p>
            <p class="dtl-txt">{{ object.title }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.dimensions") }}:</p>
            <p class="dtl-txt">{{ object.art_dmns }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.material") }}:</p>
            <p class="dtl-txt">{{ object.material }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.technique") }}:</p>
            <p class="dtl-txt">{{ object.technique }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.price") }}:</p>
            <p class="dtl-txt">{{ object.art_price }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.year") }}:</p>
            <p class="dtl-txt">{{ object.art_year }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.for_sale") }}:</p>
            <p class="dtl-txt" v-if="object.art_forsale === 0">
              {{ $t("frq_words.no") }}
            </p>
            <p class="dtl-txt" v-else-if="object.art_forsale === 1">
              {{ $t("frq_words.yes") }}
            </p>
          </div>
          <div class="dtl" v-if="type === 'exhibition'">
            <p>{{ $t("frq_words.place") }}:</p>
            <p class="dtl-txt">{{ object.place }}</p>
          </div>
          <div class="dtl" v-if="type === 'exhibition'">
            <p>{{ $t("frq_words.date") }}:</p>
            <p class="dtl-txt">{{ object.exh_date_start }}</p>
            <p>-</p>
            <p class="dtl-txt">{{ object.exh_date_finish }}</p>
          </div>
          <div class="dtl" v-if="type === 'exhibition'">
            <p>{{ $t("frq_words.type") }}:</p>
            <p class="dtl-txt">{{ object.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import PhotoSlider from "./PhotoSlider.vue";
import { mapState } from "vuex";
// import axios from "axios";
export default {
  components: {},
  props: {
    type: String,
    gallery_style: String,
    object_array: Array,
  },
  data() {
    return {
      title: "",
      material: "",
      technique: "",
      description: "",
      review: "",
      place: "",
      admin_page: false,
    };
  },
  methods: {
    checkIfAdmin() {
      if (this.$route.name === "Admin") {
        this.admin_page = true;
      }
    },
    chooseObject(object) {
      if (this.$route.name === "Admin") {
        if (this.type === "artwork") {
          this.$emit("choose-artwork", object);
        }
        if (this.type === "exhibition") {
          this.$emit("choose-exh", object);
        }
      }
    },
    deleteObject(object){
      console.log(object)
      this.$emit('delete-object', object);
    }
  },
  computed: {
    ...mapState(["curLanguage", "baseUrl"]),
  },
  mounted() {
    this.checkIfAdmin();
  },
};
</script>
<style scoped>
img {
  width: 20vw;
  height: 30vh;
  object-fit: contain;
}
.delete {
  cursor: pointer;
}
.delete-img-div {
  font-size: 2rem;
  color: #ff6b00;
  margin-left: -5rem;
  width: 25vw;
  text-align: end;
  margin-top: 2rem;
}
.dtl {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}
.dtl-txt {
  font-size: 1.2rem;
  color: #343333;
}
.item {
  width: 20vw;
  height: fit-content;
  background-color: #777674;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.item-dtls {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;
  color: #d9d9d9;
  font-weight: 300;
  margin-left: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 20vw;
}
.list-items {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50vw;
}
.photo-slider {
  top: 10vh;
  margin-left: -10vw;
  width: 30vw;
}
</style>