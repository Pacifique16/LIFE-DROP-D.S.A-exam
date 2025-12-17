import React, { useState } from 'react'

const DonorDashboard = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [showBloodDriveList, setShowBloodDriveList] = useState(false)
  const [showNotificationSettings, setShowNotificationSettings] = useState(false)
  const [showRewardsStore, setShowRewardsStore] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [scheduleData, setScheduleData] = useState({ date: '', time: '', location: '' })
  const [scheduledDonations, setScheduledDonations] = useState([])
  const [donationStatus, setDonationStatus] = useState('none') // none, scheduled, in-progress, completed
  const [currentLocation, setCurrentLocation] = useState(null)
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    urgentOnly: false
  })
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'blood_request',
      bloodType: 'O+',
      hospital: 'Kigali Central Hospital',
      units: 3,
      priority: 'Emergency',
      time: '15 min ago',
      read: false
    },
    {
      id: 2,
      type: 'blood_request',
      bloodType: 'O+',
      hospital: 'University Teaching Hospital',
      units: 2,
      priority: 'Urgent',
      time: '2 hours ago',
      read: false
    }
  ])
  const [notificationHistory, setNotificationHistory] = useState([
    { id: 3, type: 'donation_reminder', message: 'Reminder: You are eligible to donate again', time: '1 day ago', read: true },
    { id: 4, type: 'achievement', message: 'Achievement unlocked: 10 Donations Milestone!', time: '3 days ago', read: true },
    { id: 5, type: 'blood_request', message: 'Emergency request fulfilled - Thank you!', time: '1 week ago', read: true }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Donation', description: 'Completed your first blood donation', unlocked: true, points: 100 },
    { id: 2, title: '5 Donations', description: 'Reached 5 successful donations', unlocked: true, points: 250 },
    { id: 3, title: '10 Donations', description: 'Reached 10 successful donations', unlocked: true, points: 500 },
    { id: 4, title: 'Emergency Hero', description: 'Responded to 3 emergency requests', unlocked: true, points: 300 },
    { id: 5, title: '20 Donations', description: 'Reached 20 successful donations', unlocked: false, points: 1000 },
    { id: 6, title: 'Life Saver', description: 'Saved 50+ lives through donations', unlocked: false, points: 2000 }
  ])
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Sarah Johnson', donations: 28, points: 2800 },
    { rank: 2, name: 'Mike Chen', donations: 24, points: 2400 },
    { rank: 3, name: 'You', donations: 12, points: 1200 },
    { rank: 4, name: 'Emma Wilson', donations: 11, points: 1100 },
    { rank: 5, name: 'David Brown', donations: 9, points: 900 }
  ])
  const [rewardsStore, setRewardsStore] = useState([
    { id: 1, item: 'Coffee Shop Voucher', points: 200, description: '₹500 voucher for local coffee shops' },
    { id: 2, item: 'Health Checkup', points: 500, description: 'Free comprehensive health checkup' },
    { id: 3, item: 'Fitness Tracker', points: 1000, description: 'Basic fitness tracking device' },
    { id: 4, item: 'Smartphone', points: 5000, description: 'Latest smartphone model' }
  ])
  const [registeredEvents, setRegisteredEvents] = useState([])
  
  // Extract first name from email (temporary - should come from user data)
  const firstName = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1)

  const handleScheduleSubmit = () => {
    if (!scheduleData.date || !scheduleData.time || !scheduleData.location) {
      alert('Please fill in all fields before scheduling.')
      return
    }
    const newSchedule = {
      id: Date.now(),
      date: scheduleData.date,
      time: scheduleData.time,
      location: scheduleData.location,
      status: 'Scheduled'
    }
    setScheduledDonations(prev => [...prev, newSchedule])
    setShowScheduleForm(false)
    
    // Notify both hospital and admin
    alert(`Donation scheduled successfully!\n\nNotifications sent to:\n\n📍 ${scheduleData.location}:\n"New donation appointment: ${firstName} - ${scheduleData.date} at ${scheduleData.time}"\n\n👨‍💼 System Admin:\n"Donation scheduled by ${firstName} at ${scheduleData.location} for ${scheduleData.date} at ${scheduleData.time}"\n\nBoth parties have been notified for proper coordination.`)
    
    setScheduleData({ date: '', time: '', location: '' })
  }

  const handleScheduleDonation = () => {
    setShowScheduleForm(true)
  }

  const handleFindBloodDrive = () => {
    setShowBloodDriveList(true)
  }

  const handleUpdateProfile = () => {
    setActiveTab('profile')
  }

  const handleRespondToRequest = (notificationId, response) => {
    if (response === 'accept') {
      alert('Thank you for accepting! We will contact you with donation details.')
    }
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const handleRegisterForEvent = (eventId, eventTitle) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => [...prev, eventId])
      alert(`Successfully registered for: ${eventTitle}`)
    }
  }

  const donorStats = {
    totalDonations: 12,
    lastDonation: '2024-01-15',
    nextEligible: '2024-03-15',
    bloodType: 'O+',
    livesImpacted: 36,
    points: 1200,
    rank: 3,
    badges: 4
  }

  // Simulate GPS tracking
  const startGPSTracking = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setDonationStatus('in-progress')
          alert('GPS tracking started. We\'ll guide you to the donation center.')
        },
        (error) => {
          alert('GPS access denied. Please enable location services.')
        }
      )
    }
  }

  const generateQRCode = () => {
    setShowQRCode(true)
  }

  const redeemReward = (rewardId, points) => {
    if (donorStats.points >= points) {
      alert('Reward redeemed successfully!')
      // Update points logic would go here
    } else {
      alert('Insufficient points for this reward.')
    }
  }

  const shareAchievement = (achievement) => {
    if (navigator.share) {
      navigator.share({
        title: 'Blood Donation Achievement',
        text: `I just unlocked "${achievement.title}" on LifeDrop! Join me in saving lives through blood donation.`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just unlocked "${achievement.title}" on LifeDrop! Join me in saving lives through blood donation.`
      navigator.clipboard.writeText(text)
      alert('Achievement shared to clipboard!')
    }
  }

  const donationHistory = [
    { id: 1, date: '2024-01-15', location: 'City Hospital', status: 'Completed', units: 1 },
    { id: 2, date: '2023-11-10', location: 'Blood Drive Center', status: 'Completed', units: 1 },
    { id: 3, date: '2023-09-05', location: 'Emergency Center', status: 'Completed', units: 1 },
    { id: 4, date: '2023-07-01', location: 'Community Center', status: 'Completed', units: 1 }
  ]

  const upcomingEvents = [
    { id: 1, title: 'Community Blood Drive', date: '2024-02-20', location: 'City Mall', time: '9:00 AM - 5:00 PM' },
    { id: 2, title: 'Emergency Blood Collection', date: '2024-02-25', location: 'Hospital Center', time: '10:00 AM - 4:00 PM' },
    { id: 3, title: 'Mobile Blood Unit', date: '2024-03-01', location: 'University Campus', time: '11:00 AM - 6:00 PM' }
  ]

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
            Donor Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#666', margin: 0 }}>Welcome back, {firstName}</p>
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
          <TabButton id="blood-requests" label="Blood Requests" isActive={activeTab === 'blood-requests'} onClick={setActiveTab} badge={notifications.filter(n => !n.read).length} />
          <TabButton id="scheduled" label="Scheduled Donations" isActive={activeTab === 'scheduled'} onClick={setActiveTab} badge={scheduledDonations.filter(d => d.status === 'Scheduled').length} />
          <TabButton id="history" label="Donation History" isActive={activeTab === 'history'} onClick={setActiveTab} />
          <TabButton id="events" label="Upcoming Events" isActive={activeTab === 'events'} onClick={setActiveTab} badge={upcomingEvents.filter(e => !registeredEvents.includes(e.id)).length} />
          <TabButton id="achievements" label="Achievements" isActive={activeTab === 'achievements'} onClick={setActiveTab} badge={achievements.filter(a => a.unlocked && !a.viewed).length || 0} />
          <TabButton id="leaderboard" label="Leaderboard" isActive={activeTab === 'leaderboard'} onClick={setActiveTab} />
          <TabButton id="profile" label="Profile" isActive={activeTab === 'profile'} onClick={setActiveTab} />
        </div>

        {/* Blood Requests Tab */}
        {activeTab === 'blood-requests' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Blood Request Notifications from Hospitals
            </h2>
            
            {notifications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>No blood requests at this time.</p>
                <p>You'll be notified when hospitals need your blood type.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {notifications.map(notification => (
                  <div key={notification.id} style={{
                    padding: '20px',
                    background: notification.read ? (darkMode ? '#404040' : '#f8f9fa') : (darkMode ? '#3d2d2d' : '#fff5f5'),
                    borderRadius: '12px',
                    border: `2px solid ${notification.priority === 'Emergency' ? '#F44336' : '#FF9800'}`,
                    borderLeft: `6px solid ${notification.priority === 'Emergency' ? '#F44336' : '#FF9800'}`
                  }}>
                    <div style={{ marginBottom: '12px' }}>
                      <h4 style={{ color: notification.priority === 'Emergency' ? '#F44336' : '#FF9800', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
                        {notification.priority === 'Emergency' ? 'URGENT' : 'BLOOD NEEDED'}: {notification.bloodType} Blood Request
                      </h4>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: darkMode ? '#fff' : '#333' }}>
                        <strong>{notification.hospital}</strong> needs {notification.units} units of {notification.bloodType} blood
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                        Priority: {notification.priority} • {notification.time}
                      </p>
                    </div>
                    
                    {!notification.read && (
                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button onClick={() => handleRespondToRequest(notification.id, 'accept')} style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          I Can Donate
                        </button>
                        <button onClick={() => handleRespondToRequest(notification.id, 'decline')} style={{
                          background: '#6c757d',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          Not Available
                        </button>
                      </div>
                    )}
                    
                    {notification.read && (
                      <div style={{ marginTop: '12px', padding: '8px 12px', background: darkMode ? '#2d4a2d' : '#e8f5e8', borderRadius: '6px' }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#4CAF50', fontWeight: '600' }}>Response recorded</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '30px'
            }}>
              <StatCard 
                title="Total Donations" 
                value={donorStats.totalDonations} 
                subtitle="Thank you for saving lives!" 
                color="#701C45" 
              />
              <StatCard 
                title="Lives Impacted" 
                value={donorStats.livesImpacted} 
                subtitle="Each donation helps 3 people" 
                color="#4CAF50" 
              />
              <StatCard 
                title="Reward Points" 
                value={donorStats.points} 
                subtitle="Redeem for rewards" 
                color="#FF9800" 
              />
              <StatCard 
                title="Leaderboard Rank" 
                value={`#${donorStats.rank}`} 
                subtitle="Keep climbing!" 
                color="#9C27B0" 
              />
              <StatCard 
                title="Badges Earned" 
                value={donorStats.badges} 
                subtitle="Unlock more achievements" 
                color="#2196F3" 
              />
            </div>

            {/* Real-time Donation Status */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginBottom: '32px',
              border: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px', letterSpacing: '-0.3px' }}>
                Real-time Donation Status
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div style={{ padding: '24px', background: darkMode ? 'linear-gradient(135deg, #2d4a2d 0%, #1e3a1e 100%)' : 'linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)', borderRadius: '12px', border: '2px solid #4CAF50' }}>
                  <h3 style={{ color: '#4CAF50', margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Current Status</h3>
                  <p style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: darkMode ? '#fff' : '#333' }}>
                    {donationStatus === 'none' && 'Ready to Donate'}
                    {donationStatus === 'scheduled' && 'Donation Scheduled'}
                    {donationStatus === 'in-progress' && 'En Route to Center'}
                    {donationStatus === 'completed' && 'Donation Completed'}
                  </p>
                  {donationStatus === 'in-progress' && currentLocation && (
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                      GPS: Lat {currentLocation.lat.toFixed(4)}, Lng {currentLocation.lng.toFixed(4)}
                    </p>
                  )}
                </div>
                <div style={{ padding: '24px', background: darkMode ? 'linear-gradient(135deg, #4a3d2d 0%, #3a2e1e 100%)' : 'linear-gradient(135deg, #fffbf8 0%, #fff3e0 100%)', borderRadius: '12px', border: '2px solid #FF9800' }}>
                  <h3 style={{ color: '#FF9800', margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Next Eligible Date</h3>
                  <p style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: darkMode ? '#fff' : '#333' }}>{donorStats.nextEligible}</p>
                  <div style={{ marginTop: '12px' }}>
                    <button onClick={generateQRCode} style={{
                      background: '#FF9800',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}>
                      Generate QR Code
                    </button>
                    <button onClick={startGPSTracking} style={{
                      background: '#2196F3',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Start GPS Tracking
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: darkMode ? '#2d2d2d' : 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: `1px solid ${darkMode ? '#404040' : '#f0f0f0'}`
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px', letterSpacing: '-0.3px' }}>
                Quick Actions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <button onClick={handleScheduleDonation} style={{
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
                  Schedule Donation
                </button>
                <button onClick={handleFindBloodDrive} style={{
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
                  Find Blood Drive
                </button>
                <button onClick={handleUpdateProfile} style={{
                  background: '#9C27B0',
                  color: 'white',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)'
                }}>
                  Update Profile
                </button>
                <button onClick={() => setShowNotificationSettings(true)} style={{
                  background: '#2196F3',
                  color: 'white',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
                }}>
                  Notification Settings
                </button>
                <button onClick={() => setShowRewardsStore(true)} style={{
                  background: '#FF9800',
                  color: 'white',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)'
                }}>
                  Rewards Store
                </button>
              </div>
            </div>

            {/* Schedule Donation Modal */}
            {showScheduleForm && (
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
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px' }}>Schedule Donation</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Preferred Date</label>
                    <input type="date" value={scheduleData.date} onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Preferred Time</label>
                    <select value={scheduleData.time} onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
                      <option value="">Select time</option>
                      <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Location</label>
                    <select value={scheduleData.location} onChange={(e) => setScheduleData({...scheduleData, location: e.target.value})} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
                      <option value="">Select location</option>
                      <option value="Kigali Central Hospital">Kigali Central Hospital</option>
                      <option value="University Teaching Hospital">University Teaching Hospital</option>
                      <option value="King Faisal Hospital">King Faisal Hospital</option>
                      <option value="Rwanda Military Hospital">Rwanda Military Hospital</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button onClick={handleScheduleSubmit} style={{
                      background: 'rgb(112, 28, 69)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      flex: 1
                    }}>Schedule</button>
                    <button onClick={() => setShowScheduleForm(false)} style={{
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

            {/* Blood Drive List Modal */}
            {showBloodDriveList && (
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
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px' }}>Nearby Blood Drives</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { name: 'Kigali Central Hospital', distance: '2.5 km', time: '9:00 AM - 5:00 PM', date: 'Today', address: 'KN 4 Ave, Kigali' },
                      { name: 'University Teaching Hospital', distance: '4.1 km', time: '10:00 AM - 4:00 PM', date: 'Tomorrow', address: 'KG 106 St, Butare' },
                      { name: 'King Faisal Hospital', distance: '6.8 km', time: '8:00 AM - 6:00 PM', date: 'Feb 25', address: 'KG 544 St, Kigali' },
                      { name: 'Rwanda Military Hospital', distance: '8.2 km', time: '9:00 AM - 3:00 PM', date: 'Feb 26', address: 'KG 256 St, Kigali' }
                    ].map((drive, index) => (
                      <div key={index} style={{
                        padding: '20px',
                        border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                        borderRadius: '12px',
                        background: darkMode ? '#404040' : '#f8f9fa'
                      }}>
                        <h4 style={{ color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>{drive.name}</h4>
                        <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 4px 0', fontSize: '14px' }}>{drive.distance} away • {drive.date}</p>
                        <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 4px 0', fontSize: '14px' }}>{drive.time}</p>
                        <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>{drive.address}</p>
                        <button 
                          onClick={() => {
                            if (currentLocation) {
                              const googleMapsUrl = `https://www.google.com/maps/dir/${currentLocation.lat},${currentLocation.lng}/${encodeURIComponent(drive.address)}`;
                              window.open(googleMapsUrl, '_blank');
                            } else {
                              alert('Please start GPS tracking first to get directions.');
                            }
                          }}
                          style={{
                            background: currentLocation ? '#2196F3' : '#ccc',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '12px',
                            cursor: currentLocation ? 'pointer' : 'not-allowed',
                            fontWeight: '600'
                          }}
                        >
                          Directions
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setShowBloodDriveList(false)} style={{
                    background: '#6c757d',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '24px'
                  }}>Close</button>
                </div>
              </div>
            )}
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
            {scheduledDonations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>No scheduled donations yet.</p>
                <p>Click "Schedule Donation" to book your next appointment.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {scheduledDonations.map(schedule => (
                  <div key={schedule.id} style={{
                    padding: '16px',
                    background: darkMode ? '#404040' : '#f8f9fa',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 4px 0' }}>
                          {schedule.location}
                        </p>
                        <p style={{ color: darkMode ? '#ccc' : '#666', margin: 0, fontSize: '14px' }}>
                          {schedule.date} • {schedule.time}
                        </p>
                      </div>
                      <span style={{
                        background: '#FF9800',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {schedule.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Donation History
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {donationHistory.map(donation => (
                <div key={donation.id} style={{
                  padding: '16px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333', margin: '0 0 4px 0' }}>
                        {donation.location}
                      </p>
                      <p style={{ color: darkMode ? '#ccc' : '#666', margin: 0, fontSize: '14px' }}>
                        {donation.date} • {donation.units} unit(s)
                      </p>
                    </div>
                    <span style={{
                      background: '#4CAF50',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Upcoming Blood Drive Events
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {upcomingEvents.map(event => (
                <div key={event.id} style={{
                  padding: '20px',
                  background: darkMode ? '#404040' : '#f8f9fa',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`
                }}>
                  <h3 style={{ color: darkMode ? '#fff' : '#701C45', margin: '0 0 8px 0' }}>{event.title}</h3>
                  <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 4px 0' }}>{event.date}</p>
                  <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 4px 0' }}>{event.location}</p>
                  <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 12px 0' }}>{event.time}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {registeredEvents.includes(event.id) && (
                      <span style={{ color: '#4CAF50', fontSize: '14px', fontWeight: '600' }}>✓ Registered</span>
                    )}
                    <button 
                      onClick={() => handleRegisterForEvent(event.id, event.title)} 
                      disabled={registeredEvents.includes(event.id)}
                      style={{
                        background: registeredEvents.includes(event.id) ? '#ccc' : 'rgb(112, 28, 69)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '14px',
                        cursor: registeredEvents.includes(event.id) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {registeredEvents.includes(event.id) ? 'Already Registered' : 'Register for Event'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Achievement Badges
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {achievements.map(achievement => (
                <div key={achievement.id} style={{
                  padding: '20px',
                  background: achievement.unlocked ? (darkMode ? '#404040' : '#f0f8ff') : (darkMode ? '#333' : '#f5f5f5'),
                  borderRadius: '12px',
                  border: `2px solid ${achievement.unlocked ? '#4CAF50' : (darkMode ? '#555' : '#ddd')}`,
                  opacity: achievement.unlocked ? 1 : 0.6,
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: achievement.unlocked ? '#4CAF50' : (darkMode ? '#555' : '#ccc'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {achievement.unlocked ? '🏆' : '🔒'}
                    </div>
                    <div>
                      <h3 style={{ color: darkMode ? '#fff' : '#333', margin: '0 0 4px 0', fontSize: '16px' }}>
                        {achievement.title}
                      </h3>
                      <p style={{ color: darkMode ? '#ccc' : '#666', margin: 0, fontSize: '14px' }}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#FF9800', fontWeight: 'bold' }}>
                      +{achievement.points} points
                    </span>
                    {achievement.unlocked && (
                      <button onClick={() => shareAchievement(achievement)} style={{
                        background: '#2196F3',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}>
                        Share
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#fff' : '#333', marginBottom: '20px' }}>
              Donor Leaderboard
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {leaderboard.map(donor => (
                <div key={donor.rank} style={{
                  padding: '16px',
                  background: donor.name === 'You' ? (darkMode ? '#404040' : '#fff3e0') : (darkMode ? '#333' : '#f8f9fa'),
                  borderRadius: '8px',
                  border: donor.name === 'You' ? '2px solid #FF9800' : `1px solid ${darkMode ? '#555' : '#e0e0e0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: donor.rank <= 3 ? '#FFD700' : (darkMode ? '#555' : '#ddd'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: donor.rank <= 3 ? '#333' : (darkMode ? '#fff' : '#666')
                    }}>
                      #{donor.rank}
                    </div>
                    <div>
                      <h3 style={{ color: darkMode ? '#fff' : '#333', margin: '0 0 4px 0', fontSize: '16px' }}>
                        {donor.name} {donor.name === 'You' && '👑'}
                      </h3>
                      <p style={{ color: darkMode ? '#ccc' : '#666', margin: 0, fontSize: '14px' }}>
                        {donor.donations} donations
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#FF9800', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                      {donor.points} pts
                    </p>
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
              Personal Information
            </h2>
            
            {/* First Name and Last Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>First Name <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="text" defaultValue={firstName} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Last Name <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="text" defaultValue="Donor" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
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
                <input type="tel" defaultValue="+250 789 123 456" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
            </div>
            
            {/* Country */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Country</label>
              <select defaultValue="Rwanda" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
                <option value="Rwanda">Rwanda</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
              </select>
            </div>
            
            {/* Medical Information Section */}
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '16px', marginTop: '32px', borderTop: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`, paddingTop: '24px' }}>
              Medical Information
            </h3>
            
            {/* Date of Birth and Blood Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Date of Birth <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="date" defaultValue="1995-06-15" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Blood Type <span style={{ color: '#e74c3c' }}>*</span></label>
                <select defaultValue={donorStats.bloodType} style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }}>
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
            
            {/* Weight */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Weight (kg) <span style={{ color: '#e74c3c' }}>*</span></label>
              <input type="number" defaultValue="70" placeholder="Minimum 50kg required" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
            </div>
            
            {/* Last Blood Donation */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Last Blood Donation (if any)</label>
              <input type="date" defaultValue="2024-01-15" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
            </div>
            
            {/* Medical Conditions */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333', marginBottom: '8px', display: 'block' }}>Medical Conditions (if any)</label>
              <textarea defaultValue="" placeholder="List any medical conditions, medications, or recent illnesses" style={{ width: '100%', padding: '12px', border: `2px solid ${darkMode ? '#555' : '#e0e0e0'}`, borderRadius: '8px', fontSize: '16px', minHeight: '80px', resize: 'vertical', background: darkMode ? '#404040' : 'white', color: darkMode ? '#fff' : '#333' }} />
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

        {/* Notifications Panel */}
        {showNotifications && (
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
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', margin: 0 }}>Blood Request Notifications</h3>
                <button onClick={() => setShowNotifications(false)} style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: darkMode ? '#ccc' : '#666'
                }}>×</button>
              </div>
              
              {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  <p>No notifications at this time.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {notifications.map(notification => (
                    <div key={notification.id} style={{
                      padding: '20px',
                      background: notification.read ? (darkMode ? '#404040' : '#f8f9fa') : (darkMode ? '#3d2d2d' : '#fff5f5'),
                      borderRadius: '12px',
                      border: `2px solid ${notification.priority === 'Emergency' ? '#F44336' : '#FF9800'}`,
                      borderLeft: `6px solid ${notification.priority === 'Emergency' ? '#F44336' : '#FF9800'}`
                    }}>>
                      <div style={{ marginBottom: '12px' }}>
                        <h4 style={{ color: notification.priority === 'Emergency' ? '#F44336' : '#FF9800', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
                          {notification.priority === 'Emergency' ? 'URGENT' : 'BLOOD NEEDED'}: {notification.bloodType} Blood Request
                        </h4>
                        <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: darkMode ? '#fff' : '#333' }}>
                          <strong>{notification.hospital}</strong> needs {notification.units} units of {notification.bloodType} blood
                        </p>
                        <p style={{ margin: 0, fontSize: '14px', color: darkMode ? '#ccc' : '#666' }}>
                          Priority: {notification.priority} • {notification.time}
                        </p>
                      </div>
                      
                      {!notification.read && (
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                          <button onClick={() => handleRespondToRequest(notification.id, 'accept')} style={{
                            background: '#4CAF50',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}>
                            I Can Donate
                          </button>
                          <button onClick={() => handleRespondToRequest(notification.id, 'decline')} style={{
                            background: '#6c757d',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}>
                            Not Available
                          </button>
                        </div>
                      )}
                      
                      {notification.read && (
                        <div style={{ marginTop: '12px', padding: '8px 12px', background: darkMode ? '#2d4a2d' : '#e8f5e8', borderRadius: '6px' }}>
                          <p style={{ margin: 0, fontSize: '14px', color: '#4CAF50', fontWeight: '600' }}>Response recorded</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notification Settings Modal */}
        {showNotificationSettings && (
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
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px' }}>Notification Preferences</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                  />
                  <span style={{ color: darkMode ? '#fff' : '#333' }}>Push Notifications</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                  />
                  <span style={{ color: darkMode ? '#fff' : '#333' }}>Email Notifications</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                  />
                  <span style={{ color: darkMode ? '#fff' : '#333' }}>SMS Notifications</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.urgentOnly}
                    onChange={(e) => setNotificationSettings({...notificationSettings, urgentOnly: e.target.checked})}
                  />
                  <span style={{ color: darkMode ? '#fff' : '#333' }}>Urgent Requests Only</span>
                </label>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => { setShowNotificationSettings(false); alert('Settings saved!'); }} style={{
                  background: 'rgb(112, 28, 69)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1
                }}>Save Settings</button>
                <button onClick={() => setShowNotificationSettings(false)} style={{
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

        {/* Rewards Store Modal */}
        {showRewardsStore && (
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
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', margin: 0 }}>Rewards Store</h3>
                <div style={{ color: '#FF9800', fontSize: '18px', fontWeight: 'bold' }}>
                  {donorStats.points} points available
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {rewardsStore.map(reward => (
                  <div key={reward.id} style={{
                    padding: '20px',
                    background: darkMode ? '#404040' : '#f8f9fa',
                    borderRadius: '12px',
                    border: `1px solid ${darkMode ? '#555' : '#e0e0e0'}`
                  }}>
                    <h4 style={{ color: darkMode ? '#fff' : '#333', margin: '0 0 8px 0' }}>{reward.item}</h4>
                    <p style={{ color: darkMode ? '#ccc' : '#666', margin: '0 0 12px 0', fontSize: '14px' }}>
                      {reward.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#FF9800', fontWeight: 'bold' }}>{reward.points} points</span>
                      <button 
                        onClick={() => redeemReward(reward.id, reward.points)}
                        disabled={donorStats.points < reward.points}
                        style={{
                          background: donorStats.points >= reward.points ? '#4CAF50' : '#ccc',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          cursor: donorStats.points >= reward.points ? 'pointer' : 'not-allowed'
                        }}
                      >
                        Redeem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => setShowRewardsStore(false)} style={{
                background: '#6c757d',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}>Close</button>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCode && (
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
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#333', marginBottom: '24px' }}>Check-in QR Code</h3>
              
              <div style={{
                width: '200px',
                height: '200px',
                background: '#f0f0f0',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                border: '2px solid #701C45'
              }}>
                <div style={{ fontSize: '48px' }}>📱</div>
              </div>
              
              <p style={{ color: darkMode ? '#ccc' : '#666', marginBottom: '24px' }}>
                Show this QR code at the donation center for quick check-in
              </p>
              
              <div style={{ background: darkMode ? '#404040' : '#f8f9fa', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ color: darkMode ? '#fff' : '#333', margin: 0, fontSize: '14px', fontFamily: 'monospace' }}>
                  ID: DONOR-{userEmail.split('@')[0].toUpperCase()}-{Date.now().toString().slice(-4)}
                </p>
              </div>
              
              <button onClick={() => setShowQRCode(false)} style={{
                background: 'rgb(112, 28, 69)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonorDashboard