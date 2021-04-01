<template>
  <div class="edit">
    <div v-if="showEditor === false && add_images === false">
      <div class="top">
        <div class="top-btn-div">
          <button class="btn-exit" @click="exit()">
            <i class="fas fa-times exit"></i>
          </button>
        </div>
        <div class="title">
          <h1 class="top-title">
            {{ $t("frq_words.edit") }}
            {{ $t(`add_edit[${translate_index}].type`) }}
          </h1>
        </div>
        <div class="top-btn-div"></div>
      </div>
      <div class="main">
        <div class="gallery">
          <gallery
            :key="'g' + componentKey"
            :type="type"
            :gallery_style="gallery_style"
            :object_array="object_array"
            @choose-artwork="editArtwork"
            @choose-exh="editExhibition"
            @delete-object="deleteObject"
          ></gallery>
        </div>
        <div class="side-editor" v-if="edit_object">
          <h2>
            {{ $t("frq_words.change") }}
            {{ $t(`add_edit[${translate_index}].cover`) }}
          </h2>
          <div>
            <div class="delete-img-div" v-if="cover_url === ''">
              <label for="img_cover"><i class="delete fas fa-pen"></i></label>
              <input id="img_cover" type="file" @change="getNewCover" hidden />
            </div>

            <div class="delete-img-div" v-if="cover_url !== ''">
              <i class="far fa-trash-alt delete" @click="deleteCoverUrl"></i>
            </div>
            <img
              class="cover-img"
              v-if="cover_url === ''"
              :src="cover.cover_path"
              alt=""
            />
            <img
              class="cover-img"
              v-if="cover_url !== ''"
              :src="cover_url"
              alt=""
            />
          </div>
          <h2>
            {{ $t("frq_words.change") }}
            {{ $t(`add_edit[${translate_index}].images`) }}
          </h2>
          <div v-if="images.length > 0">
            <photo-slider
              :key="componentKey"
              class="photo-slider"
              :images="images"
              @delete-img="deleteImage"
            ></photo-slider>
          </div>
          <div class="img-edit-btns" v-if="images.length > 0">
            <button class="btn" @click="addImages()">
              {{ $t("frq_words.add") }} {{ $t("frq_words.images") }}
            </button>
          </div>
          <div class="fake-inpt-div" v-else>
            <div class="fake-inpt" @click="addImages()">
              <i class="fas fa-plus icon"></i>
            </div>
            <!-- <input type="file" id="add-img" hidden @change="addImg" /> -->
          </div>
          <div class="details">
            <div class="inpts">
              <h2 class="edit-lang-title">(EN)</h2>
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
                <div class="inpts-date">
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
              </div>
              <div class="inpt" v-if="type === 'exhibition'">
                <p>{{ $t("frq_words.type") }}:</p>
                <select name="" id="" v-model="exh_type">
                  <option value="solo">{{ $t("frq_words.solo") }}</option>
                  <option value="group">{{ $t("frq_words.group") }}</option>
                </select>
              </div>

              <h2 class="edit-lang-title">(RS)</h2>
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
            <div class="edit-rev-des" v-if="type === 'exhibition'">
              <button class="btn-rev-des" @click="showDesEditor">
                {{ $t("frq_words.description") }}
              </button>
              <button class="btn-rev-des" @click="showRevEditor">
                {{ $t("frq_words.review") }}
              </button>
            </div>
          </div>
          <div class="top-btn-div">
            <button class="sbmt" @click="submit()">
              {{ $t("button.submit") }}
            </button>
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

    <add-images
      :img_id="img_id"
      :type="type"
      :edit_object_id="edit_object_id"
      v-if="add_images"
      @exit-editor="exitEditor"
      @add-images="addNewImages()"
    ></add-images>
  </div>
</template>
<script>
import Gallery from "./Gallery.vue";
import TxtEditor from "./TxtEditor.vue";
import PhotoSlider from "./PhotoSlider.vue";
import axios from "axios";
import { mapState } from "vuex";
import AddImages from "./AddImages.vue";
export default {
  components: {
    TxtEditor,
    Gallery,
    PhotoSlider,
    AddImages,
  },
  props: {
    type: String,
    rerender: Boolean,
    object_array: Array,
  },
  data() {
    return {
      showEditor: false,
      dsc_en: "",
      dsc_rs: "",
      rev_en: "",
      rev_rs: "",
      translate_index: 0,
      images: [],
      gallery_style: "edit",
      exh_id: null,
      // object_array: [],
      edit_object: false,
      cover: null,
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
      editor_type: "",
      edit_object_id: null,
      add_images: false,
      cover_url: "",
      new_cover: null,
      img_id: null,
      componentKey: 0,
    };
  },
  methods: {
    addDes(description) {
      this.dsc_en = description.des_en;
      this.dsc_rs = description.des_rs;
      this.showEditor = false;
      this.editor_type = "";
    },
    addImages() {
      this.add_images = true;
    },
    addNewImages() {
      if (this.type === "artwork") {
        axios
          .get(this.baseUrl + "dtls_images", {
            params: { img_id: this.img_id },
          })
          .then((res) => {
            this.images = [];
            for (let i = 0; i < res.data.data.length; i++) {
              this.images.push({
                path: res.data.data[i].img_path,
                id: res.data.data[i].dimg_id,
              });
            }
            this.forceRerender();
            this.add_images = false;
          });
      }
      if (this.type === "exhibition") {
        axios
          .get(this.baseUrl + "exh_images", {
            params: { exh_id: this.edit_object_id },
          })
          .then((res) => {
            this.images = [];
            for (let i = 0; i < res.data.data.length; i++) {
              this.images.push({
                path: res.data.data[i].img_path,
                id: res.data.data[i].img_id,
              });
            }
            this.forceRerender();
            this.add_images = false;
          });
      }
    },
    addRev(review) {
      this.rev_en = review.rev_en;
      this.rev_rs = review.rev_rs;
      this.showEditor = false;
      this.editor_type = "";
    },

    deleteCoverUrl() {
      this.new_cover = null;
      this.cover_url = "";
    },
    deleteImage(image_id) {
      if (this.type === "artwork") {
        axios
          .delete(this.baseUrl + "dtls_images", {
            params: { dimg_id: image_id },
          })
          .then((res) => {
            console.log(res);

            for (let i = 0; i < this.images.length; i++) {
              if (image_id == this.images[i].id) {
                this.images.splice(i, 1);
                this.forceRerender();
              }
            }
          });
      }
      if (this.type === "exhibition") {
        axios
          .delete(this.baseUrl + "main_images", {
            params: { img_id: image_id },
          })
          .then((res) => {
            console.log(res);

            for (let i = 0; i < this.images.length; i++) {
              if (image_id == this.images[i].id) {
                this.images.splice(i, 1);
                this.forceRerender();
              }
            }
          });
      }
    },
    deleteObject(object) {
      console.log(object);
      this.$emit("delete-object", object);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    getExhImages(exh_id) {
      console.log(exh_id);
    },
    getNewCover(e) {
      this.new_cover = e.target.files[0];
      this.cover_url = URL.createObjectURL(this.new_cover);
    },
    editArtwork(object) {
      this.images = [];
      this.img_id = object.img_id;
      this.edit_object_id = object.art_id;
      this.cover = {
        cover_id: object.img_id,
        cover_path: object.cover_path,
      };

      axios
        .get(this.baseUrl + "dtls_images", { params: { img_id: this.img_id } })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.images.push({
              path: res.data.data[i].img_path,
              id: res.data.data[i].dimg_id,
            });
          }
        });
      this.title_en = object.art_title_en;
      this.title_rs = object.art_title_rs;
      this.material_en = object.art_material_en;
      this.material_rs = object.art_material_rs;
      this.technique_en = object.art_tech_en;
      this.technique_rs = object.art_tech_rs;
      this.dimensions = object.art_dmns;
      this.year = object.art_year;
      this.for_sale = object.art_forsale;
      this.price = object.art_price;
      this.edit_object = true;
    },
    editExhibition(object) {
      this.images = [];
      console.log(this.images);
      this.edit_object_id = object.exh_id;

      axios
        .get(this.baseUrl + "exh_images", {
          params: { exh_id: this.edit_object_id },
        })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.images.push({
              path: res.data.data[i].img_path,
              id: res.data.data[i].img_id,
            });
          }
        });
      this.title_en = object.exh_title_en;
      this.title_rs = object.exh_title_rs;
      this.place_en = object.exh_place_en;
      this.place_rs = object.exh_place_rs;
      this.date_start = object.exh_date_start;
      this.data_finish = object.exh_date_finish;
      this.exh_type = object.exh_type;
      this.dsc_en = object.exh_dsc_en;
      this.dsc_rs = object.exh_dsc_rs;
      this.rev_en = object.exh_rev_en;
      this.rev_rs = object.exh_rev_rs;
      this.edit_object = true;
      this.cover = {
        cover_id: object.img_id,
        cover_path: object.cover_path,
      };
    },
    exit() {
      this.$emit("exit");
    },
    exitEditor() {
      this.showEditor = false;
      this.editor_type = "";
      this.add_images = false;
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
      let editedObject = {
        edit_object_id: this.edit_object_id,
        title_en: this.title_en,
        title_rs: this.title_rs,
        material_en: this.material_en,
        material_rs: this.material_rs,
        technique_en: this.technique_en,
        technique_rs: this.technique_rs,
        dimensions: this.dimensions,
        year: this.year,
        for_sale: this.for_sale,
        price: this.price,
        cover: this.new_cover,
        img_id: this.cover.cover_id,
        place_en: this.place_en,
        place_rs: this.place_rs,
        date_start: this.date_start,
        date_finish: this.date_finish,
        exh_type: this.exh_type,
        dsc_en: this.dsc_en,
        dsc_rs: this.dsc_rs,
        rev_en: this.rev_en,
        rev_rs: this.rev_rs,
      };
      this.$emit("submit-edit-object", editedObject);
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  mounted() {},
  watch: {
    rerender: {
      deep: true,
      immediate: true,
      handler() {
        this.edit_object = false;
        this.forceRerender();
      },
    },
  },
};
</script>
<style scoped>
input {
  font-family: "Open Sans", sans-serif;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #777674;
  color: white;
  text-align: start;
}
input:focus {
  outline: none;
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
.btn {
  font-family: "Open Sans", sans-serif;
  background-color: #777674;
  color: #ff6b00;
  width: 7vw;
  height: 7vh;
  font-size: 1rem;
  font-weight: 800;
  border: none;
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
  background-color: #777674;
  color: #ff6b00;
  width: 7vw;
  height: 7vh;
  font-size: 1rem;
  font-weight: 800;
  border: none;
}
.btn-rev-des:focus {
  outline: 2px solid #ff6b00;
}
.cover-img {
  width: 30vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.delete {
  cursor: pointer;
}
.delete-img-div {
  font-size: 2rem;
  color: #ff6b00;
  position: absolute;
  width: 30vw;
  text-align: end;
  margin-top: 2rem;
}
.details {
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit {
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 10px solid #777674;
  margin-left: 5vw;
  
}
.edit-lang-title {
  margin-left: -10vw;
  margin-bottom: 1rem;
}
.edit-rev-des {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.exit {
  color: #777674;
  font-size: 4rem;
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
  margin-top: 0;
  margin-left: 5rem;
  gap: 0.5rem;
  width: 20vw;
  margin-bottom: 5vh;
}
.inpts-date {
  display: flex;
  flex-direction: column;
}
.img-edit-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 90vw;
  margin-top: 10vh;
  margin-bottom: 10vh;
}
.side-editor {
  width: 35vw;
  border: 4px solid #777674;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sbmt {
  font-family: "Open Sans", sans-serif;
  background-color: #777674;
  color: white;
  width: 10vw;
  height: 7vh;
  font-size: 1.5rem;
  font-weight: 800;
  border: none;
  margin-bottom: 2rem;
}
.sbmt:focus {
  outline: 3px solid #ff6b00;
}
.title {
  color: #777674;
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