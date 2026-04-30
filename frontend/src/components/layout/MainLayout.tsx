import { ReactNode } from 'react'
import Header from '../common/Header'
import { SPACING } from '../../styles/constants'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
  return (
    <>
      <Header />
      <main style={{ 
        minHeight: '80vh',
        padding: SPACING.xl
      }}>
        {children}
      </main>
    </>
  )
}

export default MainLayout