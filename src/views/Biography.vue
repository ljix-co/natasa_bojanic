<template>
  <div class="author">
    <div
      class="bio"
      :class="{
        'bio-en': curLanguage === 'EN',
        'bio-rs': curLanguage === 'RS',
      }"
      v-html="aut_info.bio"
    ></div>

    <img :src="aut_info.img_path" alt="" />
    <loader v-if="loader"></loader>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import Loader from '../components/Loader.vue';
export default {
  components: { Loader },
  data() {
    return {
      aut_info: {},
    };
  },
  methods: {
    ...mapActions(['changeLoader']),
    checkLaguage() {
      if (this.curLanguage === "EN") {
        this.aut_info.bio = this.aut_info.aut_bio_en;
      }
      if (this.curLanguage === "RS") {
        this.aut_info.bio = this.aut_info.aut_bio_rs;
        console.log(this.curLanguage);
      }
    },
    getAutInfo() {
      this.changeLoader(true)
      axios.get(this.baseUrl + "author").then((res) => {
        console.log(res);
        this.aut_info = res.data.data[0];
        this.checkLaguage();
        this.changeLoader(false)
      });
    },
  },
  computed: {
    ...mapState(["baseUrl", "curLanguage", 'loader']),
  },
  mounted() {
    this.getAutInfo();
  },
  watch: {
    curLanguage: {
      handler() {
        this.checkLaguage();
      },
    },
  },
};
</script>
<style scoped>
img {
  width: 50vw;
  margin-top: 15vh;
}
.author {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  gap: 10vw;
}
.bio {
  width: 40vw;
  text-align: justify;
  margin-top: 15vh;
  margin-left: 10vw;
}

</style>