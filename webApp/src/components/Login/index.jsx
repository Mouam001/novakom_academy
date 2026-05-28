import { useState } from 'react'
import { emptyLogin } from '../../models/userModel'
import { loginUser } from '../../services/userService'
import LoginView from './view'

function Login() {
  const [form, setForm] = useState(emptyLogin)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const result = await loginUser(form)

    if (result.success) {
      setMessage('Connexion réussie')
    } else {
      setMessage('Email ou mot de passe incorrect')
    }
  }

  return (
      <LoginView
          form={form}
          message={message}
          onChange={handleChange}
          onSubmit={handleSubmit}
      />
  )
}

export default Login