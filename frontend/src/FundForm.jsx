import { useState } from 'react'
import { validateStep1, validateStep2, validateStep3, renderErrorBox } from './validation.jsx'

function FundForm() {
  const [fundFormStep, setFundFormStep] = useState(1)
  const [fundFormData, setFundFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    donationAmount: '',
    customAmount: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: 'Rwanda'
  })
  const [fundFormErrors, setFundFormErrors] = useState({})

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px 16px',
    border: `2px solid ${fundFormErrors[fieldName] ? '#e74c3c' : '#e0e0e0'}`,
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    boxShadow: fundFormErrors[fieldName] ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : 'none'
  })

  const handleFundFormInputChange = (field, value) => {
    setFundFormData(prev => ({ ...prev, [field]: value }))
    if (fundFormErrors[field]) {
      setFundFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFundFormNext = () => {
    let errors = {}
    
    if (fundFormStep === 1) {
      errors = validateStep1(fundFormData)
    } else if (fundFormStep === 2) {
      errors = validateStep2(fundFormData)
    }
    
    console.log('Validation errors:', errors)
    console.log('Form data:', fundFormData)
    setFundFormErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      setFundFormStep(prev => prev + 1)
    }
  }

  const handleFundFormPrevious = () => {
    setFundFormStep(prev => prev - 1)
    setFundFormErrors({})
  }

  const handleFundFormSubmit = () => {
    const errors = validateStep3(fundFormData)
    setFundFormErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      alert('Thank you for your donation!')
      setFundFormStep(1)
      setFundFormData({
        firstName: '',
        lastName: '',
        email: '',
        donationAmount: '',
        customAmount: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        country: 'Rwanda'
      })
      setFundFormErrors({})
    }
  }

  return (
    <section style={{ padding: '80px 0', background: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#701C45',
          marginBottom: '24px'
        }}>
          FUND OUR MISSION
        </h2>
        <p style={{ 
          fontSize: '16px', 
          color: '#666', 
          marginBottom: '60px',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          Be the reason someone gets a second chance at life. Help us build a world where no woman, child, or accident victim loses the fight because of a lack of blood. Together, we can make survival the norm — not the exception.
        </p>
        
        <div style={{ 
          textAlign: 'left', 
          maxWidth: '500px', 
          margin: '0 auto',
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
              Step {fundFormStep} of 3
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            background: '#e0e0e0', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '40px'
          }}>
            <div style={{ 
              width: `${(fundFormStep / 3) * 100}%`, 
              height: '100%', 
              background: '#4CAF50',
              transition: 'width 0.3s ease'
            }}></div>
          </div>

          {fundFormStep === 1 && (
            <>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Name <span style={{ color: '#e74c3c' }}>(Required)</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>First</label>
                    <input 
                      type="text"
                      value={fundFormData.firstName}
                      onChange={(e) => handleFundFormInputChange('firstName', e.target.value)}
                      style={getInputStyle('firstName')}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>Last</label>
                    <input 
                      type="text"
                      value={fundFormData.lastName}
                      onChange={(e) => handleFundFormInputChange('lastName', e.target.value)}
                      style={getInputStyle('lastName')}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Email <span style={{ color: '#e74c3c' }}>(Required)</span>
                </label>
                <input 
                  type="email"
                  value={fundFormData.email}
                  onChange={(e) => handleFundFormInputChange('email', e.target.value)}
                  style={getInputStyle('email')}
                />
              </div>

              {renderErrorBox(fundFormErrors)}
              {Object.keys(fundFormErrors).length > 0 && (
                <div style={{ color: '#e74c3c', marginBottom: '16px', fontSize: '14px' }}>
                  Please fill in all required fields
                </div>
              )}

              <button 
                onClick={handleFundFormNext}
                style={{ 
                  background: '#701C45',
                  color: 'white', 
                  padding: '16px 32px', 
                  borderRadius: '25px', 
                  border: 'none', 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Next
              </button>
            </>
          )}

          {fundFormStep === 2 && (
            <>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Donation Amount <span style={{ color: '#e74c3c' }}>(Required)</span>
                </label>
                <div style={{ 
                  marginBottom: '16px',
                  border: fundFormErrors.donationAmount ? '2px solid #e74c3c' : '2px solid transparent',
                  borderRadius: '8px',
                  padding: '8px'
                }}>
                  {['10', '50', '250'].map(amount => (
                    <label key={amount} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="donationAmount" 
                        value={amount}
                        checked={fundFormData.donationAmount === amount}
                        onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                        style={{ marginRight: '8px' }}
                      />
                      ${amount} USD
                    </label>
                  ))}
                  <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="donationAmount" 
                      value="custom"
                      checked={fundFormData.donationAmount === 'custom'}
                      onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                      style={{ marginRight: '8px' }}
                    />
                    Other amount
                  </label>
                </div>
                {fundFormData.donationAmount === 'custom' && (
                  <input 
                    type="number"
                    placeholder="Enter amount"
                    value={fundFormData.customAmount}
                    onChange={(e) => handleFundFormInputChange('customAmount', e.target.value)}
                    style={getInputStyle('customAmount')}
                  />
                )}
              </div>

              {renderErrorBox(fundFormErrors)}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={handleFundFormPrevious}
                  style={{ 
                    background: '#6c757d',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '25px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Previous
                </button>
                <button 
                  onClick={handleFundFormNext}
                  style={{ 
                    background: '#701C45',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '25px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {fundFormStep === 3 && (
            <>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Credit Card <span style={{ color: '#e74c3c' }}>(Required)</span>
                </label>
                <div style={{ marginBottom: '16px' }}>
                  <input 
                    type="text"
                    placeholder="Card number"
                    value={fundFormData.cardNumber}
                    onChange={(e) => handleFundFormInputChange('cardNumber', e.target.value)}
                    style={{
                      ...getInputStyle('cardNumber'),
                      marginBottom: '16px'
                    }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input 
                      type="text"
                      placeholder="MM/YY"
                      value={fundFormData.expirationDate}
                      onChange={(e) => handleFundFormInputChange('expirationDate', e.target.value)}
                      style={getInputStyle('expirationDate')}
                    />
                    <input 
                      type="text"
                      placeholder="CVC"
                      value={fundFormData.securityCode}
                      onChange={(e) => handleFundFormInputChange('securityCode', e.target.value)}
                      style={getInputStyle('securityCode')}
                    />
                  </div>
                </div>
                <select 
                  value={fundFormData.country}
                  onChange={(e) => handleFundFormInputChange('country', e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '2px solid #e0e0e0', 
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Rwanda">Rwanda</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                </select>
              </div>

              {renderErrorBox(fundFormErrors)}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={handleFundFormPrevious}
                  style={{ 
                    background: '#6c757d',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '25px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Previous
                </button>
                <button 
                  onClick={handleFundFormSubmit}
                  style={{ 
                    background: '#701C45',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '25px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default FundForm