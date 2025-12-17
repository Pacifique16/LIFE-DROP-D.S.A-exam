import React, { useState } from 'react'

const AdminDashboard = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterCountry, setFilterCountry] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [users, setUsers] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+250 789 123 456', type: 'Donor', bloodType: 'O+', dateOfBirth: '1990-05-15', weight: '70', country: 'Rwanda', status: 'Active', joined: '2024-01-15', lastActivity: '2024-02-01 10:30' },
    { id: 2, hospitalName: 'City Hospital', email: 'admin@cityhospital.com', phone: '+250 788 654 321', type: 'Hospital', licenseNumber: 'HL-2024-001', address: 'KN 4 Ave, Kigali', contactPerson: 'Dr. Smith', facilityType: 'Public Hospital', country: 'Rwanda', status: 'Active', joined: '2024-01-10', lastActivity: '2024-02-01 14:20' },
    { id: 3, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '+250 787 987 654', type: 'Donor', bloodType: 'A-', dateOfBirth: '1985-08-20', weight: '65', country: 'Rwanda', status: 'Inactive', joined: '2024-01-20', lastActivity: '2024-01-25 09:15' },
    { id: 4, firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', phone: '+254 712 345 678', type: 'Donor', bloodType: 'B+', dateOfBirth: '1992-03-10', weight: '75', country: 'Kenya', status: 'Active', joined: '2024-01-25', lastActivity: '2024-02-01 16:45' },
    { id: 5, hospitalName: 'Nairobi General', email: 'info@nairobigeneral.com', phone: '+254 711 987 654', type: 'Hospital', licenseNumber: 'HL-KE-2024-002', address: 'Uhuru Highway, Nairobi', contactPerson: 'Dr. Wanjiku', facilityType: 'Public Hospital', country: 'Kenya', status: 'Active', joined: '2024-01-12', lastActivity: '2024-02-01 11:30' }
  ])
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, user: 'John Doe', action: 'Profile Updated', timestamp: '2024-02-01 10:30', details: 'Updated phone number' },
    { id: 2, user: 'Admin', action: 'User Activated', timestamp: '2024-02-01 09:15', details: 'Activated Jane Smith account' },
    { id: 3, user: 'City Hospital', action: 'Blood Request', timestamp: '2024-02-01 08:45', details: 'Requested 3 units O+ blood' },
    { id: 4, user: 'Mike Johnson', action: 'Donation Completed', timestamp: '2024-01-31 16:20', details: 'Donated 1 unit B+ blood' }
  ])
  const [donations, setDonations] = useState([
    { id: 1, donor: 'John Doe', bloodType: 'O+', units: 1, date: '2024-02-01', location: 'City Hospital', status: 'Completed' },
    { id: 2, donor: 'Jane Smith', bloodType: 'A-', units: 1, date: '2024-01-28', location: 'Health Center', status: 'Completed' },
    { id: 3, donor: 'Mike Johnson', bloodType: 'B+', units: 1, date: '2024-02-03', location: 'Blood Bank', status: 'Pending' }
  ])
  const [bloodRequests, setBloodRequests] = useState([
    { id: 1, hospital: 'City Hospital', bloodType: 'O+', units: 3, priority: 'Emergency', status: 'Pending', date: '2024-02-05' },
    { id: 2, hospital: 'Health Center', bloodType: 'A-', units: 2, priority: 'Urgent', status: 'Fulfilled', date: '2024-02-04' },
    { id: 3, hospital: 'Emergency Center', bloodType: 'AB+', units: 1, priority: 'Normal', status: 'Pending', date: '2024-02-03' }
  ])
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [adminNotifications, setAdminNotifications] = useState([
    { id: 1, type: 'donation_scheduled', donor: 'John Doe', hospital: 'Kigali Central Hospital', date: '2024-02-15', time: '10:00 AM', timestamp: '2024-02-10 14:30', read: false },
    { id: 2, type: 'donation_scheduled', donor: 'Jane Smith', hospital: 'University Teaching Hospital', date: '2024-02-16', time: '2:00 PM', timestamp: '2024-02-10 16:45', read: false },
    { id: 3, type: 'donation_scheduled', donor: 'Mike Johnson', hospital: 'King Faisal Hospital', date: '2024-02-17', time: '11:00 AM', timestamp: '2024-02-11 09:20', read: true }
  ])

  const [showThankYouModal, setShowThankYouModal] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState(null)
  const [thankYouMessage, setThankYouMessage] = useState('')
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [logsViewed, setLogsViewed] = useState(false)
  const [fundingData, setFundingData] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', amount: 500, currency: 'USD', type: 'Individual', message: 'Keep up the great work saving lives!', date: '2024-02-10', status: 'Completed', thankYouSent: false },
    { id: 2, name: 'Tech Solutions Ltd', email: 'contact@techsolutions.com', amount: 2000, currency: 'USD', type: 'Corporate', message: 'Supporting healthcare innovation in East Africa', date: '2024-02-09', status: 'Completed', thankYouSent: true },
    { id: 3, name: 'Michael Chen', email: 'michael@example.com', amount: 250, currency: 'USD', type: 'Individual', message: 'Proud to support this mission', date: '2024-02-08', status: 'Completed', thankYouSent: false },
    { id: 4, name: 'Global Health Foundation', email: 'info@globalhealthfound.org', amount: 5000, currency: 'USD', type: 'Foundation', message: 'Expanding blood donation networks across Africa', date: '2024-02-07', status: 'Completed', thankYouSent: true },
    { id: 5, name: 'Dr. Emma Wilson', email: 'emma.wilson@hospital.com', amount: 750, currency: 'USD', type: 'Individual', message: 'As a healthcare professional, I believe in this cause', date: '2024-02-06', status: 'Completed', thankYouSent: false }
  ])
  const [formSubmissions, setFormSubmissions] = useState([
    { id: 1, type: 'Event Partnership', name: 'Rwanda Red Cross', email: 'events@redcross.rw', phone: '+250 788 123 456', organization: 'Rwanda Red Cross Society', eventType: 'Blood Drive Campaign', eventDate: '2024-03-15', location: 'Kigali Convention Centre', expectedParticipants: 500, message: 'We want to organize a large blood drive event in partnership with LifeDrop', date: '2024-02-10', status: 'Pending' },
    { id: 2, type: 'Partnership', name: 'Dr. James Mukamana', email: 'james@healthtech.rw', phone: '+250 787 654 321', organization: 'HealthTech Rwanda', partnershipType: 'Technology Integration', services: 'Mobile app integration, SMS notifications', message: 'Interested in integrating our health management system with LifeDrop platform', date: '2024-02-09', status: 'Under Review' },
    { id: 3, type: 'API Access', name: 'Alice Uwimana', email: 'alice@medisys.com', phone: '+250 786 987 654', organization: 'MediSys Solutions', apiPurpose: 'Hospital Management System Integration', technicalContact: 'dev@medisys.com', expectedUsage: 'High volume - 1000+ requests/day', message: 'We need API access to integrate blood inventory management with our HMS', date: '2024-02-08', status: 'Approved' },
    { id: 4, type: 'Contact Message', name: 'Peter Nkurunziza', email: 'peter@gmail.com', phone: '+250 785 456 789', subject: 'Blood Donation Process Inquiry', message: 'I am interested in becoming a regular blood donor. Can you provide more information about the donation process and requirements?', date: '2024-02-07', status: 'Responded' },
    { id: 5, type: 'Event Partnership', name: 'University of Rwanda', email: 'health@ur.ac.rw', phone: '+250 784 321 098', organization: 'University of Rwanda - School of Medicine', eventType: 'Student Health Fair', eventDate: '2024-04-20', location: 'UR Campus, Huye', expectedParticipants: 300, message: 'We would like to include blood donation awareness and collection in our annual health fair', date: '2024-02-06', status: 'Approved' }
  ])

  const handleEditUser = (userId) => {
    const user = users.find(u => u.id === userId)
    setEditingUser({ ...user })
    setShowEditModal(true)
  }

  const handleSaveUser = () => {
    setUsers(prev => 
      prev.map(user => 
        user.id === editingUser.id ? editingUser : user
      )
    )
    setShowEditModal(false)
    setEditingUser(null)
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setEditingUser(null)
  }

  const handleToggleUserStatus = (userId) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    )
  }

  const handleMarkDonationComplete = (donationId) => {
    setDonations(prev => 
      prev.map(donation => 
        donation.id === donationId 
          ? { ...donation, status: 'Completed' }
          : donation
      )
    )
  }

  const handleFulfillRequest = (requestId) => {
    setBloodRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'Fulfilled' }
          : request
      )
    )
  }

  const handleRejectRequest = (requestId) => {
    setBloodRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'Rejected' }
          : request
      )
    )
  }

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(direction)
  }

  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = 
        (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'All' || user.status === filterStatus
      const matchesCountry = filterCountry === 'All' || user.country === filterCountry
      const matchesType = filterType === 'All' || user.type === filterType
      
      return matchesSearch && matchesStatus && matchesCountry && matchesType
    })
    .sort((a, b) => {
      if (!sortField) return 0
      
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      if (sortField === 'name') {
        aValue = a.firstName ? `${a.firstName} ${a.lastName}` : a.hospitalName
        bValue = b.firstName ? `${b.firstName} ${b.lastName}` : b.hospitalName
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Type', 'Status', 'Country', 'Joined']
    const csvData = filteredAndSortedUsers.map(user => [
      user.firstName ? `${user.firstName} ${user.lastName}` : user.hospitalName,
      user.email,
      user.type,
      user.status,
      user.country,
      user.joined
    ])
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users_export.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const stats = {
    totalDonors: 1247,
    totalHospitals: 89,
    totalDonations: 3456,
    pendingRequests: 23,
    bloodUnits: 2890,
    emergencyRequests: 7
  }

  const donationTrends = [
    { month: 'Jan', donations: 280, requests: 45 },
    { month: 'Feb', donations: 320, requests: 52 },
    { month: 'Mar', donations: 290, requests: 48 },
    { month: 'Apr', donations: 350, requests: 58 },
    { month: 'May', donations: 380, requests: 62 },
    { month: 'Jun', donations: 420, requests: 68 }
  ]

  const bloodTypeDistribution = [
    { type: 'O+', count: 456, percentage: 38 },
    { type: 'A+', count: 336, percentage: 28 },
    { type: 'B+', count: 180, percentage: 15 },
    { type: 'AB+', count: 96, percentage: 8 },
    { type: 'O-', count: 72, percentage: 6 },
    { type: 'A-', count: 36, percentage: 3 },
    { type: 'B-', count: 18, percentage: 1.5 },
    { type: 'AB-', count: 6, percentage: 0.5 }
  ]

  const geographicData = [
    { country: 'Rwanda', donors: 650, hospitals: 45, donations: 1890 },
    { country: 'Kenya', donors: 420, hospitals: 28, donations: 1200 },
    { country: 'Uganda', donors: 177, hospitals: 16, donations: 366 }
  ]

  const recentActivities = [
    { id: 1, type: 'donation', user: 'John Doe', action: 'Donated O+ blood', time: '2 hours ago' },
    { id: 2, type: 'request', user: 'City Hospital', action: 'Requested 5 units A-', time: '4 hours ago' },
    { id: 3, type: 'registration', user: 'Jane Smith', action: 'Registered as donor', time: '6 hours ago' },
    { id: 4, type: 'emergency', user: 'Emergency Center', action: 'Emergency request for AB+', time: '8 hours ago' }
  ]

  const TabButton = ({ id, label, isActive, onClick, badge }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: '8px 12px',
        background: isActive ? 'white' : 'transparent',
        color: isActive ? '#701C45' : 'white',
        border: `2px solid ${isActive ? 'white' : 'rgba(255,255,255,0.3)'}`,
        borderRadius: '8px',
        fontSize: '12px',
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

  const StatCard = ({ title, value, color }) => (
    <div style={{
      background: darkMode ? '#2d2d2d' : 'white',
      padding: '16px 12px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`,
      textAlign: 'center',
      transition: 'all 0.3s ease',
      minWidth: '140px'
    }}>
      <h3 style={{ fontSize: '24px', fontWeight: '700', color: color, margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
        {value.toLocaleString()}
      </h3>
      <p style={{ fontSize: '12px', color: darkMode ? '#fff' : '#333', fontWeight: '600', margin: 0, lineHeight: '1.2' }}>{title}</p>
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
            LifeDrop Admin
          </h1>
          <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Welcome back, System Administrator</p>
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
          <TabButton id="overview" label="Overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />
          <TabButton id="users" label="User Management" isActive={activeTab === 'users'} onClick={setActiveTab} />
          <TabButton id="donations" label="Donations" isActive={activeTab === 'donations'} onClick={setActiveTab} badge={donations.filter(d => d.status === 'Pending').length} />
          <TabButton id="requests" label="Blood Requests" isActive={activeTab === 'requests'} onClick={setActiveTab} badge={bloodRequests.filter(r => r.status === 'Pending').length} />
          <TabButton id="notifications" label="Scheduled Donations" isActive={activeTab === 'notifications'} onClick={setActiveTab} badge={adminNotifications.filter(n => !n.read).length} />
          <TabButton id="funding" label="Mission Funding" isActive={activeTab === 'funding'} onClick={setActiveTab} badge={fundingData.filter(f => !f.thankYouSent).length} />
          <TabButton id="forms" label="Form Submissions" isActive={activeTab === 'forms'} onClick={setActiveTab} badge={formSubmissions.filter(f => f.status === 'Pending' || f.status === 'Under Review').length} />
          <TabButton id="analytics" label="Analytics" isActive={activeTab === 'analytics'} onClick={setActiveTab} />
          <TabButton id="logs" label="Activity Logs" isActive={activeTab === 'logs'} onClick={(id) => { setActiveTab(id); if (id === 'logs') setLogsViewed(true); }} badge={logsViewed ? 0 : activityLogs.length} />
          <TabButton id="profile" label="Profile" isActive={activeTab === 'profile'} onClick={setActiveTab} />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px',
              marginBottom: '30px'
            }}>
              <StatCard title="Total Donors" value={stats.totalDonors} color="#4CAF50" />
              <StatCard title="Total Hospitals" value={stats.totalHospitals} color="#2196F3" />
              <StatCard title="Total Donations" value={stats.totalDonations} color="#FF9800" />
              <StatCard title="Blood Units Available" value={stats.bloodUnits} color="#9C27B0" />
              <StatCard title="Pending Requests" value={stats.pendingRequests} color="#FFC107" />
              <StatCard title="Emergency Requests" value={stats.emergencyRequests} color="#F44336" />
            </div>

            {/* Recent Activities */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px', letterSpacing: '-0.3px' }}>
                Recent Activities
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivities.map(activity => (
                  <div key={activity.id} style={{
                    padding: '16px',
                    background: darkMode ? '#404040' : '#f8f9fa',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${
                      activity.type === 'donation' ? '#4CAF50' :
                      activity.type === 'request' ? '#2196F3' :
                      activity.type === 'emergency' ? '#F44336' : '#FF9800'
                    }`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 4px 0' }}>
                          {activity.user}
                        </p>
                        <p style={{ color: darkMode ? '#ccc' : '#666', margin: 0, fontSize: '14px' }}>
                          {activity.action}
                        </p>
                      </div>
                      <span style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#999' }}>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: 0 }}>
                User Management ({filteredAndSortedUsers.length})
              </h2>
              <button onClick={exportToCSV} style={{
                background: '#4CAF50',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Export CSV
              </button>
            </div>
            
            {/* Search and Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '12px',
                  border: `2px solid ${darkMode ? '#404040' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? '#404040' : 'white',
                  color: darkMode ? '#fff' : '#333'
                }}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  padding: '12px',
                  border: `2px solid ${darkMode ? '#404040' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? '#404040' : 'white',
                  color: darkMode ? '#fff' : '#333'
                }}
              >
                <option value="All">All Types</option>
                <option value="Donor">Donors</option>
                <option value="Hospital">Hospitals</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '12px',
                  border: `2px solid ${darkMode ? '#404040' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? '#404040' : 'white',
                  color: darkMode ? '#fff' : '#333'
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                style={{
                  padding: '12px',
                  border: `2px solid ${darkMode ? '#404040' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? '#404040' : 'white',
                  color: darkMode ? '#fff' : '#333'
                }}
              >
                <option value="All">All Countries</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
              </select>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: darkMode ? '#404040' : '#f8f9fa' }}>
                    <th onClick={() => handleSort('name')} style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>
                      Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('email')} style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>
                      Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('type')} style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>
                      Type {sortField === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('country')} style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>
                      Country {sortField === 'country' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('status')} style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>
                      Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('joined')} style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>
                      Joined {sortField === 'joined' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, color: darkMode ? '#fff' : '#333' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedUsers.map(user => (
                    <tr key={user.id}>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, color: darkMode ? '#fff' : '#333' }}>
                        {user.firstName ? `${user.firstName} ${user.lastName}` : user.hospitalName}
                      </td>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, color: darkMode ? '#fff' : '#333' }}>{user.email}</td>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, color: darkMode ? '#fff' : '#333' }}>{user.type}</td>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, color: darkMode ? '#fff' : '#333' }}>{user.country}</td>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${darkMode ? '#555' : '#e0e0e0'}` }}>
                        <span style={{
                          background: user.status === 'Active' ? '#4CAF50' : '#FF9800',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {user.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, color: darkMode ? '#fff' : '#333' }}>{user.joined}</td>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${darkMode ? '#555' : '#e0e0e0'}` }}>
                        <button onClick={() => handleEditUser(user.id)} style={{
                          background: '#701C45',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: 'pointer',
                          marginRight: '4px'
                        }}>
                          Edit
                        </button>
                        <button onClick={() => handleToggleUserStatus(user.id)} style={{
                          background: user.status === 'Active' ? '#F44336' : '#4CAF50',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}>
                          {user.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Donation Management
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {donations.map(donation => (
                <div key={donation.id} style={{
                  padding: '16px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid ${donation.status === 'Completed' ? '#4CAF50' : '#FF9800'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: darkMode ? '#fff' : '#333', margin: '0 0 8px 0' }}>{donation.donor}</h4>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Blood Type: {donation.bloodType} • Units: {donation.units} • Location: {donation.location}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: darkMode ? '#ccc' : '#999' }}>
                        Date: {donation.date}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        background: donation.status === 'Completed' ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {donation.status}
                      </span>
                      {donation.status === 'Pending' && (
                        <button onClick={() => handleMarkDonationComplete(donation.id)} style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}>
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
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
              Blood Request Management
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {bloodRequests.map(request => (
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
                        {request.hospital}
                      </h3>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>
                        {request.bloodType} Blood - {request.units} units needed
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Priority: {request.priority}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Requested: {request.date}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'end' }}>
                      <span style={{
                        background: request.status === 'Fulfilled' ? '#4CAF50' : request.status === 'Rejected' ? '#F44336' : '#FF9800',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {request.status}
                      </span>
                      {request.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleFulfillRequest(request.id)} style={{
                            background: '#4CAF50',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}>
                            Fulfill
                          </button>
                          <button onClick={() => handleRejectRequest(request.id)} style={{
                            background: '#F44336',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission Funding Tab */}
        {activeTab === 'funding' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: 0 }}>
                Mission Funding & Donations ({fundingData.length})
              </h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
                    ${fundingData.reduce((sum, fund) => sum + fund.amount, 0).toLocaleString()}
                  </p>
                  <p style={{ margin: 0, fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>Total Raised</p>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {fundingData.map(fund => (
                <div key={fund.id} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid ${
                    fund.type === 'Foundation' ? '#9C27B0' :
                    fund.type === 'Corporate' ? '#2196F3' : '#4CAF50'
                  }`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h3 style={{ color: darkMode ? '#fff' : '#701C45', margin: 0, fontSize: '18px' }}>
                          {fund.name}
                        </h3>
                        <span style={{
                          background: fund.type === 'Foundation' ? '#9C27B0' : fund.type === 'Corporate' ? '#2196F3' : '#4CAF50',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {fund.type}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: darkMode ? '#fff' : '#333' }}>
                        <strong>Amount:</strong> ${fund.amount.toLocaleString()} {fund.currency}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        <strong>Email:</strong> {fund.email}
                      </p>
                      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        <strong>Date:</strong> {fund.date}
                      </p>
                      {fund.message && (
                        <div style={{
                          background: darkMode ? '#333' : '#f0f8ff',
                          padding: '12px',
                          borderRadius: '6px',
                          marginTop: '8px',
                          borderLeft: '3px solid #2196F3'
                        }}>
                          <p style={{ margin: 0, fontSize: '14px', color: darkMode ? '#ccc' : '#666', fontStyle: 'italic' }}>
                            "{fund.message}"
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'end' }}>
                      <span style={{
                        background: fund.status === 'Completed' ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {fund.status}
                      </span>
                      <button 
                        onClick={() => {
                          setSelectedDonor(fund)
                          setThankYouMessage(`Dear ${fund.name},\n\nThank you so much for your generous donation of $${fund.amount} to support our mission at LifeDrop. Your contribution helps us save lives by connecting blood donors with hospitals across East Africa.\n\nYour support makes a real difference in our communities.\n\nWith gratitude,\nLifeDrop Team`)
                          setShowThankYouModal(true)
                        }}
                        disabled={fund.thankYouSent}
                        style={{
                          background: fund.thankYouSent ? '#ccc' : '#701C45',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: fund.thankYouSent ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {fund.thankYouSent ? 'Thank You Sent' : 'Send Thank You'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Funding Statistics */}
            <div style={{
              marginTop: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                background: darkMode ? '#404040' : '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50', margin: '0 0 8px 0' }}>
                  {fundingData.filter(f => f.type === 'Individual').length}
                </h4>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Individual Donors</p>
              </div>
              <div style={{
                background: darkMode ? '#404040' : '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', margin: '0 0 8px 0' }}>
                  {fundingData.filter(f => f.type === 'Corporate').length}
                </h4>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Corporate Partners</p>
              </div>
              <div style={{
                background: darkMode ? '#404040' : '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#9C27B0', margin: '0 0 8px 0' }}>
                  {fundingData.filter(f => f.type === 'Foundation').length}
                </h4>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Foundations</p>
              </div>
              <div style={{
                background: darkMode ? '#404040' : '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800', margin: '0 0 8px 0' }}>
                  ${Math.round(fundingData.reduce((sum, fund) => sum + fund.amount, 0) / fundingData.length).toLocaleString()}
                </h4>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Average Donation</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Submissions Tab */}
        {activeTab === 'forms' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: 0 }}>
                Form Submissions ({formSubmissions.length})
              </h2>
              <div style={{ display: 'flex', gap: '16px' }}>
                {['Event Partnership', 'Partnership', 'API Access', 'Contact Message'].map(type => (
                  <div key={type} style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#701C45' }}>
                      {formSubmissions.filter(f => f.type === type).length}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>{type}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {formSubmissions.map(submission => (
                <div key={submission.id} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid ${
                    submission.type === 'Event Partnership' ? '#4CAF50' :
                    submission.type === 'Partnership' ? '#2196F3' :
                    submission.type === 'API Access' ? '#FF9800' : '#9C27B0'
                  }`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h3 style={{ color: darkMode ? '#fff' : '#701C45', margin: 0, fontSize: '18px' }}>
                          {submission.name}
                        </h3>
                        <span style={{
                          background: submission.type === 'Event Partnership' ? '#4CAF50' : submission.type === 'Partnership' ? '#2196F3' : submission.type === 'API Access' ? '#FF9800' : '#9C27B0',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {submission.type}
                        </span>
                      </div>
                      
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        <strong>Email:</strong> {submission.email} • <strong>Phone:</strong> {submission.phone}
                      </p>
                      
                      {submission.organization && (
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          <strong>Organization:</strong> {submission.organization}
                        </p>
                      )}
                      
                      {submission.eventType && (
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          <strong>Event:</strong> {submission.eventType} • <strong>Date:</strong> {submission.eventDate} • <strong>Location:</strong> {submission.location}
                        </p>
                      )}
                      
                      {submission.partnershipType && (
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          <strong>Partnership Type:</strong> {submission.partnershipType}
                        </p>
                      )}
                      
                      {submission.apiPurpose && (
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          <strong>API Purpose:</strong> {submission.apiPurpose} • <strong>Usage:</strong> {submission.expectedUsage}
                        </p>
                      )}
                      
                      {submission.subject && (
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          <strong>Subject:</strong> {submission.subject}
                        </p>
                      )}
                      
                      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        <strong>Submitted:</strong> {submission.date}
                      </p>
                      
                      <div style={{
                        background: darkMode ? '#333' : '#f0f8ff',
                        padding: '12px',
                        borderRadius: '6px',
                        marginTop: '8px',
                        borderLeft: '3px solid #2196F3'
                      }}>
                        <p style={{ margin: 0, fontSize: '14px', color: darkMode ? '#ccc' : '#666', fontStyle: 'italic' }}>
                          "{submission.message}"
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'end' }}>
                      <span style={{
                        background: submission.status === 'Approved' ? '#4CAF50' : submission.status === 'Under Review' ? '#FF9800' : submission.status === 'Responded' ? '#2196F3' : '#FFC107',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {submission.status}
                      </span>
                      
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button 
                          onClick={() => {
                            setFormSubmissions(prev => 
                              prev.map(sub => 
                                sub.id === submission.id 
                                  ? { ...sub, status: 'Approved' }
                                  : sub
                              )
                            )
                            alert(`${submission.type} request from ${submission.name} has been approved!`)
                          }}
                          disabled={submission.status === 'Approved'}
                          style={{
                            background: submission.status === 'Approved' ? '#ccc' : '#4CAF50',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '10px',
                            cursor: submission.status === 'Approved' ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {submission.status === 'Approved' ? 'Approved' : 'Approve'}
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedSubmission(submission)
                            setReplyMessage(`Dear ${submission.name},\n\nThank you for your ${submission.type.toLowerCase()} submission. We have reviewed your request and will get back to you shortly with more details.\n\nBest regards,\nLifeDrop Team`)
                            setShowReplyModal(true)
                          }}
                          style={{
                            background: '#2196F3',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '10px',
                            cursor: 'pointer'
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            {/* Performance Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: darkMode ? '#2d2d2d' : 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50', margin: '0 0 8px 0' }}>85%</h3>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Donation Success Rate</p>
              </div>
              <div style={{
                background: darkMode ? '#2d2d2d' : 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', margin: '0 0 8px 0' }}>72%</h3>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Request Fulfillment Rate</p>
              </div>
              <div style={{
                background: darkMode ? '#2d2d2d' : 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800', margin: '0 0 8px 0' }}>4.2</h3>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Avg Response Time (hrs)</p>
              </div>
              <div style={{
                background: darkMode ? '#2d2d2d' : 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#9C27B0', margin: '0 0 8px 0' }}>92%</h3>
                <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>User Satisfaction</p>
              </div>
            </div>

            {/* Donation Trends Chart */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '16px' }}>
                Donation Trends (Last 6 Months)
              </h3>
              <div style={{ display: 'flex', alignItems: 'end', gap: '8px', height: '200px', padding: '20px 0' }}>
                {donationTrends.map((data, index) => (
                  <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      height: `${(data.donations / 500) * 150}px`,
                      background: 'linear-gradient(to top, #701C45, #8B2A5B)',
                      width: '100%',
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '8px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '12px',
                        color: darkMode ? '#fff' : '#333',
                        fontWeight: 'bold'
                      }}>
                        {data.donations}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '16px' }}>
                Geographic Distribution
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {geographicData.map(country => (
                  <div key={country.country} style={{
                    padding: '16px',
                    background: darkMode ? '#404040' : '#f8f9fa',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0' }}>
                      {country.country}
                    </h4>
                    <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: '0 0 4px 0' }}>
                      {country.donors} Donors
                    </p>
                    <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: '0 0 4px 0' }}>
                      {country.hospitals} Hospitals
                    </p>
                    <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>
                      {country.donations} Donations
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Analytics */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '16px' }}>
                Mission Funding Analytics
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  padding: '16px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '3px solid #4CAF50'
                }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50', margin: '0 0 8px 0' }}>
                    ${fundingData.reduce((sum, fund) => sum + fund.amount, 0).toLocaleString()}
                  </h4>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Total Raised</p>
                </div>
                <div style={{
                  padding: '16px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '3px solid #2196F3'
                }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2196F3', margin: '0 0 8px 0' }}>
                    {fundingData.length}
                  </h4>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Total Donors</p>
                </div>
                <div style={{
                  padding: '16px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '3px solid #FF9800'
                }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF9800', margin: '0 0 8px 0' }}>
                    ${Math.round(fundingData.reduce((sum, fund) => sum + fund.amount, 0) / fundingData.length).toLocaleString()}
                  </h4>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Avg Donation</p>
                </div>
                <div style={{
                  padding: '16px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '3px solid #9C27B0'
                }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#9C27B0', margin: '0 0 8px 0' }}>
                    {fundingData.filter(f => f.thankYouSent).length}/{fundingData.length}
                  </h4>
                  <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Thanked</p>
                </div>
              </div>
              
              {/* Funding by Type Chart */}
              <div style={{ display: 'flex', alignItems: 'end', gap: '8px', height: '150px', padding: '20px 0' }}>
                {[
                  { type: 'Individual', count: fundingData.filter(f => f.type === 'Individual').length, amount: fundingData.filter(f => f.type === 'Individual').reduce((sum, f) => sum + f.amount, 0), color: '#4CAF50' },
                  { type: 'Corporate', count: fundingData.filter(f => f.type === 'Corporate').length, amount: fundingData.filter(f => f.type === 'Corporate').reduce((sum, f) => sum + f.amount, 0), color: '#2196F3' },
                  { type: 'Foundation', count: fundingData.filter(f => f.type === 'Foundation').length, amount: fundingData.filter(f => f.type === 'Foundation').reduce((sum, f) => sum + f.amount, 0), color: '#9C27B0' }
                ].map((data, index) => (
                  <div key={data.type} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      height: `${(data.amount / Math.max(...fundingData.map(f => f.amount))) * 100}px`,
                      background: data.color,
                      width: '100%',
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '8px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '12px',
                        color: darkMode ? '#fff' : '#333',
                        fontWeight: 'bold'
                      }}>
                        ${data.amount.toLocaleString()}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666', textAlign: 'center' }}>
                      {data.type}<br/>({data.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blood Type Demand Analytics */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '16px' }}>
                Blood Type Demand Analytics
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {bloodTypeDistribution.map(blood => (
                  <div key={blood.type} style={{
                    padding: '16px',
                    background: darkMode ? '#404040' : '#f8f9fa',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: `3px solid ${blood.percentage > 20 ? '#4CAF50' : blood.percentage > 10 ? '#FF9800' : '#F44336'}`
                  }}>
                    <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0' }}>
                      {blood.type}
                    </h4>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: darkMode ? '#555' : '#e0e0e0',
                      borderRadius: '4px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: `${blood.percentage}%`,
                        height: '100%',
                        background: blood.percentage > 20 ? '#4CAF50' : blood.percentage > 10 ? '#FF9800' : '#F44336',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                    <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: '0 0 4px 0' }}>{blood.percentage}%</p>
                    <p style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>{blood.count} available</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scheduled Donations Notifications Tab */}
        {activeTab === 'notifications' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Donor Scheduling Notifications ({adminNotifications.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {adminNotifications.map(notification => (
                <div key={notification.id} style={{
                  padding: '20px',
                  background: notification.read ? (darkMode ? '#404040' : '#f8f9fa') : (darkMode ? '#3d2d2d' : '#fff5f5'),
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid ${notification.read ? '#4CAF50' : '#FF9800'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0', fontSize: '18px' }}>
                        📅 Donation Scheduled by {notification.donor}
                      </h3>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: darkMode ? '#fff' : '#333' }}>
                        <strong>Hospital:</strong> {notification.hospital}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: darkMode ? '#fff' : '#333' }}>
                        <strong>Date & Time:</strong> {notification.date} at {notification.time}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Received: {notification.timestamp}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'end' }}>
                      <span style={{
                        background: notification.read ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {notification.read ? 'Reviewed' : 'New'}
                      </span>
                      {!notification.read && (
                        <button 
                          onClick={() => {
                            setAdminNotifications(prev => 
                              prev.map(n => 
                                n.id === notification.id ? { ...n, read: true } : n
                              )
                            )
                          }}
                          style={{
                            background: '#4CAF50',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Mark as Reviewed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Logs Tab */}
        {activeTab === 'logs' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              User Activity Logs
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activityLogs.map(log => (
                <div key={log.id} style={{
                  padding: '16px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  borderLeft: `4px solid #701C45`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h4 style={{ color: darkMode ? '#fff' : '#701C45', margin: '0 0 4px 0', fontSize: '16px' }}>
                        {log.user}
                      </h4>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: darkMode ? '#fff' : '#333', fontWeight: 'bold' }}>
                        {log.action}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>
                        {log.details}
                      </p>
                    </div>
                    <span style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#999' }}>
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              ))}
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
              Administrator Profile
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>First Name</label>
                <input type="text" defaultValue="System" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Last Name</label>
                <input type="text" defaultValue="Administrator" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Email Address</label>
                <input type="email" defaultValue={userEmail} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                <input type="tel" defaultValue="+250 788 000 000" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Role</label>
                <input type="text" defaultValue="System Administrator" disabled style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#333' : '#f8f9fa', color: darkMode ? '#ccc' : '#666' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Department</label>
                <input type="text" defaultValue="IT Administration" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Office Address</label>
              <textarea defaultValue="LifeDrop Headquarters\nKN 5 Ave, Kigali, Rwanda" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', minHeight: '80px', resize: 'vertical', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
            </div>
            
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '16px', marginTop: '32px', borderTop: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, paddingTop: '24px' }}>
              Security Settings
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Current Password</label>
                <input type="password" placeholder="Enter current password" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>New Password</label>
                <input type="password" placeholder="Enter new password" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
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

        {/* Edit User Modal */}
        {showEditModal && editingUser && (
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
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px' }}>Edit {editingUser.type}</h3>
              
              {editingUser.type === 'Donor' ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>First Name</label>
                      <input 
                        type="text" 
                        value={editingUser.firstName || ''} 
                        onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Last Name</label>
                      <input 
                        type="text" 
                        value={editingUser.lastName || ''} 
                        onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Email</label>
                      <input 
                        type="email" 
                        value={editingUser.email || ''} 
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Phone</label>
                      <input 
                        type="tel" 
                        value={editingUser.phone || ''} 
                        onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Date of Birth</label>
                      <input 
                        type="date" 
                        value={editingUser.dateOfBirth || ''} 
                        onChange={(e) => setEditingUser({...editingUser, dateOfBirth: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Blood Type</label>
                      <select 
                        value={editingUser.bloodType || ''} 
                        onChange={(e) => setEditingUser({...editingUser, bloodType: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}
                      >
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
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Weight (kg)</label>
                      <input 
                        type="number" 
                        value={editingUser.weight || ''} 
                        onChange={(e) => setEditingUser({...editingUser, weight: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Country</label>
                      <select 
                        value={editingUser.country || 'Rwanda'} 
                        onChange={(e) => setEditingUser({...editingUser, country: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}
                      >
                        <option value="Rwanda">Rwanda</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Hospital Name</label>
                    <input 
                      type="text" 
                      value={editingUser.hospitalName || ''} 
                      onChange={(e) => setEditingUser({...editingUser, hospitalName: e.target.value})} 
                      style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>License Number</label>
                      <input 
                        type="text" 
                        value={editingUser.licenseNumber || ''} 
                        onChange={(e) => setEditingUser({...editingUser, licenseNumber: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Facility Type</label>
                      <select 
                        value={editingUser.facilityType || ''} 
                        onChange={(e) => setEditingUser({...editingUser, facilityType: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}
                      >
                        <option value="Public Hospital">Public Hospital</option>
                        <option value="Private Hospital">Private Hospital</option>
                        <option value="Clinic">Clinic</option>
                        <option value="Health Center">Health Center</option>
                        <option value="Blood Bank">Blood Bank</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Address</label>
                    <textarea 
                      value={editingUser.address || ''} 
                      onChange={(e) => setEditingUser({...editingUser, address: e.target.value})} 
                      style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', minHeight: '80px', resize: 'vertical', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Contact Person</label>
                      <input 
                        type="text" 
                        value={editingUser.contactPerson || ''} 
                        onChange={(e) => setEditingUser({...editingUser, contactPerson: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Email</label>
                      <input 
                        type="email" 
                        value={editingUser.email || ''} 
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Phone</label>
                      <input 
                        type="tel" 
                        value={editingUser.phone || ''} 
                        onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Country</label>
                      <select 
                        value={editingUser.country || 'Rwanda'} 
                        onChange={(e) => setEditingUser({...editingUser, country: e.target.value})} 
                        style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}
                      >
                        <option value="Rwanda">Rwanda</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Status</label>
                <select 
                  value={editingUser.status} 
                  onChange={(e) => setEditingUser({...editingUser, status: e.target.value})} 
                  style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleSaveUser} style={{
                  background: 'rgb(112, 28, 69)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Save Changes</button>
                <button onClick={handleCancelEdit} style={{
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



        {/* Thank You Modal */}
        {showThankYouModal && selectedDonor && (
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
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', margin: 0 }}>
                  Send Thank You Message
                </h3>
                <button onClick={() => setShowThankYouModal(false)} style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: darkMode ? '#ccc' : '#666'
                }}>×</button>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 8px 0' }}>
                  <strong>To:</strong> {selectedDonor.name} ({selectedDonor.email})
                </p>
                <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 16px 0' }}>
                  <strong>Donation:</strong> ${selectedDonor.amount} {selectedDonor.currency} - {selectedDonor.date}
                </p>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>
                  Thank You Message
                </label>
                <textarea 
                  value={thankYouMessage}
                  onChange={(e) => setThankYouMessage(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '12px',
                    border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    background: darkMode ? '#404040' : 'white',
                    color: darkMode ? '#fff' : '#333',
                    lineHeight: '1.5'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => {
                    setFundingData(prev => 
                      prev.map(fund => 
                        fund.id === selectedDonor.id 
                          ? { ...fund, thankYouSent: true }
                          : fund
                      )
                    )
                    alert(`Thank you message sent to ${selectedDonor.name} at ${selectedDonor.email}!\n\nMessage:\n${thankYouMessage}`)
                    setShowThankYouModal(false)
                    setSelectedDonor(null)
                    setThankYouMessage('')
                  }}
                  style={{
                    background: 'rgb(112, 28, 69)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Send Message
                </button>
                <button 
                  onClick={() => {
                    setShowThankYouModal(false)
                    setSelectedDonor(null)
                    setThankYouMessage('')
                  }}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedSubmission && (
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
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', margin: 0 }}>
                  Reply to {selectedSubmission.type}
                </h3>
                <button onClick={() => setShowReplyModal(false)} style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: darkMode ? '#ccc' : '#666'
                }}>×</button>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 8px 0' }}>
                  <strong>To:</strong> {selectedSubmission.name} ({selectedSubmission.email})
                </p>
                <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 16px 0' }}>
                  <strong>Regarding:</strong> {selectedSubmission.type} - {selectedSubmission.date}
                </p>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>
                  Reply Message
                </label>
                <textarea 
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '12px',
                    border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    background: darkMode ? '#404040' : 'white',
                    color: darkMode ? '#fff' : '#333',
                    lineHeight: '1.5'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => {
                    setFormSubmissions(prev => 
                      prev.map(sub => 
                        sub.id === selectedSubmission.id 
                          ? { ...sub, status: 'Responded' }
                          : sub
                      )
                    )
                    alert(`Reply sent to ${selectedSubmission.name} at ${selectedSubmission.email}!\n\nMessage:\n${replyMessage}`)
                    setShowReplyModal(false)
                    setSelectedSubmission(null)
                    setReplyMessage('')
                  }}
                  style={{
                    background: 'rgb(112, 28, 69)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Send Reply
                </button>
                <button 
                  onClick={() => {
                    setShowReplyModal(false)
                    setSelectedSubmission(null)
                    setReplyMessage('')
                  }}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard