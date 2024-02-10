<template>
  <div class="center-heading">
      <h2>FAQ</h2>
    </div>
  <div class="faq-page">
    <div v-for="faq in faqs" :key="faq.id" class="faq-item">
      <div @click="toggle(faq.id)" class="faq-question">
        <h3>{{ capitalizeFirstLetter(faq.title) }}</h3>
        <button class="toggle-button">{{ openFaqId === faq.id ? '-' : '+' }}</button>
      </div>
      <transition name="fade">
      <div v-if="openFaqId === faq.id" class="faq-answer" >
        <p>{{ faq.body }}</p>
      </div>
    </transition>

    </div>
    <button @click="loadMore" v-if="showLoadMore" class="load-more-button">Load More</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [],
      showLoadMore: true,
      limit: 10,
      offset: 0,
      openFaqId: null
    };
  },
  mounted() {
    this.loadFaqs();
  },
  methods: {
    loadFaqs() {
      fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_offset=${this.offset}`)
        .then(response => response.json())
        .then(data => {
          this.faqs = this.faqs.concat(data.map(faq => ({ ...faq, open: false })));
          this.offset += this.limit;
          if (data.length < this.limit) {
            this.showLoadMore = false;
          }
        });
    },
    toggle(id) {
      const faq = this.faqs.find(faq => faq.id === id);
      if (faq) {
        this.openFaqId = this.openFaqId === id ? null : id;
      }
    },
    loadMore() {
      this.loadFaqs();
    },
    capitalizeFirstLetter(str) {
      return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }
  }
};
</script>

