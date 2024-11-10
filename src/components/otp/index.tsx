import React, { useState } from 'react'
import TextPrompt from '../text-prompt'
import styled from 'styled-components'

interface OTPInputProps {
  onChange: (otp: string) => void
  label?: string
  error?: string | undefined
}

const OTPInput: React.FC<OTPInputProps> = ({ onChange, label, error }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', ''])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value
    if (/^\d?$/.test(value)) {
      // Ensure only digits are entered
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      onChange(newOtp.join(''))

      // Focus next input if current is not empty and it's not the last input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text')
    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split('')
      setOtp(newOtp)
      onChange(pasteData)
      // Focus the last input
      const lastInput = document.getElementById(`otp-input-3`)
      lastInput?.focus()
    }
    e.preventDefault() // Prevent the default paste behavior
  }

  return (
    <div className="f-column-7">
      {label && <label>{label}</label>}
      <OTPClass className="f-row-10 justify-content-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            onPaste={handlePaste} // Add paste handler
            maxLength={1}
            style={{ height: '70px' }}
          />
        ))}
      </OTPClass>
      {!!error && (
        <>
          <TextPrompt prompt={error} status={false} />
        </>
      )}
    </div>
  )
}

export default OTPInput

const OTPClass = styled.div`
  input {
    width: 100%;
    height: 3.125rem;
    background: none;
    border: 1px solid #a1a1a1;
    border-radius: 0.1875rem;
    text-align: center;
    box-shadow: none;
    box-sizing: border-box;
    outline: none;
    &::placeholder {
      color: #a1a1a1;
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
    }
    &:focus {
      &.is-error {
        border: 1px solid #f56e9d;
      }
    }
    &.is-error {
      border: 1px solid #f56e9d;
      margin-bottom: 0.81rem;
    }
    &.isonlyview {
      padding-left: 0;
      border: none;
    }
  }
`
