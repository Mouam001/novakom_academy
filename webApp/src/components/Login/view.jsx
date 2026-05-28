function LoginView({ form, message, onChange, onSubmit }) {
    return (
        <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Connexion</h2>

            {message && <p className="mb-4">{message}</p>}

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Mot de passe"
                    className="border p-2 rounded"
                />

                <button className="bg-green-600 text-white p-2 rounded">
                    Se connecter
                </button>
            </form>
        </section>
    )
}

export default LoginView