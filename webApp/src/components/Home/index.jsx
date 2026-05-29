import HomeView from './view'

function Home({ user }) {
  const firstName = user?.prenom || user?.Prenom || ''
  const lastName = user?.nom || user?.Nom || ''
  const fullName = `${lastName} ${firstName}`.trim()

  return <HomeView fullName={fullName} />
}

export default Home
