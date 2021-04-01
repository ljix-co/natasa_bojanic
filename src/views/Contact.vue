<template>
  <div class="contact">
    <div class="contact-div">
      <div class="info">
        <div class="b-info">
          <i class="far fa-envelope"></i>
          <p>natasa.bojanicc@gmail.com</p>
        </div>
        <div class="b-info">
          <i class="fas fa-home"></i>
          <p>Ulica, broj, Zemun</p>
        </div>
        <div class="b-info">
          <i class="fas fa-phone-alt"></i>
          <p>+381645008098</p>
        </div>
      </div>
      <div class="soc-contact">
        <div class="links">
          <a href="https://www.facebook.com/poznatasrpskakeramicarka">
            <i class="fab fa-facebook"></i
          ></a>
          <a href="https://www.instagram.com/strahitrepett/?hl=sr"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
i {
  color: #ff6b00;
  font-size: 4rem;
}
h1 {
  text-align: start;
}
p {
  font-size: 22.1pt;
}
.b-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  
}
.contact-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50vw;
  gap: 4rem;
  background-color: #777674;
   margin-top: 20vh;
   border: 5px solid #d9d9d9;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3rem;
  width: 30vw;
  align-self: center;
  margin-top: 10vh;
}
.links {
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  align-self: center;
}
.soc-contact {
  align-self: center;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
   margin-bottom: 5vh;
}
</style>