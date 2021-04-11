<template>
  <div
    class="gallery"
    :class="{
      'gallery-admin': admin_page,
      'gallery-artworks': art_page,
      'gallery-exh': exh_page,
      'gallery-wrkshops': work_page,
    }"
  >
    <div
      class="list-items"
      :class="{
        'list-items-admin': admin_page,
        'list-items-artworks': art_page,
        'list-items-exh': exh_page,
        'list-items-wrkshops': work_page,
      }"
    >
      <div
        class="item"
        v-for="(object, index) in object_array"
        :key="'item' + index"
      >
        <div class="delete-img-div" v-if="admin_page">
          <i class="far fa-trash-alt delete" @click="deleteObject(object)"></i>
        </div>
        <div v-lazyload>
          <img
            :data-url="object.cover_path"
            src="../../public/images/placeholder.gif"
            alt=""
            @click="chooseObject(object)"
          />
        </div>
        <div class="item-dtls" v-if="exh_page === false && work_page === false">
          <!-- <div class="dtl"> -->
          <!-- <p>{{ $t("frq_words.title") }}:</p> -->
          <h2 class="dtl-txt-title">{{ object.title }}</h2>
          <!-- </div> -->
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.dimensions") }}:</p>
            <p class="dtl-txt">{{ object.art_dmns }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.material") }}:</p>
            <p class="dtl-txt">{{ object.material }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.technique") }}:</p>
            <p class="dtl-txt">{{ object.technique }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.price") }}:</p>
            <p class="dtl-txt">{{ object.art_price }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.year") }}:</p>
            <p class="dtl-txt">{{ object.art_year }}</p>
          </div>
          <div class="dtl" v-if="type === 'artwork'">
            <p>{{ $t("frq_words.for_sale") }}:</p>
            <p class="dtl-txt" v-if="object.art_forsale === 0">
              {{ $t("frq_words.no") }}
            </p>
            <p class="dtl-txt" v-else-if="object.art_forsale === 1">
              {{ $t("frq_words.yes") }}
            </p>
          </div>
          <div class="dtl" v-if="type === 'exhibition'">
            <p>{{ $t("frq_words.place") }}:</p>
            <p class="dtl-txt">{{ object.place }}</p>
          </div>
          <div class="dtl" v-if="type === 'exhibition'">
            <p>{{ $t("frq_words.date") }}:</p>
            <div class="date">
              <p class="dtl-date">{{ object.exh_date_start }}</p>

              <p class="dtl-date">{{ object.exh_date_finish }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  components: {},
  props: {
    type: String,
    gallery_style: String,
    object_array: Array,
  },
  data() {
    return {
      title: "",
      material: "",
      technique: "",
      description: "",
      review: "",
      place: "",
      admin_page: false,
      exh_page: false,
      art_page: false,
      work_page: false,
    };
  },
  methods: {
    checkPage() {
      if (this.$route.name === "Admin") {
        this.admin_page = true;
      }
      if (this.$route.name === "Exhibitions") {
        this.exh_page = true;
      }
      if (this.$route.name === "Artworks") {
        this.art_page = true;
      }
      if (this.$route.name === "Workshops") {
        this.work_page = true;
      }
    },

    chooseObject(object) {
      if (this.$route.name === "Admin") {
        if (this.type === "artwork") {
          this.$emit("choose-artwork", object);
        }
        if (this.type === "exhibition") {
          this.$emit("choose-exh", object);
        }
        if (this.type === "workshops") {
          this.$emit("choose-workshop", object);
        }
      } else {
        this.$emit("choose-object", object);
      }
    },
    deleteObject(object) {
      console.log(object);
      this.$emit("delete-object", object);
    },
  },
  computed: {
    ...mapState(["curLanguage", "baseUrl"]),
  },
  mounted() {
    this.checkPage();
  },
};
</script>
<style scoped>
img {
  width: 20vw;
  height: 30vh;
  object-fit: contain;
  background-color: #474646;
  cursor: pointer;
}
p {
  width: 5vw;
  text-align: start;
}
.date {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.delete {
  cursor: pointer;
}
.delete-img-div {
  font-size: 2rem;
  color: #ff6b00;
  margin-left: -5rem;
  width: 25vw;
  text-align: end;
}
.dtl {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-left: 3rem;
}
.dtl-txt {
  font-size: 1rem;
  color: #343333;
  width: 10vw;
  text-align: start;
}
.dtl-txt-title {
  font-size: 2rem;
  font-weight: 800;
  color: #474646;
  width: 20vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
.gallery {
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-admin {
  width: 50vw;
}
.gallery-artworks {
  width: 80vw;
  margin-left: 10vw;
}
.gallery-wrkshops {
  width: 80vw;
  margin-left: 10vw;
}
.item {
  width: 20vw;
  height: fit-content;
  background-color: #777674;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item-dtls {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;
  color: #d9d9d9;
  font-weight: 300;

  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 20vw;
}

.list-items-admin {
  width: 50vw;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: flex-start;
}
.list-items-artworks {
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
.list-items-exh {
  width: 50vw;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
.list-items-wrkshops {
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
.photo-slider {
  top: 10vh;
  margin-left: -10vw;
  width: 30vw;
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  p {
    font-size: 0.8rem;
  }
  .dtl {
    margin-left: 1rem;
  }
  .dtl-txt {
    font-size: 0.8rem;
    margin-left: 1rem;
    width: 15vw;
  }
  .dtl-txt-title {
    font-size: 1.5rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
img{
height: 20vh;
}
  p {
    font-size: 0.5rem;
  }
  .delete-img-div {
    font-size: 1.5rem;
  }
  .dtl {
    margin-left: 1rem;
  }
  .dtl-txt {
    font-size: 0.5rem;
    margin-left: 0.5rem;
    width: 15vw;
  }
  .dtl-txt-title {
    font-size: 1.5rem;
  }
}
@media only screen and (max-width: 768px) {
  img {
    width: 90vw;
    height: 50vh;
    object-fit: contain;
  }
  p {
    width: 20vw;
    text-align: start;
  }
  .delete-img-div {
    width: 85vw;
    margin-left: 0;
    position: absolute;
    margin-top: -80vh;
  }
  .dtl-txt {
    width: 50vw;
  }
  .dtl-txt-title {
    font-size: 2rem;
    font-weight: 800;

    width: 90vw;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .gallery-admin {
    width: 90vw;
  }
  .item {
    width: 90vw;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .item-dtls {
    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: flex-start;

    width: 90vw;
  }
  .list-items-artworks,
  .list-items-exh,
  .list-items-wrkshops,
  .list-items-admin {
    width: 90vw;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }
}
</style>