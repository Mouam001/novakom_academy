import { useUsers } from '../../hooks/useUsers'
import UsersView from './view'

function Users() {
  const {
    users,
    loading,
    error,
    removeUser,
  } = useUsers()

  return (
      <UsersView
          users={users}
          loading={loading}
          error={error}
          onDelete={removeUser}
      />
  )
}

export default Users