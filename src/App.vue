<template>
  <div id="app">
    <FaqHeaderWrapper/>
    <FaqPageWrapper />
    <FaqFooterWrapper/>

  </div>
</template>

<script>
import FaqHeaderWrapper from './components/FaqHeaderWrapper.vue';
import FaqFooterWrapper from './components/FaqFooterWrapper.vue';
import FaqPageWrapper from './components/FaqPageWrapper.vue';

export default {
  name: 'App',
  components: {
    FaqPageWrapper,
    FaqHeaderWrapper,
    FaqFooterWrapper
  }
}
</script>

<style>
@import '/src/assets/style.css';
</style>