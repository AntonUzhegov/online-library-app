import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/common/Header'

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import MyBooksPage from './pages/MyBooksPage'
import AdminPage from './pages/admin/AdminPage'
import AdminBooksPage from './pages/admin/AdminBooksPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminStatsPage from './pages/admin/AdminStatsPage'

function AppContent(): React.ReactElement {
  const location = useLocation()
  
  const hideHeader: boolean = location.pathname === '/login' || 
                     location.pathname === '/register' ||
                     location.pathname === '/profile' ||
                     location.pathname === '/admin' ||
                     location.pathname === '/admin/books' ||
                     location.pathname === '/admin/users' ||
                     location.pathname === '/admin/stats'

  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <>
      {!hideHeader && <Header />}
      <main style={{ 
        minHeight: '80vh', 
        padding: isAdminPage ? 0 : '20px'  
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-books" element={<MyBooksPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/books" element={<AdminBooksPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/stats" element={<AdminStatsPage />} />
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