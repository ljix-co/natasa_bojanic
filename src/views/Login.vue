<template>
  <div class="login">
  <div class="login-form" :class="{fade: wrong}">
  <h1>LOGIN</h1>
  <h2>E-MAIL</h2>
    <input type="text" v-model="e_mail" />
    <h2>{{$t('author.password').toUpperCase()}}</h2>
    <input type="password" v-model="password" @keyup.enter="login()"/>
    <button @click="login()">LOGIN</button>
    </div>
    <div class="wrong" v-if="wrong">
    <Modal :modal_type="modal_type" :message="message" @exit-modal="exitWrong"></Modal>
    </div>
  </div>
</template>
<script>
import Modal from '../components/Modal.vue';
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
Modal
  },
  data() {
    return {
      e_mail: "",
      password: "",
      message: '',
      wrong: false,
      modal_type: "wrong"
    };
  },
  methods: {
    ...mapActions(['changeLoggedIn']),
    checkLanguage() {
      if(this.curLanguage === 'EN') {
        this.message = "E-mail or password are incorrect.Please try again."
      }
        if(this.curLanguage === 'RS') {
        this.message = "E-mail ili šifra su neispravni. Molimo Vas pokušajte ponovo."
      }
    },
    exitWrong() {
      this.wrong = false;
    },
    login() {
        
        let formData = new FormData();
        formData.append("aut_email", this.e_mail);
        formData.append("pass", this.password);
      axios
        .post(this.baseUrl + "login", formData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("sid", res.data.sid);
          this.changeLoggedIn(true);
          this.$router.push({name: 'Admin'});
          
        }).catch(error => {
          console.log(error);
          this.wrong = true;
          this.checkLanguage();
        })
        
    },
  },
  computed: {
    ...mapState(["baseUrl", 'curLanguage']),
  },
 watch: {
   curLanguage: {
     handler(){
       this.checkLanguage();
     }
   }
 }
};
</script>
<style scoped>
button {
  font-family: "Open Sans", sans-serif;
  background-color: #343333;
  color: white;
  width: 10vw;
  height: 7vh;
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 5rem;
  margin-bottom: 2rem;

  border: none;
}
button:focus {
  outline: 3px solid #ff6b00;
}
h1{
font-weight: 800;
margin-top: 2rem;
color: #343333;
}
h2{
margin-top: 2rem;
}
input {
  font-family: "Open Sans", sans-serif;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #343333;
  color: #ff6b00;
  text-align: center;
  width: 20vw;
  margin-top: 1rem;
  font-size: 1.5rem;
}
input:focus {
  outline: none;
}
.fade{
opacity: 0.2;
}
.login{
width: 100vw;
height: 90vh;
}
.login-form{
position: absolute;
top: 20vh;
left: 35vw;
width: 30vw;
background-color: #777674;
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center;
justify-content: center;
border: 3px solid #ff6b00;
}
.wrong{
width: 100vw;
height: 100vh;
z-index: 1;
position: fixed;
}
</style>