import { useState } from 'react'
import { emptyUser } from '../../models/userModel'
import { createUser } from '../../services/userService'
import RegisterView from './view'

function Register() {
  const [form, setForm] = useState(emptyUser)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setMessage('')
      setError('')

      await createUser(form)

      setMessage('Utilisateur créé avec succès')
      setForm(emptyUser)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
      <RegisterView
          form={form}
          message={message}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
      />
  )
}

export default Register