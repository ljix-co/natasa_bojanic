<template>
  <div class="admin">
    <div v-if="add === false && edit === false">
      <edit-author
        class="component"
        :aut_info="aut_info"
        :key="componentAutKey"
        @submit-aut="submitAut"
      ></edit-author>
      <edit-artworks
        class="component"
        :artworks="artworks"
        @add="addArtwork"
        @edit="editArtworks"
      ></edit-artworks>
      <edit-exhibitions
        :exhibitions="exhibitions"
        @add-exh="addExh"
        @edit-solo="editSoloExh"
        @edit-group="editGroupExh"
      ></edit-exhibitions>
      <edit-workshops
        class="component"
        :key="'w' + componentWrkKey"
        :componentWrkKey="componentWrkKey"
        :calendar_info="calendar_info"
        :object_array="object_array"
        @add-new-wrk-day="addNewWorkshop"
        @add-time="addNewTime"
        @add-wrk-type="addWorkshopType"
        @cancel-whole-day="cancelWorkshop"
        @edit-wrk-type="editWorkshopTypes"
        @show_selected_wrk="showSelectedWorkshop"
        @submit-change-workshop="changeWorkshopDtls"
      ></edit-workshops>
    </div>
    <add
      class="component-window"
      v-if="add"
      :type="type"
      @exit="exit"
      @add-artwork="addNewArtwork"
      @add-exh="addNewExh"
      @add-workshop-type="addNewWorskhopType"
    ></add>
    <edit
      class="component-window"
      :key="'e' + componentEditKey"
      v-if="edit"
      :type="type"
      :artworks="artworks"
      :exhibitions="exhibitions"
      :object_array="object_array"
      :rerender="rerender"
      @exit="exit"
      @submit-edit-object="submitEditedObject"
      @delete-object="deleteObject"
    ></edit>
    <Modal
      class="modal"
      v-if="modal_type !== ''"
      :modal_type="modal_type"
      :confirm_function="confirm_function"
      :message="message"
      :object_array="object_array"
      @exit-modal="exitModal"
    ></Modal>
  </div>
</template>
<script>
import EditArtworks from "../components/EditArtworks.vue";
import EditAuthor from "../components/EditAuthor.vue";
import EditExhibitions from "../components/EditExhibitions.vue";
import Add from "../components/Add.vue";
import Edit from "../components/Edit.vue";
import axios from "axios";
import { mapState } from "vuex";
import EditWorkshops from "../components/EditWorkshops.vue";
import Modal from "../components/Modal.vue";
export default {
  components: {
    EditArtworks,
    EditAuthor,
    EditExhibitions,
    Add,
    Edit,
    EditWorkshops,
    Modal,
  },
  data() {
    return {
      aut_info: new Object(),
      artworks: [],
      solo_exhibitions: [],
      group_exhibitions: [],
      exhibitions: [],
      type: "",
      add: false,
      edit: false,
      componentEditKey: 0,
      componentAutKey: 0,
      componentWrkKey: 0,
      rerender: false,
      object_array: [],
      object_array_type: "",
      calendar_info: [],
      workshops: [],
      modal_type: "",
      confirm_function: null,
      message: "",
    };
  },
  methods: {
    addArtwork() {
      this.type = "artwork";
      this.add = true;
    },
    addExh() {
      this.type = "exhibition";
      this.add = true;
    },
    addNewArtwork(newArtwork) {
      let art_id = null;

      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("art_title_en", newArtwork.title_en);
      formData.append("art_title_rs", newArtwork.title_rs);
      formData.append("art_material_en", newArtwork.material_en);
      formData.append("art_material_rs", newArtwork.material_rs);
      formData.append("art_tech_en", newArtwork.technique_en);
      formData.append("art_tech_rs", newArtwork.technique_rs);
      formData.append("art_dmns", newArtwork.dimensions);
      formData.append("art_year", newArtwork.year);
      formData.append("art_forsale", newArtwork.for_sale);
      formData.append("art_price", newArtwork.price);

      axios.post(this.baseUrl + "artworks", formData).then((res) => {
        console.log(res);
        art_id = res.data.art_id;
        let imgFormData = new FormData();
        imgFormData.append("sid", localStorage.getItem("sid"));
        imgFormData.append("img_image", newArtwork.main_img);
        imgFormData.append("art_id", art_id);
        axios.post(this.baseUrl + "main_images", imgFormData).then((res) => {
          console.log(res);
          let img_id = res.data.img_id;
          if (newArtwork.det_images.length > 0) {
            for (let i = 0; i < newArtwork.det_images.length; i++) {
              let detImgFormData = new FormData();
              detImgFormData.append("sid", localStorage.getItem("sid"));
              detImgFormData.append("img_id", img_id);
              detImgFormData.append(
                "dimg_image",
                newArtwork.det_images[i].image
              );
              axios
                .post(this.baseUrl + "dtls_images", detImgFormData)
                .then((res) => {
                  console.log(res);
                  this.add = false;
                  this.type = "";
                });
            }
          } else {
            this.$router.go();
          }
        });
      });
    },
    addNewExh(newExh) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("exh_title_en", newExh.title_en);
      formData.append("exh_title_rs", newExh.title_rs);
      formData.append("exh_place_en", newExh.place_en);
      formData.append("exh_place_rs", newExh.place_rs);
      formData.append("exh_rev_en", newExh.rev_en);
      formData.append("exh_rev_rs", newExh.rev_rs);
      formData.append("exh_dsc_en", newExh.dsc_rs);
      formData.append("exh_dsc_rs", newExh.dsc_rs);
      formData.append("exh_cover", newExh.cover);
      formData.append("exh_date_start", newExh.date_start);
      formData.append("exh_date_finish", newExh.date_finish);
      formData.append("exh_type", newExh.type);
      axios.post(this.baseUrl + "exhibitions", formData).then((res) => {
        let exh_id = res.data.exh_id;
        console.log(res);
        if (newExh.images.length > 0) {
          for (let i = 0; i < newExh.images.length; i++) {
            let imgFormData = new FormData();
            imgFormData.append("sid", localStorage.getItem("sid"));
            imgFormData.append("exh_id", exh_id);
            imgFormData.append("img_image", newExh.images[i].image);
            axios
              .post(this.baseUrl + "main_images", imgFormData)
              .then((res) => {
                console.log(res);
                this.$router.go();
              });
          }
        } else {
          this.$router.go();
        }
      });
    },
    addNewTime(newTime) {
      this.calendar_info.push({
        wrk_id: newTime.wrk_id,
        wrk_date: newTime.wrk_date,
        wrk_time: newTime.time,
        wrk_max_students: newTime.max_students,
        wrk_signed_students: newTime.signed_students,
      });
    },
    addNewWorkshop(new_wrk_day) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("wrk_date", new_wrk_day.date);
      formData.append("wrk_max_students", new_wrk_day.max_students);
      formData.append("wrk_signed_students", new_wrk_day.signed_students);
      formData.append("wrk_time", new_wrk_day.time);
      formData.append("wrks_id", new_wrk_day.wrks_id);
      axios
        .post(this.baseUrl + "workshop", formData)
        .then((res) => {
          console.log(res);
          this.getWorkshopDateInfo();
        })
        .catch((error) => {
          console.log(error);
          this.modal_type = "wrong";
          this.checkLanguage();
        });
    },
    addNewWorskhopType(newWorkshopType) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("wrks_type_en", newWorkshopType.type_en);
      formData.append("wrks_type_rs", newWorkshopType.type_rs);
      formData.append("wrks_dsc_en", newWorkshopType.dsc_en);
      formData.append("wrks_dsc_rs", newWorkshopType.dsc_rs);
      formData.append("wrks_price_mnth", newWorkshopType.price);
      formData.append("wrks_image", newWorkshopType.cover);
      axios.post(this.baseUrl + "workshops", formData).then((res) => {
        console.log(res);
        let wrks_id = res.data.wrks_id;
        for (let i = 0; i < newWorkshopType.images.length; i++) {
          let imgFormData = new FormData();
          imgFormData.append("sid", localStorage.getItem("sid"));
          imgFormData.append("wrks_id", wrks_id);
          imgFormData.append("img_image", newWorkshopType.images[i].image);
          axios.post(this.baseUrl + "main_images", imgFormData).then((res) => {
            console.log(res);
            // this.$router.go();
          });
        }
      });
    },
    addWorkshopType() {
      this.type = "workshops";
      this.add = true;
    },
    cancelWorkshop(wrk_date) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      formData.append("wrk_date", wrk_date);
      formData.append("wrk_canceled", 1);

      axios.patch(this.baseUrl + "workshop", formData).then((res) => {
        console.log(res);
        this.getWorkshopDateInfo();
        this.forceRerender();
      });
    },
    changeWorkshopDtls(changedWorkDay) {
      console.log(changedWorkDay.max_students);
      console.log(changedWorkDay.signed_students);
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      for (let i = 0; i < this.calendar_info.length; i++) {
        if (changedWorkDay.wrk_id === this.calendar_info[i].wrk_id) {
          formData.append("wrk_id", changedWorkDay.wrk_id);
          if (changedWorkDay.time !== this.calendar_info[i].wrk_time) {
            formData.append("wrk_time", changedWorkDay.time);
         
              formData.append("wrk_max_students", changedWorkDay.max_students);
              // console.log(changedWorkDay.max_students);
     
              formData.append(
                "wrk_signed_students",
                changedWorkDay.signed_students
              );
              // console.log(changedWorkDay.signed_students);
          
              formData.append("wrks_id", changedWorkDay.wrks_id);
           
            axios.patch(this.baseUrl + "workshop", formData).then((res) => {
              console.log(res);
              // this.forceRerender();
            });
          }
        }
      }
    },
    //CHECK LANGUAGE
    checkLanguage() {
      if (this.curLanguage === "RS") {
        for (let i = 0; i < this.object_array.length; i++) {
          if (this.type === "artwork") {
            this.object_array[i].title = this.object_array[i].art_title_rs;
            this.object_array[i].material = this.object_array[
              i
            ].art_material_rs;
            this.object_array[i].technique = this.object_array[i].art_tech_rs;
          }
          if (this.type === "exhibition") {
            this.object_array[i].title = this.object_array[i].exh_title_rs;
            this.object_array[i].place = this.object_array[i].exh_place_rs;
            this.object_array[i].dsc = this.object_array[i].exh_dsc_rs;
            this.object_array[i].rev = this.object_array[i].exh_rev_rs;
          }
          if (this.type === "workshops") {
            this.object_array[i].wrks_type = this.object_array[i].wrks_type_rs;
            this.object_array[i].dsc = this.object_array[i].wrks_dsc_rs;
            this.object_array[i].title = this.object_array[i].wrks_type_rs;
          }
        }
        if (this.modal_type === "wrong") {
          this.message =
            "Neka polja su ostala prazna. Molimo Vas pokušajte ponovo.";
        }
        if (this.modal_type === "delete") {
          if (this.type === "artwork") {
            this.message = "Da li ste sigurni da želite da izbrišete ovaj rad?";
          }
          if (this.type === "exhibition") {
            this.message =
              "Da li ste sigurni da želite da izbrišete ovu izložbu?";
          }
          if (this.type === "workshops") {
            this.message =
              "Da li ste sigurni da želite da izbrišete ovaj tip radionice?";
          }
        }
      }
      if (this.curLanguage === "EN") {
        for (let i = 0; i < this.object_array.length; i++) {
          if (this.type === "artwork") {
            this.object_array[i].title = this.object_array[i].art_title_en;
            this.object_array[i].material = this.object_array[
              i
            ].art_material_en;
            this.object_array[i].technique = this.object_array[i].art_tech_en;
          }

          if (this.type === "exhibition") {
            this.object_array[i].title = this.object_array[i].exh_title_en;
            this.object_array[i].place = this.object_array[i].exh_place_en;
            this.object_array[i].dsc = this.object_array[i].exh_dsc_en;
            this.object_array[i].rev = this.object_array[i].exh_rev_en;
          }
          if (this.type === "workshops") {
            this.object_array[i].wrks_type = this.object_array[i].wrks_type_en;
            this.object_array[i].dsc = this.object_array[i].wrks_dsc_en;
            this.object_array[i].title = this.object_array[i].wrks_type_en;
          }
        }
        if (this.modal_type === "wrong") {
          this.message = "Some fields are left empty. Please try again.";
        }
        if (this.modal_type === "delete") {
          if (this.type === "artwork") {
            this.message = "Are you sure you want to delete this artwork?";
          }
          if (this.type === "exhibition") {
            this.message = "Are you sure you want to delete this exhibition?";
          }
          if (this.type === "workshops") {
            this.message =
              "Are you sure you want to delete this workshop type?";
          }
        }
      }
    },
    //END CHECK LANGUAGE
    deleteObject(object) {
      this.rerender = false;
      if (this.type === "artwork") {
        let id = object.art_id;
        console.log(id);
        this.confirm_function = function () {
          axios
            .delete("http://246b122.mars1.mars-hosting.com/api/artworks", {
              params: { art_id: id, sid: localStorage.getItem("sid") },
            })
            .then((res) => {
              console.log(res);
              for (let i = 0; i < this.object_array.length; i++) {
                if (this.object_array[i].art_id == id) {
                  this.object_array.splice(i, 1);
                }
              }
            });
        };
        this.modal_type = "delete";
        this.checkLanguage();
      }
      if (this.type === "exhibition") {
        let id = object.exh_id;
        this.confirm_function = function () {
          axios
            .delete("http://246b122.mars1.mars-hosting.com/api/exhibitions", {
              params: { exh_id: id, sid: localStorage.getItem("sid") },
            })
            .then((res) => {
              console.log(res);
              for (let i = 0; i < this.object_array.length; i++) {
                if (this.object_array[i].exh_id == id) {
                  this.object_array.splice(i, 1);
                  // this.forceRerender();
                  // this.rerender = true;
                }
              }
            });
        };
        this.modal_type = "delete";
        this.checkLanguage();
      }
      if (this.type === "workshops") {
        let id = object.wrks_id;
        this.confirm_function = function () {
          axios
            .delete("http://246b122.mars1.mars-hosting.com/api/workshops", {
              params: { wrks_id: id, sid: localStorage.getItem("sid") },
            })
            .then((res) => {
              console.log(res);
              for (let i = 0; i < this.object_array.length; i++) {
                if (this.object_array[i].wrks_id == id) {
                  this.object_array.splice(i, 1);
                  // this.forceRerender();
                  // this.rerender = true;
                }
              }
            });
        };
        this.modal_type = "delete";
        this.checkLanguage();
      }
    },

    editArtworks() {
      this.type = "artwork";
      this.edit = true;
      this.object_array = this.artworks;
      this.checkLanguage();
      this.object_array_type = "artworks";
    },
    editGroupExh() {
      this.type = "exhibition";
      this.edit = true;
      this.exhibitions = this.group_exhibitions; // BRIŠI???
      this.object_array = this.group_exhibitions;
      this.checkLanguage();
      this.object_array_type = "exh_group";
    },
    editSoloExh() {
      this.type = "exhibition";
      this.edit = true;
      this.exhibitions = this.solo_exhibitions; // BRIŠI???
      this.object_array = this.solo_exhibitions;
      this.checkLanguage();
      this.object_array_type = "exh_solo";
    },
    editWorkshopTypes() {
      this.object_array = this.workshops;
      this.edit = true;
      this.type = "workshops";
      this.checkLanguage();
    },
    exit() {
      this.type = "";
      this.add = false;
      this.edit = false;
      this.getAuthor();
      this.getArtworks();
      this.getExhibitions();
    },
    forceRerender() {
      this.componentEditKey += 1;
      this.componentWrkKey += 1;
    },
    exitModal() {
      this.message = "";
      this.confirm_function = null;
      this.modal_type = "";
      this.forceRerender();
      this.rerender = true;
    },
    getAuthor() {
      axios.get(this.baseUrl + "author").then((res) => {
        this.aut_info = res.data.data[0];
        this.componentAutKey += 1;
      });
    },
    getArtworks() {
      axios.get(this.baseUrl + "artworks").then((res) => {
        this.artworks = res.data.data;
        if (this.edit === true && this.object_array_type === "artworks") {
          this.object_array = this.artworks;
          this.checkLanguage();
        }
      });
    },
    getExhibitions() {
      axios
        .get(this.baseUrl + "exhibitions", { params: { exh_type: "solo" } })
        .then((res) => {
          this.solo_exhibitions = res.data.data;
          if (this.edit === true && this.object_array_type === "exh_solo") {
            this.object_array = this.solo_exhibitions;
            this.checkLanguage();
          }
        });
      axios
        .get(this.baseUrl + "exhibitions", { params: { exh_type: "group" } })
        .then((res) => {
          this.group_exhibitions = res.data.data;
          if (this.edit === true && this.object_array_type === "exh_group") {
            this.object_array = this.group_exhibitions;
            this.checkLanguage();
          }
        });
    },
    getWorkshops() {
      axios.get(this.baseUrl + "workshops").then((res) => {
        console.log(res);

        this.workshops = res.data.data;

        this.checkLanguage();
      });
    },
    getWorkshopDateInfo() {
      axios.get(this.baseUrl + "workshop").then((res) => {
        console.log(res);
        this.calendar_info = res.data.data;
        this.forceRerender();
      });
    },

    scrollToElement(clss) {
      const el = this.$el.getElementsByClassName(clss)[0];
      console.log(el);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    showSelectedWorkshop() {
      this.object_array = this.workshops;
      this.type = "workshops";
      console.log(this.object_array[0].wrks_type_en);
      this.checkLanguage();
    },
    submitAut(chndAut) {
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      let id = this.aut_info.aut_id;
      console.log(id);
      formData.append("aut_id", id);
      if (this.aut_info.aut_fname !== chndAut.fname) {
        formData.append("aut_fname", chndAut.fname);
      }
      if (this.aut_info.aut_bio_en !== chndAut.bio_en) {
        formData.append("aut_bio_en", chndAut.bio_en);
      }
      if (this.aut_info.aut_bio_rs !== chndAut.bio_rs) {
        formData.append("aut_bio_rs", chndAut.bio_rs);
      }
      if (chndAut.image) {
        formData.append("aut_image", chndAut.image);
        console.log(chndAut.image);
      }
      if (chndAut.pass && chndAut.old_pass) {
        formData.append("aut_pass", chndAut.pass);
        formData.append("old_pass", chndAut.old_pass);
      }
      axios.patch(this.baseUrl + "author", formData).then((res) => {
        console.log(res);
        this.getAuthor();
      });
    },
    submitEditedObject(editedObject) {
      this.rerender = false;
      let formData = new FormData();
      formData.append("sid", localStorage.getItem("sid"));
      if (this.type === "artwork") {
        let artwork = null;
        let imgFormData = new FormData();
        for (let i = 0; i < this.artworks.length; i++) {
          if (this.artworks[i].art_id == editedObject.edit_object_id) {
            artwork = this.artworks[i];
          }
        }

        imgFormData.append("img_id", editedObject.img_id);
        if (
          editedObject.cover !== artwork.img_image &&
          editedObject.cover != null
        ) {
          imgFormData.append("img_image", editedObject.cover);
          axios.patch(this.baseUrl + "main_images", imgFormData).then((res) => {
            console.log(res);
            this.getArtworks();
            this.forceRerender();
            this.rerender = true;
          });
        }

        formData.append("art_id", editedObject.edit_object_id);
        if (editedObject.title_en !== artwork.art_title_en) {
          formData.append("art_title_en", editedObject.title_en);
        }
        if (editedObject.title_rs !== artwork.art_title_rs) {
          formData.append("art_title_rs", editedObject.title_rs);
        }
        if (editedObject.material_en !== artwork.art_material_en) {
          formData.append("art_material_en", editedObject.material_en);
        }
        if (editedObject.material_rs !== artwork.art_material_rs) {
          formData.append("art_material_rs", editedObject.material_rs);
        }
        if (editedObject.technique_en !== artwork.art_tech_en) {
          formData.append("art_tech_en", editedObject.technique_en);
        }
        if (editedObject.technique_rs !== artwork.art_tech_rs) {
          formData.append("art_tech_rs", editedObject.technique_rs);
        }
        if (editedObject.dimensions !== artwork.art_dmns) {
          formData.append("art_dmns", editedObject.dimensions);
        }
        if (editedObject.year !== artwork.art_year) {
          formData.append("art_year", editedObject.year);
        }
        if (editedObject.for_sale !== artwork.art_forsale) {
          formData.append("art_forsale", editedObject.for_sale);
        }
        if (editedObject.price !== artwork.art_price) {
          formData.append("art_price", editedObject.price);
        }

        axios.patch(this.baseUrl + "artworks", formData).then((res) => {
          console.log(res);
          this.getArtworks();
          this.forceRerender();
          this.rerender = true;
        });
      }

      if (this.type === "exhibition") {
        let exh = null;
        for (let i = 0; i < this.exhibitions.length; i++) {
          if (this.exhibitions[i].exh_id == editedObject.edit_object_id) {
            exh = this.exhibitions[i];
          }
        }
        console.log(editedObject.edit_object_id);
        formData.append("exh_id", editedObject.edit_object_id);
        if (editedObject.exh_type !== exh.exh_type) {
          formData.append("exh_type", editedObject.exh_type);
        }
        if (editedObject.title_en !== exh.exh_title_en) {
          formData.append("exh_title_en", editedObject.title_en);
        }
        if (editedObject.title_rs !== exh.exh_title_rs) {
          formData.append("exh_title_rs", editedObject.title_rs);
        }
        if (editedObject.place_en !== exh.exh_place_en) {
          formData.append("exh_place_en", editedObject.place_en);
        }
        if (editedObject.place_rs !== exh.exh_place_rs) {
          formData.append("exh_place_rs", editedObject.place_rs);
        }
        if (editedObject.date_start !== exh.exh_date_start) {
          formData.append("exh_date_start", editedObject.date_start);
        }
        if (editedObject.date_finish !== exh.exh_date_finish) {
          formData.append("exh_date_finish", editedObject.date_finish);
        }
        if (editedObject.dsc_en !== exh.exh_dsc_en) {
          formData.append("exh_dsc_en", editedObject.dsc_en);
        }
        if (editedObject.dsc_rs !== exh.exh_dsc_rs) {
          formData.append("exh_dsc_rs", editedObject.dsc_rs);
        }
        if (editedObject.rev_en !== exh.exh_rev_en) {
          formData.append("exh_rev_en", editedObject.rev_en);
        }
        if (editedObject.rev_rs !== exh.exh_rev_rs) {
          formData.append("exh_rev_rs", editedObject.rev_rs);
        }
        if (
          editedObject.cover !== exh.exh_cover &&
          editedObject.cover != null
        ) {
          formData.append("exh_cover", editedObject.cover);
        }
        axios.patch(this.baseUrl + "exhibitions", formData).then((res) => {
          console.log(res);
          this.getExhibitions();
          this.forceRerender();
          this.rerender = true;
        });
      }
      if (this.type === "workshops") {
        let wrks = null;
        for (let i = 0; i < this.workshops.length; i++) {
          if (this.workshops[i].wrks_id == editedObject.edit_object_id) {
            wrks = this.workshops[i];
          }
        }
        formData.append("wrks_id", editedObject.edit_object_id);
        if (editedObject.title_en !== wrks.wrks_type_en) {
          formData.append("wrks_type_en", editedObject.title_en);
        }
        if (editedObject.title_rs !== wrks.wrks_type_rs) {
          formData.append("wrks_type_rs", editedObject.title_rs);
        }
        if (editedObject.dsc_en !== wrks.wrks_dsc_en) {
          formData.append("wrks_dsc_en", editedObject.dsc_en);
          console.log(wrks.wrks_dsc_en);
        }
        if (editedObject.dsc_rs !== wrks.wrks_dsc_rs) {
          formData.append("wrks_dsc_rs", editedObject.dsc_rs);
          console.log(wrks.wrks_dsc_rs);
        }
        if (editedObject.price !== wrks.wrks_price_mnth) {
          formData.append("wrks_price_mnth", editedObject.price);
        }
        if (
          editedObject.cover !== wrks.wrks_image &&
          editedObject.cover != null
        ) {
          formData.append("wrks_image", editedObject.cover);
        }
        axios.patch(this.baseUrl + "workshops", formData).then((res) => {
          console.log(res);
          this.getWorkshops();
          this.forceRerender();
          this.rerender = true;
        });
      }
    },
  },
  computed: {
    ...mapState(["baseUrl", "curLanguage"]),
  },
  mounted() {
    this.getAuthor();
    this.getArtworks();
    this.getExhibitions();
    this.getWorkshops();
    this.getWorkshopDateInfo();
  },
  watch: {
    curLanguage: {
      handler() {
        this.checkLanguage();
      },
    },
    rerender: {
      handler() {
        this.checkLanguage();
      },
    },
    edit: {
      handler() {
        window.scrollTo(0, 0);
      },
    },
    add: {
      handler() {
        window.scrollTo(0, 0);
      },
    },
  },
};
</script>
<style scoped>
.admin {
  margin-bottom: 10vw;
}
.component {
  margin-top: 5vh;
}
.component-window {
  margin-top: 8vh;
}
</style>