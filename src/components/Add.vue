<template>
  <div class="add">
    <div v-if="showEditor === false">
      <div class="top">
        <div class="top-btn-div">
          <button class="btn-exit" @click="exit()">
            <i class="fas fa-times exit"></i>
          </button>
        </div>
        <div class="title">
          <h1 class="top-title">
            {{ $t("frq_words.add") }}
            {{ $t(`add_edit[${translate_index}].type`) }}
          </h1>
        </div>
        <div class="top-btn-div">
          <button class="sbmt" @click="submit()">
            {{ $t("button.submit") }}
          </button>
        </div>
      </div>
      <div class="main">
        <div class="add-cover">
          <div>
            <h2>
              {{ $t("frq_words.add") }}
              {{ $t(`add_edit[${translate_index}].cover`) }}
            </h2>
          </div>
          <div v-if="newCover === null" class="fake-inpt-div">
            <label for="add-cover" class="fake-inpt"
              ><i class="fas fa-plus icon"></i
            ></label>
            <input type="file" id="add-cover" hidden @change="addCover" />
          </div>
          <div v-if="newCover !== null" class="cover-img">
            <div class="delete-div">
              <i
                class="far fa-trash-alt delete-cover"
                @click="deleteCover()"
              ></i>
            </div>
            <img :src="urlCover" alt="" />
          </div>
        </div>
        <div class="add-dtls">
          <div>
            <h2>
              {{ $t("frq_words.add") }} {{ $t(`frq_words.details`) }} (EN)
            </h2>
          </div>
          <div class="inpts">
            <div class="inpt">
              <p>{{ $t("frq_words.title") }}:</p>
              <input class="dtl-inpt" type="text" v-model="title_en" />
            </div>
            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.dimensions") }}:</p>
              <input class="dtl-inpt" type="text" v-model="dimensions" />
            </div>
            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.material") }}:</p>
              <input class="dtl-inpt" type="text" v-model="material_en" />
            </div>
            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.technique") }}:</p>
              <input class="dtl-inpt" type="text" v-model="technique_en" />
            </div>
            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.price") }}:</p>
              <input class="dtl-inpt" type="text" v-model="price" />
            </div>
            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.year") }}:</p>
              <input
                class="dtl-inpt"
                type="number"
                placeholder="2020"
                v-model="year"
              />
            </div>
            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.for_sale") }}:</p>
              <select name="" id="" v-model="for_sale">
                <option value="0">{{ $t("frq_words.no") }}</option>
                <option value="1">{{ $t("frq_words.yes") }}</option>
              </select>
            </div>
            <div class="inpt" v-if="type === 'exhibition'">
              <p>{{ $t("frq_words.place") }}:</p>
              <input class="dtl-inpt" type="text" v-model="place_en" />
            </div>
            <div class="inpt" v-if="type === 'exhibition'">
              <p>{{ $t("frq_words.date") }}:</p>
              <input
                class="dtl-inpt-date"
                type="text"
                placeholder="01.01.2020."
                v-model="date_start"
              />
              <p>-</p>
              <input
                class="dtl-inpt-date"
                type="text"
                placeholder="01.02.2020."
                v-model="date_finish"
              />
            </div>
            <div class="inpt" v-if="type === 'exhibition'">
              <p>{{ $t("frq_words.type") }}:</p>
              <select name="" id="" v-model="exh_type">
                <option value="solo">{{ $t("frq_words.solo") }}</option>
                <option value="group">{{ $t("frq_words.group") }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="add-dtls">
          <div>
            <h2>
              {{ $t("frq_words.add") }} {{ $t(`frq_words.details`) }} (RS)
            </h2>
          </div>
          <div class="inpts">
            <div class="inpt">
              <p>{{ $t("frq_words.title") }}:</p>
              <input class="dtl-inpt" type="text" v-model="title_rs" />
            </div>

            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.material") }}:</p>
              <input class="dtl-inpt" type="text" v-model="material_rs" />
            </div>
            <div class="inpt" v-if="type === 'artwork'">
              <p>{{ $t("frq_words.technique") }}:</p>
              <input class="dtl-inpt" type="text" v-model="technique_rs" />
            </div>

            <div class="inpt" v-if="type === 'exhibition'">
              <p>{{ $t("frq_words.place") }}:</p>
              <input class="dtl-inpt" type="text" v-model="place_rs" />
            </div>
          </div>
        </div>
      </div>
      <div class="add-rev-des" v-if="type === 'exhibition'">
        <button class="btn-rev-des" @click="showDesEditor">
          {{ $t("frq_words.description") }}
        </button>
        <button class="btn-rev-des" @click="showRevEditor">
          {{ $t("frq_words.review") }}
        </button>
      </div>
      <div class="bottom">
        <div >
          <div>
            <h2>
              {{ $t("frq_words.add") }}
              {{ $t(`add_edit[${translate_index}].images`) }}
            </h2>
          </div>
          <div class="add-img">
          <div class="fake-inpt-div">
            <label for="add-img" class="fake-inpt"
              ><i class="fas fa-plus icon"></i
            ></label>
            <input type="file" id="add-img" hidden @change="addImg" />
          </div>
          </div>
        </div>
        <div
          class="image-div"
          v-for="(image, index) of newUrlImages"
          :key="index"
        >
          <div class="delete-img-div">
            <i class="far fa-trash-alt delete" @click="deleteImg(image)"></i>
          </div>
          <div class="image">
            <img :src="image" alt="" />
          </div>
        </div>
      </div>
    </div>
    <TxtEditor
      v-if="showEditor"
      :editor_type="editor_type"
      :rev_en="rev_en"
      :rev_rs="rev_rs"
      :des_en="dsc_en"
      :des_rs="dsc_rs"
      @exit-editor="exitEditor"
      @add-rev="addRev"
      @add-des="addDes"
    ></TxtEditor>
  </div>
</template>
<script>
import TxtEditor from "./TxtEditor.vue";
export default {
  components: {
    TxtEditor,
  },
  props: {
    type: String,
  },
  data() {
    return {
      translate_index: 0,
      urlCover: "",
      newCover: null,
      urlImg: "",
      newImages: [],
      newUrlImages: [],
      title_en: "",
      title_rs: "",
      dimensions: "",
      material_en: "",
      material_rs: "",
      technique_en: "",
      technique_rs: "",
      price: 0,
      year: "",
      for_sale: 1,
      date_start: "",
      date_finish: "",
      place_en: "",
      place_rs: "",
      exh_type: null,
      dsc_en: "",
      dsc_rs: "",
      rev_en: "",
      rev_rs: "",
      showEditor: false,
      editor_type: "",
    };
  },
  methods: {
    addCover(e) {
      this.newCover = e.target.files[0];
      this.urlCover = URL.createObjectURL(this.newCover);
    },
    addDes(description) {
      this.dsc_en = description.des_en;
      this.dsc_rs = description.des_rs;
      this.showEditor = false;
      this.editor_type = "";
    },
    addImg(e) {
      let newImg = e.target.files[0];
      this.urlImg = URL.createObjectURL(newImg);
      this.newImages.push({ image: newImg, url: this.urlImg });
      this.newUrlImages.push(this.urlImg);
      console.log(this.newCover);
    },
    addRev(review) {
      this.rev_en = review.rev_en;
      this.rev_rs = review.rev_rs;
      this.showEditor = false;
      this.editor_type = "";
    },
    checkType() {
      if (this.type === "artwork") {
        this.translate_index = 0;
      }
      if (this.type === "exhibition") {
        this.translate_index = 1;
      }
    },
    deleteCover() {
      this.newCover = null;
      this.url = "";
    },
    deleteImg(image) {
      this.urlImg = "";
      for (let i = 0; i < this.newUrlImages.length; i++) {
        if (image === this.newUrlImages[i]) {
          this.newUrlImages.splice(i, 1);
        }
      }
      for (let i = 0; i < this.newImages.length; i++) {
        if (image === this.newImages[i].url) {
          this.newImages.splice(i, 1);
          console.log(this.newImages);
        }
      }
    },
    exit() {
      this.$emit("exit");
    },
    exitEditor() {
      this.showEditor = false;
      this.editor_type = "";
    },
    showDesEditor() {
      this.showEditor = true;
      this.editor_type = "description";
    },
    showRevEditor() {
      this.showEditor = true;
      this.editor_type = "review";
    },
    submit() {
      if (this.type === "artwork") {
        let newArtwork = {
          title_en: this.title_en,
          material_en: this.material_en,
          technique_en: this.technique_en,
          title_rs: this.title_rs,
          material_rs: this.material_rs,
          technique_rs: this.technique_rs,
          price: this.price,
          year: this.year,
          for_sale: this.for_sale,
          dimensions: this.dimensions,
          main_img: this.newCover,
          det_images: this.newImages,
        };
        this.$emit("add-artwork", newArtwork);
      }
      if (this.type === "exhibition") {
        let newExh = {
          title_en: this.title_en,
          title_rs: this.title_rs,
          place_en: this.place_en,
          place_rs: this.place_rs,
          date_start: this.date_start,
          date_finish: this.date_finish,
          cover: this.newCover,
          images: this.newImages,
          type: this.exh_type,
          dsc_en: this.dsc_en,
          dsc_rs: this.dsc_rs,
          rev_en: this.rev_en,
          rev_rs: this.rev_rs,
        };
        this.$emit("add-exh", newExh);
      }
    },
  },
  mounted() {
    this.checkType();
  },
};
</script>
<style scoped>
h2 {
  color: #343333;
  font-size: 20pt;
  font-weight: 400;
}
input {
  font-family: "Open Sans", sans-serif;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #343333;
  color: white;
  text-align: start;
}
input:focus {
  outline: none;
}
img {
  width: 20vw;
  height: 30vh;
  object-fit: contain;
}
select {
  width: 5vw;
  border: none;
  background-color: transparent;
  font-family: "Open Sans", sans-serif;
}
select:focus {
  outline: 2px solid #ff6b00;
}
option {
  background-color: #777674;
}
p {
  width: 5vw;
  text-align: start;
}
.add {
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #777674;
  margin-left: 5vw;
}
.add-cover {
  width: 30vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.add-dtls {
  width: 30vw;
  height: 40vh;
}
.add-img {
  width: 25vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 5px solid #343333;
}
.add-rev-des {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.bottom {
  margin-top: 10vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 90vw;
  margin-bottom: 10vh;
  gap: 1rem;
  margin-left: 7vw;
}
.btn-exit {
  background-color: transparent;
  border: none;
  width: 4rem;
  cursor: pointer;
}
.btn-exit:focus {
  outline: none;
}
.btn-rev-des {
  font-family: "Open Sans", sans-serif;
  background-color: #343333;
  color: #ff6b00;
  width: 11vw;
  height: 7vh;
  font-size: 1.5rem;
  font-weight: 800;
  border: none;
}
.btn-rev-des:focus {
  outline: 2px solid #ff6b00;
}
.cover-img{
  background-color: #343333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 40vh;
  margin-left: 4rem;
  margin-top: 2rem;
}
.delete {
  cursor: pointer;
  position: absolute;
  margin-left: 20vw;
  margin-top: 1rem;
}
.delete-cover {
  cursor: pointer;
  position: absolute;  
  margin-left: -2rem;
}
.delete-div {
  font-size: 2rem;
  color: #ff6b00;
  width: 18vw;
  text-align: end;
}
.delete-img-div {
  font-size: 2rem;
  color: #ff6b00;
  text-align: end;
}
.dtl-inpt-date {
  width: 5vw;
}
.exit {
  color: #343333;
  font-size: 4rem;
}
.fake-inpt {
  font-size: 4rem;
  color: #343333;
  cursor: pointer;
}
.fake-inpt-div {
  width: 10vw;
  height: 10vw;
  margin-top: 10vh;
  border: 4px dashed #ff6b00;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image {
  width: 20vw;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
}
.image-div {
  width: 25vw;
  height: 40vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #343333;
  margin-top: 2rem;
}
.inpt {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: flex-start;
  width: 30vw;
}
.inpts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  margin-left: 10vw;
  gap: 0.5rem;
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