<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "./components/Header.vue"

export default {
  components: {
    Header,
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
}

h1 {
  color: #354B5E;
}

.button {
  background-color: #475F77 !important;
  border-color: #354B5E !important;
}

.red-button {
  background-color: #D74B4B !important;
  border-color: #354B5E !important;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
