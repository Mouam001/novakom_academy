function HomeView({ fullName }) {
  return (
    <main className="home-page">
      <section className="home-panel">
        <p className="brand-kicker text-emerald-200">
          Novakom Academy
        </p>
        <h1 className="welcome-title">
          Bienvenue chez Novakom Academy{fullName ? `, ${fullName}` : ''}
        </h1>
      </section>
    </main>
  )
}

export default HomeView
