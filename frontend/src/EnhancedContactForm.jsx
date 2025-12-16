import { useState } from 'react'
import { renderErrorBox } from './validation.jsx'

function EnhancedContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
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
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you within 24 hours.')
        setFormData({ name: '', email: '', subject: '', message: '', inquiryType: '' })
        setIsSubmitting(false)
      }, 1000)
    }
  }

  return (
    <div className="hover-card" style={{ 
      background: '#f5f5f5',
      padding: '40px',
      borderRadius: '12px'
    }}>
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: '#701C45',
        marginBottom: '24px'
      }}>
        Send us a Message
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <select 
            value={formData.inquiryType}
            onChange={(e) => handleInputChange('inquiryType', e.target.value)}
            style={getInputStyle('inquiryType')}
          >
            <option value="">Select inquiry type (optional)</option>
            <option value="general">General Information</option>
            <option value="donor">Donor Support</option>
            <option value="hospital">Hospital Registration</option>
            <option value="technical">Technical Support</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="emergency">Emergency Blood Request</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <input 
            type="text"
            placeholder="Your Name *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={getInputStyle('name')}
          />
          <input 
            type="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={getInputStyle('email')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text"
            placeholder="Subject *"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            style={getInputStyle('subject')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <textarea 
            placeholder="Your Message *"
            rows="5"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            style={{ ...getInputStyle('message'), resize: 'vertical' }}
          />
        </div>

        {renderErrorBox(errors)}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="hover-glow"
          style={{ 
            background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, #701C45 0%, #8B2A5B 100%)',
            color: 'white', 
            padding: '16px 32px', 
            borderRadius: '8px', 
            border: 'none', 
            fontSize: '16px', 
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            width: '100%',
            boxShadow: '0 6px 20px rgba(112, 28, 69, 0.3)',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

export default EnhancedContactForm