<template>
  <div class="edit">
    <div class="title">
      <h1>{{ $t("admin[3].title") }}</h1>
    </div>
    <div class="sqrs">
      <div class="section">
        <div class="edit-types-btns">
          <button class="edit-add-btn" @click="editWorkshopType">
            {{ $t("workshops.edit_wrk_type").toUpperCase() }}
          </button>
          <button class="edit-add-btn" @click="addWorkshopType">
            {{ $t("workshops.add_wrk_type").toUpperCase() }}
          </button>
        </div>
      </div>
      <div class="section">
        <calendar
          :key="componentCalendarKey"
          :calendar_info="calendar_info"
          @show-selected="showSelected"
          @add-to-selected="addNewWrkDay"
        ></calendar>
      </div>
      <div class="section" v-if="show_selected">
        <div class="show-selected">
          <div class="date">
            <h1 class="date-title">{{ day }}.{{ month }}.{{ year }}</h1>
            <i class="fas fa-times exit" @click="exitSelected"></i>
          </div>
          <div class="add-new-wrk-day" v-if="new_date !== null">
            <div class="inpts">
              <h3>{{ $t("workshops.max_students") }}</h3>
              <input type="number" v-model="max_students" />
              <h3>{{ $t("workshops.signed_students") }}</h3>
              <input type="number" v-model="signed_students" />
              <h3>{{ $t("workshops.workshop_type") }}</h3>
              <select name="" id="" v-model="wrks_id">
                <option
                  v-for="(wrkshop, index) in object_array"
                  :key="'w' + index"
                  :value="wrkshop.wrks_id"
                >
                  {{ wrkshop.wrks_type }}
                </option>
              </select>

              <h3>{{ $t("workshops.admin_add_time") }}</h3>
              <div class="time">
                <input class="time-inpt" type="text" v-model="hours" />
                <p>h :</p>
                <input class="time-inpt" type="text" v-model="minutes" />
                <p>m :</p>
                <input class="time-inpt" type="text" v-model="seconds" />
                <p>s</p>
                <i
                  v-if="new_time === null"
                  class="fas fa-plus icon"
                  @click="addTime()"
                ></i>
              </div>
              <div class="list-time">
                <p>{{ $t("workshops.time") }}</p>
                <p class="orng-txt">{{ new_time }}</p>
                <i class="far fa-trash-alt icon" @click="deleteTime()"></i>
              </div>
              <div class="btns">
                <button class="sbmt" @click="addWorkDay()">
                  {{ $t("frq_words.add") }}
                </button>
              </div>
            </div>
          </div>
          <div class="edit-wrk-day" v-if="date !== null">
            <h3>{{ $t("workshops.admin_add_time") }}</h3>
            <div class="time">
              <input class="time-inpt" type="text" v-model="hours" />
              <p>h :</p>
              <input class="time-inpt" type="text" v-model="minutes" />
              <p>m :</p>
              <input class="time-inpt" type="text" v-model="seconds" />
              <p>s</p>
              <i class="fas fa-plus icon" @click="addTime()"></i>
            </div>
            <p>{{ $t("workshops.admin_instr_mssg") }}</p>
            <div
              class="list-time"
              v-for="(time, index) in time_array"
              :key="'t' + index"
            >
              <p>{{ $t("workshops.time") }}</p>
              <p class="orng-txt">
                {{ time.existing_time }}
              </p>

              <i class="fas fa-pen icon" @click="chooseTime(time)"></i>
              <i class="far fa-trash-alt icon" @click="deleteTime(time)"></i>
            </div>
            <div class="inpts" v-if="chosen_time !== null">
              <div class="time-title">
                <h1 class="admin_time_title">{{ $t("workshops.admin_time_title") }}</h1>
                <p class="orng-txt">
                  {{ chosen_time }}
                </p>
              </div>
              <h3>{{ $t("workshops.max_students") }}</h3>
              <input type="number" v-model="max_students" />
              <h3>{{ $t("workshops.signed_students") }}</h3>
              <input type="number" v-model="signed_students" />

              <select name="" id="" v-model="wrks_id">
                <option
                  v-for="(wrkshop, index) in object_array"
                  :key="'e-w' + index"
                  :value="wrkshop.wrks_id"
                >
                  {{ wrkshop.wrks_type }}
                </option>
              </select>
              <div class="btns">
                <button class="sbmt" @click="submitChangesWorkDay()">
                  {{ $t("button.submit") }}
                </button>
              </div>
            </div>
            <div class="btns">
              <button class="cancel" @click="cancelWorkDay()">
                {{ $t("button.cancel") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import Calendar from "./Calendar.vue";

export default {
  components: { Calendar },
  props: {
    calendar_info: Array,

    object_array: Array,
    componentWrkKey: Number,
  },
  data() {
    return {
      show_selected: false,
      new_date: null,
      date: null,
      year: null,
      month: null,
      day: null,
      max_students: null,
      signed_students: 0,
      hours: "00",
      minutes: "00",
      seconds: "00",
      time_array: [],
      componentCalendarKey: 0,
      new_time: null,
      chosen_time: null,
      wrk_id: null,
      wrks_id: "",
    };
  },
  methods: {
    addNewWrkDay(new_wrk_day) {
      this.time_array = [];
      this.date = null;
      this.day = new_wrk_day.day;
      this.month = new_wrk_day.month;
      this.year = new_wrk_day.year;
      this.new_date = new_wrk_day.date;
      this.show_selected = true;
      this.$emit("show_selected_wrk");
    },
    addTime() {
      let time = this.hours + ":" + this.minutes + ":" + this.seconds;
      if (this.new_date !== null) {
        this.new_time = time;
      }
      if (this.date !== null) {
        let formData = new FormData();
        let newTime = new Object();
        formData.append("sid", localStorage.getItem("sid"));
        formData.append("wrk_date", this.date);
        formData.append("wrk_time", time);
        axios.post(this.baseUrl + "workshop", formData).then((res) => {
          console.log(res);
          this.time_array.push({
            existing_time: time,
            wrk_id: res.data.wrk_id,
          });
          newTime.wrk_id = res.data.wrk_id;
          newTime.time = time;
          newTime.max_students = this.max_students;
          newTime.signed_students = this.signed_students;
          newTime.date = this.date;
          console.log(newTime.max_students)
          this.$emit("add-time", newTime);
        });
      }
    },
    addWorkDay() {
      let new_wrk_day = new Object();
      new_wrk_day.date = this.new_date;
      new_wrk_day.max_students = this.max_students;
      new_wrk_day.signed_students = this.signed_students;
      new_wrk_day.time = this.new_time;
      new_wrk_day.wrks_id = this.wrks_id;
      this.$emit("add-new-wrk-day", new_wrk_day);
    },
    addWorkshopType() {
      this.$emit("add-wrk-type");
    },
    cancelWorkDay() {
      let wrk_date = this.date;
      this.$emit("cancel-whole-day", wrk_date);
    },
    chooseTime(time) {
      this.max_students = time.max_students;
      this.signed_students = time.signed_students;
      this.wrk_id = time.wrk_id;
      this.chosen_time = time.existing_time;
    },
    deleteTime(time) {
      if (this.new_time !== null) {
        this.new_time = null;
      } else {
        for (let i = 0; i < this.time_array.length; i++) {
          if (this.time_array[i] === time) {
            // this.time_array.splice(i, 1);
            if (time.existing_time) {
              axios
                .delete(this.baseUrl + "workshop", {
                  params: {
                    wrk_id: time.wrk_id,
                    sid: localStorage.getItem("sid"),
                  },
                })
                .then((res) => {
                  console.log(res);
                  if (this.wrk_id == time.wrk_id) {
                    this.chosen_time = null;
                    this.wrk_id = null;
                    this.signed_students = 0;
                    this.max_students = 0;
                  }
                  this.time_array.splice(i, 1);
                });
            }
          }
        }
      }
    },
    editWorkshopType() {
      this.$emit("edit-wrk-type");
    },
    exitSelected() {
      this.show_selected = false;
    },
    forceRerender() {
      this.componentCalendarKey++;
    },
    showSelected(wrk_day) {
      this.time_array = [];
      this.new_date = null;
      this.chosen_time = null;

      this.day = wrk_day.date_day;
      this.month = wrk_day.date_month;
      this.year = wrk_day.date_year;
      this.date = wrk_day.wrk_date;
      this.max_students = wrk_day.wrk_max_students;
      this.signed_students = wrk_day.wrk_signed_students;
      this.wrks_id = wrk_day.wrks_id;
      this.show_selected = true;

      axios
        .get(this.baseUrl + "available_workshops", {
          params: { wrk_date: wrk_day.wrk_date },
        })
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.time_array.push({
              existing_time: res.data.data[i].wrk_time,
              wrk_id: res.data.data[i].wrk_id,
              max_students: res.data.data[i].wrk_max_students,
              signed_students: res.data.data[i].wrk_signed_students,
            });
          }
        });
      this.$emit("show_selected_wrk");
    },
    submitChangesWorkDay() {
      let changedWorkDay = new Object();
      changedWorkDay.date = this.date;
      changedWorkDay.max_students = this.max_students;
      changedWorkDay.signed_students = this.signed_students;
      changedWorkDay.time_array = this.chosen_time;
      changedWorkDay.wrk_id = this.wrk_id;
      changedWorkDay.wrks_id = this.wrks_id;
      this.$emit("submit-change-workshop", changedWorkDay);
      this.chosen_time = null;
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  watch: {
    componentWrkKey: {
      handler() {
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
select {
  width: 10vw;
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
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
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
}
.cancel:focus {
  outline: none;
}
.date {
  color: #ff6b00;
  margin-bottom: 2rem;
  width: 25vw;
  height: 10vh;
  background-color: #535252;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-add-btn {
  font-family: "Open Sans", sans-serif;
  background-color: #777674;
  color: white;
  width: 10vw;
  height: 20vh;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.edit-add-btn:focus {
  outline: 3px solid #ff6b00;
}
.edit-types-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;

  height: 40vh;
  margin-top: 10vw;
}
.edit-wrk-day {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.exit {
  font-size: 2rem;
  color: #343333;
  position: absolute;
  left: 92vw;
  cursor: pointer;
}
.icon {
  font-size: 1.5rem;
  color: #ff6b00;
  border: 1px dashed #535252;
  cursor: pointer;
}
.inner-sqr {
  width: 10vw;
  height: 10vw;
  border: 5px dashed #a7a6a7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inpts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.list-time {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  width: 20vw;
  border-bottom: 2px solid #343333;
}
.orng-txt {
  color: #ff6b00;
  font-size: 1.5rem;
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
.section {
  /* height: 100vh;*/
  display: flex;
  align-items: center;
  justify-content: center;
}
.show-selected {
  background-color: #777674;
  width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 20vh;
}

.sqrs {
  display: flex;

  width: 80vw;
  gap: 1rem;
  margin-left: 30vw;
  align-items: flex-start;
  justify-content: flex-start;
  /* margin-top: 20vh;*/
}
.time {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: center;
}
.time-inpt {
  width: 3vw;
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
@media only screen and (min-width: 768px) and (max-width: 1280px) {

  h3{
    font-size: .8rem;
    width: 20vw;
  }
  input{
    font-size: .8rem;
  }
  p{
    font-size: .8rem;
   
  }
  select{
    width: 15vw;
  }
  .admin_time_title{
    font-size: 1rem;
  }
  .date-title{
    font-size: 1.2rem;
  }
.edit-add-btn{
  font-size: .8rem;
}
.edit-wrk-day{
  width: 25vw;
}
.exit{
  font-size: 1.2rem;
  left: 95vw;
}
.icon{
font-size: 1rem;
}
.orng-txt{
  font-size: 1rem;
}
.sbmt, .cancel{
  font-size: 1rem;
  width: 20vw;
}
.show-selected{
  margin-top: 0;
}
.time-inpt{
  width: 2vw;
}
.title{
  font-size: 1rem;
   left: -5rem;
}
}
@media only screen and (max-width: 768px) {
  button {
    width: 50vw;
  }
  .btns {
    width: 90vw;
    height: 20vh;
    margin-top: 0;
    margin-bottom: 0;
  }
  .cancel, .sbmt{
    width: 50vw;
  }
  .date{
    width: 90vw;
  }
  .edit {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .edit-add-btn {
    width: 50vw;
    font-size: 1rem;
    height: 10vh;
  }
  .edit-types-btns{
    margin-top: 0;
  }
  .exit{
    left: 85vw;
  }
  .inner-sqr {
    width: 30vw;
    height: 30vw;
  }
  .list-time{
    width: 85vw;
  }
  .show-selected{
    width: 90vw;
    margin-top: 0;
  }
  .sqr {
    width: 60vw;
    height: 60vw;
  }
  .sqrs {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-left: 0;
  }
  .time-inpt{
    width: 10vw;
  }
  .title {
    position: static;
    transform: rotate(0deg);
    width: 90vw;
    background-color: #777674;
    font-size: 1rem;
    color: #343333;
  }
}
</style>