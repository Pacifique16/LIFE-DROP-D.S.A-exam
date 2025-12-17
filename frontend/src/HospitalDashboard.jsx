import React, { useState, useEffect } from 'react'

const HospitalDashboard = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)
  const [showNewRequestForm, setShowNewRequestForm] = useState(false)
  const [showEmergencyForm, setShowEmergencyForm] = useState(false)
  const [showDonorSearch, setShowDonorSearch] = useState(false)
  const [requestData, setRequestData] = useState({ bloodType: '', units: '', priority: 'Normal', reason: '' })
  const [bloodRequests, setBloodRequests] = useState([])
  const [donorSearchFilters, setDonorSearchFilters] = useState({ bloodType: '', location: '', availability: 'All' })
  const [searchResults, setSearchResults] = useState([])
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [scheduledDonations, setScheduledDonations] = useState([
    { id: 1, donor: 'John Doe', bloodType: 'O+', date: '2024-02-10', time: '10:00 AM - 11:00 AM', status: 'Confirmed', phone: '+250 789 123 456' },
    { id: 2, donor: 'Jane Smith', bloodType: 'A-', date: '2024-02-12', time: '2:00 PM - 3:00 PM', status: 'Confirmed', phone: '+250 787 987 654' },
    { id: 3, donor: 'Mike Johnson', bloodType: 'B+', date: '2024-02-15', time: '9:00 AM - 10:00 AM', status: 'Pending', phone: '+254 712 345 678' }
  ])
  
  // Extract hospital name from email
  const hospitalName = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1) + ' Hospital'

  const hospitalStats = {
    totalRequests: 156,
    pendingRequests: 8,
    fulfilledRequests: 148,
    emergencyRequests: 3,
    bloodInventory: 245,
    criticalLevels: 2
  }

  const [bloodInventory, setBloodInventory] = useState([
    { type: 'A+', units: 45, status: 'Good', color: '#4CAF50', expiringSoon: 2, lastUpdated: '2024-02-01 14:30' },
    { type: 'A-', units: 12, status: 'Low', color: '#FF9800', expiringSoon: 1, lastUpdated: '2024-02-01 14:30' },
    { type: 'B+', units: 38, status: 'Good', color: '#4CAF50', expiringSoon: 0, lastUpdated: '2024-02-01 14:30' },
    { type: 'B-', units: 8, status: 'Critical', color: '#F44336', expiringSoon: 3, lastUpdated: '2024-02-01 14:30' },
    { type: 'AB+', units: 15, status: 'Low', color: '#FF9800', expiringSoon: 1, lastUpdated: '2024-02-01 14:30' },
    { type: 'AB-', units: 5, status: 'Critical', color: '#F44336', expiringSoon: 2, lastUpdated: '2024-02-01 14:30' },
    { type: 'O+', units: 67, status: 'Good', color: '#4CAF50', expiringSoon: 1, lastUpdated: '2024-02-01 14:30' },
    { type: 'O-', units: 55, status: 'Good', color: '#4CAF50', expiringSoon: 0, lastUpdated: '2024-02-01 14:30' }
  ])
  
  const [availableDonors, setAvailableDonors] = useState([
    { id: 1, name: 'John Doe', bloodType: 'O+', location: 'Kigali', distance: '2.5 km', lastDonation: '2023-11-15', compatibility: 95, available: true },
    { id: 2, name: 'Jane Smith', bloodType: 'A-', location: 'Kigali', distance: '4.1 km', lastDonation: '2023-10-20', compatibility: 88, available: true },
    { id: 3, name: 'Mike Johnson', bloodType: 'B+', location: 'Nyanza', distance: '15.2 km', lastDonation: '2023-12-01', compatibility: 92, available: false },
    { id: 4, name: 'Sarah Wilson', bloodType: 'O-', location: 'Kigali', distance: '1.8 km', lastDonation: '2023-09-30', compatibility: 98, available: true }
  ])
  
  const [bloodUsageAnalytics, setBloodUsageAnalytics] = useState([
    { type: 'O+', used: 23, received: 28, trend: 'up' },
    { type: 'A+', used: 18, received: 22, trend: 'up' },
    { type: 'B+', used: 12, received: 15, trend: 'stable' },
    { type: 'AB+', used: 8, received: 9, trend: 'down' },
    { type: 'O-', used: 15, received: 18, trend: 'up' },
    { type: 'A-', used: 9, received: 7, trend: 'down' },
    { type: 'B-', used: 5, received: 6, trend: 'stable' },
    { type: 'AB-', used: 3, received: 2, trend: 'down' }
  ])

  const handleNewRequest = () => {
    setShowNewRequestForm(true)
    setRequestData({ ...requestData, priority: 'Normal' })
  }

  const handleEmergencyRequest = () => {
    setShowEmergencyForm(true)
    setRequestData({ ...requestData, priority: 'Emergency' })
  }

  const handleViewInventory = () => {
    setActiveTab('inventory')
  }

  const handleSubmitRequest = () => {
    if (!requestData.bloodType || !requestData.units || !requestData.reason) {
      alert('Please fill in all fields')
      return
    }
    const newRequest = {
      id: Date.now(),
      type: requestData.bloodType,
      units: parseInt(requestData.units),
      priority: requestData.priority,
      status: 'Pending',
      time: 'Just now',
      reason: requestData.reason
    }
    setBloodRequests(prev => [newRequest, ...prev])
    setShowNewRequestForm(false)
    setShowEmergencyForm(false)
    setRequestData({ bloodType: '', units: '', priority: 'Normal', reason: '' })
    alert('Blood request submitted successfully!')
  }

  const handleMarkAsFulfilled = (requestId) => {
    setBloodRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'Fulfilled' }
          : request
      )
    )
    // Also update recentRequests if the request exists there
    setRecentRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'Fulfilled' }
          : request
      )
    )
  }

  const searchDonors = () => {
    const filtered = availableDonors.filter(donor => {
      const matchesBloodType = !donorSearchFilters.bloodType || donor.bloodType === donorSearchFilters.bloodType
      const matchesLocation = !donorSearchFilters.location || donor.location.toLowerCase().includes(donorSearchFilters.location.toLowerCase())
      const matchesAvailability = donorSearchFilters.availability === 'All' || 
        (donorSearchFilters.availability === 'Available' && donor.available) ||
        (donorSearchFilters.availability === 'Unavailable' && !donor.available)
      
      return matchesBloodType && matchesLocation && matchesAvailability
    })
    setSearchResults(filtered)
  }

  useEffect(() => {
    searchDonors()
  }, [donorSearchFilters])

  const notifyDonor = (donorId) => {
    const donor = availableDonors.find(d => d.id === donorId)
    setSelectedDonor(donor)
    setNotificationMessage('')
    setShowNotificationModal(true)
  }

  const sendNotification = () => {
    if (!notificationMessage.trim()) {
      alert('Please enter a message before sending.')
      return
    }
    alert(`Notification sent to ${selectedDonor.name}: "${notificationMessage}"`)
    setShowNotificationModal(false)
    setSelectedDonor(null)
    setNotificationMessage('')
  }

  const checkCriticalShortages = () => {
    return bloodInventory.filter(blood => blood.status === 'Critical')
  }

  const getReorderSuggestions = () => {
    return bloodInventory.filter(blood => blood.units < 20 || blood.status === 'Low' || blood.status === 'Critical')
  }

  // Simulate real-time inventory updates
  const updateInventory = (bloodType, change) => {
    setBloodInventory(prev => 
      prev.map(blood => 
        blood.type === bloodType 
          ? { 
              ...blood, 
              units: Math.max(0, blood.units + change),
              lastUpdated: new Date().toLocaleString(),
              status: (blood.units + change) < 10 ? 'Critical' : (blood.units + change) < 20 ? 'Low' : 'Good',
              color: (blood.units + change) < 10 ? '#F44336' : (blood.units + change) < 20 ? '#FF9800' : '#4CAF50'
            }
          : blood
      )
    )
  }

  const [recentRequests, setRecentRequests] = useState([
    { id: 1, type: 'A-', units: 3, priority: 'Emergency', status: 'Pending', time: '30 min ago' },
    { id: 2, type: 'O+', units: 5, priority: 'Urgent', status: 'Fulfilled', time: '2 hours ago' },
    { id: 3, type: 'B-', units: 2, priority: 'Emergency', status: 'Pending', time: '4 hours ago' },
    { id: 4, type: 'AB+', units: 1, priority: 'Normal', status: 'Fulfilled', time: '6 hours ago' }
  ])

  const TabButton = ({ id, label, isActive, onClick, badge }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: '12px 24px',
        background: isActive ? 'white' : 'transparent',
        color: isActive ? '#701C45' : 'white',
        border: `2px solid ${isActive ? 'white' : 'rgba(255,255,255,0.3)'}`,
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
    >
      {label}
      {badge > 0 && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          background: '#F44336',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          fontSize: '10px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid white'
        }}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )

  const StatCard = ({ title, value, subtitle, color }) => (
    <div style={{
      background: darkMode ? '#2d2d2d' : 'white',
      padding: '32px 24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`,
      textAlign: 'center',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ fontSize: '36px', fontWeight: '700', color: color, margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
        {value}
      </h3>
      <p style={{ fontSize: '16px', color: darkMode ? '#fff' : '#333', fontWeight: '600', margin: '0 0 8px 0' }}>{title}</p>
      {subtitle && <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0, lineHeight: '1.4' }}>{subtitle}</p>}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#1a1a1a' : 'rgb(112, 28, 69)' }}>
      {/* Header */}
      <header style={{
        background: darkMode ? '#2d2d2d' : 'white',
        padding: '16px 24px',
        borderBottom: `1px solid ${darkMode ? '#404040' : '#e0e0e0'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#fff' : '#701C45', margin: 0 }}>
            Hospital Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Welcome back, {hospitalName}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: darkMode ? '#404040' : '#f0f0f0',
              color: darkMode ? '#fff' : '#333',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={onLogout}
            style={{
              background: 'rgb(112, 28, 69)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ padding: '24px' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <TabButton id="dashboard" label="Dashboard" isActive={activeTab === 'dashboard'} onClick={setActiveTab} />
          <TabButton id="inventory" label="Blood Inventory" isActive={activeTab === 'inventory'} onClick={setActiveTab} badge={bloodInventory.filter(b => b.status === 'Critical').length} />
          <TabButton id="requests" label="Blood Requests" isActive={activeTab === 'requests'} onClick={setActiveTab} badge={[...bloodRequests, ...recentRequests].filter(r => r.status === 'Pending').length} />
          <TabButton id="scheduled" label="Scheduled Donations" isActive={activeTab === 'scheduled'} onClick={setActiveTab} badge={scheduledDonations.filter(d => d.status === 'Pending').length} />
          <TabButton id="donors" label="Donor Search" isActive={activeTab === 'donors'} onClick={setActiveTab} badge={availableDonors.filter(d => d.available).length} />
          <TabButton id="analytics" label="Usage Analytics" isActive={activeTab === 'analytics'} onClick={setActiveTab} />
          <TabButton id="emergency" label="Emergency" isActive={activeTab === 'emergency'} onClick={setActiveTab} badge={[...bloodRequests, ...recentRequests].filter(r => r.priority === 'Emergency' && r.status === 'Pending').length} />
          <TabButton id="profile" label="Profile" isActive={activeTab === 'profile'} onClick={setActiveTab} />
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <StatCard 
                title="Total Requests" 
                value={hospitalStats.totalRequests} 
                subtitle="All time requests" 
                color="#2196F3" 
              />
              <StatCard 
                title="Pending Requests" 
                value={hospitalStats.pendingRequests} 
                subtitle="Awaiting fulfillment" 
                color="#FF9800" 
              />
              <StatCard 
                title="Emergency Requests" 
                value={hospitalStats.emergencyRequests} 
                subtitle="Critical priority" 
                color="#F44336" 
              />
              <StatCard 
                title="Blood Inventory" 
                value={hospitalStats.bloodInventory} 
                subtitle="Total units available" 
                color="#4CAF50" 
              />
            </div>

            {/* Quick Actions */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginBottom: '32px',
              border: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px', letterSpacing: '-0.3px' }}>
                Quick Actions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <button onClick={handleEmergencyRequest} style={{
                  background: '#F44336',
                  color: 'white',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)'
                }}>
                  Emergency Request
                </button>
                <button onClick={handleNewRequest} style={{
                  background: 'rgb(112, 28, 69)',
                  color: 'white',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(112, 28, 69, 0.3)'
                }}>
                  New Blood Request
                </button>
                <button onClick={handleViewInventory} style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                }}>
                  View Inventory
                </button>
              </div>
            </div>

            {/* Recent Requests */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
                Recent Blood Requests
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[...bloodRequests, ...recentRequests].map(request => (
                  <div key={request.id} style={{
                    padding: '16px',
                    background: darkMode ? '#404040' : '#f8f9fa',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${
                      request.priority === 'Emergency' ? '#F44336' :
                      request.priority === 'Urgent' ? '#FF9800' : '#4CAF50'
                    }`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 4px 0' }}>
                          {request.type} Blood - {request.units} units
                        </p>
                        <p style={{ color: darkMode ? '#ccc' : '#666', margin: 0, fontSize: '14px' }}>
                          Priority: {request.priority} • {request.time}
                        </p>
                        {request.reason && (
                          <p style={{ color: darkMode ? '#ccc' : '#666', margin: '4px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>
                            Reason: {request.reason}
                          </p>
                        )}
                      </div>
                      <span style={{
                        background: request.status === 'Fulfilled' ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Blood Type Inventory
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {bloodInventory.map(blood => (
                <div key={blood.type} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `2px solid ${blood.color}`,
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 8px 0' }}>
                    {blood.type}
                  </h3>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: blood.color, margin: '0 0 8px 0' }}>
                    {blood.units}
                  </p>
                  <p style={{ fontSize: '14px', margin: 0, color: darkMode ? '#ccc' : '#333' }}>units available</p>
                  <span style={{
                    background: blood.color,
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginTop: '8px',
                    display: 'inline-block'
                  }}>
                    {blood.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blood Requests Tab */}
        {activeTab === 'requests' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              All Blood Requests
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...bloodRequests, ...recentRequests].map(request => (
                <div key={request.id} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid ${
                    request.priority === 'Emergency' ? '#F44336' :
                    request.priority === 'Urgent' ? '#FF9800' : '#4CAF50'
                  }`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0', fontSize: '18px' }}>
                        {request.type} Blood Request
                      </h3>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>
                        Units Needed: {request.units}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Priority: {request.priority}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Requested: {request.time}
                      </p>
                      {request.reason && (
                        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          <strong>Reason:</strong> {request.reason}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'end' }}>
                      <span style={{
                        background: request.status === 'Fulfilled' ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {request.status}
                      </span>
                      {request.status === 'Pending' && (
                        <button onClick={() => handleMarkAsFulfilled(request.id)} style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}>
                          Mark as Fulfilled
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Donor Search Tab */}
        {activeTab === 'donors' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Donor Search
            </h2>
            
            {/* Search Filters */}
            <div style={{
              background: darkMode ? '#404040' : '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Blood Type</label>
                  <select 
                    value={donorSearchFilters.bloodType} 
                    onChange={(e) => setDonorSearchFilters({...donorSearchFilters, bloodType: e.target.value})}
                    style={{ width: '100%', padding: '8px', border: `1px solid ${darkMode ? '#555' : '#ddd'}`, borderRadius: '4px', background: darkMode ? '#333' : 'white', color: darkMode ? '#fff' : '#333' }}
                  >
                    <option value="">All Blood Types</option>
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
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Location</label>
                  <input 
                    type="text" 
                    value={donorSearchFilters.location} 
                    onChange={(e) => setDonorSearchFilters({...donorSearchFilters, location: e.target.value})}
                    placeholder="Enter location"
                    style={{ width: '100%', padding: '8px', border: `1px solid ${darkMode ? '#555' : '#ddd'}`, borderRadius: '4px', background: darkMode ? '#333' : 'white', color: darkMode ? '#fff' : '#333' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Availability</label>
                  <select 
                    value={donorSearchFilters.availability} 
                    onChange={(e) => setDonorSearchFilters({...donorSearchFilters, availability: e.target.value})}
                    style={{ width: '100%', padding: '8px', border: `1px solid ${darkMode ? '#555' : '#ddd'}`, borderRadius: '4px', background: darkMode ? '#333' : 'white', color: darkMode ? '#fff' : '#333' }}
                  >
                    <option value="All">All Donors</option>
                    <option value="Available">Available Only</option>
                    <option value="Unavailable">Unavailable Only</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Search Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(searchResults.length > 0 ? searchResults : availableDonors).map(donor => (
                <div key={donor.id} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid ${donor.available ? '#4CAF50' : '#F44336'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0', fontSize: '18px' }}>
                        {donor.name}
                      </h3>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: darkMode ? '#ccc' : '#666' }}>
                        Blood Type: <strong>{donor.bloodType}</strong>
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Location: {donor.location} ({donor.distance})
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Last Donation: {donor.lastDonation}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Compatibility Score: {donor.compatibility}%
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'end' }}>
                      <span style={{
                        background: donor.available ? '#4CAF50' : '#F44336',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {donor.available ? 'Available' : 'Unavailable'}
                      </span>
                      {donor.available && (
                        <button onClick={() => notifyDonor(donor.id)} style={{
                          background: '#FF9800',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}>
                          Notify Donor
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheduled Donations Tab */}
        {activeTab === 'scheduled' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Scheduled Donations
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {scheduledDonations.map(donation => (
                <div key={donation.id} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '12px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid ${donation.status === 'Confirmed' ? '#4CAF50' : '#FF9800'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0', fontSize: '18px' }}>
                        {donation.donor}
                      </h3>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: darkMode ? '#ccc' : '#666' }}>
                        Blood Type: <strong>{donation.bloodType}</strong>
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Date: {donation.date}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Time: {donation.time}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Phone: {donation.phone}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'end' }}>
                      <span style={{
                        background: donation.status === 'Confirmed' ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {donation.status}
                      </span>
                      {donation.status === 'Pending' && (
                        <button 
                          onClick={() => {
                            setScheduledDonations(prev => 
                              prev.map(d => 
                                d.id === donation.id ? {...d, status: 'Confirmed'} : d
                              )
                            )
                            alert(`Appointment confirmed for ${donation.donor}`)
                          }}
                          style={{
                            background: '#4CAF50',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Confirm
                        </button>
                      )}
                      <button 
                        onClick={() => window.open(`tel:${donation.phone}`, '_self')}
                        style={{
                          background: '#2196F3',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Call Donor
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Blood Usage Analytics
            </h2>
            
            {/* Analytics Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {bloodUsageAnalytics.map(blood => (
                <div key={blood.type} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '12px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 16px 0' }}>
                    {blood.type} Blood Type
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Units Used:</span>
                    <span style={{ fontWeight: 'bold', color: '#F44336' }}>{blood.used}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Units Received:</span>
                    <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{blood.received}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Net Balance:</span>
                    <span style={{ fontWeight: 'bold', color: blood.received - blood.used >= 0 ? '#4CAF50' : '#F44336' }}>
                      {blood.received - blood.used > 0 ? '+' : ''}{blood.received - blood.used}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Trend:</span>
                    <span style={{
                      background: blood.trend === 'up' ? '#4CAF50' : blood.trend === 'down' ? '#F44336' : '#FF9800',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {blood.trend === 'up' ? '↗ Increasing' : blood.trend === 'down' ? '↘ Decreasing' : '→ Stable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary Statistics */}
            <div style={{
              background: darkMode ? '#404040' : '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '16px' }}>
                Summary Statistics
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F44336', margin: '0 0 4px 0' }}>
                    {bloodUsageAnalytics.reduce((sum, blood) => sum + blood.used, 0)}
                  </p>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Total Units Used</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50', margin: '0 0 4px 0' }}>
                    {bloodUsageAnalytics.reduce((sum, blood) => sum + blood.received, 0)}
                  </p>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Total Units Received</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', margin: '0 0 4px 0' }}>
                    {bloodUsageAnalytics.filter(blood => blood.trend === 'up').length}
                  </p>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Increasing Trends</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800', margin: '0 0 4px 0' }}>
                    {bloodUsageAnalytics.filter(blood => blood.received - blood.used < 0).length}
                  </p>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Deficit Blood Types</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === 'emergency' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#F44336', marginBottom: '20px' }}>
              Emergency Blood Requests
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...bloodRequests, ...recentRequests]
                .filter(request => request.priority === 'Emergency')
                .map(request => (
                <div key={request.id} style={{
                  padding: '20px',
                  background: request.status === 'Fulfilled' ? (darkMode ? '#2d4a2d' : '#f0fff0') : (darkMode ? '#3d2d2d' : '#fff5f5'),
                  borderRadius: '8px',
                  border: `2px solid ${request.status === 'Fulfilled' ? '#4CAF50' : '#F44336'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ color: request.status === 'Fulfilled' ? '#4CAF50' : '#F44336', margin: '0 0 8px 0', fontSize: '18px' }}>
                        URGENT: {request.type} Blood - {request.units} units
                      </h3>
                      <p style={{ color: darkMode ? '#ccc' : '#666', margin: 0, fontSize: '14px' }}>
                        Requested: {request.time}
                      </p>
                      {request.reason && (
                        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          <strong>Emergency Reason:</strong> {request.reason}
                        </p>
                      )}
                    </div>
                    <span style={{
                      background: request.status === 'Fulfilled' ? '#4CAF50' : '#F44336',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
              {[...bloodRequests, ...recentRequests].filter(r => r.priority === 'Emergency').length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: darkMode ? '#ccc' : '#666' }}>
                  <p>No emergency requests at this time.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px', letterSpacing: '-0.3px' }}>
              Hospital Information
            </h2>
            
            {/* Hospital Name */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Hospital Name <span style={{ color: '#e74c3c' }}>*</span></label>
              <input type="text" defaultValue={hospitalName} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
            </div>
            
            {/* License Number and Facility Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>License Number <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="text" defaultValue="HL-2024-001" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Facility Type <span style={{ color: '#e74c3c' }}>*</span></label>
                <select defaultValue="Public Hospital" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
                  <option value="Public Hospital">Public Hospital</option>
                  <option value="Private Hospital">Private Hospital</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Health Center">Health Center</option>
                  <option value="Blood Bank">Blood Bank</option>
                </select>
              </div>
            </div>
            
            {/* Address */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Address <span style={{ color: '#e74c3c' }}>*</span></label>
              <textarea defaultValue="KN 4 Ave, Kigali, Rwanda\nComplete hospital address with postal code" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', minHeight: '80px', resize: 'vertical', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
            </div>
            
            {/* Contact Person */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Contact Person <span style={{ color: '#e74c3c' }}>*</span></label>
              <input type="text" defaultValue="Dr. John Doe - Chief Medical Officer" placeholder="Name and title of authorized person" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
            </div>
            
            {/* Personal Information Section */}
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '16px', marginTop: '32px', borderTop: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, paddingTop: '24px' }}>
              Personal Information
            </h3>
            
            {/* First Name, Last Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>First Name <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="text" defaultValue="Paccy" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Last Name <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="text" defaultValue="Admin" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
            </div>
            
            {/* Email and Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Email Address <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="email" defaultValue={userEmail} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Phone Number <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="tel" defaultValue="+250 788 123 456" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
            </div>
            
            {/* Country */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Country</label>
              <select defaultValue="Rwanda" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
                <option value="Rwanda">Rwanda</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
              </select>
            </div>
            
            <button onClick={() => alert('Profile updated successfully!')} style={{
              background: 'rgb(112, 28, 69)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(112, 28, 69, 0.3)'
            }}>
              Update Profile
            </button>
          </div>
        )}

        {/* New Request Modal */}
        {showNewRequestForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '32px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '500px'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px' }}>New Blood Request</h3>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Blood Type</label>
                <select value={requestData.bloodType} onChange={(e) => setRequestData({...requestData, bloodType: e.target.value})} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
                  <option value="">Select blood type</option>
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
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Units Needed</label>
                <input type="number" value={requestData.units} onChange={(e) => setRequestData({...requestData, units: e.target.value})} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} placeholder="Enter number of units" />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Reason for Request</label>
                <textarea value={requestData.reason} onChange={(e) => setRequestData({...requestData, reason: e.target.value})} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', minHeight: '80px', resize: 'vertical', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} placeholder="Describe the medical need" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={handleSubmitRequest} style={{
                  background: 'rgb(112, 28, 69)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Submit Request</button>
                <button onClick={() => setShowNewRequestForm(false)} style={{
                  background: '#6c757d',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Modal */}
        {showNotificationModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '32px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '500px'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '16px' }}>
                Notify Donor
              </h3>
              <p style={{ color: darkMode ? '#ccc' : '#666', marginBottom: '20px' }}>
                Sending notification to: <strong>{selectedDonor?.name}</strong> ({selectedDonor?.bloodType})
              </p>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Message</label>
                <textarea 
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter your message to the donor..."
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, 
                    borderRadius: '8px', 
                    fontSize: '16px', 
                    minHeight: '100px', 
                    resize: 'vertical',
                    background: darkMode ? '#404040' : 'white',
                    color: darkMode ? '#fff' : '#333'
                  }} 
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={sendNotification} style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Send Notification</button>
                <button onClick={() => setShowNotificationModal(false)} style={{
                  background: '#6c757d',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Request Modal */}
        {showEmergencyForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '32px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '500px',
              border: '3px solid #F44336'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#F44336', marginBottom: '24px' }}>Emergency Blood Request</h3>
              <div style={{ background: '#fff5f5', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #F44336' }}>
                <p style={{ color: '#F44336', margin: 0, fontSize: '14px', fontWeight: '600' }}>This is an emergency request and will be prioritized immediately.</p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Blood Type</label>
                <select value={requestData.bloodType} onChange={(e) => setRequestData({...requestData, bloodType: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #F44336', borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
                  <option value="">Select blood type</option>
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
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Units Needed</label>
                <input type="number" value={requestData.units} onChange={(e) => setRequestData({...requestData, units: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #F44336', borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} placeholder="Enter number of units" />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Emergency Reason</label>
                <textarea value={requestData.reason} onChange={(e) => setRequestData({...requestData, reason: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #F44336', borderRadius: '8px', fontSize: '16px', minHeight: '80px', resize: 'vertical', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} placeholder="Describe the emergency situation" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={handleSubmitRequest} style={{
                  background: '#F44336',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Submit Emergency Request</button>
                <button onClick={() => setShowEmergencyForm(false)} style={{
                  background: '#6c757d',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HospitalDashboard