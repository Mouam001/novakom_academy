import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

function App() {
  const [page, setPage] = useState('login')
  const [loginMessage, setLoginMessage] = useState('')
  const [connectedUser, setConnectedUser] = useState(null)

  function showLogin(message = '') {
    setLoginMessage(message)
    setPage('login')
  }

  function showRegister() {
    setLoginMessage('')
    setPage('register')
  }

  function showHome(user) {
    setLoginMessage('')
    setConnectedUser(user)
    setPage('home')
  }

  return (
    <>
      {page === 'login' && (
        <Login
          initialMessage={loginMessage}
          onCreateAccount={showRegister}
          onLoginSuccess={showHome}
        />
      )}

      {page === 'register' && (
        <Register
          onLoginClick={() => showLogin()}
          onRegisterSuccess={() => showLogin('Compte créé avec succès')}
        />
      )}

      {page === 'home' && <Home user={connectedUser} />}
    </>
  )
}

export default App
