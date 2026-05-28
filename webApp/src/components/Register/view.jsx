function RegisterView({ form, message, error, onChange, onSubmit }) {
    return (
        <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Inscription</h2>

            {message && <p className="mb-4 text-green-600">{message}</p>}
            {error && <p className="mb-4 text-red-600">{error}</p>}

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="nom" value={form.nom} onChange={onChange} placeholder="Nom" className="border p-2 rounded" />
                <input name="prenom" value={form.prenom} onChange={onChange} placeholder="Prénom" className="border p-2 rounded" />
                <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" className="border p-2 rounded" />
                <input name="adresse" value={form.adresse} onChange={onChange} placeholder="Adresse" className="border p-2 rounded" />
                <input name="telephone" value={form.telephone} onChange={onChange} placeholder="Téléphone" className="border p-2 rounded" />
                <input name="ville" value={form.ville} onChange={onChange} placeholder="Ville" className="border p-2 rounded" />
                <input name="pays" value={form.pays} onChange={onChange} placeholder="Pays" className="border p-2 rounded" />
                <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Mot de passe" className="border p-2 rounded" />

                <button className="bg-blue-600 text-white p-2 rounded md:col-span-2">
                    S’inscrire
                </button>
            </form>
        </section>
    )
}

export default RegisterView