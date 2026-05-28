import Register from './components/Register'
import Login from './components/Login'
import Users from './components/Users'

function App() {
  return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">
            Gestion des utilisateurs
          </h1>

          <Register />
          <Login />
          <Users />
        </div>
      </main>
  )
}

export default App