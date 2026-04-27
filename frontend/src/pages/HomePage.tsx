import { Link } from 'react-router-dom'
import { MouseEvent, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

interface Stat {
  number: string
  label: string
}

interface Advantage {
  emoji: string
  title: string
  desc: string
}

interface Step {
  step: string
  title: string
  desc: string
}

function HomePage(): React.ReactElement {
  const { user } = useContext(AuthContext)

  const stats: Stat[] = [
    { number: '10,000+', label: 'Книг в каталоге' },
    { number: '500+', label: 'Авторов' },
    { number: '24/7', label: 'Доступность' },
    { number: '1,000+', label: 'Активных читателей' }
  ]

  const advantages: Advantage[] = [
    { emoji: '📓', title: 'Большой выбор', desc: 'Более 10 000 книг на любой вкус: от классики до современных бестселлеров' },
    { emoji: '🖥️', title: 'Удобный поиск', desc: 'Ищите по названию, автору или жанру' },
    { emoji: '🔄', title: 'Легкий возврат', desc: 'Вернуть книгу можно онлайн в один клик' },
  ]

  const steps: Step[] = [
    { step: '01', title: 'Регистрация', desc: 'Создайте аккаунт за 30 секунд' },
    { step: '02', title: 'Поиск книги', desc: 'Найдите то, что хотите почитать' },
    { step: '03', title: 'Бронирование', desc: 'Зарезервируйте книгу онлайн' }
  ]

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>): void => {
    const target = e.currentTarget
    target.style.transform = 'scale(1.05)'
    target.style.boxShadow = '0 12px 28px rgba(0,0,0,0.3)'
  }

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>): void => {
    const target = e.currentTarget
    target.style.transform = 'scale(1)'
    target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)'
  }

  const handleStatMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = 'translateY(-5px)'
  }

  const handleStatMouseLeave = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = 'translateY(0)'
  }

  const handleAdvantageMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = 'translateY(-8px)'
    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)'
    e.currentTarget.style.borderColor = '#ffd966'
  }

  const handleAdvantageMouseLeave = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)'
    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'
  }

  const handleRegisterMouseEnter = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.currentTarget.style.transform = 'scale(1.05)'
    e.currentTarget.style.backgroundColor = '#ffe08c'
  }

  const handleRegisterMouseLeave = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.backgroundColor = '#ffd966'
  }

  const handleCatalogMouseEnter = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
  }

  const handleCatalogMouseLeave = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.currentTarget.style.backgroundColor = 'transparent'
  }

  return (
    <div style={{
      fontFamily: "'Inter', 'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0a3b2a 0%, #1e6b4a 50%, #2d8b5a 100%)',
        color: 'white',
        padding: '120px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,217,102,0.15) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,217,102,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '68px',
            fontWeight: '800',
            marginBottom: '20px',
            letterSpacing: '-2px',
            lineHeight: '1.2'
          }}>
            Добро пожаловать в<br />
            <span style={{
              background: 'linear-gradient(135deg, #ffd966, #ffb347)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Online Library</span>
          </h1>
          <p style={{
            fontSize: '20px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Тысячи книг, удобный поиск, быстрая выдача и легкий возврат
          </p>
          <Link 
            to="/catalog" 
            style={{
              background: 'linear-gradient(135deg, #ffd966, #ffb347)',
              color: '#0a3b2a',
              textDecoration: 'none',
              padding: '14px 48px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '700',
              display: 'inline-block',
              transition: 'all 0.3s',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Начать чтение
          </Link>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        maxWidth: '1000px',
        margin: '-40px auto 60px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 3
      }}>
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            style={{
              backgroundColor: 'white',
              padding: '25px 20px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={handleStatMouseEnter}
            onMouseLeave={handleStatMouseLeave}
          >
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#0a3b2a',
              marginBottom: '8px'
            }}>{stat.number}</div>
            <div style={{ color: '#666', fontSize: '14px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 40px 80px' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '36px',
          color: '#0a3b2a',
          marginBottom: '50px',
          fontWeight: '700'
        }}>
          Почему выбирают нас?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '30px'
        }}>
          {advantages.map((item, index) => (
            <div 
              key={index} 
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
                border: '1px solid rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={handleAdvantageMouseEnter}
              onMouseLeave={handleAdvantageMouseLeave}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>{item.emoji}</div>
              <h3 style={{ fontSize: '20px', color: '#0a3b2a', marginBottom: '10px', fontWeight: '600' }}>{item.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.5', fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '36px',
            color: '#0a3b2a',
            marginBottom: '50px',
            fontWeight: '700'
          }}>
            Как начать?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            {steps.map((item, idx) => (
              <div key={idx}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: '#0a3b2a',
                  color: '#ffd966',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: '800',
                  margin: '0 auto 20px'
                }}>{item.step}</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#0a3b2a' }}>{item.title}</h3>
                <p style={{ color: '#666' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Призыв к действию */}
      <div style={{
        background: 'linear-gradient(135deg, #0a3b2a, #1e6b4a)',
        margin: '60px 40px',
        padding: '70px 40px',
        borderRadius: '30px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px', fontWeight: '700' }}>
          Готовы начать?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '35px', opacity: 0.9 }}>
          Присоединяйтесь к сообществу книголюбов уже сегодня
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <Link 
              to="/profile" 
              style={{
                backgroundColor: '#ffd966',
                color: '#0a3b2a',
                textDecoration: 'none',
                padding: '14px 42px',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '700',
                transition: '0.3s'
              }}
              onMouseEnter={handleRegisterMouseEnter}
              onMouseLeave={handleRegisterMouseLeave}
            >
              Мой профиль
            </Link>
          ) : (
            <Link 
              to="/register" 
              style={{
                backgroundColor: '#ffd966',
                color: '#0a3b2a',
                textDecoration: 'none',
                padding: '14px 42px',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '700',
                transition: '0.3s'
              }}
              onMouseEnter={handleRegisterMouseEnter}
              onMouseLeave={handleRegisterMouseLeave}
            >
              Создать аккаунт
            </Link>
          )}
          <Link 
            to="/catalog" 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 42px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '700',
              border: '2px solid white',
              transition: '0.3s'
            }}
            onMouseEnter={handleCatalogMouseEnter}
            onMouseLeave={handleCatalogMouseLeave}
          >
            Посмотреть каталог
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage