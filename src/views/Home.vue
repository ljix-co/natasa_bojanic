<template>
  <div class="home">
    <div class="l-side">
      <div class="web-title">
        <h1><b class="f-letter">N</b>ataša</h1>
        <h1><b class="f-letter">B</b>ojanić</h1>
      </div>
      <div class="web-subtitle">
        <p class="subtitle">{{ $t("home.subtitle") }}</p>
      </div>
    </div>
    <div class="r-side">
      <PhotoSlider :images="images"></PhotoSlider>
    </div>
  </div>
</template>

<script>
import PhotoSlider from "../components/PhotoSlider.vue";

export default {
  name: "Home",
  components: {
    PhotoSlider,
  },
  data() {
    return {
      images: [
        {
          id: 1,
          path: require("../../public/images/kamenje.jpg"),
        },
        {
          id: 2,
          path: require("../../public/images/čajnik.jpg"),
        },
        {
          id: 3,
          path: require("../../public/images/kada.jpg"),
        },
      ],
    };
  },
};
</script>
<style scoped>
h1 {
  font-weight: 800;
}
.f-letter {
  color: #ff6b00;
  font-weight: 800;
}
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
}
.l-side {
  width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: 2rem;
  align-items: center;
  justify-content: center;
  height: 85vh;
  align-self: center;
}
.r-side {
  width: 70vw;
  height: 90vh;
  margin-bottom: 5vh;
}
.web-title {
  display: flex;
  flex-direction: column;
  font-weight: 800;
  font-size: 2.5rem;
}
.web-subtitle {
  font-size: 2.5rem;
  width: 25vw;
}
@media only screen and (min-width: 992px) and (max-width: 1280px) {
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    width: 100vw;
    overflow: hidden;
  }
  .l-side {
    width: 90vw;
    height: 35vh;
    margin-top: 10vh;
    margin-left: 0;
  }
  .r-side {
    width: 90vw;
    height: 60vh;
  }
  .web-title {
  }
  .web-subtitle {
    width: 80vw;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  /* .l-side{
    width: 25vw;
  }
  .r-side{
    width: 70vw;
  }
.web-title{
  font-size: 1.8rem;
}
.web-subtitle{
  font-size: 1.5rem;
 
}*/
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    width: 100vw;
    overflow: hidden;
  }
  .l-side {
    width: 90vw;
    height: 35vh;
    margin-top: 10vh;
    margin-left: 0;
  }
  .r-side {
    width: 90vw;
    height: 60vh;
  }
 
  .web-subtitle {
    width: 80vw;
  }
}
@media only screen and (max-width: 768px) {
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    overflow: hidden;
  }
  .l-side {
    margin-left: 0;
    width: 100vw;
    height: 30vh;
    margin-top: 15vh;
  }
  .r-side {
    width: 90vw;
    height: 50vh;
    margin-bottom: 5vh;
  }
  .web-title {
    display: flex;
    flex-direction: column;
    font-weight: 800;
    font-size: 30pt;
  }
  .web-subtitle {
    font-size: 20pt;
    width: 90vw;
  }
}
</style>