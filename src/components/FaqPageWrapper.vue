<template>
  <div class="center-heading">
      <!-- Displaying the heading for the FAQ section -->
      <h2>FAQ</h2>
    </div>
  <div class="faq-page">
    <!-- Iterating over the list of FAQs and displaying each FAQ -->
    <div v-for="faq in faqs" :key="faq.id" class="faq-item">
      <!-- Clicking on the question toggles the visibility of the answer -->
      <div @click="toggle(faq.id)" class="faq-question">
        <!-- Displaying the title of the FAQ in a capitalized format -->
        <h3>{{ capitalizeFirstLetter(faq.title) }}</h3>
        <!-- Displaying a button with either a plus or minus sign based on the open status of the FAQ -->
        <button class="toggle-button">{{ openFaqId === faq.id ? '-' : '+' }}</button>
      </div>
      <!-- Transition effect for the answer -->
      <transition name="fade">
        <!-- Displaying the answer if the FAQ is open -->
        <div v-if="openFaqId === faq.id" class="faq-answer">
          <p>{{ faq.body }}</p>
        </div>
      </transition>
    </div>
    <!-- Button to load more FAQs if available -->
    <button @click="loadMore" v-if="showLoadMore" class="load-more-button">Load More</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Initializing data variables
      faqs: [],             // Array to store FAQs
      showLoadMore: true,   // Flag to determine whether to show the "Load More" button
      limit: 10,            // Limit of FAQs to load per request
      offset: 0,            // Offset for paginating the FAQs
      openFaqId: null       // ID of the currently open FAQ
    };
  },
  mounted() {
    // Load FAQs when the component is mounted
    this.loadFaqs();
  },
  methods: {
    // Method to fetch FAQs from an API
    loadFaqs() {
      // Fetching FAQs from an API with pagination
      fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_offset=${this.offset}`)
        .then(response => response.json())
        .then(data => {
          // Concatenating the newly fetched FAQs with the existing ones
          this.faqs = this.faqs.concat(data.map(faq => ({ ...faq, open: false })));
          // Updating the offset for the next pagination
          this.offset += this.limit;
          // Hiding the "Load More" button if no more FAQs are available
          if (data.length < this.limit) {
            this.showLoadMore = false;
          }
        });
    },
    // Method to toggle the visibility of an FAQ's answer
    toggle(id) {
      // Finding the FAQ with the given ID
      const faq = this.faqs.find(faq => faq.id === id);
      if (faq) {
        // Toggling the open state of the FAQ
        this.openFaqId = this.openFaqId === id ? null : id;
      }
    },
    // Method to load more FAQs
    loadMore() {
      this.loadFaqs();
    },
    // Method to capitalize the first letter of a string
    capitalizeFirstLetter(str) {
      return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }
  }
};
</script>
