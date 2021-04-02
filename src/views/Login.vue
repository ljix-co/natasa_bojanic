<template>
  <div class="login">
  <div class="login-form">
    <input type="text" v-model="e_mail" />
    <input type="password" v-model="password" />
    <button @click="login()">LOGIN</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      e_mail: "",
      password: "",
    };
  },
  methods: {
    login() {
        console.log(this.password)
        let formData = new FormData();
        formData.append("aut_email", this.e_mail);
        formData.append("pass", this.password);
      axios
        .post(this.baseUrl + "login", formData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("sid", res.data.sid);
        });
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
 
};
</script>
<style scoped>
.login-form{
margin-top: 50vh;
}
</style>