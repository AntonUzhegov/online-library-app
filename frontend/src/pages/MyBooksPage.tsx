import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'
import Toast from '../components/common/Toast'

interface Loan {
  loanId: number
  bookId: number
  bookTitle: string
  coverImage: string
  loanDate: string
  dueDate: string
  returnDate: string | null
  status: string
}

function CountdownTimer({ dueDate }: { dueDate: string }): React.ReactElement {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const due = new Date(dueDate).getTime()
      const diff = due - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [dueDate])

  const formatTime = (): string => {
    const timeStr = `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`
    if (timeLeft.days > 0) {
      const daysWord = timeLeft.days === 1 ? 'день' : (timeLeft.days >= 2 && timeLeft.days <= 4 ? 'дня' : 'дней')
      return `${timeLeft.days} ${daysWord} ${timeStr}`
    }
    return timeStr
  }

  return (
    <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: '600', color: '#27ae60' }}>
      {formatTime()}
    </span>
  )
}

function MyBooksPage(): React.ReactElement {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [returnLoading, setReturnLoading] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchMyBooks()
  }, [])

  const fetchMyBooks = async (): Promise<void> => {
    try {
      const response = await api.get('/loans/my')
      setLoans(response.data)
    } catch (err) {
      setError('Ошибка загрузки взятых книг')
    } finally {
      setLoading(false)
    }
  }

  const handleReturn = async (loanId: number): Promise<void> => {
    setReturnLoading(loanId)
    try {
      await api.post(`/loans/return/${loanId}`)
      setToast({ message: 'Книга успешно возвращена!', type: 'success' })
      fetchMyBooks()
    } catch (err: any) {
      setToast({ message: err.response?.data || 'Ошибка при возврате книги', type: 'error' })
    } finally {
      setReturnLoading(null)
    }
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        fontSize: '18px',
        color: '#0a3b2a'
      }}>
        Загрузка...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        color: 'red'
      }}>
        {error}
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      <h1 style={{
        fontSize: '36px',
        color: '#0a3b2a',
        marginBottom: '30px',
        textAlign: 'center',
        fontWeight: '600'
      }}>
        Мои книги
      </h1>

      {loans.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: '#f8f9fa',
          borderRadius: '24px'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            У вас пока нет взятых книг
          </p>
          <Link to="/catalog" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 24px',
            backgroundColor: '#0f5c3e',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '30px'
          }}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {loans.map(loan => {
            const now = new Date()
            const dueDate = new Date(loan.dueDate)
            const isOverdue = loan.status === 'OVERDUE' || dueDate < now
            const isActive = loan.status === 'ACTIVE'

            return (
              <div
                key={loan.loanId}
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  borderTop: `4px solid ${isOverdue ? '#c0392b' : '#0f5c3e'}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{
                  width: '110px',
                  backgroundColor: '#f5f7fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {loan.coverImage ? (
                    <img
                      src={loan.coverImage}
                      alt={loan.bookTitle}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/covers/default.jpg'
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '40px', opacity: 0.5 }}>📖</span>
                  )}
                </div>

                <div style={{
                  flex: 1,
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      margin: '0 0 12px 0',
                      color: '#1a1a1a'
                    }}>
                      {loan.bookTitle}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '24px',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>Взята</div>
                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                          {new Date(loan.loanDate).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>До</div>
                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                          {new Date(loan.dueDate).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    </div>

                    {isActive && !isOverdue && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '8px',
                        padding: '6px 12px',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '12px',
                        width: 'fit-content'
                      }}>
                        <span style={{ fontSize: '16px' }}></span>
                        <CountdownTimer dueDate={loan.dueDate} />
                      </div>
                    )}

                    {isActive && isOverdue && (
                      <div style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                        backgroundColor: '#fee2e2',
                        color: '#c0392b'
                      }}>
                        Просрочено
                      </div>
                    )}
                    
                    {loan.status === 'RETURNED' && (
                      <div style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                        backgroundColor: '#e8f5e9',
                        color: '#27ae60'
                      }}>
                        ✓ Возвращена
                      </div>
                    )}
                  </div>

                  {loan.status !== 'RETURNED' && (
                    <div style={{
                      marginTop: '16px',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => handleReturn(loan.loanId)}
                        disabled={returnLoading === loan.loanId}
                        style={{
                          padding: '8px 24px',
                          backgroundColor: 'transparent',
                          color: '#c0392b',
                          border: '2px solid #c0392b',
                          borderRadius: '30px',
                          cursor: returnLoading === loan.loanId ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          transition: 'all 0.2s',
                          opacity: returnLoading === loan.loanId ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (returnLoading !== loan.loanId) {
                            e.currentTarget.style.backgroundColor = '#c0392b'
                            e.currentTarget.style.color = 'white'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (returnLoading !== loan.loanId) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = '#c0392b'
                          }
                        }}
                      >
                        {returnLoading === loan.loanId ? 'Возврат...' : 'Вернуть книгу'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default MyBooksPage