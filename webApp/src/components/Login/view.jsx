function LoginView({
  form,
  message,
  messageType,
  errors,
  isLoading,
  onChange,
  onSubmit,
  onCreateAccount,
}) {
  const messageClass =
    messageType === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : 'border-red-200 bg-red-50 text-red-700'

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-entrance">
        <div className="mb-8 text-center">
          <p className="brand-kicker">
            Novakom Academy
          </p>
          <h1 className="text-3xl font-bold text-slate-950">Connexion</h1>
          <p className="mt-3 text-sm text-slate-500">
            Accédez à votre espace de formation.
          </p>
        </div>

        {message && (
          <p className={`mb-5 rounded-lg border px-4 py-3 text-sm font-medium ${messageClass}`}>
            {message}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="votre@email.com"
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="Votre mot de passe"
              className={`form-input ${errors.password ? 'form-input-error' : ''}`}
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
          <span>Pas encore de compte ?</span>
          <button type="button" onClick={onCreateAccount} className="link-button">
            Créer un compte
          </button>
        </div>
      </section>
    </main>
  )
}

export default LoginView
