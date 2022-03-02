<script setup>
import { ref } from 'vue'
import IconSearch from '../icons/IconSearch.vue'
import { useContactStore } from '@/stores/contact'

const contact = useContactStore()
const searchInput = ref('')
const search = () => {
  searchInput.value.length > 0
    ? contact.setFilter(contact.getListByName(searchInput))
    : contact.resetFilter()
}
</script>

<template>
  <section class="app-search">
    <input
      aria-label="Input to search contact"
      class="app-search__field"
      placeholder="Search..."
      v-model="searchInput"
      @input="search"
      type="text"
    >
    <button
      aria-label="Button to search contact"
      class="app-search__button"
      @click="search"
      type="button"
    >
      <IconSearch class="icon" />
      Search contact
    </button>
  </section>
</template>

<style lang="scss">
  .app-search {
    width: 100%;
    margin-left: auto;
    position: relative;
    display: flex;
    align-items: center;
    @media (max-width: 640px) {
      margin-top: 1rem;
    }
  }
  .app-search__field {
    font-size: 1rem;
    color: var(--color-secondary-light);
    width: 100%;
    height: 2.7rem;
    background: var(--pale-grey);
    padding: 0.5rem 2rem 0.375rem .8rem;
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius);
    &:focus {
      border: 2px solid var(--color-primary);
      outline: none;
    }
  }
  .app-search__button {
    position: absolute;
    right: 0;
    padding: 1rem;
    cursor: pointer;
    background: transparent;
    border: 0;
    font-size: 0;
    &:hover svg { fill: var(--color-primary); }
  }
</style>
