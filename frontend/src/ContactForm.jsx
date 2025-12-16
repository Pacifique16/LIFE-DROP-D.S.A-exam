import { useState } from 'react'
import { renderErrorBox } from './validation.jsx'

function ContactForm() {
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
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select inquiry type'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you within 24 hours.')
        setFormData({ name: '', email: '', subject: '', message: '', inquiryType: '' })
        setIsSubmitting(false)
      }, 1000)
    }
  }

  return (
    <section style={{ padding: '80px 0', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>
            CONTACT US
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Get in touch with us. We're here to help and answer any questions you might have.
          </p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                Inquiry Type <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <select 
                value={formData.inquiryType}
                onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                style={getInputStyle('inquiryType')}
              >
                <option value="">Select inquiry type</option>
                <option value="general">General Information</option>
                <option value="donor">Donor Support</option>
                <option value="hospital">Hospital Registration</option>
                <option value="technical">Technical Support</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="emergency">Emergency Blood Request</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Full Name <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={getInputStyle('name')}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Email Address <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={getInputStyle('email')}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                Subject <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input 
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                style={getInputStyle('subject')}
                placeholder="Brief description of your inquiry"
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                Message <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <textarea 
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                style={{ ...getInputStyle('message'), height: '120px', resize: 'vertical' }}
                placeholder="Please provide detailed information about your inquiry..."
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
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>

          <div style={{ 
            marginTop: '40px', 
            paddingTop: '30px', 
            borderTop: '1px solid #e0e0e0',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>📧</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Email</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>support@lifedrop.org</p>
            </div>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>📞</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Phone</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>+250 789 534 491</p>
            </div>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>⏰</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Response Time</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm