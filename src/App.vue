<template>
  <div id="app">
    <div id="nav">
      <router-link class="link" to="/">HOME</router-link> 
      <router-link class="link" to="/artworks">ARTWORKS</router-link>
      <router-link class="link" to="/exhibitions">EXHIBITIONS</router-link>
      <router-link class="link" to="/biography">BIOGRAPHY</router-link>
      <router-link class="link" to="/contact">CONTACT</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #D9D9D9;
  background-color: #343333;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: 800;
  color: #D9D9D9;
  font-size: 19.9pt;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #FF6B00;
}
.link{
  margin-left: 1.5rem;
}
</style>
