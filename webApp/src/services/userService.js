const API_URL = 'http://localhost:5000/api/users'

export async function getUsers() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des utilisateurs')
  }

  return response.json()
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Utilisateur introuvable')
  }

  return response.json()
}

export async function createUser(user) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error('Erreur lors de la création')
  }

  return response.json()
}

export async function updateUser(id, user) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error('Erreur lors de la modification')
  }
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression')
  }
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  return response.json()
}