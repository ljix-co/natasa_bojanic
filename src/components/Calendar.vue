<template>
  <div class="calendar">
    <div class="calendar-dtls">
      <div class="select">
        <div class="month">
          <i class="fas fa-chevron-left arrow" @click="monthPrev()"></i>
          <h2 class="mnth">{{ $t(`calendar[${month_selected}].month`) }}</h2>
          <i class="fas fa-chevron-right arrow" @click="monthNext()"></i>
        </div>
        <div class="year">
          <div :class="{ ' hidden': no_prev_y }">
            <i class="fas fa-chevron-left arrow" @click="yearPrev()"></i>
          </div>
          <h2>{{ year }}</h2>
          <i
            class="fas fa-chevron-right arrow"
            :class="{ hidden: no_next_y }"
            @click="yearNext()"
          ></i>
        </div>
      </div>
      <div class="list-days">
        <div
          class="week-day"
          v-for="(index_day, index) in week_index"
          :key="'w' + index"
        >
          <h3>{{ $t(`week_days[${index_day}].day`) }}</h3>
        </div>
      </div>
    </div>
    <div class="list-days">
      <div
        class="day"
        :class="{ day_now: day.day_now, selected: day.selected }"
        v-for="(day, index) in days_show"
        :key="index"
        @click="getSelectedDay(day)"
      >
        <h2 class="num" :class="{ gray: day.not_curnt }">{{ day.day }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    calendar_info: Array,
  },
  data() {
    return {
      date: new Date(),
      month_selected: null,
      year: null,
      year_now: null,
      year_range: 5,
      no_next_y: false,
      no_prev_y: false,
      days_month: null,
      days_show: [],
      total_days_show: 42,
      workshop_days: [],
      week_index: [0, 1, 2, 3, 4, 5, 6],
      admin_page: false,
    };
  },
  methods: {
    getDateNow() {
      this.month_selected = this.date.getMonth();
      this.year_now = this.date.getFullYear();
      this.year = this.year_now;
      this.getDaysMonth();
       this.getWorkshopDates();
    },
    //PRIKAZANI DANI
    getDaysMonth() {
      this.days_show = [];
      this.days_month = new Date(
        this.year,
        this.month_selected + 1,
        0
      ).getDate();

      let curnt_day = this.date.getDate();
      let curnt_month = this.date.getMonth();

      let first_d = new Date(this.year, this.month_selected, 1).getDay();

      let prev_d =
        new Date(this.year, this.month_selected, 0).getDate() - first_d + 1;

      for (
        let i = prev_d;
        i <= new Date(this.year, this.month_selected, 0).getDate();
        i++
      ) {
        this.days_show.push({
          day: i,
          selected: false,
          day_now: false,
          not_curnt: true,
        });
      }

      for (let i = 1; i <= this.days_month; i++) {
        this.days_show.push({
          day: i,
          selected: false,
          day_now: false,
          not_curnt: false,
        });
      }
      let rem_days = this.total_days_show - this.days_show.length;
      for (let i = 1; i <= rem_days; i++) {
        this.days_show.push({
          day: i,
          selected: false,
          day_now: false,
          not_curnt: true,
        });
      }

      for (let i = 0; i < this.days_show.length; i++) {
        if (
          this.days_show[i].not_curnt === false &&
          this.month_selected === curnt_month &&
          this.year_now == this.year
        ) {
          if (this.days_show[i].day == curnt_day) {
            this.days_show[i].day_now = true;
          }
        }
      }
    
    },
    //KRAJ F-JE
    getSelectedDay(day) {
      if (day.selected === true) {
        let wrk_day = null;
        for (let i = 0; i < this.workshop_days.length; i++) {
          if (this.workshop_days[i].date_day == day.day) {
            wrk_day = this.workshop_days[i];
          }
        }
        this.$emit("show-selected", wrk_day);
      }
      if (day.selected === false && this.$route.name === "Admin") {
        let new_wrk_day = new Object();
        new_wrk_day.date =
          this.year + "-" + (this.month_selected + 1) + "-" + day.day;
        new_wrk_day.year = this.year;
        new_wrk_day.month = this.month_selected + 1;
        new_wrk_day.day = day.day;
        this.$emit("add-to-selected", new_wrk_day);
      }
    },
    getWorkshopDates() {
      for (let i = 0; i < this.calendar_info.length; i++) {
        if (this.calendar_info[i].date_year == this.year) {
          if (this.calendar_info[i].date_month == this.month_selected + 1) {
            let selected_day = this.calendar_info[i].date_day;
            this.workshop_days.push(this.calendar_info[i]);
            for (let j = 0; j < this.days_show.length; j++) {
              if (
                this.days_show[j].not_curnt === false &&
                selected_day == this.days_show[j].day
              ) {
                this.days_show[j].selected = true;
              }
            }
          }
        }
      }
    },
    monthNext() {
      if (this.month_selected < 11) {
        this.month_selected++;
      } else if (this.month_selected == 11) {
        this.month_selected = 0;
        this.year++;
      }
    },
    monthPrev() {
      if (this.month_selected > 0) {
        this.month_selected--;
      } else if (this.month_selected == 0) {
        this.month_selected = 11;
        this.year--;
      }
    },

    yearNext() {
      if (this.year < this.year_now + this.year_range) {
        this.year++;
        this.no_prev_y = false;
      } else {
        this.no_next_y = true;
      }
    },
    yearPrev() {
      if (this.year > this.year_now - this.year_range) {
        this.year--;
        this.no_next_y = false;
      } else {
        this.no_prev_y = true;
      }
    },
  },
  mounted() {
    this.getDateNow();
   
  },
  watch: {
    year: {
      handler() {
        this.getDaysMonth();
      },
    },
    month_selected: {
      handler() {
        this.getDaysMonth();
        this.getWorkshopDates();
      },
    },
  },
};
</script>
<style scoped>
.arrow {
  color: #ff6b00;
}
.calendar {
  margin-top: 20vh;

  width: 30vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.calendar-dtls {
  width: 28vw;
  border: 4px solid gray;
}
.day {
  width: 4vw;
  height: 4vw;
  border: 2px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
}
.day_now {
  color: rgb(164, 209, 164);
  border: 3px solid rgb(107, 235, 107);
}
.gray {
  opacity: 0.2;
}
.hidden {
  display: none;
}
.list-days {
  width: 28vw;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
}
.mnth {
  width: 10vw;
}
.month {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.num {
  font-size: 1.5rem;
}
.select {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  width: 28vw;
  height: 10vh;
}
.selected {
  color: white;
  border: 5px solid #ff6b00;
  cursor: pointer;
}
.week-day {
  color: gray;

  width: 4vw;
}
.year {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>