<template>
    <div class="footer">
       <div class="footer-content">
      <p>
        Designed and coded by Ljiljana Marinković. Supported and hosted by
        <a href="https://www.mars-server.net/"
          ><img src="../../public/images/mars.svg" alt="" /></a
        >.
      </p>
      <p>&copy; 2021</p>
    </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
img{
    width: 100px;
    margin-left: 0.2rem;
    filter: invert();
}
.footer {
  width: 100vw;
  height: 7vh;
  margin-top: 5rem;
  
}
.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
@media only screen and (min-width: 768px) and (max-width: 1280px) {
p{
  font-size: .9rem;
}
}
@media only screen and (max-width: 768px) {
.footer{
width: 100vw;
height: 10vh;
margin-top: 5vh;
}
  .footer-content{
    width: 90vw;
    margin-left: 1rem;
    height: 5vh;
  }
}
</style>