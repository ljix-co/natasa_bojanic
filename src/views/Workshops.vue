<template>
  <div class="workshops">
    <div
      class="workshops"
      :class="{ fade: loader }"
      v-if="show_gallery === false"
    >
      <div class="wrk-details">
        <div
          class="wrk"
          :class="{ show: chosen === wrk }"
          v-for="(wrk, index) in workshops"
          :key="index"
        >
          <div class="tooltip" v-lazyload>
            <img
              :data-url="wrk.cover_path"
              src="../../public/images/placeholder.gif"
              alt=""
              @click="showGallery(wrk)"
            />
            <span class="tooltiptext">{{ $t("tooltips.gallery") }}</span>
          </div>
          <div class="type-dsc">
            <h1
              class="wrk-type-title"
              :class="{ en: curLanguage === 'EN', rs: curLanguage === 'RS' }"
            >
              {{ wrk.type.toUpperCase() }}
            </h1>
            <p
              class="wrk-type-dsc"
              :class="{ en: curLanguage === 'EN', rs: curLanguage === 'RS' }"
              v-html="wrk.dsc"
            ></p>
          </div>
        </div>
      </div>
      <div class="wrk-date-info">
        <div class="instr-mssg">
          <p class="chs-date-mssg">{{ $t("workshops.choose_date") }}</p>
        </div>
        <div class="calendar">
          <calendar
            :key="componentKey"
            v-if="calendar_info.length > 0"
            :calendar_info="calendar_info"
            @show-selected="showSelected"
          ></calendar>
        </div>
        <div class="wrk-manager">
          <div
            class="choose-time"
            v-if="
              selected_wrk === null &&
              selected_date.length > 0 &&
              success_message === false
            "
          >
            <div class="instr-mssg">
              <h2>{{ $t("workshops.instr_mssg") }}</h2>
            </div>
            <div class="list-time">
              <p class="orng-txt">
                {{ selected_date[0].date_day }}.{{
                  selected_date[0].date_month
                }}.{{ selected_date[0].date_year }}
              </p>
              <div
                class="time"
                v-for="(time, index) in selected_date"
                :key="index"
                @click="chooseWrk(time)"
              >
                <p>{{ $t("workshops.time") }}</p>
                <p class="orng-txt">{{ time.wrk_time }}</p>
                <p>{{ $t("workshops.info_mssg") }}</p>
                <p class="orng-txt">{{ time.vacancies }}</p>
              </div>
            </div>
          </div>
          <div
            class="wrk-info"
            v-if="
              selected_wrk !== null &&
              success_message === false &&
              error_message === false
            "
          >
            <div class="info-mssg">
              <div class="info">
                <p class="vacancies">{{ $t("workshops.workshop_type") }}</p>
                <p class="dark-txt" @click="showType()">
                  {{ chosen.type.toUpperCase() }}
                </p>
              </div>
              <div class="info">
                <p class="vacancies">{{ $t("workshops.info_mssg") }}</p>
                <p class="vacancies">{{ selected_wrk.vacancies }}</p>
              </div>
            </div>
            <div class="sign-div">
              <div class="sign-form" v-if="selected_wrk.vacancies > 0">
                <h2>{{ $t("workshops.sign_mssg") }}</h2>
                <label>{{ plcholder_fname }}</label>
                <input type="text" v-model="student_fullname" />
                <label>{{ plcholder_mail }}</label>
                <input type="text" v-model="student_mail" />

                <button class="sbmt" @click="submitSignIn()">
                  {{ $t("button.submit") }}
                </button>
                <div class="cancel-div">
                  <p>{{ $t("workshops.cancel_arrvl_mssg") }}</p>
                  <label>{{ plcholder_fname }}</label>
                  <input type="text" v-model="student_fullname" />
                  <label>{{ plcholder_mail }}</label>
                  <input type="text" v-model="student_mail" />

                  <button class="cancel" @click="cancelArrival()">
                    {{ $t("button.cancel_arrival") }}
                  </button>
                </div>
              </div>
              <div class="no-room-mssg" v-if="selected_wrk.vacancies == 0">
                <h2>{{ $t("workshops.no_room_mssg") }}</h2>
                <p>{{ $t("workshops.cancel_arrvl_mssg") }}</p>
                <label>{{ plcholder_fname }}</label>
                <input type="text" v-model="student_fullname" />
                <label>{{ plcholder_mail }}</label>
                <input type="text" v-model="student_mail" />

                <button class="cancel" @click="cancelArrival()">
                  {{ $t("button.cancel_arrival") }}
                </button>
              </div>
            </div>
          </div>
          <div
            class="sccss-mssg"
            :class="{
              'sccss-signin': confirm_index === 1,
              'sccss-signout': confirm_index === 0,
            }"
            v-if="success_message"
          >
            <h2>{{ $t(`confirm_mssg[${confirm_index}].mssg`) }}</h2>
          </div>
          <div class="error-mssg" v-if="error_message">
            <h2>{{ $t(`error_mssg[${error_index}].mssg`) }}</h2>
            <button class="sbmt-error" @click="closeError()">OK</button>
          </div>
        </div>
      </div>
    </div>
    <div class="gallery" v-if="show_gallery">
      <button class="btn-back" @click="goBack()">
        <i class="far fa-arrow-alt-circle-left"></i>
      </button>
      <photo-slider
        class="photo-slider"
        :key="'p' + componentKey"
        v-if="images.length > 0"
        :images="images"
        :chosen_image="chosen_image"
        :mob_slider="mob_slider"
       
      ></photo-slider>
      <gallery
        :object_array="object_array"
        @choose-object="chooseObject"
      ></gallery>
    </div>
    <loader v-if="loader"></loader>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import Calendar from "../components/Calendar.vue";
import Loader from "../components/Loader.vue";
import Gallery from "../components/Gallery.vue";
import PhotoSlider from "../components/PhotoSlider.vue";
export default {
  components: { Calendar, Loader, Gallery, PhotoSlider },
  data() {
    return {
      calendar_info: [],
      chosen: null,
      componentKey: 0,
      selected_wrk: null,
      selected_date: [],
      student_fullname: "",
      student_mail: "",
      plcholder_fname: "Full name",
      plcholder_mail: "E-mail",
      workshops: [],
      time_info: { date: "", time: [] },
      success_message: false,
      confirm_index: 0,
      error_message: false,
      error_index: 0,
      show_gallery: false,
      images: [],
      object_array: [],
      chosen_image: null,
      mob_slider: false,
    };
  },
  methods: {
    ...mapActions(["changeLoader"]),
    cancelArrival() {
      axios
        .delete(this.baseUrl + "available_workshops", {
          params: {
            wrk_id: this.selected_wrk.wrk_id,
            wrk_date: this.selected_wrk.wrk_date,
            student_fullname: this.student_fullname,
            student_email: this.student_mail,
          },
        })
        .then((res) => {
          console.log(res);
          this.getWorkshopDateInfo();
          this.forceRerender();
          this.selected_date = [];
          this.success_message = true;
          this.confirm_index = 0;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = true;
          this.error_index = 1;
        });
    },
    checkLanguage() {
      if (this.curLanguage === "EN") {
        if (this.plcholder_fname === "Puno ime") {
          this.plcholder_fname = "Full name";
        }
        for (let i = 0; i < this.workshops.length; i++) {
          this.workshops[i].type = this.workshops[i].wrks_type_en;
          this.workshops[i].dsc = this.workshops[i].wrks_dsc_en;
        }
      }
      if (this.curLanguage === "RS") {
        if (this.plcholder_fname === "Full name") {
          this.plcholder_fname = "Puno ime";
        }
        for (let i = 0; i < this.workshops.length; i++) {
          this.workshops[i].type = this.workshops[i].wrks_type_rs;
          this.workshops[i].dsc = this.workshops[i].wrks_dsc_rs;
        }
      }
    },
    checkLoader() {
      this.changeLoader(true);
      if (this.workshops.length > 0 && this.calendar_info.length > 0) {
        this.changeLoader(false);
      }
    },
    chooseObject(object) {
      this.chosen_image = object;

      if (window.innerWidth > 769) {
        this.scrollToElement("photo-slider");
      }
      if (window.innerWidth < 769) {
        this.mob_slider = true;
       console.log(this.chosen_image);
        
      }
    },
    chooseWrk(time) {
      this.selected_wrk = time;
      this.selected_wrk.vacancies =
        time.wrk_max_students - time.wrk_signed_students;
      for (let i = 0; i < this.workshops.length; i++) {
        if (this.selected_wrk.wrks_id === this.workshops[i].wrks_id) {
          this.chosen = this.workshops[i];
        }
      }
    },
    closeError() {
      this.error_message = false;
    },
   
    forceRerender() {
      this.componentKey++;
    },
    getWorkshops() {
      axios.get(this.baseUrl + "workshops").then((res) => {
        console.log(res);
        this.workshops = res.data.data;
        this.checkLanguage();
        this.checkLoader();
      });
    },
    getWorkshopDateInfo() {
      
      axios.get(this.baseUrl + "workshop").then((res) => {
        console.log(res);
        this.calendar_info = res.data.data;
        this.checkLoader();
      });
    },
    goBack() {
      this.images = [];
      this.object_array = [];
      this.show_gallery = false;
    },
    showSelected(wrk_day) {
      this.selected_wrk = null;
      this.success_message = false;

      axios
        .get(this.baseUrl + "available_workshops", {
          params: { wrk_date: wrk_day.wrk_date },
        })
        .then((res) => {
          console.log(res);
          this.selected_date = res.data.data;
          if (this.selected_date.length > 0) {
            for (let i = 0; i < this.selected_date.length; i++) {
              this.selected_date[i].vacancies =
                this.selected_date[i].wrk_max_students -
                this.selected_date[i].wrk_signed_students;
            }
          }
          this.scrollToElement("wrk-manager");
        });
    },
    showGallery(wrk) {
      this.images = [];
      this.object_array = [];
      let id = wrk.wrks_id;
      console.log(wrk);
      axios
        .get(this.baseUrl + "wrks_images", { params: { wrks_id: id } })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.images.push({
              id: res.data.data[i].img_id,
              path: res.data.data[i].img_path,
            });
            this.object_array.push({
              id: res.data.data[i].img_id,
              cover_path: res.data.data[i].img_path,
            });
          }
          this.show_gallery = true;
        });
    },
    showType() {
      this.scrollToElement("show");
    },
    submitSignIn() {
      let formData = new FormData();
      formData.append("wrk_id", this.selected_wrk.wrk_id);
      formData.append("wrk_date", this.selected_wrk.wrk_date);
      formData.append("student_fullname", this.student_fullname);
      formData.append("student_email", this.student_mail);
      axios
        .patch(this.baseUrl + "available_workshops", formData)
        .then((res) => {
          console.log(res);
          this.getWorkshopDateInfo();
          this.forceRerender();
          this.selected_date = [];
          this.success_message = true;
          this.confirm_index = 1;
        })
        .catch((error) => {
          console.log(error);
          this.error_message = true;
          this.error_index = 0;
        });
    },
    scrollToElement(clss) {
      const el = this.$el.getElementsByClassName(clss)[0];
      console.log(el);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  computed: {
    ...mapState(["baseUrl", "curLanguage", "loader"]),
  },
  mounted() {
    this.getWorkshops();
    this.getWorkshopDateInfo();
  },
  watch: {
    curLanguage: {
      handler() {
        this.checkLanguage();
      },
    },
  },
};
</script>
<style scoped>
img {
  width: 40vw;
  cursor: pointer;
}
input {
  font-family: "Open Sans", sans-serif;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #343333;
  color: white;
  text-align: center;
  width: 20vw;
  margin-top: 1rem;
  font-size: 1rem;
}
input:focus {
  outline: none;
}

label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #343333;
}
.btn-back {
  position: fixed;
  left: 7vw;
  top: 10vh;
  background-color: transparent;
  border: none;
  font-size: 3rem;
  color: #ff6b00;
  z-index: 2;
  cursor: pointer;
}
.btn-back:focus {
  outline: none;
}
.cancel {
  font-family: "Open Sans", sans-serif;
  background-color: #343333;
  color: white;
  width: 10vw;
  height: 10vh;
  font-size: 1.5rem;
  font-weight: 800;
  border: none;
  margin-top: 2rem;
}
.choose-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 28vw;
  background-color: #777674;
  margin-top: 5vh;
}
.chs-date-mssg {
  text-align: start;
  margin-right: 2rem;
  margin-left: 3rem;
  color: #343333;
}
.dark-txt {
  color: #343333;
  font-weight: 800;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
}
.error-mssg {
  width: 30vw;
  border: 3px solid rgb(182, 51, 51);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(182, 51, 51);
  height: 30vh;
  margin-top: 5vh;
}
.fade {
  opacity: 0.2;
}
.image {
  cursor: pointer;
}
.info {
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-mssg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #a7a6a7;
  width: 30vw;
  height: 10vh;

  margin-top: 5vh;
  color: white;
  font-size: 1.2rem;
  font-weight: 100;
}
.instr-mssg {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #a7a6a7;
  width: 28vw;
  height: 10vh;
}
.list-time {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
.no-room-mssg,
.cancel-div {
  width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.orng-txt {
  color: #ff6b00;
  font-size: 1.5rem;
}
.vacancies {
  margin-left: 0.5rem;
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
  margin-top: 2rem;
}
.sbmt:focus {
  outline: 3px solid #ff6b00;
}
.sbmt-error {
  font-family: "Open Sans", sans-serif;
  background-color: #777674;
  color: #343333;
  width: 10vw;
  height: 7vh;
  font-size: 1.5rem;
  font-weight: 800;
  border: none;
  margin-top: 2rem;
}
.sbmt-error:focus {
  outline: none;
}
.sccss-mssg {
  width: 30vw;
  border: 3px solid rgb(105, 150, 105);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(105, 150, 105);
  height: 30vh;
  margin-top: 5vh;
}

.sign-div {
  width: 30vw;
  background-color: #777674;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.time {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  width: 20vw;
  border-bottom: 2px solid #343333;
  cursor: pointer;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 20vw;
  background-color: #555;
  color: #fff;
  text-align: center;
  position: absolute;
  z-index: 1;
  font-size: 1rem;
  left: 20%;
  height: 5vh;
  opacity: 0;
  transition: opacity 0.3s;
  padding: 10px;
  font-weight: 800;
}
.tooltip .tooltiptext::after {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.type-dsc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.workshops {
  display: flex;
}
.wrk-date-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10vw;
  margin-top: 10vh;
}
.wrk-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40vw;
  margin-left: 10vw;
  margin-top: 10vh;
}
.wrk-type-dsc {
  text-align: justify;
  margin-bottom: 3rem;
}
.wrk-type-title {
  text-align: start;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 0.8rem;
  }
  h2 {
    font-size: 0.8rem;
  }
  input {
    font-size: 0.8rem;
  }
  label {
    font-size: 1rem;
  }
  .dark-txt {
    font-size: 0.8rem;
  }
  .orng-txt {
    font-size: 1rem;
  }
  .sbmt,
  .cancel,
  .sbmt-error {
    font-size: 1rem;
  }
  .tooltip:hover .tooltiptext {
    visibility: hidden;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 0.7rem;
  }
  h2 {
    font-size: 0.8rem;
  }
  input {
    font-size: 0.8rem;
    width: 25vw;
  }
  label {
    font-size: 0.9rem;
  }
  .chs-date-mssg {
    width: 25vw;
    font-size: 0.6rem;
  }
  .dark-txt {
    font-size: 0.7rem;
  }
  .info-mssg {
    height: 5vh;
  }
  .instr-mssg {
    height: 7vh;
  }
  .orng-txt {
    font-size: 0.9rem;
  }
  .sbmt,
  .cancel,
  .sbmt-error {
    font-size: 1rem;
    height: 5vh;
  }
  .time {
    width: 25vw;
  }
  .tooltip:hover .tooltiptext {
    visibility: hidden;
  }
}
@media only screen and (max-width: 768px) {
  h2 {
    font-size: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  img {
    width: 90vw;
    margin-left: -5vw;
  }
  input {
    width: 85vw;
  }
  .btn-back{
  font-size: 2.5rem;
  }
  .cancel {
    width: 50vw;
  }
  .cancel-div {
    width: 85vw;
  }
  .choose-time {
    width: 91vw;
  }
  .chs-date-mssg {
    font-size: 0.7rem;
  }
  .dark-txt {
    font-size: 1rem;
  }
  .error-mssg {
    width: 90vw;
  }
  .gallery{
  width: 100vw;
  }
  
  .info-mssg {
    width: 91vw;
  }
  .instr-mssg {
    width: 91vw;
  }
  .list-time {
    width: 91vw;
  }
  .no-room-mssg {
    width: 85vw;
  }
  .sbmt {
    width: 50vw;
  }
  .sbmt-error {
    width: 50vw;
  }
  .sccss-mssg {
    width: 90vw;
  }
  .sign-div {
    width: 91vw;
  }
  .time {
    width: 80vw;
    margin-left: 1rem;
  }
  .tooltip:hover .tooltiptext {
    visibility: hidden;
  }
  .type-dsc {
    width: 90vw;
    background-color: #777674;
    margin-left: 0;
  }
  .vacancies {
    font-size: 1rem;
  }
  .wrk {
    width: 95vw;
  }
  .wrk-date-info {
    order: 1;
    width: 100vw;
    margin-left: 0;
    margin-top: 20vh;
  }
  .wrk-details {
    order: 2;
    width: 100vw;
  }
  .wrk-manager {
    width: 91vw;
  }
  .wrk-type-dsc {
    width: 85vw;
    margin-left: 0.5rem;
  }
  .wrk-type-title {
    width: 90vw;
    background-color: #555;
    text-align: center;
    margin-top: 0;
    font-size: 2rem;
    font-weight: 800;
  }
  .workshops {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }
}
</style>