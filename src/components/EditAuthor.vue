<template>
  <div class="edit">
    <div class="info">
      <div class="title">
        <h1>{{ $t("admin[0].title") }}</h1>
      </div>
      <div class="basic-info">
        <div class="delete-img-div" v-if="url === ''">
          <label for="img_cover"><i class="delete fas fa-pen"></i></label>
          <input id="img_cover" type="file" @change="getFile" hidden />
        </div>
        <div v-lazyload>
          <img
            v-if="url === ''"
            :data-url="aut_info.img_path"
            src="../../public/images/placeholder.gif"
            alt=""
          />
        </div>
        <div class="delete-img-div" v-if="url !== ''">
          <i class="far fa-trash-alt delete" @click="deleteNewImg"></i>
        </div>
        <img v-if="url !== ''" :src="url" alt="" />
        <div class="inpts">
          <input
            type="text"
            v-model="fname"
            :placeholder="aut_info.aut_fname"
          />
          <input
            type="password"
            v-model="pass"
            :placeholder="$t('author.password')"
          />
          <input
            type="password"
            v-model="old_pass"
            :placeholder="$t('author.old_password')"
          />
        </div>
        <button @click="changeAuthor()">{{ $t("button.submit") }}</button>
      </div>
      <div class="bio">
        <div class="btns">
          <button class="btn-bio" @click="showBioEn()">
            {{ $t("frq_words.bio") }}(EN)
          </button>
          <button class="btn-bio" @click="showBioRs()">
            {{ $t("frq_words.bio") }}(RS)
          </button>
        </div>
        <div v-if="showEn">
          <h1>EN</h1>
          <vue-editor
            class="vue_editor"
            v-model="bio_en"
            :editor-toolbar="customToolbar"
          />
        </div>
        <div v-if="showRs">
          <h1>RS</h1>
          <vue-editor class="vue_editor" v-model="bio_rs" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    aut_info: Object,
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      fname: this.aut_info.aut_fname,
      pass: "",
      old_pass: "",
      bio_en: this.aut_info.aut_bio_en,
      bio_rs: this.aut_info.aut_bio_rs,
      newImg: null,
      url: "",
      showEn: false,
      showRs: false,
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],

        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["link", "image"],
        [
          {
            color: [
              "#ff6b00",
              "#777674",
              "#343333",
              "#a7a6a7",
              "#d9d9d9",
              "white",
            ],
          },
        ],
      ],
    };
  },
  methods: {
    changeAuthor() {
      let chndAut = new Object();
      if (this.pass !== "" && this.old_pass != "") {
        chndAut.pass = this.pass;
        chndAut.old_pass = this.old_pass;
      }
      if (this.newImg !== null && this.aut_info.aut_image !== this.newImg) {
        chndAut.image = this.newImg;
      }
      chndAut.fname = this.fname;
      chndAut.bio_en = this.bio_en;
      chndAut.bio_rs = this.bio_rs;
      this.$emit("submit-aut", chndAut);
    },
    deleteNewImg() {
      this.newImg = null;
      this.url = "";
    },
    getFile(e) {
      this.newImg = e.target.files[0];
      this.url = URL.createObjectURL(this.newImg);
    },
    showBioEn() {
      if (this.showEn === true) {
        this.showEn = false;
      } else {
        this.showEn = true;
      }
      if (this.showRs === true) {
        this.showRs = false;
      }
    },
    showBioRs() {
      if (this.showRs === true) {
        this.showRs = false;
      } else {
        this.showRs = true;
      }
      if (this.showEn === true) {
        this.showEn = false;
      }
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
  margin-top: 5rem;
  margin-bottom: 2rem;

  border: none;
}
button:focus {
  outline: 3px solid #ff6b00;
}
input {
  font-family: "Open Sans", sans-serif;
  width: 20vw;
  border: none;
  font-size: 26pt;
  border-bottom: 2px solid #a7a6a7;
  background-color: #343333;
  color: white;
  text-align: center;
}
input:focus {
  outline: none;
}
img {
  width: 25vw;
  cursor: pointer;
}
.basic-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20vw;
  margin-top: 2vw;
}
.bio {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40vw;
  margin-left: 3rem;
}
.btn-bio {
  width: 14vw;
  color: #ff6b00;
  font-weight: 800;
}
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 40vw;
  height: 10vh;
  margin-top: 2rem;
}
.delete {
  cursor: pointer;
  position: absolute;
  margin-left: -2rem;
}
.delete-img-div {
  font-size: 2rem;
  color: #ff6b00;
  width: 25vw;
  text-align: end;
  margin-top: 2rem;
}
.info {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
}
.inpts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
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