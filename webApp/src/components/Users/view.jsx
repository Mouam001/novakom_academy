function UsersView({ users, loading, error, onDelete }) {
    if (loading) {
        return <p>Chargement...</p>
    }

    if (error) {
        return <p className="text-red-600">{error}</p>
    }

    return (
        <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>

            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="border p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="font-bold">
                                {user.prenom} {user.nom}
                            </p>
                            <p>{user.email}</p>
                            <p>{user.telephone}</p>
                            <p>{user.ville}, {user.pays}</p>
                        </div>

                        <button
                            onClick={() => onDelete(user.id)}
                            className="bg-red-600 text-white px-3 py-2 rounded"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default UsersView