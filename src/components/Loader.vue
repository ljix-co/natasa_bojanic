<template>
  <div class="loader">
    <div>
      <div
        class="spiner-dark"
        :class="{ 'spiner-dark-full': full_dark_circle }"
      ></div>
      <div
        class="spiner-dark spiner-orng"
        :class="{
          'spiner-orng-full': full_circle,
          'spiner-start-orng': start_orng,
        }"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      full_circle: false,
      full_dark_circle: false,
      start_orng: true,
    };
  },
  methods: {
    // fullCircle() {
    //   setInterval(() => {
    //     this.full_dark_circle = false;
    //     this.full_circle = false;

    //     setTimeout(() => {
    //       this.full_circle = true;
    //       setTimeout(() => {
    //         this.full_dark_circle = true;
    //         setTimeout(() => {
    //           this.start_orng = true;
    //           this.full_dark_circle = false;
    //           this.full_circle = false;
    //         }, 1000);
    //       }, 1000);
    //     }, 1000);
    //   }, 5000);
    // },
  },
  mounted() {
    // this.fullCircle();
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
/*.spiner-orng div:nth-child(1) {
  animation-delay: -0.45s;
}
.spiner-orng div:nth-child(2) {
  animation-delay: -0.3s;
}
.spiner-orng div:nth-child(3) {
  animation-delay: -0.15s;
}*/
.spiner-dark-full {
  border: 10px solid #343333;
  z-index: 5;
}
.spiner-orng-full {
  border: 10px solid #ff6b00;
}
</style>