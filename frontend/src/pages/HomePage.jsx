function HomePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      textAlign: 'center',
      padding: '40px'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', color: '#0a3b2a', marginBottom: '20px' }}>
          Добро пожаловать!
        </h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Здесь будет главная страница библиотеки
        </p>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '20px' }}>
          (страница в разработке)
        </p>
      </div>
    </div>
  )
}

export default HomePage