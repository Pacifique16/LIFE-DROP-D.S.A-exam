import { useState } from 'react'
import { renderErrorBox } from './validation.jsx'

function APIRequestForm() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    organizationType: '',
    integrationType: '',
    technicalContact: '',
    technicalEmail: '',
    projectDescription: '',
    expectedVolume: '',
    timeline: '',
    hasExperience: '',
    currentSystems: ''
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
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.organizationType) newErrors.organizationType = 'Organization type is required'
    if (!formData.integrationType) newErrors.integrationType = 'Integration type is required'
    if (!formData.technicalContact.trim()) newErrors.technicalContact = 'Technical contact is required'
    if (!formData.technicalEmail.trim()) {
      newErrors.technicalEmail = 'Technical email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.technicalEmail)) {
      newErrors.technicalEmail = 'Please enter a valid technical email'
    }
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required'
    if (!formData.expectedVolume) newErrors.expectedVolume = 'Expected volume is required'
    if (!formData.timeline) newErrors.timeline = 'Timeline is required'
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
        alert('API access request submitted successfully! Our technical team will review your request and contact you within 2-3 business days.')
        setFormData({
          organizationName: '', contactPerson: '', email: '', phone: '', organizationType: '',
          integrationType: '', technicalContact: '', technicalEmail: '', projectDescription: '',
          expectedVolume: '', timeline: '', hasExperience: '', currentSystems: ''
        })
        setIsSubmitting(false)
      }, 1500)
    }
  }

  return (
    <section style={{ padding: '80px 0', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>
            API ACCESS REQUEST
          </h1>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
            Request access to LIFE DROP's API for seamless integration with your healthcare systems
          </p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Organization Information */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>
                Organization Information
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Organization Name <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input 
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  style={getInputStyle('organizationName')}
                  placeholder="Your organization name"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Contact Person <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    style={getInputStyle('contactPerson')}
                    placeholder="Primary contact name"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Organization Type <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <select 
                    value={formData.organizationType}
                    onChange={(e) => handleInputChange('organizationType', e.target.value)}
                    style={getInputStyle('organizationType')}
                  >
                    <option value="">Select type</option>
                    <option value="hospital">Hospital</option>
                    <option value="clinic">Clinic</option>
                    <option value="blood-bank">Blood Bank</option>
                    <option value="health-ministry">Health Ministry</option>
                    <option value="software-company">Software Company</option>
                    <option value="ngo">NGO/Non-Profit</option>
                    <option value="research">Research Institution</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Email Address <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={getInputStyle('email')}
                    placeholder="contact@organization.com"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Phone Number <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={getInputStyle('phone')}
                    placeholder="+250 XXX XXX XXX"
                  />
                </div>
              </div>
            </div>

            {/* Technical Information */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>
                Technical Information
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Integration Type <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <select 
                  value={formData.integrationType}
                  onChange={(e) => handleInputChange('integrationType', e.target.value)}
                  style={getInputStyle('integrationType')}
                >
                  <option value="">Select integration type</option>
                  <option value="full-api">Full API Access</option>
                  <option value="blood-requests">Blood Requests Only</option>
                  <option value="donor-management">Donor Management</option>
                  <option value="inventory-sync">Inventory Synchronization</option>
                  <option value="notifications">Notifications & Alerts</option>
                  <option value="custom">Custom Integration</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Technical Contact <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData.technicalContact}
                    onChange={(e) => handleInputChange('technicalContact', e.target.value)}
                    style={getInputStyle('technicalContact')}
                    placeholder="Lead developer/IT manager"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Technical Email <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <input 
                    type="email"
                    value={formData.technicalEmail}
                    onChange={(e) => handleInputChange('technicalEmail', e.target.value)}
                    style={getInputStyle('technicalEmail')}
                    placeholder="tech@organization.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Current Systems
                </label>
                <textarea 
                  value={formData.currentSystems}
                  onChange={(e) => handleInputChange('currentSystems', e.target.value)}
                  style={{ ...getInputStyle('currentSystems'), height: '80px', resize: 'vertical' }}
                  placeholder="Describe your current healthcare management systems, databases, or platforms"
                />
              </div>
            </div>

            {/* Project Details */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>
                Project Details
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                  Project Description <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <textarea 
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  style={{ ...getInputStyle('projectDescription'), height: '100px', resize: 'vertical' }}
                  placeholder="Describe how you plan to use the LIFE DROP API and the expected benefits"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Expected API Volume <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <select 
                    value={formData.expectedVolume}
                    onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                    style={getInputStyle('expectedVolume')}
                  >
                    <option value="">Select volume</option>
                    <option value="low">Low (&lt; 1,000 requests/month)</option>
                    <option value="medium">Medium (1,000 - 10,000 requests/month)</option>
                    <option value="high">High (10,000 - 100,000 requests/month)</option>
                    <option value="enterprise">Enterprise (&gt; 100,000 requests/month)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>
                    Implementation Timeline <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <select 
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    style={getInputStyle('timeline')}
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (&lt; 1 month)</option>
                    <option value="short">Short-term (1-3 months)</option>
                    <option value="medium">Medium-term (3-6 months)</option>
                    <option value="long">Long-term (&gt; 6 months)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#666', marginBottom: '8px', display: 'block' }}>
                  API Integration Experience
                </label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="hasExperience" 
                      value="yes"
                      checked={formData.hasExperience === 'yes'}
                      onChange={(e) => handleInputChange('hasExperience', e.target.value)}
                      style={{ marginRight: '8px' }}
                    />
                    Yes, we have API integration experience
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="hasExperience" 
                      value="no"
                      checked={formData.hasExperience === 'no'}
                      onChange={(e) => handleInputChange('hasExperience', e.target.value)}
                      style={{ marginRight: '8px' }}
                    />
                    No, we need technical support
                  </label>
                </div>
              </div>
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
              {isSubmitting ? 'Submitting Request...' : 'Submit API Access Request'}
            </button>
          </form>

          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            fontSize: '14px',
            color: '#666'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>
              What happens next?
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Our technical team will review your request within 2-3 business days</li>
              <li>We'll schedule a technical consultation call to discuss your requirements</li>
              <li>You'll receive sandbox API credentials for testing and development</li>
              <li>After successful testing, production API access will be granted</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default APIRequestForm