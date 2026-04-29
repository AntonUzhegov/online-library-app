import { useContext, useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import api from '../../service/api'
import { Book, Category } from '../../types'
import Toast from '../../components/common/Toast'

function AdminBooksPage(): React.ReactElement {
  const { user } = useContext(AuthContext)
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    publicationYear: '',
    publisher: '',
    coverImage: '',
    authors: '',
    categoryIds: [] as number[]
  })

  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" />
  }

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books')
      setBooks(response.data)
    } catch (error) {
      console.error('Ошибка загрузки книг', error)
      setToast({ message: 'Ошибка загрузки книг', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Ошибка загрузки категорий', error)
      setToast({ message: 'Ошибка загрузки категорий', type: 'error' })
    }
  }

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book)
    setShowConfirmModal(true)
  }

  const confirmDelete = async () => {
    if (!bookToDelete) return
    
    try {
      await api.delete(`/admin/books/${bookToDelete.id}`)
      fetchBooks()
      setToast({ message: 'Книга успешно удалена', type: 'success' })
      setShowConfirmModal(false)
      setBookToDelete(null)
    } catch (error) {
      setToast({ message: 'Ошибка при удалении книги', type: 'error' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const selectedCategories = formData.categoryIds.map(id => {
        const category = categories.find(c => c.id === id)
        return category ? category.name : ''
      }).filter(name => name !== '')

      const bookData = {
        title: formData.title,
        isbn: formData.isbn,
        publicationYear: parseInt(formData.publicationYear),
        publisher: formData.publisher,
        coverImage: formData.coverImage,
        authors: formData.authors.split(',').map(a => a.trim()).filter(a => a !== ''),
        categories: selectedCategories,
        available: true
      }

      if (editingBook) {
        await api.put(`/admin/books/${editingBook.id}`, bookData)
        setToast({ message: 'Книга успешно обновлена', type: 'success' })
      } else {
        await api.post('/admin/books', bookData)
        setToast({ message: 'Книга успешно добавлена', type: 'success' })
      }
      setShowModal(false)
      setEditingBook(null)
      setFormData({
        title: '',
        isbn: '',
        publicationYear: '',
        publisher: '',
        coverImage: '',
        authors: '',
        categoryIds: []
      })
      fetchBooks()
    } catch (error: any) {
      console.error('Ошибка:', error.response?.data)
      setToast({ message: error.response?.data?.message || 'Ошибка при сохранении книги', type: 'error' })
    }
  }

  const openEditModal = (book: Book) => {
    setEditingBook(book)
    
    const currentCategoryIds = book.categories.map(catName => {
      const category = categories.find(c => c.name === catName)
      return category ? category.id : null
    }).filter(id => id !== null) as number[]
    
    setFormData({
      title: book.title,
      isbn: book.isbn,
      publicationYear: book.publicationYear.toString(),
      publisher: book.publisher,
      coverImage: book.coverImage,
      authors: book.authors.join(', '),
      categoryIds: currentCategoryIds
    })
    setShowModal(true)
  }

  const getFilteredAndSortedBooks = () => {
    let filtered = books.filter(book => {
      const searchLower = searchQuery.toLowerCase()
      const matchTitle = book.title.toLowerCase().includes(searchLower)
      const matchAuthor = book.authors?.some(author => author.toLowerCase().includes(searchLower))
      return matchTitle || matchAuthor
    })

    return filtered.sort((a, b) => {
      if (a.available === b.available) return 0
      return a.available ? -1 : 1
    })
  }

  const sortedAndFilteredBooks = getFilteredAndSortedBooks()

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
              Управление книгами
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#1565c0'
            }}>
              Добавление, редактирование и удаление книг из каталога
            </p>
          </div>
          <button
            onClick={() => {
              setEditingBook(null)
              setFormData({
                title: '',
                isbn: '',
                publicationYear: '',
                publisher: '',
                coverImage: '',
                authors: '',
                categoryIds: []
              })
              setShowModal(true)
            }}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '10px 28px',
              borderRadius: '40px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(25,118,210,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1565c0'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1976d2'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Добавить книгу
          </button>
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
              placeholder="Поиск..."
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
              minWidth: '800px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>ID</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Название</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Авторы</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Год</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Статус</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '600', color: '#555' }}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredBooks.map(book => (
                  <tr 
                    key={book.id} 
                    style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 20px', color: '#666' }}>{book.id}</td>
                    <td style={{ padding: '16px 20px', fontWeight: '500', color: '#1a1a1a' }}>{book.title}</td>
                    <td style={{ padding: '16px 20px', color: '#666' }}>{book.authors?.join(', ') || '—'}</td>
                    <td style={{ padding: '16px 20px', color: '#666' }}>{book.publicationYear || '—'}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: book.available ? '#e8f5e9' : '#fee2e2',
                        color: book.available ? '#2e7d32' : '#c62828'
                      }}>
                        {book.available ? 'Доступна' : 'Забронирована'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <button
                        onClick={() => openEditModal(book)}
                        style={{
                          backgroundColor: '#fff3e0',
                          color: '#e65100',
                          border: 'none',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          marginRight: '8px',
                          fontSize: '13px',
                          fontWeight: '500',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffe0b2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff3e0'}
                      >
                        Изменить
                      </button>
                      <button
                        onClick={() => handleDeleteClick(book)}
                        style={{
                          backgroundColor: '#ffebee',
                          color: '#c62828',
                          border: 'none',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffcdd2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffebee'}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedAndFilteredBooks.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{
                      padding: '60px',
                      textAlign: 'center',
                      color: '#999'
                    }}>
                      Книги не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
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
        }} onClick={() => setShowModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '28px',
            padding: '32px',
            maxWidth: '520px',
            width: '90%',
            maxHeight: '85vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '26px', marginBottom: '24px', color: '#0d47a1', fontWeight: '600' }}>
              {editingBook ? 'Редактировать книгу' : 'Добавить книгу'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Название *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '14px',
                    transition: '0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>ISBN</label>
                <input
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Год издания</label>
                <input
                  type="number"
                  value={formData.publicationYear}
                  onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Издательство</label>
                <input
                  type="text"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Путь к обложке</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="/covers/book.jpg"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Авторы (через запятую)</label>
                <input
                  type="text"
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="Толстой, Достоевский"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Категории</label>
                <select
                  multiple
                  value={formData.categoryIds.map(String)}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value))
                    setFormData({ ...formData, categoryIds: selected })
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '14px',
                    minHeight: '110px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <small style={{ color: '#888', fontSize: '12px', marginTop: '6px', display: 'block' }}>
                  Держите Ctrl (Cmd) для выбора нескольких категорий
                </small>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
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
                  {editingBook ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
            </form>
          </div>
        </div>
      )}

      {showConfirmModal && bookToDelete && (
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
        }} onClick={() => setShowConfirmModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '28px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{
              fontSize: '22px',
              marginBottom: '12px',
              color: '#1a1a1a',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Удалить книгу?
            </h2>
            <p style={{
              textAlign: 'center',
              color: '#666',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              Вы уверены, что хотите удалить книгу<br />
              <strong>"{bookToDelete.title}"</strong>?<br />
              Это действие нельзя отменить.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
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
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '40px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBooksPage