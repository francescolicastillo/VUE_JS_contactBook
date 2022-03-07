<script setup>
import Header from '@/components/Header.vue'
import ContactList from '@/components/ContactList.vue'
import ContactListEmpty from '@/components/ContactListEmpty.vue'
import ModalForm from '@/modals/ModalForm.vue'
import ModalDelete from '@/modals/ModalDelete.vue'

import { useContactStore } from '@/stores/contact.js'

const contact = useContactStore()

const openEditContact = (item) => {
  contact.$patch({ modalEditContact: { item, enable: true } })
}

const openDeleteContact = (item) => {
  contact.$patch({ modalDeleteContact: { item, enable: true } })
}
</script>

<template>
  <section class="page-home">
    <Header type="home" />
    <main>
      <ContactListEmpty v-if="contact.list.length == 0" />
      <ContactList
        v-if="contact.list.length > 0 && contact.filter.length == 0"
        :list="contact.list"
        @edit="openEditContact"
        @delete="openDeleteContact"
      />
      <ContactList
        v-if="contact.filter.length > 0"
        :list="contact.filter"
        @edit="openEditContact"
        @delete="openDeleteContact"
      />
      <Teleport to="body">
        <TransitionGroup name="modal">
          <ModalForm type="create" v-if="contact.modalNewContact" />
          <ModalForm type="edit" v-if="contact.modalEditContact.enable" />
          <ModalDelete v-if="contact.modalDeleteContact.enable" />
        </TransitionGroup>
      </Teleport>
    </main>
  </section>
</template>

<style lang="scss">
  .page-home {
    max-width: 50rem;
    margin: 0 auto;
    main {
      padding: .5rem 1rem 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity .3s ease;
  }
  .modal-enter-active {
    .app-modal__container {
      transform: scale(0);
    }
  }
  .modal-leave-active {
    .app-modal__container {
      transform: scale(1);
    }
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    .app-modal__container {
      transform: scale(0);
      transition: .3s transform;
    }
  }
</style>
