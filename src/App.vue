<template>
  <div id="app">
    <div id="nav">
      <img class="logo" src="./../public/images/transparent_logo.png" alt="" />
      <div class="menu">
        <i class="fas fa-ellipsis-h menu-bar" @click="showMenu"></i>
      </div>
      <LocalSwitcher />
      <div :class="{ nav: show_menu, hide: hide_menu }">
        <router-link class="link" to="/">{{
          $t("links[0].title")
        }}</router-link>
        <router-link class="link" to="/artworks">{{
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

        <div class="admin-links" v-if="loggedIn">
          <router-link class="icon" to="/admin"
            ><i class="fas fa-pen icon"></i
          ></router-link>
          <button class="btn" @click="logout()">LOGOUT</button>
        </div>
      </div>
    </div>
    <router-view class="view" />
    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import Footer from "./components/Footer.vue";
import LocalSwitcher from "./components/LocalSwitcher.vue";
import { mapActions, mapState } from "vuex";
import axios from "axios";
let ROOTH_PATH = "https://natasabojanic.com";
export default {
  data() {
    return {
      show_menu: false,
      hide_menu: true,
      link_img: ROOTH_PATH + require("./../public/images/kamenje.jpg"),
    };
  },
  metaInfo() {
    return {
      title: "Nataša Bojanić",
      meta: [
        {
          name: "description",
          content:
            "Nataša Bojanić is a professional artist whose main medium is ceramics, and a private teacher of arts. In her studio, she creates the magic, astonishing art pieces mainly produced in clay, but the doors of her studio are open for all curious creatives during organized workshops.",
        },

        //FB
        { property: "og:title", content: "Nataša Bojanić" },
        { property: "og:site_name", content: "Nataša Bojanić" },
        { property: "og:url", content: "https://natasabojanic.com" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: this.link_img,
        },
        {
          property: "og:description",
          content:
            "Nataša Bojanić is a professional artist whose main medium is ceramics, and a private teacher of arts. In her studio, she creates the magic, astonishing art pieces mainly produced in clay, but the doors of her studio are open for all curious creatives during organized workshops.",
        },
      ],
    };
  },
  components: {
    LocalSwitcher,
    Footer,
  },

  methods: {
    ...mapActions(["changeLoggedIn"]),
    checkLogin() {
      if (localStorage.getItem("sid")) {
        axios
          .get(this.baseUrl + "login", {
            params: { sid: localStorage.getItem("sid") },
          })
          .then((res) => {
            console.log(res);
            this.changeLoggedIn(true);
            console.log(this.loggedIn);
          })
          .catch((error) => {
            console.log(error);
            this.changeLoggedIn(false);
            localStorage.removeItem("sid");
          });
      }
    },
    logout() {
      axios
        .post(this.baseUrl + "logout", {
          params: { sid: localStorage.getItem("sid") },
        })
        .then((res) => {
          console.log(res);
          localStorage.removeItem("sid");
          this.changeLoggedIn(false);
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("sid");
          this.changeLoggedIn(false);
          this.$router.go(); //NIJE DOBRO
        });
    },
    showMenu() {
      if (this.hide_menu === true) {
        this.show_menu = true;
        this.hide_menu = false;
      } else if (this.show_menu === true) {
        this.hide_menu = true;
        this.show_menu = false;
      }
    },
  },
  computed: {
    ...mapState(["loggedIn", "baseUrl", "root_path"]),
  },
  mounted() {
    this.checkLogin();
    //
    // console.log(this.logo)
  },
  //   beforeMount() {
  // this.link_img = this.root_path + require("./../public/images/kamenje.jpg");
  //   },
  watch: {
    $route: {
      handler() {
        this.checkLogin();
        if (this.show_menu === true) {
          this.hide_menu = true;
          this.show_menu = false;
        }
      },
    },
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
  overflow: hidden;
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
  font-size: 1.5rem;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ff6b00;
}
.admin-links {
  position: fixed;
  top: 3vh;
  left: 89vw;
  width: 10vw;
  display: flex;

  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.btn {
  font-family: "Open Sans", sans-serif;
  background-color: #777674;
  color: #343333;
  width: 4vw;
  height: 4vh;
  font-size: 0.8rem;
  font-weight: 800;

  border: none;
}
.icon {
  font-size: 1.5rem;
}
.link {
  margin-left: 1.5rem;
}
.logo {
  width: 15vw;
  height: 3rem;
  object-fit: contain;
  position: absolute;
  left: 0;
  top: 2.5vh;
}
.menu {
  visibility: hidden;
  position: absolute;
}
.view {
  min-height: 70vh;
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  #nav a {
    font-size: 1rem;
  }
  .admin-links {
    top: 1vh;
    left: 91vw;
    gap: 0.5rem;
    flex-direction: column;
  }
  .btn {
    width: 7vw;
  }
  .logo {
    width: 12vw;
    top: 1rem;
    left: 1rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  #nav a {
    font-size: 0.8rem;
  }
  .admin-links {
    top: 1vh;
    left: 91vw;
    gap: 0.5rem;
    flex-direction: column;
  }
  .btn {
    width: 5vw;
    font-size: 0.5rem;
  }
  .icon {
    font-size: 1rem;
  }
  .logo {
    width: 12vw;
    top: 2.5vh;
    margin-left: 1rem;
  }
}
@media only screen and (max-width: 768px) {
  .admin-links {
    position: static;
    width: 40vw;
    display: flex;
    flex-direction: column;
  }
  .btn {
    width: 40vw;
    height: 7vh;
    font-size: 1.5rem;
  }
  .hide {
    visibility: hidden;
  }
  .link {
    margin-left: 0;
    margin-bottom: 2rem;
  }
  .logo {
    width: 40vw;
    height: 3rem;
    object-fit: contain;
    position: absolute;
    left: 30vw;
  }
  .menu {
    visibility: visible;
  }
  .menu-bar {
    font-size: 2rem;
    color: #ff6b00;
  }
  .nav {
    visibility: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    width: 100vw;
    z-index: 3;
    background-color: #343333;
    position: absolute;
    left: 0;
    top: 4rem;
  }
}
</style>
