const API_URL = 'http://localhost:5095/api/user'

class ApiRequestError extends Error {
  constructor(message, status, options) {
    super(message, options)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

async function readResponse(response) {
  const text = await response.text()

  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

async function sendRequest(url, options) {
  try {
    const response = await fetch(url, options)
    const data = await readResponse(response)

    if (!response.ok) {
      throw new ApiRequestError(data.message || data.error || 'Une erreur est survenue', response.status)
    }

    return data
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Impossible de contacter le serveur', { cause: error })
    }

    throw error
  }
}

export function loginUser(credentials) {
  return sendRequest(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
}

export async function createUser(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }

  try {
    return await sendRequest(API_URL, options)
  } catch (error) {
    if (error.status === 404 || error.status === 405) {
      return sendRequest(`${API_URL}/register`, options)
    }

    throw error
  }
}
