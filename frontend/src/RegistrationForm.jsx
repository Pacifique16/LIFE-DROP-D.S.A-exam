import { useState } from 'react'
import { renderErrorBox } from './validation.jsx'

function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState('')
  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: 'Rwanda',
    
    // Donor specific
    dateOfBirth: '',
    bloodType: '',
    weight: '',
    medicalConditions: '',
    lastDonation: '',
    
    // Hospital specific
    hospitalName: '',
    licenseNumber: '',
    address: '',
    contactPerson: '',
    facilityType: ''
  })
  const [errors, setErrors] = useState({})

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px 16px',
    border: `2px solid ${errors[fieldName] ? '#e74c3c' : '#e0e0e0'}`,
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    boxShadow: errors[fieldName] ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : 'none'
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!userType) newErrors.userType = 'Please select account type'
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const validateStep3 = () => {
    const newErrors = {}
    if (userType === 'donor') {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.bloodType) newErrors.bloodType = 'Blood type is required'
      if (!formData.weight) newErrors.weight = 'Weight is required'
    } else if (userType === 'hospital') {
      if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required'
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required'
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'
      if (!formData.facilityType) newErrors.facilityType = 'Facility type is required'
    }
    return newErrors
  }

  const handleNext = () => {
    let newErrors = {}
    if (step === 1) newErrors = validateStep1()
    else if (step === 2) newErrors = validateStep2()
    else if (step === 3) newErrors = validateStep3()
    
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
    setErrors({})
  }

  const handleSubmit = () => {
    const newErrors = validateStep3()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      alert(`${userType === 'donor' ? 'Donor' : 'Hospital'} registration successful! Please check your email for verification.`)
      // Reset form
      setStep(1)
      setUserType('')
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', country: 'Rwanda',
        dateOfBirth: '', bloodType: '', weight: '', medicalConditions: '', lastDonation: '',
        hospitalName: '', licenseNumber: '', address: '', contactPerson: '', facilityType: ''
      })
      setErrors({})
    }
  }

  return (
    <section style={{ padding: '80px 0', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>
            JOIN LIFE DROP
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Create your account to start saving lives
          </p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45' }}>
                Step {step} of {userType ? '3' : '1'}
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: '#e0e0e0', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${(step / (userType ? 3 : 1)) * 100}%`, 
                height: '100%', 
                background: '#4CAF50',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>

          {step === 1 && (
            <>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '24px' }}>
                Select Account Type
              </h3>
              
              <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '20px', 
                  border: `2px solid ${userType === 'donor' ? '#701C45' : '#e0e0e0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  <input 
                    type="radio" 
                    name="userType" 
                    value="donor"
                    checked={userType === 'donor'}
                    onChange={(e) => setUserType(e.target.value)}
                    style={{ marginRight: '16px', transform: 'scale(1.2)' }}
                  />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '4px' }}>
                      Blood Donor
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Register to donate blood and save lives in your community
                    </div>
                  </div>
                </label>
                
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '20px', 
                  border: `2px solid ${userType === 'hospital' ? '#701C45' : '#e0e0e0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  <input 
                    type="radio" 
                    name="userType" 
                    value="hospital"
                    checked={userType === 'hospital'}
                    onChange={(e) => setUserType(e.target.value)}
                    style={{ marginRight: '16px', transform: 'scale(1.2)' }}
                  />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '4px' }}>
                      Hospital / Medical Facility
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Register your facility to request blood from our donor network
                    </div>
                  </div>
                </label>
              </div>

              {renderErrorBox(errors)}

              <button 
                onClick={handleNext}
                style={{ 
                  background: '#701C45',
                  color: 'white', 
                  padding: '16px 32px', 
                  borderRadius: '8px', 
                  border: 'none', 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '24px' }}>
                Personal Information
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    First Name <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    style={getInputStyle('firstName')}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Last Name <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    style={getInputStyle('lastName')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Email Address <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={getInputStyle('email')}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Phone Number <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={getInputStyle('phone')}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Password <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    style={getInputStyle('password')}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Confirm Password <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    style={getInputStyle('confirmPassword')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Country
                </label>
                <select 
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  style={getInputStyle('country')}
                >
                  <option value="Rwanda">Rwanda</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                </select>
              </div>

              {renderErrorBox(errors)}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={handlePrevious}
                  style={{ 
                    background: '#6c757d',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Previous
                </button>
                <button 
                  onClick={handleNext}
                  style={{ 
                    background: '#701C45',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && userType === 'donor' && (
            <>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '24px' }}>
                Medical Information
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Date of Birth <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    style={getInputStyle('dateOfBirth')}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Blood Type <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <select 
                    value={formData.bloodType}
                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                    style={getInputStyle('bloodType')}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Weight (kg) <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  style={getInputStyle('weight')}
                  placeholder="Minimum 50kg required"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Last Blood Donation (if any)
                </label>
                <input 
                  type="date"
                  value={formData.lastDonation}
                  onChange={(e) => handleInputChange('lastDonation', e.target.value)}
                  style={getInputStyle('lastDonation')}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Medical Conditions (if any)
                </label>
                <textarea 
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  style={{ ...getInputStyle('medicalConditions'), height: '80px', resize: 'vertical' }}
                  placeholder="List any medical conditions, medications, or recent illnesses"
                />
              </div>

              {renderErrorBox(errors)}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={handlePrevious}
                  style={{ 
                    background: '#6c757d',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Previous
                </button>
                <button 
                  onClick={handleSubmit}
                  style={{ 
                    background: '#701C45',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Complete Registration
                </button>
              </div>
            </>
          )}

          {step === 3 && userType === 'hospital' && (
            <>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '24px' }}>
                Hospital Information
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Hospital Name <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="text"
                  value={formData.hospitalName}
                  onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                  style={getInputStyle('hospitalName')}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    License Number <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    style={getInputStyle('licenseNumber')}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Facility Type <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <select 
                    value={formData.facilityType}
                    onChange={(e) => handleInputChange('facilityType', e.target.value)}
                    style={getInputStyle('facilityType')}
                  >
                    <option value="">Select Type</option>
                    <option value="Public Hospital">Public Hospital</option>
                    <option value="Private Hospital">Private Hospital</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Health Center">Health Center</option>
                    <option value="Blood Bank">Blood Bank</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Address <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  style={{ ...getInputStyle('address'), height: '80px', resize: 'vertical' }}
                  placeholder="Complete hospital address"
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Contact Person <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  style={getInputStyle('contactPerson')}
                  placeholder="Name and title of authorized person"
                />
              </div>

              {renderErrorBox(errors)}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={handlePrevious}
                  style={{ 
                    background: '#6c757d',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Previous
                </button>
                <button 
                  onClick={handleSubmit}
                  style={{ 
                    background: '#701C45',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Complete Registration
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default RegistrationForm