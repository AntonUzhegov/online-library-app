import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header style={{
      background: 'linear-gradient(135deg, #0a3b2a 0%, #1a6b4a 100%)',
      color: 'white',
      padding: '16px 60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>

      <div style={{
        fontSize: '28px',
        fontWeight: '700',
        letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #fff, #ffd966)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        cursor: 'default'
      }}>
        📚 Online Library
      </div>

      <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '18px',
            fontWeight: '600',
            padding: '10px 0',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#ffd966'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'white'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          Главная
          <span style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '3px',
            backgroundColor: '#ffd966',
            transition: 'width 0.3s ease',
            borderRadius: '3px'
          }}
          onMouseEnter={(e) => e.target.style.width = '70%'}
          onMouseLeave={(e) => e.target.style.width = '0'} />
        </Link>
        
        <Link 
          to="/catalog" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '18px',
            fontWeight: '600',
            padding: '10px 0',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#ffd966'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'white'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          Каталог
          <span style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '3px',
            backgroundColor: '#ffd966',
            transition: 'width 0.3s ease',
            borderRadius: '3px'
          }}
          onMouseEnter={(e) => e.target.style.width = '70%'}
          onMouseLeave={(e) => e.target.style.width = '0'} />
        </Link>

        {user ? (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/profile" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,217,102,0.15)',
              padding: '8px 20px',
              borderRadius: '40px',
              border: '1px solid rgba(255,217,102,0.3)',
              color: 'white',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,217,102,0.25)'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,217,102,0.15)'
              e.currentTarget.style.transform = 'scale(1)'
            }}>
              <span style={{ fontSize: '18px' }}>👤</span>
              <span style={{ fontWeight: '500' }}>
                {user.username || user.firstName || 'Читатель'}
              </span>
            </Link>
            
            <button onClick={logout} style={{
              background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
              border: 'none',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '40px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '700',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(192,57,43,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 16px rgba(192,57,43,0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(192,57,43,0.3)'
            }}>
              Выйти
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
            padding: '8px 28px',
            borderRadius: '40px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(39,174,96,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 6px 16px rgba(39,174,96,0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 12px rgba(39,174,96,0.3)'
          }}>
            Войти
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header