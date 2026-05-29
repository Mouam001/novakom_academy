export const emptyLoginForm = {
  email: '',
  password: '',
}

export const emptyRegisterForm = {
  nom: '',
  prenom: '',
  email: '',
  adresse: '',
  telephone: '',
  ville: '',
  pays: '',
  password: '',
}

export function getPasswordRules(password) {
  return [
    {
      label: 'Minimum 8 caractères',
      isValid: password.length >= 8,
    },
    {
      label: 'Une majuscule',
      isValid: /[A-Z]/.test(password),
    },
    {
      label: 'Une minuscule',
      isValid: /[a-z]/.test(password),
    },
    {
      label: 'Un chiffre',
      isValid: /[0-9]/.test(password),
    },
    {
      label: 'Un caractère spécial',
      isValid: /[^A-Za-z0-9]/.test(password),
    },
  ]
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isStrongPassword(password) {
  return getPasswordRules(password).every((rule) => rule.isValid)
}

export function validateLoginForm(form) {
  const errors = {}

  if (!form.email.trim()) {
    errors.email = 'Email obligatoire'
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Email invalide'
  }

  if (!form.password.trim()) {
    errors.password = 'Le mot de passe est obligatoire'
  }

  return errors
}

export function validateRegisterForm(form) {
  const errors = {}

  if (!form.nom.trim()) {
    errors.nom = 'Le nom est obligatoire'
  }

  if (!form.prenom.trim()) {
    errors.prenom = 'Le prénom est obligatoire'
  }

  if (!form.email.trim()) {
    errors.email = 'Email obligatoire'
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Email invalide'
  }

  if (!form.password.trim()) {
    errors.password = 'Le mot de passe est obligatoire'
  } else if (!isStrongPassword(form.password)) {
    errors.password = 'Le mot de passe ne respecte pas toutes les règles'
  }

  return errors
}
