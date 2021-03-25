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
</style>