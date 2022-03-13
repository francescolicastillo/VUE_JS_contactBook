<script setup>
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import { useContactStore } from '@/stores/contact'

const contact = useContactStore()

const { name, id } = contact.modalDeleteContact.item || {}

const closeModal = () => {
  contact.$patch({ modalDeleteContact: { item: null, enable: false } })
}

const handleDelContact = (id) => {
  closeModal()
  contact.deleteContact(id)
  if(contact.filter) contact.resetFilter()
};
</script>

<template>
  <Modal
    title="Remove contact"
    :ariaLabel="`Modal to remove contacto ${name}`"
    @close="closeModal"
  >
    <p>Do you want to remove {{ name }}?</p>
    <template v-slot:button>
      <Button
        :ariaLabel="`Button to remove contact ${name}`"
        @click="handleDelContact(id)"
        color="danger"
      >
        Remove
      </Button>
    </template>
  </Modal>
</template>
