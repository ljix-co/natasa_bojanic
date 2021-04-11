<template>
  <div class="locale-switcher">

    <div 
      v-for="(lang, i) in langs"
      :key="`Lang${i}`"
      @click="switchLocal(lang)"
      
    >
    <div class="lang" v-if="currentLang !== lang.lang">
      <img :src="lang.flag" alt="" />
     
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: "locale-changer",
  data() {
    return {
      langs: [
        { lang: "EN", flag: require("../../public/images/en.png") },
        { lang: "RS", flag: require("../../public/images/rs.png") },
      ],
      currentLang: "EN"
    };
  },
  methods: {
    ...mapActions(["changeCurLanguage"]),
    switchLocal(lang) {
      if (this.$i18n.locale !== lang.lang.toLowerCase()) {
        this.$i18n.locale = lang.lang.toLowerCase();
        this.currentLang = lang.lang;
        this.changeCurLanguage(lang.lang);
      }
    },
  },
  computed: {
    ...mapState(["curLanguage"])
  }
};
</script>
<style scoped>
h1 {
  font-size: 12pt;
}
img {
  width: 40px;
  height: 30px;
  object-fit: cover;
  filter: grayscale(40%);
}
.lang{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
}
.locale-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2rem;
  left: 85vw;
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
.lang-title{
display: none;
}
.locale-switcher{
top: 1.5rem;

}
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  img{
    width: 30px;
    height: 20px;
  }
.lang-title{
display: none;
}
.locale-switcher{
top: 2rem;
margin-left: 1rem;
}
}
@media only screen and (max-width: 768px) {
.lang-title{
display: none;
}
}
</style>