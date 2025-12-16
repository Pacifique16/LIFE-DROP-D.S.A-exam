import { useState } from 'react'
import { renderErrorBox } from './validation.jsx'

function EnhancedEventPartnershipForm() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactEmail: '',
    preferredDate: '',
    eventDetails: '',
    expectedAttendees: '',
    location: '',
    contactPerson: ''
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
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required'
    if (!formData.location.trim()) newErrors.location = 'Event location is required'
    if (!formData.expectedAttendees) newErrors.expectedAttendees = 'Expected attendees is required'
    if (!formData.eventDetails.trim()) newErrors.eventDetails = 'Event details are required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        alert('Event partnership request submitted successfully! Our events team will contact you within 2-3 business days to discuss logistics.')
        setFormData({
          organizationName: '', contactEmail: '', preferredDate: '', eventDetails: '',
          expectedAttendees: '', location: '', contactPerson: ''
        })
        setIsSubmitting(false)
      }, 1500)
    }
  }

  return (
    <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '24px' }}>
        Request Event Partnership
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
              Organization Name <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <input 
              type="text"
              placeholder="Organization name"
              value={formData.organizationName}
              onChange={(e) => handleInputChange('organizationName', e.target.value)}
              style={getInputStyle('organizationName')}
            />
          </div>
          <div>
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
              Contact Person <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <input 
              type="text"
              placeholder="Contact person name"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              style={getInputStyle('contactPerson')}
            />
          </div>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
              Preferred Date <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <input 
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              style={getInputStyle('preferredDate')}
            />
          </div>
          <div>
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
              Expected Attendees <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <select 
              value={formData.expectedAttendees}
              onChange={(e) => handleInputChange('expectedAttendees', e.target.value)}
              style={getInputStyle('expectedAttendees')}
            >
              <option value="">Select range</option>
              <option value="25-50">25-50 people</option>
              <option value="50-100">50-100 people</option>
              <option value="100-200">100-200 people</option>
              <option value="200-500">200-500 people</option>
              <option value="500+">500+ people</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
            Event Location <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input 
            type="text"
            placeholder="Complete address or venue name"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            style={getInputStyle('location')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
            Event Details <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <textarea 
            placeholder="Describe your event, target audience, facilities available, and any special requirements..."
            rows="4"
            value={formData.eventDetails}
            onChange={(e) => handleInputChange('eventDetails', e.target.value)}
            style={{ ...getInputStyle('eventDetails'), resize: 'vertical' }}
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
        background: '#f0f8ff', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong style={{ color: '#701C45' }}>What we provide:</strong> Mobile donation units, medical staff, promotional materials, and post-event impact reporting.
      </div>
    </div>
  )
}

export default EnhancedEventPartnershipForm