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
          formData.append("sid", localStorage.getItem("sid"));
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
          formData.append("sid", localStorage.getItem("sid"));
          formData.append("exh_id", this.edit_object_id);
          formData.append("img_image", this.newImages[i].file);
          axios.post(this.baseUrl + "main_images", formData).then((res) => {
            console.log(res);
            this.$emit("add-images");
          });
        }
      }
      if (this.type === "workshops") {
        for (let i = 0; i < this.newImages.length; i++) {
          let formData = new FormData();
          formData.append("sid", localStorage.getItem("sid"));
          formData.append("wrks_id", this.edit_object_id);
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
  display: flex;
  align-items: center;
  justify-content: center;
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
@media only screen and (min-width: 768px) and (max-width: 991px) {
.add-img{
width: 20vw;
height: 20vw;
display: flex;
align-items: center;
justify-content: center;
}
.delete-img-div{
font-size: 1.5rem;
}
.exit{
 color: #777674;
  font-size: 2rem;
}
.fake-inpt-div{
margin-top: 0;
}
 .bottom {
    margin-top: 20vh;
  }
 .sbmt {
    font-size: 1rem;
    background-color: #777674;
     margin-bottom: 1rem;
  }

  .top {
    position: fixed;
    width: 100vw;
    background-color: #343333;
   top: 4vh;
    z-index: 2;
   
  }
  .top-btn-div {
    
     margin-bottom: 1rem;
  }
  .top-title {
    font-size: 2rem;
   
    margin-bottom: 1rem;
     color: #777674;
  }
}
@media only screen and (max-width: 768px) {
  img{
    width: 80vw;
  }
  .bottom {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .btn {
    width: 50vw;
  }
  .cover-img {
    width: 80vw;
  }
  .delete-img-div {
    width: 80vw;
  }
  .add-images {
    border: none;
    background-color: #343333;
    margin-top: 8rem;
  }
  .add-img {
    width: 90vw;
  }
  .exit {
    font-size: 2rem;
    color: #777674;
  }
  .fake-inpt-div {
    width: 60vw;
    height: 60vw;
    margin-top: 0;
  }

  .gallery {
    width: 90vw;
  }
  .icon {
    font-size: 3rem;
    color: #777674;
  }
  .image {
    width: 80vw;
  }
  .image-div {
    width: 80vw;
  }
  .sbmt {
    width: 22vw;
    font-size: 1rem;
    background-color: #777674;
  }

  .title {
    width: 50vw;
  }
  .top {
    position: fixed;
    width: 100vw;
    background-color: #343333;
    z-index: 2;
    top: 4vh;
  }
  .top-btn-div {
    width: 25vw;
  }
  .top-title {
    font-size: 1.5rem;
    color: #777674;
  }
}
</style>