<template>
    <div class="edit">
    <div class="edit-artworks">
     <div class="title">
        <h1>{{ $t("admin[1].title") }}</h1>
      </div>
      <div class="sqrs">
      <div class="sqr" @click="addArtwork()">
      <div class="inner-sqr">
      <i class="fas fa-plus icon"></i>
      </div>
      </div>
        <div class="sqr" @click="editArtworks()">
      <div class="inner-sqr">
      <i class="fas fa-edit icon"></i>
      </div>
      </div>
      </div>
      </div>
    
    </div>
</template>
<script>

export default {
  components: {  },
    props: {
        artworks: Array,
        type: String
    },
    data() {
        return{
           
        }
    },
    methods: {
        addArtwork() {
            this.$emit('add');
        },
        editArtworks() {
            this.$emit('edit');
        }
    }
}
</script>
<style scoped>
.icon{
font-size: 4rem;
color: #FF6B00;
}
.inner-sqr{
width: 10vw;
height: 10vw;
border: 5px dashed #A7A6A7;
display: flex;
align-items: center;
justify-content: center;
}
.sqr{
width: 20vw;
height: 20vw;
border: 10px solid #FF6B00;
margin-top: 10vw;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
}
.sqrs{
display: flex;
width: 60vw;
gap: 10vw;
margin-left: 25vw;
align-items: center;
justify-content: center;
margin-top: 5vh;
}
.title {
  transform: rotate(270deg);
  width: 40vw;
  position: absolute;
  left: -10rem;
  font-size: 20pt;
  font-weight: 800;
  margin-top: 20vw;
}
@media only screen and (min-width: 768px) and (max-width: 1280px) {
  .inner-sqr{
    width: 15vw;
    height: 15vw;
  }
.title{
  font-size: 1rem;
   left: -5rem;
}
}
@media only screen and (max-width: 768px) {
  .edit-artworks{
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .inner-sqr{
    width: 30vw;
    height: 30vw;
  }
  .sqr{
    width: 60vw;
    height: 60vw;
    margin-left: 0;
    margin-top: 0;
  }
  .sqrs{
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-left: 0;
  }
 .title {
    position: static;
    transform: rotate(0deg);
    width: 90vw;
    background-color: #777674;
    font-size: 1rem;
    color: #343333;
  }
}
</style>