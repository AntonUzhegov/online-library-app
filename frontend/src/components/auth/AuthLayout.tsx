import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

function AuthLayout({ children, title, subtitle }: AuthLayoutProps): React.ReactElement {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: '#f5f5f5',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Link to="/" style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        backgroundColor: '#0f5c3e',
        color: 'white',
        textDecoration: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '500',
        transition: '0.3s',
        zIndex: 10
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = '#1a7a52'}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = '#0f5c3e'}>
        ← Назад
      </Link>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '480px',
        width: '90%',
        padding: '50px',
        textAlign: 'center'
      }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '32px',
            color: '#0f5c3e',
            marginBottom: '10px',
            fontWeight: '600'
          }}>
            {title}
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            {subtitle}
          </p>
        </div>

        {children}

      </div>
    </div>
  )
}

export default AuthLayout