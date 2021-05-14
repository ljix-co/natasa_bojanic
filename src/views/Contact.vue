<template>
  <div class="contact">
    <div class="contact-div">
      <div class="title-div">
        <p class="title">{{ $t("contact.title_mssg").toUpperCase() }}</p>
      </div>
      <div class="info">
        <div class="b-info">
          <i class="far fa-envelope"></i>
          <p>natasa.bojanicc@gmail.com</p>
        </div>
        <div class="b-info">
          <i class="fas fa-home"></i>
          <p>Beogradska 8, Zemun</p>
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
  color: #343333;
  font-size: 4rem;
}
h1 {
  text-align: start;
}
p {
  font-size: 22.1pt;
  color: #343333;
  font-weight: 600;
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
  margin-top: 15vh;
  border: 5px solid #ff6b00;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3rem;
  width: 30vw;
  align-self: center;
}
.links {
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
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
.title {
  color: #777674;
  width: 40vw;
  font-weight: 800;
}
.title-div {
  width: 50vw;
  height: 15vh;
  background-color: #343333;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border: 5px solid #ff6b00;
  border-top: none;
  border-bottom: none;
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  i{
    font-size: 2rem;
  }
  p{
    font-size: 1.5rem;
  }

.title{
  font-size: 1rem;
}
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  i{
    font-size: 2rem;
  }
  p{
    font-size: 1rem;
  }

.title{
  font-size: 1rem;
}
}
@media only screen and (max-width: 768px) {
  i {
    font-size: 2rem;
  }
  p {
    font-size: .8rem;
  }
  .b-info {
    margin-left: 1rem;
  }
  .contact-div {
    width: 90vw;
  }
  .info {
    width: 85vw;
    gap: 2rem;
  }
  .links {
    gap: 1.5rem;
  }
  .soc-contact {
    width: 80vw;
    margin-left: 1rem;
  }
  .title {
    width: 85vw;
    font-size: 1rem;
  }
  .title-div {
    width: 90vw;
  }
}
</style>