<template>
    <div class="modal">
    <div class="pop-up">
    <h1>{{message}}</h1>
    <div class="btns">
    <button v-if="modal_type === 'delete'" @click="exit">NO</button>
    <button @click="confirm">OK</button>
    </div>
    </div>
    </div>
</template>
<script>

export default {
    props: {
        message: String,
        confirm_function: Function,
        modal_type: String,
        object_array: Array
    },
    methods: {
        confirm() {
            if(this.modal_type === 'wrong') {
                this.$emit('exit-modal');
            }
            if(this.modal_type === 'delete') {
                this.confirm_function();
                this.$emit('exit-modal');
            }
            
        },
        exit() {
           this.$emit('exit-modal'); 
        }
    },
    computed: {
        
    }
}
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
margin-top: 4rem;
width: 30vw;
color: #343333;
}
.btns{
display: flex;
align-items: center;
justify-content: center;
gap: 2rem;
}
.modal{
position: fixed;
width: 100vw;
height: 100vh;
background-color: #77767469;
top: 0;
left: 0;
z-index: 2;
}
.pop-up{
position: fixed;
top: 30vh;
left: 30vw;
width: 40vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1rem;
background-color: #777674;
border: 7px solid rgb(136, 3, 3);
}
</style>