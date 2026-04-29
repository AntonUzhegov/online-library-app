import { useContext, useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import api from '../../service/api'
import Toast from '../../components/common/Toast'

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
  registrationDate: string
  active: boolean
}

function AdminUsersPage(): React.ReactElement {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState('')

  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" />
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Ошибка загрузки пользователей', error)
      setToast({ message: 'Ошибка загрузки пользователей', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (userId: number, username: string, isActive: boolean) => {
    try {
      await api.put(`/admin/users/${userId}/toggle-active`)
      fetchUsers()
      setToast({ 
        message: isActive ? `Пользователь "${username}" заблокирован` : `Пользователь "${username}" разблокирован`, 
        type: 'success' 
      })
    } catch (error) {
      setToast({ message: 'Ошибка при изменении статуса', type: 'error' })
    }
  }

  const openRoleModal = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setShowRoleModal(true)
  }

  const handleChangeRole = async () => {
    if (!selectedUser) return
    
    try {
      await api.put(`/admin/users/${selectedUser.id}/role`, { role: newRole })
      fetchUsers()
      setToast({ message: `Роль пользователя "${selectedUser.username}" изменена на ${newRole}`, type: 'success' })
      setShowRoleModal(false)
      setSelectedUser(null)
    } catch (error) {
      setToast({ message: 'Ошибка при изменении роли', type: 'error' })
    }
  }

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'ROLE_ADMIN':
        return { bg: '#e3f2fd', color: '#1565c0', label: 'Администратор' }
      case 'ROLE_LIBRARIAN':
        return { bg: '#e8f5e9', color: '#2e7d32', label: 'Библиотекарь' }
      default:
        return { bg: '#f5f5f5', color: '#666', label: 'Пользователь' }
    }
  }

  const filteredUsers = users.filter(u => {
    const searchLower = searchQuery.toLowerCase()
    return u.username.toLowerCase().includes(searchLower) ||
           u.email.toLowerCase().includes(searchLower) ||
           u.firstName.toLowerCase().includes(searchLower) ||
           u.lastName.toLowerCase().includes(searchLower)
  })

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#0d47a1'
      }}>
        Загрузка...
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdef5 100%)',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <Link to="/admin" style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        backgroundColor: '#1976d2',
        color: 'white',
        textDecoration: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '500',
        transition: '0.3s',
        zIndex: 10,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1565c0'
        e.currentTarget.style.transform = 'translateX(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1976d2'
        e.currentTarget.style.transform = 'translateX(0)'
      }}>
        ← Назад в админ панель
      </Link>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 24px 48px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              color: '#0d47a1',
              marginBottom: '8px',
              fontWeight: '700'
            }}>
              Управление пользователями
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#1565c0'
            }}>
              Просмотр, блокировка и управление ролями
            </p>
          </div>
        </div>

        <div style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            position: 'relative',
            width: '300px'
          }}>
            <input
              type="text"
              placeholder="Поиск по имени, email или username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '40px',
                fontSize: '14px',
                outline: 'none',
                transition: '0.2s',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1976d2'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '900px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>ID</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Имя пользователя</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Email</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Имя и фамилия</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Роль</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Статус</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '600', color: '#555' }}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => {
                  const roleStyle = getRoleColor(u.role)
                  return (
                    <tr 
                      key={u.id} 
                      style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '16px 20px', color: '#666' }}>{u.id}</td>
                      <td style={{ padding: '16px 20px', fontWeight: '500', color: '#1a1a1a' }}>{u.username}</td>
                      <td style={{ padding: '16px 20px', color: '#666' }}>{u.email}</td>
                      <td style={{ padding: '16px 20px', color: '#666' }}>{u.firstName} {u.lastName}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: roleStyle.bg,
                          color: roleStyle.color
                        }}>
                          {roleStyle.label}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: u.active ? '#e8f5e9' : '#fee2e2',
                          color: u.active ? '#2e7d32' : '#c62828'
                        }}>
                          {u.active ? 'Активен' : 'Заблокирован'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <button
                          onClick={() => openRoleModal(u)}
                          style={{
                            backgroundColor: '#e3f2fd',
                            color: '#1565c0',
                            border: 'none',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            marginRight: '8px',
                            fontSize: '13px',
                            fontWeight: '500',
                            transition: '0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bbdef5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
                        >
                          Роль
                        </button>
                        <button
                          onClick={() => handleToggleActive(u.id, u.username, u.active)}
                          style={{
                            backgroundColor: u.active ? '#ffebee' : '#e8f5e9',
                            color: u.active ? '#c62828' : '#2e7d32',
                            border: 'none',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '500',
                            transition: '0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (u.active) e.currentTarget.style.backgroundColor = '#ffcdd2'
                            else e.currentTarget.style.backgroundColor = '#c8e6c9'
                          }}
                          onMouseLeave={(e) => {
                            if (u.active) e.currentTarget.style.backgroundColor = '#ffebee'
                            else e.currentTarget.style.backgroundColor = '#e8f5e9'
                          }}
                        >
                          {u.active ? 'Заблокировать' : 'Разблокировать'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{
                      padding: '60px',
                      textAlign: 'center',
                      color: '#999'
                    }}>
                      Пользователи не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showRoleModal && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowRoleModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '28px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#0d47a1', fontWeight: '600' }}>
              Изменить роль
            </h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Пользователь: <strong>{selectedUser.username}</strong>
            </p>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '14px',
                marginBottom: '24px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1976d2'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            >
              <option value="ROLE_USER">Пользователь</option>
              <option value="ROLE_LIBRARIAN">Библиотекарь</option>
              <option value="ROLE_ADMIN">Администратор</option>
            </select>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleChangeRole}
                style={{
                  flex: 1,
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '40px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
              >
                Сохранить
              </button>
              <button
                onClick={() => setShowRoleModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#f0f0f0',
                  color: '#555',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '40px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsersPage