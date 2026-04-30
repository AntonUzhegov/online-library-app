import { useState, FocusEvent } from 'react'
import { COLORS, BORDER_RADIUS, SPACING, FONTS, TRANSITIONS } from '../../styles/constants'

interface InputProps {
  type: 'text' | 'email' | 'password'
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  error?: string
}

function Input({ type, label, value, onChange, placeholder, required, error }: InputProps): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: `${SPACING.md} ${SPACING.lg}`,
    border: `2px solid ${error ? COLORS.danger : isFocused ? COLORS.primaryLight : COLORS.border}`,
    borderRadius: BORDER_RADIUS.medium,
    fontSize: FONTS.size.lg,
    transition: TRANSITIONS.fast,
    outline: 'none',
    boxSizing: 'border-box' as const,
    backgroundColor: isFocused ? COLORS.cardBg : COLORS.backgroundLight,
    boxShadow: isFocused ? `0 0 0 3px rgba(26, 122, 82, 0.1)` : 'none',
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
  }

  return (
    <div style={{ marginBottom: SPACING.xxl, textAlign: 'left' }}>
      <label style={{
        display: 'block',
        marginBottom: SPACING.sm,
        color: error ? COLORS.danger : COLORS.textPrimary,
        fontWeight: FONTS.weight.semibold,
        fontSize: FONTS.size.base,
        letterSpacing: '0.3px'
      }}>
        {label} {required && <span style={{ color: COLORS.danger }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && (
        <div style={{
          marginTop: SPACING.xs,
          fontSize: FONTS.size.sm,
          color: COLORS.danger
        }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default Input