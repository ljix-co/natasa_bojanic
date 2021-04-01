<template>
  <div class="txt-editor">
    <div class="top">
      <div class="top-btn-div">
        <button class="btn-exit" @click="exit()">
          <i class="fas fa-times exit"></i>
        </button>
      </div>
      <div class="title" v-if="editor_type === 'review'">
        <h1 class="top-title">
          {{ $t("frq_words.add") }}
          {{ $t(`frq_words.review`) }}
        </h1>
      </div>
      <div class="title" v-if="editor_type === 'description'">
        <h1 class="top-title">
          {{ $t("frq_words.add") }}
          {{ $t(`frq_words.description`) }}
        </h1>
      </div>
      <div class="top-btn-div">
        <button class="sbmt" @click="submit()">
          {{ $t("button.submit") }}
        </button>
      </div>
    </div>
    <div class="main">
      <div class="editor">
        <div class="title">
          <h1 class="mid-title">EN</h1>
        </div>
        <vue-editor
          v-if="editor_type === 'review'"
          class="vue_editor"
          v-model="e_rev_en"
           :editor-toolbar="customToolbar"
        />
        <vue-editor
          v-if="editor_type === 'description'"
          class="vue_editor"
          v-model="e_des_en"
           :editor-toolbar="customToolbar"
        />
      </div>
      <div class="editor">
        <div class="title">
          <h1 class="mid-title">RS</h1>
        </div>
        <vue-editor
          v-if="editor_type === 'review'"
          class="vue_editor"
          v-model="e_rev_rs"
           :editor-toolbar="customToolbar"
        />
        <vue-editor
          v-if="editor_type === 'description'"
          class="vue_editor"
          v-model="e_des_rs"
           :editor-toolbar="customToolbar"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  props: {
    editor_type: String,
    rev_en: String,
    rev_rs: String,
    des_en: String,
    des_rs: String,
  },
  data() {
    return {
      e_rev_en: this.rev_en,
      e_rev_rs: this.rev_rs,
      e_des_en: this.des_en,
      e_des_rs: this.des_rs,
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
    exit() {
      this.$emit("exit-editor");
    },
    submit() {
      if (this.editor_type === "review") {
        let review = {
          rev_rs: this.e_rev_rs,
          rev_en: this.e_rev_en,
        };
        this.$emit("add-rev", review);
      }
      if (this.editor_type === "description") {
        let description = {
          des_en: this.e_des_en,
          des_rs: this.e_des_rs,
        };
        this.$emit("add-des", description);
      }
    },
  },
};
</script>
<style scoped>
.btn-exit {
  background-color: transparent;
  border: none;
  width: 4rem;
  cursor: pointer;
}
.btn-exit:focus {
  outline: none;
}
.editor {
  width: 40vw;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.exit {
  color: #343333;
  font-size: 4rem;
}
.main {
  width: 90vw;
  margin-top: 30vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.mid-title {
  font-weight: 400;
  font-size: 20pt;
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
  position: absolute;
  top: 0;
  margin-top: 15vh;
}
.top-btn-div {
  width: 30vw;
}
.top-title {
  font-weight: 800;
  font-size: 46pt;
}
.txt-editor {
  min-height: 100vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #777674;
}
</style>