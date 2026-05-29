import { useState } from 'react'
import { emptyLoginForm, validateLoginForm } from '../../models/userModel'
import { loginUser } from '../../services/userService'
import LoginView from './view'

function Login({ initialMessage = '', onCreateAccount, onLoginSuccess }) {
  const [form, setForm] = useState(emptyLoginForm)
  const [message, setMessage] = useState(initialMessage)
  const [messageType, setMessageType] = useState(initialMessage ? 'success' : '')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const validationErrors = validateLoginForm(form)

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setIsLoading(true)
      setMessage('')
      setMessageType('')
      setErrors({})

      const result = await loginUser(form)

      if (result.success === false) {
        throw new Error('Email ou mot de passe incorrect')
      }

      const user = result.user || result

      setForm(emptyLoginForm)
      onLoginSuccess(user)
    } catch (error) {
      setMessage(error.message || 'Email ou mot de passe incorrect')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginView
      form={form}
      message={message}
      messageType={messageType}
      errors={errors}
      isLoading={isLoading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCreateAccount={onCreateAccount}
    />
  )
}

export default Login
