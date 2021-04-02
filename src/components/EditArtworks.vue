<template>
    <div class="edit">
    <div>
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
</style>