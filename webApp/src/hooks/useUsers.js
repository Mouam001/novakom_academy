import { useEffect, useState } from 'react'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userService'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadUsers() {
    try {
      setLoading(true)
      setError(null)

      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function addUser(user) {
    await createUser(user)
    await loadUsers()
  }

  async function editUser(id, user) {
    await updateUser(id, user)
    await loadUsers()
  }

  async function removeUser(id) {
    await deleteUser(id)
    await loadUsers()
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    editUser,
    removeUser,
  }
}