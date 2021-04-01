<template>
  <div id="app">
    <div id="nav">
      <div class="nav">
        <router-link class="link" to="/">{{
          $t("links[0].title")
        }}</router-link>
        <router-link class="link" to="/artworks" >{{
          $t("links[1].title")
        }}</router-link>
        <router-link class="link" to="/exhibitions">{{
          $t("links[2].title")
        }}</router-link>
         <router-link class="link" to="/workshops">{{
          $t("links[3].title")
        }}</router-link>
        <router-link class="link" to="/biography">{{
          $t("links[4].title")
        }}</router-link>
        <router-link class="link" to="/contact">{{
          $t("links[5].title")
        }}</router-link>
        <LocalSwitcher />
      </div>
    </div>
    <router-view class="view" />
    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import Footer from "./components/Footer.vue";
import LocalSwitcher from "./components/LocalSwitcher.vue";

export default {
  components: {
    LocalSwitcher,
    Footer,
  },

};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
button {
  cursor: pointer;
}
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d9d9d9;
  background-color: #343333;
  min-height: 100vh;
  height: fit-content;
}

#nav {
  padding: 30px;
  position: fixed;
  top: 0;
  background-color: #343333;
  width: 100vw;
  z-index: 2;
  height: 4rem;
}

#nav a {
  font-weight: 800;
  color: #d9d9d9;
  font-size: 19.9pt;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ff6b00;
}

.nav {
}
.link {
  margin-left: 1.5rem;
}
.view {
  min-height: 70vh;
}
</style>
