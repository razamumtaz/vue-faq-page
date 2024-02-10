<template>
  <div id="app">
    <FaqPageWrapper />
  </div>
</template>

<script>
import FaqPageWrapper from './components/FaqPageWrapper.vue';

export default {
  name: 'App',
  components: {
    FaqPageWrapper
  }
}
</script>

<style>
@import '/src/assets/style.css';
</style>