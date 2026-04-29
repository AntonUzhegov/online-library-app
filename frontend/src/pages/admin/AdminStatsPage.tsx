import { useContext, useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import api from '../../service/api'
import Toast from '../../components/common/Toast'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts'

interface PopularBook {
  id: number
  title: string
  authors: string[]
  loanCount: number
  available: boolean
}

interface ReturnStats {
  totalLoans: number
  activeLoans: number
  returnedLoans: number
  overdueLoans: number
}

interface MonthlyStats {
  month: string
  loans: number
  returns: number
}

function AdminStatsPage(): React.ReactElement {
  const { user } = useContext(AuthContext)
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([])
  const [returnStats, setReturnStats] = useState<ReturnStats | null>(null)
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" />
  }

  useEffect(() => {
    fetchAllStats()
  }, [])

  const fetchAllStats = async () => {
    try {
      const [popularRes, returnsRes, monthlyRes] = await Promise.all([
        api.get('/admin/statistics/popular'),
        api.get('/admin/statistics/returns'),
        api.get('/admin/statistics/monthly')
      ])
      
      setPopularBooks(popularRes.data)
      setReturnStats(returnsRes.data)
      setMonthlyStats(monthlyRes.data)
    } catch (error) {
      console.error('Ошибка загрузки статистики', error)
      setToast({ message: 'Ошибка загрузки статистики', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#1976d2', '#2e7d32', '#c62828', '#e65100', '#6a1b9a', '#00838f']
  
  const pieData = returnStats ? [
    { name: 'Возвращены', value: returnStats.returnedLoans, color: '#2e7d32' },
    { name: 'Активные', value: returnStats.activeLoans, color: '#1976d2' },
    { name: 'Просрочены', value: returnStats.overdueLoans, color: '#c62828' }
  ] : []

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdef5 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid #e0e0e0',
            borderTopColor: '#1976d2',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            marginBottom: '16px'
          }} />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ color: '#0d47a1', fontSize: '14px' }}>Загрузка данных</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdef5 100%)',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 48px' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#0d47a1',
            marginBottom: '8px'
          }}>
            Статистика библиотеки
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#1565c0'
          }}>
            Аналитика книговыдачи и рейтинг популярных изданий
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
              Всего выдач
            </div>
            <div style={{ fontSize: '32px', fontWeight: '600', color: '#0f172a' }}>
              {returnStats?.totalLoans || 0}
            </div>
          </div>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
              Активные
            </div>
            <div style={{ fontSize: '32px', fontWeight: '600', color: '#1976d2' }}>
              {returnStats?.activeLoans || 0}
            </div>
          </div>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
              Возвращено
            </div>
            <div style={{ fontSize: '32px', fontWeight: '600', color: '#2e7d32' }}>
              {returnStats?.returnedLoans || 0}
            </div>
          </div>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
              Просрочено
            </div>
            <div style={{ fontSize: '32px', fontWeight: '600', color: '#c62828' }}>
              {returnStats?.overdueLoans || 0}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#0d47a1',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #e3f2fd'
            }}>
              Распределение статусов
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => {
                  if (percent === undefined) return name
                    return `${name} ${(percent * 100).toFixed(0)}%`
                  }}
                  outerRadius={90}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#0d47a1',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #e3f2fd'
            }}>
              Динамика за последние 12 месяцев
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="loans" 
                  stroke="#1976d2" 
                  fill="#1976d2" 
                  fillOpacity={0.08} 
                  name="Выдачи" 
                />
                <Area 
                  type="monotone" 
                  dataKey="returns" 
                  stroke="#2e7d32" 
                  fill="#2e7d32" 
                  fillOpacity={0.08} 
                  name="Возвраты" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0d47a1',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '2px solid #e3f2fd'
          }}>
            Топ популярных книг
          </h2>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={popularBooks.slice(0, 10)} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis 
                type="category" 
                dataKey="title" 
                width={100} 
                tick={{ fontSize: 12, fill: '#334155' }}
              />
              <Tooltip />
              <Bar dataKey="loanCount" name="Количество выдач" fill="#1976d2" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e3f2fd', backgroundColor: '#f8f9fa' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0d47a1', margin: 0 }}>
              Полный список
            </h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#555' }}>Место</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#555' }}>Название</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#555' }}>Авторы</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#555' }}>Выдач</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#555' }}>Статус</th>
                </tr>
              </thead>
              <tbody>
                {popularBooks.map((book, index) => (
                  <tr 
                    key={book.id} 
                    style={{ borderBottom: '1px solid #f0f0f0' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#666' }}>{index + 1}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{book.title}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#666' }}>{book.authors?.join(', ') || '—'}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#1976d2' }}>{book.loanCount}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: book.available ? '#e8f5e9' : '#ffebee',
                        color: book.available ? '#2e7d32' : '#c62828'
                      }}>
                        {book.available ? 'Доступна' : 'Забронирована'}
                      </span>
                    </td>
                  </tr>
                ))}
                {popularBooks.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '60px', textAlign: 'center', color: '#999' }}>
                      Нет данных
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatsPage