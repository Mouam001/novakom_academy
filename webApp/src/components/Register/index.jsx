import { useState } from 'react'
import {
  emptyRegisterForm,
  getPasswordRules,
  validateRegisterForm,
} from '../../models/userModel'
import { createUser } from '../../services/userService'
import RegisterView from './view'

function Register({ onLoginClick, onRegisterSuccess }) {
  const [form, setForm] = useState(emptyRegisterForm)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
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
      const validationErrors = validateRegisterForm(form)

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        setMessage('Veuillez corriger les champs indiqués')
        setMessageType('error')
        return
      }

      setIsLoading(true)
      setMessage('')
      setMessageType('')
      setErrors({})

      await createUser(form)

      setForm(emptyRegisterForm)
      setMessage('Compte créé avec succès')
      setMessageType('success')

      setTimeout(() => {
        onRegisterSuccess()
      }, 1200)
    } catch (error) {
      setMessage(error.message || 'Impossible de créer le compte')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RegisterView
      form={form}
      errors={errors}
      passwordRules={getPasswordRules(form.password)}
      message={message}
      messageType={messageType}
      isLoading={isLoading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onLoginClick={onLoginClick}
    />
  )
}

export default Register
