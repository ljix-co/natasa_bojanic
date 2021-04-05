<template>
  <div class="home">
   <div class="l-side">
   <div class="web-title">
   <h1><b class="f-letter">N</b>ataša</h1>
    <h1><b class="f-letter">B</b>ojanić</h1>
   </div>
   <div class="web-subtitle">
   <p class="subtitle">{{$t('home.subtitle')}}</p>
   </div>
   </div>
   <div class="r-side">
     <PhotoSlider :images="images"></PhotoSlider>
   </div>
  </div>
</template>

<script>
import PhotoSlider from '../components/PhotoSlider.vue'

export default {
  name: 'Home',
  components: {
    PhotoSlider
  },
  data() {
    return{
      images: [
        {
          id: 1,
          path: require('../../public/images/kamenje.jpg')
        },
          {
          id: 2,
          path: require('../../public/images/čajnik.jpg')
        },
          {
          id: 3,
          path: require('../../public/images/kada.jpg')
        }
      ]
    }
  },

}
</script>
<style scoped>
h1{
  font-weight: 800; 
}
.f-letter{
  color: #FF6B00;
  font-weight: 800; 
}
.home{
  display: flex;
  align-items: center;
  justify-content: center;
 
}
.l-side{
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
.r-side{
  width: 70vw;
  height: 90vh;
  margin-bottom: 5vh;
}
.web-title{
  display: flex;
  flex-direction: column;
   font-weight: 800;
  font-size: 30pt;
}
.web-subtitle{
  font-size: 30pt;
  width: 25vw;
}
</style>