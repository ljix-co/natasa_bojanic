<template>
  <div class="locale-switcher">

    <div 
      v-for="(lang, i) in langs"
      :key="`Lang${i}`"
      @click="switchLocal(lang)"
      
    >
    <div class="lang" v-if="currentLang !== lang.lang">
      <img :src="lang.flag" alt="" />
      <h1>{{ lang.lang }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
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
    switchLocal(lang) {
      if (this.$i18n.locale !== lang.lang.toLowerCase()) {
        this.$i18n.locale = lang.lang.toLowerCase();
        this.currentLang = lang.lang;
      }
    },
  },
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
  top: 4vh;
  left: 85vw;
}
</style>