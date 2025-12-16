// Validation functions for Fund Our Mission form

export const validateStep1 = (formData) => {
  const errors = {}
  if (!formData.firstName.trim()) errors.firstName = 'First name is required'
  if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email format'
  }
  return errors
}

export const validateStep2 = (formData) => {
  const errors = {}
  if (!formData.donationAmount) {
    errors.donationAmount = 'Please select a donation amount'
  } else if (formData.donationAmount === 'custom') {
    if (!formData.customAmount || formData.customAmount.trim() === '') {
      errors.customAmount = 'Please enter a custom amount'
    } else if (parseFloat(formData.customAmount) <= 0) {
      errors.customAmount = 'Amount must be a positive number'
    }
  }
  return errors
}

export const validateStep3 = (formData) => {
  const errors = {}
  
  if (!formData.cardNumber.trim()) {
    errors.cardNumber = 'Card number is required'
  } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = 'Card number must be exactly 16 digits'
  }
  
  if (!formData.expirationDate.trim()) {
    errors.expirationDate = 'Expiration date is required'
  } else if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
    errors.expirationDate = 'Expiration date must be in MM/YY format'
  }
  
  if (!formData.securityCode.trim()) {
    errors.securityCode = 'Security code is required'
  } else if (!/^\d{3,4}$/.test(formData.securityCode)) {
    errors.securityCode = 'Security code must be 3-4 digits'
  }
  
  return errors
}

export const renderErrorBox = (errors) => {
  const errorMessages = Object.values(errors).filter(error => error)
  if (errorMessages.length === 0) return null
  
  return (
    <div style={{
      background: '#fff5f5',
      border: '2px solid #e74c3c',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px'
    }}>
      <div style={{ color: '#e74c3c', fontWeight: 'bold', marginBottom: '8px' }}>Kindly review the highlighted fields below:</div>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#e74c3c' }}>
        {errorMessages.map((error, index) => (
          <li key={index} style={{ marginBottom: '4px' }}>{error}</li>
        ))}
      </ul>
    </div>
  )
}