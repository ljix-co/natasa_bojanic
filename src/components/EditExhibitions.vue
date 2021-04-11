<template>
  <div class="edit">
    <div class="title">
      <h1>{{ $t("admin[2].title") }}</h1>
    </div>
    <div class="sqrs">
      <div class="sqr" @click="addExh()">
        <div class="inner-sqr">
          <i class="fas fa-plus icon"></i>
        </div>
      </div>
      <div class="btns">
        <button @click="editSoloExh()">{{ $t("button.solo") }}</button>
        <button @click="editGroupExh()">{{ $t("button.group") }}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    exhibitions: Array,
  },
  methods: {
    addExh() {
      this.$emit("add-exh");
    },
    editSoloExh() {
      this.$emit("edit-solo");
    },
    editGroupExh() {
      this.$emit("edit-group");
    },
  },
};
</script>
<style scoped>
button {
  font-family: "Open Sans", sans-serif;
  background-color: #777674;
  color: white;
  width: 10vw;
  height: 7vh;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
button:focus {
  outline: 3px solid #ff6b00;
}
.btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  width: 20vw;
  height: 20vw;
  margin-top: 10vw;
}
.icon {
  font-size: 4rem;
  color: #ff6b00;
}
.inner-sqr {
  width: 10vw;
  height: 10vw;
  border: 5px dashed #a7a6a7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sqr {
  width: 20vw;
  height: 20vw;
  border: 10px solid #ff6b00;
  margin-top: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.sqrs {
  display: flex;
  width: 60vw;
  gap: 10vw;
  margin-left: 25vw;
  align-items: center;
  justify-content: center;
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
  button{
    font-size: 1rem;
    width: 20vw;
  }
.title{
  font-size: 1rem;
   left: -5rem;
}
}
@media only screen and (max-width: 768px) {
  button{
    width: 50vw;
  }
  .btns{
    width: 90vw;
    height: 30vh;
  }
  .edit{
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