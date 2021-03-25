<template>
  <div class="edit-images">
    <div class="top">
      <div class="top-btn-div">
        <button class="btn-exit" @click="exit()">
          <i class="fas fa-times exit"></i>
        </button>
      </div>
      <div class="title">
        <h1 class="top-title">
          {{ $t("frq_words.change") }}
          {{ $t(`frq_words.images`) }}
        </h1>
      </div>
      <div class="top-btn-div">
        <button class="sbmt" @click="submit()">
          {{ $t("button.submit") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: Array,
  },
  data() {
    return {};
  },
  methods: {
    exit() {
      this.$emit("exit-editor");
    },
  },
};
</script>
<style scoped>
.btn-exit {
  background-color: transparent;
  border: none;
  width: 4rem;
  cursor: pointer;
}
.btn-exit:focus {
  outline: none;
}
.edit-images {
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #777674;
  margin-left: 5vw;
}
.exit {
  color: #343333;
  font-size: 4rem;
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin-top: 10vh;
}
.sbmt {
  font-family: "Open Sans", sans-serif;
  background-color: #343333;
  color: white;
  width: 10vw;
  height: 7vh;
  font-size: 1.5rem;
  font-weight: 800;
  border: none;
}
.sbmt:focus {
  outline: 3px solid #ff6b00;
}
.title {
  color: #343333;
  width: 30vw;
  text-align: center;
}
.top {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin-top: 5vh;
}
.top-btn-div {
  width: 30vw;
}
.top-title {
  font-weight: 800;
  font-size: 46pt;
}
</style>