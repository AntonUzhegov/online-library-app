import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/common/Header'

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import MyBooksPage from './pages/MyBooksPage'

function AppContent(): React.ReactElement {
  const location = useLocation()
  
  const hideHeader: boolean = location.pathname === '/login' || 
                     location.pathname === '/register' ||
                     location.pathname === '/profile'

  return (
    <>
      {!hideHeader && <Header />}
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-books" element={<MyBooksPage />} />
        </Routes>
      </main>
    </>
  )
}

function App(): React.ReactElement {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App