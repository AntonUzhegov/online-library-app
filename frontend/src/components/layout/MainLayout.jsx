import Header from '../common/Header'

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
    </>
  )
}

export default MainLayout