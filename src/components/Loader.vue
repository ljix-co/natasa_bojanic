<template>
  <div class="loader">
    <div>
      <div class="spiner-dark"></div>
      <div class="spiner-dark spiner-orng"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spinBack {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #a7a6a76e;
  z-index: 3;
}
.spiner-dark {
  position: absolute;
  border: 10px solid transparent;
  border-top: 10px dashed #343333;
  border-left: 10px dashed #343333;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  left: 50vw;
  top: 40vh;

  animation: 2s spin linear infinite;
}
.spiner-orng {
  border: 10px solid transparent;
  border-bottom: 10px dashed #ff6b00;
  border-right: 10px dashed #ff6b00;
  border-radius: 50%;

  left: 50vw;
  top: 40vh;

  animation: 1s spinBack linear infinite;
}
@media only screen and (min-width: 992px) and (max-width: 1280px) {
  .spiner-dark {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    left: 45vw;
    border: 5px solid transparent;
    border-top: 5px dashed #343333;
    border-left: 5px dashed #343333;
  }
  .spiner-orng {
    left: 45vw;
    border-bottom: 5px dashed #ff6b00;
    border-right: 5px dashed #ff6b00;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .spiner-dark {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    left: 45vw;
    border: 5px solid transparent;
    border-top: 5px dashed #343333;
    border-left: 5px dashed #343333;
  }
  .spiner-orng {
    left: 45vw;
    border-bottom: 5px dashed #ff6b00;
    border-right: 5px dashed #ff6b00;
  }
}
@media only screen and (max-width: 768px) {
  .spiner-dark {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    left: 45vw;
    border: 5px solid transparent;
    border-top: 5px dashed #343333;
    border-left: 5px dashed #343333;
  }
  .spiner-orng {
    left: 45vw;
    border-bottom: 5px dashed #ff6b00;
    border-right: 5px dashed #ff6b00;
  }
}
</style>