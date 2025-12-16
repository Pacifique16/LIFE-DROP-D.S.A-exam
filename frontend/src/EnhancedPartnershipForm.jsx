import { useState } from 'react'
import { renderErrorBox } from './validation.jsx'

function EnhancedPartnershipForm() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactEmail: '',
    partnershipType: '',
    goals: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const validateForm = () => {
    const newErrors = {}
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required'
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email'
    }
    if (!formData.partnershipType) newErrors.partnershipType = 'Partnership type is required'
    if (!formData.goals.trim()) newErrors.goals = 'Partnership goals are required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        alert('Partnership request submitted successfully! Our team will review your application and contact you within 3-5 business days.')
        setFormData({ organizationName: '', contactEmail: '', partnershipType: '', goals: '' })
        setIsSubmitting(false)
      }, 1500)
    }
  }

  return (
    <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '24px' }}>
        Request Partnership
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
            Organization Name <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input 
            type="text"
            placeholder="Your organization name"
            value={formData.organizationName}
            onChange={(e) => handleInputChange('organizationName', e.target.value)}
            style={getInputStyle('organizationName')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
            Contact Email <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input 
            type="email"
            placeholder="contact@organization.com"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            style={getInputStyle('contactEmail')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
            Partnership Type <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <select 
            value={formData.partnershipType}
            onChange={(e) => handleInputChange('partnershipType', e.target.value)}
            style={getInputStyle('partnershipType')}
          >
            <option value="">Select partnership type</option>
            <option value="Healthcare Institution">Healthcare Institution</option>
            <option value="Government Agency">Government Agency</option>
            <option value="Technology Partner">Technology Partner</option>
            <option value="NGO/Non-Profit">NGO/Non-Profit</option>
            <option value="Corporate Sponsor">Corporate Sponsor</option>
            <option value="Research Institution">Research Institution</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
            Partnership Goals & Requirements <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <textarea 
            placeholder="Describe your partnership goals, expected outcomes, and how you plan to collaborate with LIFE DROP..."
            rows="4"
            value={formData.goals}
            onChange={(e) => handleInputChange('goals', e.target.value)}
            style={{ ...getInputStyle('goals'), resize: 'vertical' }}
          />
        </div>

        {renderErrorBox(errors)}

        <button 
          type="submit"
          disabled={isSubmitting}
          style={{ 
            background: isSubmitting ? '#ccc' : '#701C45',
            color: 'white', 
            padding: '16px 32px', 
            borderRadius: '8px', 
            border: 'none', 
            fontSize: '16px', 
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? 'Submitting Request...' : 'Submit Partnership Request'}
        </button>
      </form>

      <div style={{ 
        marginTop: '20px', 
        padding: '16px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong style={{ color: '#701C45' }}>Next Steps:</strong> Our partnership team will review your application and schedule a consultation call within 3-5 business days.
      </div>
    </div>
  )
}

export default EnhancedPartnershipForm