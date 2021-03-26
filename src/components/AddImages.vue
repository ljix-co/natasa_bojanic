<template>
  <div class="add-images">
    <div class="top">
      <div class="top-btn-div">
        <button class="btn-exit" @click="exit()">
          <i class="fas fa-times exit"></i>
        </button>
      </div>
      <div class="title">
        <h1 class="top-title">
          {{ $t("frq_words.add") }}
          {{ $t(`frq_words.images`) }}
        </h1>
      </div>
      <div class="top-btn-div">
        <button class="sbmt" @click="submit()">
          {{ $t("button.submit") }}
        </button>
      </div>
    </div>
    <div class="bottom">
      <div class="add-img">
        <div class="fake-inpt-div">
          <label for="add-img" class="fake-inpt"
            ><i class="fas fa-plus icon"></i
          ></label>
          <input type="file" id="add-img" hidden @change="addImg" />
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
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  props: {
    edit_object_id: Number,
    type: String,
    img_id: Number,
  },
  data() {
    return {
      newUrlImages: [],
      newImages: [],
    };
  },
  methods: {
    addImg(e) {
      let newImg = e.target.files[0];
      let url = URL.createObjectURL(newImg);
      this.newUrlImages.push(url);
      this.newImages.push({ path: url, file: newImg });
    },
    exit() {
      this.$emit("exit-editor");
    },
    deleteImg(image) {
      for (let i = 0; i < this.newUrlImages.length; i++) {
        if (image === this.newUrlImages[i]) {
          this.newUrlImages.splice(i, 1);
          this.newImages.splice(i, 1);
        }
      }
    },
    submit() {
      
      if (this.type === "artwork") {
        for (let i = 0; i < this.newImages.length; i++) {
          let formData = new FormData();
          formData.append("img_id", this.img_id);
          formData.append("dimg_image", this.newImages[i].file);
          axios.post(this.baseUrl + "dtls_images", formData).then((res) => {
            console.log(res);
            this.$emit("add-images");
          });
        }
      }
      if (this.type === "exhibition") {
        for (let i = 0; i < this.newImages.length; i++) {
          let formData = new FormData();
          formData.append("exh_id", this.edit_object_id);
          formData.append("img_image", this.newImages[i].file);
          axios.post(this.baseUrl + "main_images", formData).then((res) => {
            console.log(res);
            this.$emit("add-images");
          });
        }
      }
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>
<style scoped>
img {
  width: 20vw;
  height: 30vh;
  margin-top: 5vh;
  object-fit: contain;
}
.add-images {
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #777674;
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
.bottom {
  margin-top: 10vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 90vw;
  margin-bottom: 10vh;
  margin-left: 3rem;
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
.delete {
  cursor: pointer;
}
.delete-img-div {
  font-size: 2rem;
  color: #ff6b00;
  position: absolute;
  width: 20vw;
  text-align: end;
  margin-left: 2rem;
  margin-top: 1rem;
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