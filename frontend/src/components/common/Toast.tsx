import { useEffect } from 'react'
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING, FONTS, TRANSITIONS } from '../../styles/constants'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

function Toast({ message, type, onClose }: ToastProps): React.ReactElement {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const backgroundColor = type === 'success' ? COLORS.success : COLORS.danger
  const icon = type === 'success' ? '✓' : '✗'

  return (
    <div style={{
      position: 'fixed',
      bottom: SPACING.xxxl,
      right: SPACING.xxxl,
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.md,
        padding: `${SPACING.md} ${SPACING.xxl}`,
        backgroundColor: backgroundColor,
        color: COLORS.textWhite,
        borderRadius: BORDER_RADIUS.medium,
        boxShadow: SHADOWS.medium,
        fontSize: FONTS.size.base,
        fontWeight: FONTS.weight.medium
      }}>
        <span>{icon}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: COLORS.textWhite,
            cursor: 'pointer',
            fontSize: FONTS.size.xl,
            marginLeft: SPACING.sm,
            opacity: 0.7,
            transition: TRANSITIONS.fast
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          ×
        </button>
      </div>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Toast