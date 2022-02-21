<script setup>
import Button from '@/components/Button.vue'
import IconBook from '../icons/IconBook.vue'
import IconPlus from '../icons/IconPlus.vue'

import { useContactStore } from '@/stores/contact'

const contact = useContactStore()
</script>

<template>
  <IconBook class="icon-book" />
  <p>Create your own contact book!</p>
  <Button
    class="create-contact"
    ariaLabel="Button to add contact"
    @click="contact.$patch({ modalNewContact: true })"
    color="primary"
  >
    <IconPlus />
    Add contact
  </Button>
</template>

<style lang="scss" scoped>
  .icon-book { margin: 6rem 0 1.5rem; }
  .create-contact {
    border-radius: var(--border-radius);
    padding: 0.75rem 1.375rem 0.75rem 1rem;
    margin-top: 1.5rem;
    max-width: 150px;
  }
  p {
    padding: .2rem .5rem;
    border-radius: 10px;
    margin: .2rem;
    display: inline-block;
  }
</style>
