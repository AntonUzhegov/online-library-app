import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Header(): React.ReactElement {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

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
        fontSize: '24px',
        fontWeight: '700',
        letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #fff, #ffd966)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        cursor: 'default',
        whiteSpace: 'nowrap'
      }}>
        📚 Online Library
      </div>

      <nav style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={{ 
            color: isActive('/') ? '#ffd966' : 'white', 
            textDecoration: 'none', 
            fontSize: '16px',
            fontWeight: '500',
            padding: '10px 24px',
            borderRadius: '12px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: isActive('/') 
              ? 'rgba(255, 217, 102, 0.15)' 
              : 'rgba(255, 255, 255, 0.03)',
            border: isActive('/')
              ? '1px solid rgba(255, 217, 102, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            letterSpacing: '0.3px',
            boxShadow: isActive('/')
              ? '0 8px 20px rgba(255, 217, 102, 0.2)'
              : 'none'
          }}
          onMouseEnter={(e) => {
            if (!isActive('/')) {
              e.currentTarget.style.background = 'rgba(255, 217, 102, 0.15)'
              e.currentTarget.style.border = '1px solid rgba(255, 217, 102, 0.5)'
              e.currentTarget.style.color = '#ffd966'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 217, 102, 0.2)'
            } else {
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/')) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = 'none'
            }
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Главная
        </Link>
        
        <Link 
          to="/catalog" 
          style={{ 
            color: isActive('/catalog') ? '#ffd966' : 'white', 
            textDecoration: 'none', 
            fontSize: '16px',
            fontWeight: '500',
            padding: '10px 24px',
            borderRadius: '12px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: isActive('/catalog') 
              ? 'rgba(255, 217, 102, 0.15)' 
              : 'rgba(255, 255, 255, 0.03)',
            border: isActive('/catalog')
              ? '1px solid rgba(255, 217, 102, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            letterSpacing: '0.3px',
            boxShadow: isActive('/catalog')
              ? '0 8px 20px rgba(255, 217, 102, 0.2)'
              : 'none'
          }}
          onMouseEnter={(e) => {
            if (!isActive('/catalog')) {
              e.currentTarget.style.background = 'rgba(255, 217, 102, 0.15)'
              e.currentTarget.style.border = '1px solid rgba(255, 217, 102, 0.5)'
              e.currentTarget.style.color = '#ffd966'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 217, 102, 0.2)'
            } else {
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/catalog')) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = 'none'
            }
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Каталог
        </Link>

        {user ? (
          <>
            <Link 
              to="/my-books" 
              style={{ 
                color: isActive('/my-books') ? '#ffd966' : 'white', 
                textDecoration: 'none', 
                fontSize: '16px',
                fontWeight: '500',
                padding: '10px 24px',
                borderRadius: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isActive('/my-books') 
                  ? 'rgba(255, 217, 102, 0.15)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: isActive('/my-books')
                  ? '1px solid rgba(255, 217, 102, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                letterSpacing: '0.3px',
                boxShadow: isActive('/my-books')
                  ? '0 8px 20px rgba(255, 217, 102, 0.2)'
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/my-books')) {
                  e.currentTarget.style.background = 'rgba(255, 217, 102, 0.15)'
                  e.currentTarget.style.border = '1px solid rgba(255, 217, 102, 0.5)'
                  e.currentTarget.style.color = '#ffd966'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 217, 102, 0.2)'
                } else {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/my-books')) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.boxShadow = 'none'
                }
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Мои книги
            </Link>
            <Link 
              to="/profile" 
              style={{ 
                color: isActive('/profile') ? '#ffd966' : 'white', 
                textDecoration: 'none', 
                fontSize: '16px',
                fontWeight: '500',
                padding: '10px 24px',
                borderRadius: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isActive('/profile') 
                  ? 'rgba(255, 217, 102, 0.15)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: isActive('/profile')
                  ? '1px solid rgba(255, 217, 102, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                letterSpacing: '0.3px',
                boxShadow: isActive('/profile')
                  ? '0 8px 20px rgba(255, 217, 102, 0.2)'
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/profile')) {
                  e.currentTarget.style.background = 'rgba(255, 217, 102, 0.15)'
                  e.currentTarget.style.border = '1px solid rgba(255, 217, 102, 0.5)'
                  e.currentTarget.style.color = '#ffd966'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 217, 102, 0.2)'
                } else {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/profile')) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.boxShadow = 'none'
                }
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Профиль
            </Link>
          </>
        ) : (
          <Link 
            to="/login" 
            style={{
              background: 'transparent',
              padding: '8px 24px',
              borderRadius: '30px',
              color: '#ffd966',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              border: '1.5px solid #ffd966'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffd966'
              e.currentTarget.style.color = '#1a472a'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#ffd966'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Войти
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header