import * as yup from 'yup'

export default yup.object({
  loginIdentifier: yup
    .string()
    .required('Username / email is required')
    .test(
      'is-email-or-username',
      'Invalid username or email',
      function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        const usernameRegex = /^[a-zA-Z0-9_-]{3,15}$/
        return emailRegex.test(value) || usernameRegex.test(value)
      }
    ),
  password: yup.string().required('Password is requried'),
})
