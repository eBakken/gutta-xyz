<template>
  <div id="app">
    <Map />
  </div>
</template>

<script>
import Map from './components/Map'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
