import { ReactNode } from 'react'
import Header from '../common/Header'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
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