import { useState, useEffect, useRef } from 'react'
import api from '../service/api'
import { Book, Category } from '../types'

interface ErrorResponse {
  response?: {
    data?: {
      error?: string
    }
  }
}

function CatalogPage(): React.ReactElement {
  const [books, setBooks] = useState<Book[]>([])
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [yearFrom, setYearFrom] = useState<string>('')
  const [yearTo, setYearTo] = useState<string>('')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetchCategories()
    
    const handleClickOutside = (event: MouseEvent): void => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    fetchBooks()
  }, [searchQuery, selectedCategory, yearFrom, yearTo])

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data as Category[])
    } catch (err) {
      console.error('Ошибка загрузки категорий')
    }
  }

  const fetchBooks = async (): Promise<void> => {
    try {
      let url = '/books'
      const params = new URLSearchParams()
      
      if (searchQuery) {
        url = '/books/search'
        params.append('query', searchQuery)
      } else if (selectedCategory) {
        const category = categories.find(c => c.name === selectedCategory)
        if (category) {
          url = `/books/filter/category/${category.id}`
        }
      } else if (yearFrom || yearTo) {
        url = '/books/filter/year'
        if (yearFrom) params.append('yearFrom', yearFrom)
        if (yearTo) params.append('yearTo', yearTo)
      }
      
      const response = await api.get(url, { params })
      
      const sortedBooks: Book[] = [...(response.data as Book[])].sort((a, b) => {
        if (a.available === b.available) return 0
        return a.available ? -1 : 1
      })
      
      setBooks(sortedBooks)
    } catch (err: unknown) {
      const error = err as ErrorResponse
      setError(error.response?.data?.error || 'Ошибка загрузки книг')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleBookClick = (book: Book): void => setSelectedBook(book)
  const closeModal = (): void => setSelectedBook(null)
  const handleReserve = (): void => alert('Функция бронирования будет добавлена позже')

  if (initialLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        fontSize: '18px',
        color: '#0a3b2a'
      }}>
        Загрузка книг...
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
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#0a3b2a',
          fontWeight: '700',
          marginBottom: '12px',
          letterSpacing: '-0.5px'
        }}>
          Каталог книг
        </h1>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ flex: '2', minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '18px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                height: '56px'
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#0f5c3e'}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          
          <div style={{ flex: '1', minWidth: '180px', position: 'relative' }} ref={categoryDropdownRef}>
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              style={{
                width: '100%',
                padding: '14px 18px',
                border: `2px solid ${isCategoryOpen ? '#0f5c3e' : '#e5e7eb'}`,
                borderRadius: '16px',
                fontSize: '18px',
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
                height: '56px'
              }}
            >
              <span style={{ color: selectedCategory ? '#1a1a1a' : '#666' }}>
                {selectedCategory || 'Все категории'}
              </span>
              <span style={{
                transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                color: isCategoryOpen ? '#0f5c3e' : '#666'
              }}>
                ▼
              </span>
            </div>
            
            {isCategoryOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                overflow: 'hidden',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <div
                  onClick={() => {
                    setSelectedCategory('')
                    setIsCategoryOpen(false)
                  }}
                  style={{
                    padding: '12px 18px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    backgroundColor: selectedCategory === '' ? '#f0f2f5' : 'white',
                    fontWeight: selectedCategory === '' ? '600' : '400'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (selectedCategory !== '') e.currentTarget.style.backgroundColor = '#f8f9fa'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (selectedCategory !== '') e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  Все категории
                </div>
                {categories.map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.name)
                      setIsCategoryOpen(false)
                    }}
                    style={{
                      padding: '12px 18px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      backgroundColor: selectedCategory === cat.name ? '#f0f2f5' : 'white',
                      fontWeight: selectedCategory === cat.name ? '600' : '400'
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      if (selectedCategory !== cat.name) e.currentTarget.style.backgroundColor = '#f8f9fa'
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      if (selectedCategory !== cat.name) e.currentTarget.style.backgroundColor = 'white'
                    }}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: '0.5', minWidth: '100px' }}>
            <input
              type="number"
              placeholder="Год от"
              value={yearFrom}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYearFrom(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '18px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                height: '56px'
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#0f5c3e'}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ flex: '0.5', minWidth: '100px' }}>
            <input
              type="number"
              placeholder="Год до"
              value={yearTo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYearTo(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '18px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                height: '56px'
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#0f5c3e'}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>

        {(searchQuery || selectedCategory || yearFrom || yearTo) && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
                setYearFrom('')
                setYearTo('')
              }}
              style={{
                padding: '10px 24px',
                backgroundColor: 'transparent',
                color: '#0f5c3e',
                border: '2px solid #0f5c3e',
                borderRadius: '40px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = '#0f5c3e'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#0f5c3e'
              }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#666',
          backgroundColor: '#f0f2f5',
          padding: '6px 14px',
          borderRadius: '20px'
        }}>
          Найдено книг: <strong style={{ color: '#0a3b2a', fontSize: '16px' }}>{books.length}</strong>
        </div>
      </div>

      {books.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '24px'
        }}>
          <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '8px' }}>Ничего не найдено</h3>
          <p style={{ color: '#666' }}>Попробуйте изменить параметры поиска</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',  // ← ИЗМЕНЕНО: теперь 5 книг в строке
          gap: '28px'
        }}>
          {books.map(book => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.12)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{
                height: '260px',
                backgroundColor: '#f5f7fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = '/covers/default.jpg'
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '56px', opacity: 0.5 }}>📖</span>
                )}
                {!book.available && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#c0392b',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    Забронировано
                  </div>
                )}
              </div>
              
              <div style={{ padding: '18px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  color: '#1a1a1a',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {book.title}
                </h3>
                
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  margin: '0 0 4px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {book.authors?.join(', ') || 'Автор не указан'}
                </p>
                
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  margin: '0'
                }}>
                  {book.publicationYear || 'Год не указан'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={closeModal}>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '28px',
            padding: '32px',
            maxWidth: '520px',
            width: '90%',
            maxHeight: '85vh',
            overflow: 'auto',
            position: 'relative'
          }} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                background: '#f0f2f5',
                border: 'none',
                borderRadius: '50%',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0'
                e.currentTarget.style.color = '#333'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = '#f0f2f5'
                e.currentTarget.style.color = '#666'
              }}
            >
              ✕
            </button>
            
            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '0 0 140px' }}>
                {selectedBook.coverImage ? (
                  <img
                    src={selectedBook.coverImage}
                    alt={selectedBook.title}
                    style={{
                      width: '100%',
                      borderRadius: '16px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = '/covers/default.jpg'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px'
                  }}>
                  </div>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontSize: '26px',
                  marginBottom: '16px',
                  color: '#0a3b2a',
                  fontWeight: '700',
                  lineHeight: '1.3'
                }}>
                  {selectedBook.title}
                </h2>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '24px'
                }}>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#555', minWidth: '100px', display: 'inline-block' }}>Автор:</strong>
                    <span style={{ color: '#333' }}> {selectedBook.authors?.join(', ') || 'Не указан'}</span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#555', minWidth: '100px', display: 'inline-block' }}>Год:</strong>
                    <span style={{ color: '#333' }}> {selectedBook.publicationYear || 'Не указан'}</span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#555', minWidth: '100px', display: 'inline-block' }}>Издательство:</strong>
                    <span style={{ color: '#333' }}> {selectedBook.publisher || 'Не указано'}</span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#555', minWidth: '100px', display: 'inline-block' }}>ISBN:</strong>
                    <span style={{ color: '#333' }}> {selectedBook.isbn || 'Не указан'}</span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#555', minWidth: '100px', display: 'inline-block' }}>Категории:</strong>
                    <span style={{ color: '#333' }}> {selectedBook.categories?.join(', ') || 'Не указаны'}</span>
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: selectedBook.available ? '#e8f5e9' : '#fee2e2',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    color: selectedBook.available ? '#27ae60' : '#c0392b',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>{selectedBook.available ? '✓' : '✗'}</span>
                    {selectedBook.available ? 'Книга доступна для бронирования' : 'Книга на руках'}
                  </span>
                </div>
                
                <button
                  onClick={handleReserve}
                  disabled={!selectedBook.available}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: selectedBook.available ? '#0f5c3e' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: selectedBook.available ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: selectedBook.available ? '0 4px 12px rgba(15,92,62,0.3)' : 'none'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (selectedBook.available) {
                      e.currentTarget.style.backgroundColor = '#1a7a52'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (selectedBook.available) {
                      e.currentTarget.style.backgroundColor = '#0f5c3e'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {selectedBook.available ? 'Забронировать' : 'Недоступна для бронирования'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatalogPage