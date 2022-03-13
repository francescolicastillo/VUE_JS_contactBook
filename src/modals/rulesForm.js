import { minLength, required, email, helpers  } from '@vuelidate/validators'

const structure = {
  name: '',
  email: '',
  phone: ''
}

const validation = {
  name: {
    required: helpers.withMessage('Field required', required),
    minLength: helpers.withMessage('Minimum 2 letters', minLength(2)),
  },
  email: {
    required: helpers.withMessage('Field required', required),
    email: helpers.withMessage('Write valid e-mail', email)
  },
  phone: {
    required: helpers.withMessage('Field required', required),
    minLength: helpers.withMessage('Minimum length 10 digits', minLength(10)),
  }
}

export default { validation, structure }
