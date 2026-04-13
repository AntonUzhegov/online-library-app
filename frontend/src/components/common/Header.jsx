import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header style={{ backgroundColor: '#333', color: 'white', padding: '20px', display: 'flex', gap: '20px' }}>
      <Link to="/" style={{ color: 'white' }}>Главная</Link>
      <Link to="/catalog" style={{ color: 'white' }}>Каталог</Link>
      {user ? (
        <>
          <span>{user.username}</span>
          <button onClick={logout}>Выйти</button>
        </>
      ) : (
        <Link to="/login" style={{ color: 'white' }}>Войти</Link>
      )}
    </header>
  )
}

export default Header