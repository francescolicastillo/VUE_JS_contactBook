<script setup>
import { reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { v4 as uuidv4 } from 'uuid'

import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import Input from '@/components/Input.vue'

import { useContactStore } from '@/stores/contact'
import rulesForm from './rulesForm'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const contact = useContactStore()
const formContact = reactive({ ...rulesForm.structure })
const v$ = useVuelidate(rulesForm.validation, formContact)

onMounted(() => {
  if(props.type == 'edit') Object.assign(formContact, { ...contact.modalEditContact.item })
})

const closeModal = () => {
  props.type == 'create'
    ? contact.$patch({ modalNewContact: false })
    : contact.$patch({ modalEditContact: { item: null, enable: false } })

  Object.assign(formContact, { ...rulesForm.structure })
  v$.value.$reset()
}

const handleEventContact = () => {
  const formData = {
    name: v$.value.name.$model,
    email: v$.value.email.$model,
    phone: v$.value.phone.$model
  }

  if (props.type == 'create') {
    contact.newContact({
      id: uuidv4(),
      color: "#41b883",
      ...formData
    })
  } else {
    const { id, color } = contact.modalEditContact.item
    contact.editContact({ id, color, ...formData })
  }

  closeModal()
}

const text = {
  create: {
    title: 'Create new contact',
    ariaLabelModal: 'Form to create new contact',
    ariaLabelButton: 'Button to save new contact'
  },
  edit: {
    title: 'Edit contact',
    ariaLabelModal: 'Form to edit contact',
    ariaLabelButton: 'Button to save changes'
  }
}

const inputs = [
  { title: 'Name:',     name: 'name',  type: 'text',     width: '100%', maxlength: 25, },
  { title: 'E-mail:',   name: 'email', type: 'email',    width: '100%', maxlength: 35  },
  { title: 'Phone:', name: 'phone', type: 'tel',      width: '8rem'                 }
]

</script>

<template>
  <Modal
    :class="`modal-${type}`"
    :title="text[type].title"
    :ariaLabel="text[type].ariaLabelModal"
    @close="closeModal"
  >
    <Input
      v-for="item of inputs"
      :key="item.name"
      :title="item.title"
      :name="item.name"
      :v="v$[item.name]"
      v-model="v$[item.name].$model"
      :maxlength="item.maxlength ? String(item.maxlength) : null"
      :type="item.type"
      :width="item.width"
    />
    <template v-slot:button>
      <Button
        :ariaLabel="text[type].ariaLabelButton"
        :disabled="v$.$invalid"
        @click="handleEventContact"
        color="primary"
      >
        Save
      </Button>
    </template>
  </Modal>
</template>

<style lang="scss">
  .app-modal__container {
    width: 25rem;
  }
</style>
