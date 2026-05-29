const fields = [
  { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Votre nom', required: true },
  { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Votre prénom', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com', required: true },
  { name: 'adresse', label: 'Adresse', type: 'text', placeholder: 'Votre adresse' },
  { name: 'telephone', label: 'Téléphone', type: 'tel', placeholder: 'Votre téléphone' },
  { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Votre ville' },
  { name: 'pays', label: 'Pays', type: 'text', placeholder: 'Votre pays' },
  {
    name: 'password',
    label: 'Mot de passe',
    type: 'password',
    placeholder: 'Exemple : Painmur80980?',
    required: true,
  },
]

function RegisterView({
  form,
  errors,
  passwordRules,
  message,
  messageType,
  isLoading,
  onChange,
  onSubmit,
  onLoginClick,
}) {
  const messageClass =
    messageType === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : 'border-red-200 bg-red-50 text-red-700'

  return (
    <main className="auth-page py-8">
      <section className="auth-card auth-card-entrance max-w-3xl">
        <div className="mb-8 text-center">
          <p className="brand-kicker">
            Novakom Academy
          </p>
          <h1 className="text-3xl font-bold text-slate-950">Créer un compte</h1>
          <p className="mt-3 text-sm text-slate-500">
            Créez votre accès en quelques informations.
          </p>
        </div>

        {message && (
          <p className={`mb-5 rounded-lg border px-4 py-3 text-sm font-medium ${messageClass}`}>
            {message}
          </p>
        )}

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={onChange}
                placeholder={field.placeholder}
                className={`form-input ${errors[field.name] ? 'form-input-error' : ''}`}
              />
              {errors[field.name] && <p className="field-error">{errors[field.name]}</p>}

              {field.name === 'password' && (
                <ul className="mt-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                  {passwordRules.map((rule) => (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-2 text-sm font-medium ${
                        rule.isValid ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${
                          rule.isValid ? 'bg-emerald-600' : 'bg-red-500'
                        }`}
                      >
                        {rule.isValid ? '✓' : '✕'}
                      </span>
                      {rule.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <button type="submit" className="primary-button md:col-span-2" disabled={isLoading}>
            {isLoading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
          <span>Déjà un compte ?</span>
          <button type="button" onClick={onLoginClick} className="link-button">
            Se connecter
          </button>
        </div>
      </section>
    </main>
  )
}

export default RegisterView
