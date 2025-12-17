import { useState, useEffect } from 'react'
import FundForm from './FundForm.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import ContactForm from './ContactForm.jsx'
import APIRequestForm from './APIRequestForm.jsx'
import EnhancedContactForm from './EnhancedContactForm.jsx'
import EnhancedPartnershipForm from './EnhancedPartnershipForm.jsx'
import EnhancedEventPartnershipForm from './EnhancedEventPartnershipForm.jsx'
import LoginForm from './LoginForm.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import DonorDashboard from './DonorDashboard.jsx'
import HospitalDashboard from './HospitalDashboard.jsx'

// Animation styles
const animations = `
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .slide-in-left { animation: slideInLeft 0.8s ease-out; }
  .slide-in-right { animation: slideInRight 0.8s ease-out; }
  .slide-in-up { animation: slideInUp 0.6s ease-out; }
  .fade-in { animation: fadeIn 1s ease-out; }
  .hover-lift { transition: all 0.3s ease; }
  .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
  .hover-scale { transition: transform 0.3s ease; }
  .hover-scale:hover { transform: scale(1.05); }
  .hover-image { transition: all 0.3s ease; }
  .hover-image:hover { transform: scale(1.1); filter: brightness(1.1); }
  .hover-card { transition: all 0.3s ease; }
  .hover-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
  .hover-glow { transition: all 0.3s ease; }
  .hover-glow:hover { box-shadow: 0 0 30px rgba(112, 28, 69, 0.3); }
  .modern-input { 
    width: 100%; 
    padding: 16px 20px; 
    border: 2px solid #e2e8f0; 
    border-radius: 12px;
    fontSize: 16px;
    box-sizing: border-box;
    transition: all 0.3s ease;
    background: #ffffff;
    font-family: inherit;
  }
  .modern-input:focus {
    border-color: #701C45;
    box-shadow: 0 0 0 3px rgba(112, 28, 69, 0.1);
    outline: none;
  }
  .modern-button {
    background: linear-gradient(135deg, #701C45 0%, #8B2A5B 100%);
    color: white;
    padding: 18px 40px;
    border-radius: 50px;
    border: none;
    fontSize: 16px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    box-shadow: 0 8px 25px rgba(112, 28, 69, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .modern-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(112, 28, 69, 0.4);
  }
  .error-text {
    color: #e74c3c;
    font-size: 13px;
    margin-top: 6px;
    font-weight: 500;
  }
  .input-error {
    border-color: #e74c3c !important;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
  }
  .validation-enabled .modern-input:focus {
    border-color: #701C45;
    box-shadow: 0 0 0 3px rgba(112, 28, 69, 0.1);
    outline: none;
  }
  .pulse-animation { animation: pulse 2s infinite; }
  .float-animation { animation: float 3s ease-in-out infinite; }
  .gradient-bg { background: linear-gradient(135deg, #701C45 0%, #8B2A5B 100%); }
  .glass-effect { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); }
`
import heroImage from './assets/Hero-home-group.png'
import backgroundImage from './assets/background.png'
import shapeImage from './assets/about-1-shape-2.png'
import handImage from './assets/slider-1-hand-1.png'
import medicalSceneImage from './assets/doctor.jpg'
import smilingChildImage from './assets/work-pledge.png'
import schoolChildrenImage from './assets/smiling.jpg'
import loveIcon from './assets/love.png'
import userGroupIcon from './assets/user-group.png'
import dealIcon from './assets/deal.png'
import volumeIcon from './assets/volume.png'
import clockIcon from './assets/clock.png'
import heartIcon from './assets/heart.png'
import userIcon from './assets/user.png'
import prayIcon from './assets/pray.png'
import pageHeader3 from './assets/page-header3.png'
import pageHeader4 from './assets/page-header4.png'
import pageHeader6 from './assets/page-header6.png'
import globalNeedHero from './assets/global-need-hero.png'
import impactHero from './assets/impact-hero.png'
import sarahImage from './assets/sarah.jpg'
import receivingImage from './assets/receiving.jpg'
import anemiaImage from './assets/anemia.jpeg'
import aucaLogo from './assets/auca.jpeg'
import kfhLogo from './assets/kfh.png'
import militaryLogo from './assets/military.png'
import rbcLogo from './assets/rbc.png'
import rwandaLogo from './assets/Rwanda.png'
import ugheLogo from './assets/UGHE.png'
import urLogo from './assets/ur.jpg'
import bloodDropIcon from './assets/blood-drop.png'
import logoutIcon from './assets/logout.png'
import phoneCallIcon from './assets/phone-call.png'
import impactLedImage from './assets/impact-led.png'
import donatingImage from './assets/donating.jpg'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const handleLogin = (type, email) => {
    setIsLoggedIn(true)
    setUserType(type)
    setUserEmail(email)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType('')
    setUserEmail('')
    setCurrentPage('home')
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [currentPage])

  const renderPage = () => {
    if (currentPage === 'login') {
      return <LoginForm onLogin={handleLogin} setCurrentPage={setCurrentPage} />
    }
    
    if (isLoggedIn && currentPage === 'dashboard') {
      switch(userType) {
        case 'admin': return <AdminDashboard userEmail={userEmail} onLogout={handleLogout} />
        case 'donor': return <DonorDashboard userEmail={userEmail} onLogout={handleLogout} />
        case 'hospital': return <HospitalDashboard userEmail={userEmail} onLogout={handleLogout} />
        default: return <HomePage setCurrentPage={setCurrentPage} />
      }
    }
    
    switch(currentPage) {
      case 'about': return <AboutPage setCurrentPage={setCurrentPage} />
      case 'impact': return <ImpactPage />
      case 'contact': return <ContactPage />
      case 'register': return <RegistrationForm />
      case 'api-request': return <APIRequestForm />

      case 'how-it-works': return <HowItWorksPage />
      case 'for-hospitals': return <ForHospitalsPage />
      case 'for-donors': return <ForDonorsPage />
      case 'blood-drive-events': return <BloodDriveEventsPage setCurrentPage={setCurrentPage} />

      case 'faq': return <FAQPage />
      case 'partner-with-us': return <PartnerWithUsPage />
      case 'api-integration': return <APIIntegrationPage setCurrentPage={setCurrentPage} />

      case 'privacy-policy': return <PrivacyPolicyPage />
      case 'terms-of-service': return <TermsOfServicePage />
      default: return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{animations}</style>
      {/* Top Bar */}
      <div style={{ 
        background: 'rgb(243, 239, 237)',
        height: '1cm'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          height: '100%'
        }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Support</button>
            <button onClick={() => setCurrentPage(isLoggedIn ? 'dashboard' : 'login')} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <img src={logoutIcon} alt="Login" style={{ width: '16px', height: '16px' }} />
              {isLoggedIn ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard` : 'Login'}
            </button>
            <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <img src={phoneCallIcon} alt="Contact" style={{ width: '16px', height: '16px' }} />
              Contact
            </button>
          </div>
        </div>
      </div>
      
      {/* Header - Only show if not logged in or not on dashboard */}
      {(!isLoggedIn || currentPage !== 'dashboard') && (
      <header className="glass-effect" style={{ 
        background: 'rgba(112, 28, 69, 0.95)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
              LIFE DROP
            </div>
            <img src={bloodDropIcon} alt="Blood Drop" style={{ width: '32px', height: '32px', filter: 'brightness(0) saturate(100%) invert(100%)' }} />
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
            >HOME</button>
            <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
            >ABOUT US</button>
            <button onClick={() => { setCurrentPage('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
            >IMPACT</button>
          </nav>
        </div>
      </header>
      )}
      
      <main>
        {renderPage()}
      </main>
      
      {/* Footer - Only show if not logged in or not on dashboard */}
      {(!isLoggedIn || currentPage !== 'dashboard') && (
      <footer className="gradient-bg" style={{ 
        color: 'white',
        padding: '60px 0 30px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
          pointerEvents: 'none'
        }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                LIFE DROP
              </div>
              <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
                Connecting hospitals with verified blood donors — ensuring critical blood supplies reach patients when every second counts. Streamlining the donation process for emergency care, surgeries, and life-saving treatments.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>QUICK LINKS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => setCurrentPage('how-it-works')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: '4px 0', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>How It Works</button>
                <button onClick={() => setCurrentPage('for-hospitals')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: '4px 0', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>For Hospitals</button>
                <button onClick={() => setCurrentPage('for-donors')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: '4px 0', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>For Donors</button>
                <button onClick={() => setCurrentPage('blood-drive-events')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: '4px 0', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>Blood Drive Events</button>

                <button onClick={() => setCurrentPage('faq')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: '4px 0', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>FAQ</button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>PARTNERS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => setCurrentPage('partner-with-us')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: '4px 0', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>Partner With Us</button>
                <button onClick={() => setCurrentPage('api-integration')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: '4px 0', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>API Integration</button>

              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>CONTACT INFORMATION</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  support@lifedrop.org
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <a href="#" style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <div>Copyright © 2025 LIFE DROP | Powered by LIFE DROP</div>
            <div>
              <button onClick={() => setCurrentPage('privacy-policy')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', cursor: 'pointer', fontSize: '12px', marginRight: '20px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>Privacy Policy</button>
              <button onClick={() => setCurrentPage('terms-of-service')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', cursor: 'pointer', fontSize: '12px', marginRight: '20px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>Terms of Service</button>
              <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', cursor: 'pointer', fontSize: '12px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FFB6C1'} onMouseLeave={(e) => e.target.style.color = 'white'}>Contact Us</button>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  )
}

function HomePage({ setCurrentPage }) {

  const partners = [
    { logo: aucaLogo, name: 'AUCA' },
    { logo: kfhLogo, name: 'KFH' },
    { logo: militaryLogo, name: 'Military' },
    { logo: rbcLogo, name: 'RBC' },
    { logo: rwandaLogo, name: 'Rwanda' },
    { logo: ugheLogo, name: 'UGHE' },
    { logo: urLogo, name: 'UR' }
  ]





  return (
    <div>
      {/* Hero Section */}
      <section className="fade-in" style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(112, 28, 69, 0.1) 0%, rgba(139, 42, 91, 0.1) 100%)'
        }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className="slide-in-left">
              <h1 style={{ 
                fontSize: '48px', 
                fontWeight: 'bold', 
                color: '#701C45',
                marginBottom: '24px',
                lineHeight: '1.2'
              }}>
                TO GIVE IS HUMAN
              </h1>
              <p style={{ 
                fontSize: '18px', 
                color: '#666', 
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Save lives by helping East African hospitals collect sufficient, safe blood.
              </p>
              <button 
                onClick={() => setCurrentPage('register')}
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
                REGISTER NOW
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                position: 'relative'
              }}>
                {/* Decorative shapes */}
                <div style={{ 
                  position: 'absolute', 
                  top: '-4px', 
                  right: '240px',
                  width: '200px',
                  height: '150px',
                  backgroundImage: `url(${shapeImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  transform: 'rotate(60deg)'
                }}></div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-4px', 
                  left: '390px',
                  width: '200px',
                  height: '150px',
                  backgroundImage: `url(${shapeImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  transform: 'rotate(-60deg)'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Safe Blood Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#701C45',
                marginBottom: '24px'
              }}>
                WHY SAFE BLOOD SAVES LIVES
              </h2>
              <p style={{ 
                fontSize: '16px', 
                color: '#666', 
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Across East Africa, hospitals face critical shortages of safe blood. Patients—especially women in childbirth, children with severe anemia, and accident victims—suffer and sometimes die due to the lack of an adequate blood supply. Our platform connects donors with hospitals to ensure life-saving blood reaches those who need it most.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img src={clockIcon} alt="Clock" style={{ width: '24px', height: '24px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  <span style={{ fontSize: '16px', color: '#666' }}>Every 2 seconds, someone needs blood.</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img src={heartIcon} alt="Heart" style={{ width: '24px', height: '24px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  <span style={{ fontSize: '16px', color: '#666' }}>Many East African communities lack reliable access to safe blood transfusions.</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img src={userIcon} alt="User" style={{ width: '24px', height: '24px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  <span style={{ fontSize: '16px', color: '#666' }}>1 donation can save up to 3 lives.</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  const fundSection = document.querySelector('[data-fund-form]')
                  if (fundSection) {
                    fundSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
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
                DONATE NOW
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="hover-image" style={{ 
                width: '100%',
                height: '400px',
                borderRadius: '12px',
                backgroundImage: `url(${medicalSceneImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
              </div>
              <div className="hover-image" style={{
                position: 'absolute',
                bottom: '-93px',
                right: '-93px',
                width: '280px',
                height: '180px',
                borderRadius: '8px',
                backgroundImage: `url(${schoolChildrenImage})`,
                backgroundSize: 'cover',
                border: '3px solid rgba(255, 255, 255, 0.8)'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Make Impact Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            HOW WE MAKE AN IMPACT
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                backgroundImage: `url(${smilingChildImage})`,
                backgroundSize: 'cover',
                position: 'relative'
              }}>
                {/* Decorative elements */}
                <div style={{ 
                  position: 'absolute', 
                  top: '-50px', 
                  left: '-50px',
                  width: '180px',
                  height: '135px',
                  backgroundImage: `url(${shapeImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  backgroundImage: `url(${handImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={loveIcon} alt="Love" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE CONNECT</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>Linking donors directly with hospitals needing blood across East Africa.</p>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={userGroupIcon} alt="User Group" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE FACILITATE</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>Streamlining blood requests and donation scheduling for faster response.</p>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={dealIcon} alt="Deal" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE VERIFY</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>Ensuring safe, screened blood through our trusted network of certified centers.</p>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={volumeIcon} alt="Volume" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE NOTIFY</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>Real-time alerts for urgent blood needs and donation opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            marginBottom: '32px'
          }}>
            CONNECTING LIVES ACROSS EAST AFRICA
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            maxWidth: '800px',
            margin: '0 auto 60px',
            lineHeight: '1.6'
          }}>
            LIFE DROP is revolutionizing blood donation in East Africa by connecting hospitals directly with willing donors. Our digital platform ensures that no patient is left without access to safe blood by streamlining the donation process and creating a reliable network of verified donors and certified medical facilities across Rwanda, Kenya, Uganda, and Tanzania. Our network includes <strong>500+ registered hospitals</strong> and <strong>10,000+ verified donors</strong> with <strong>real-time matching</strong> capabilities.
          </p>
          
          {/* Partners Slider */}
          <div className="fade-in" style={{ marginTop: '60px' }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#701C45',
              marginBottom: '40px'
            }}>
              OUR PARTNERS
            </h3>
            <div style={{ 
              width: '100%',
              overflow: 'hidden',
              height: '80px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '80px',
                animation: 'slide 15s linear infinite',
                whiteSpace: 'nowrap'
              }}>
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <img 
                    key={index}
                    src={partner.logo} 
                    alt={partner.name} 
                    className="hover-scale"
                    style={{ 
                      height: '60px', 
                      objectFit: 'contain',
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }}  
                  />
                ))}
              </div>
            </div>
            <style>{`
              @keyframes slide {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.33%); }
              }
            `}</style>
          </div>
        </div>
      </section>



      {/* Fund Mission Section */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            marginBottom: '24px'
          }}>
            JOIN OUR NETWORK
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#666', 
            marginBottom: '60px'
          }}>
            Connect with LIFE DROP to save lives across East Africa through our digital platform.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div className="hover-card" style={{ 
              background: '#701C45',
              color: 'white',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <img src={dealIcon} alt="Deal" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(100%)' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>HOSPITALS</h3>
              <p style={{ fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                Register your facility to post blood requests and connect with verified donors in your area.
              </p>
              <button 
                onClick={() => setCurrentPage('register')}
                style={{ 
                  background: 'white',
                  color: '#701C45',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                Register Hospital
              </button>
            </div>
            
            <div className="hover-card" style={{ 
              background: '#701C45',
              color: 'white',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <img src={prayIcon} alt="Pray" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(100%)' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>DONORS</h3>
              <p style={{ fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                Sign up to receive notifications about blood needs and schedule donations at nearby centers.
              </p>
              <button 
                onClick={() => setCurrentPage('register')}
                style={{ 
                  background: 'white',
                  color: '#701C45',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                Become a Donor
              </button>
            </div>
            
            <div className="hover-card" style={{ 
              background: '#701C45',
              color: 'white',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>PARTNERS</h3>
              <p style={{ fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                Healthcare organizations can integrate with our API to expand blood donation networks.
              </p>
              <button 
                onClick={() => setCurrentPage('partner-with-us')}
                style={{ 
                  background: 'white',
                  color: '#701C45',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fund Our Mission Form Section */}
      <div data-fund-form>
        <FundForm />
      </div>
    </div>
  )
}



function AboutPage({ setCurrentPage }) {

  return (
    <div>

      {/* Mission Section */}
      <section className="fade-in" style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(112, 28, 69, 0.1) 0%, rgba(139, 42, 91, 0.1) 100%)'
        }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h2 style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  MISSION
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#666', 
                  marginBottom: '32px',
                  lineHeight: '1.6'
                }}>
                  Our aim is simple; to save lives by improving the availability and safety of blood across East Africa through our digital platform that connects hospitals with verified donors.
                </p>
                <button 
                  onClick={() => setCurrentPage('register')}
                  style={{ 
                    background: '#701C45',
                    color: 'white', 
                    padding: '16px 32px', 
                    borderRadius: '25px', 
                    border: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                  Join Our Network
                </button>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '350px',
              borderRadius: '12px',
              backgroundImage: `url(${pageHeader3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="animate-on-scroll" style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div style={{ 
              width: '100%',
              height: '350px',
              borderRadius: '12px',
              backgroundImage: `url(${pageHeader6})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div>
              <h2 style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#701C45',
                marginBottom: '24px'
              }}>
                WHO WE ARE
              </h2>
              <p style={{ 
                fontSize: '16px', 
                color: '#666', 
                lineHeight: '1.6'
              }}>
                LIFE DROP is a digital platform dedicated to connecting hospitals with blood donors across East Africa. We serve Rwanda, Kenya, Uganda, and Tanzania by streamlining blood requests, verifying donors, and ensuring timely access to life-saving blood transfusions for patients in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="animate-on-scroll" style={{ padding: '100px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#701C45',
                marginBottom: '24px'
              }}>
                HISTORY
              </h2>
              <p style={{ 
                fontSize: '16px', 
                color: '#666', 
                lineHeight: '1.6'
              }}>
                Launched in 2021, LIFE DROP was developed to address the critical blood shortage challenges facing East African healthcare systems. Our platform leverages modern technology to create seamless connections between hospitals posting urgent blood requests and verified donors ready to help, transforming how blood donation works across the region.
              </p>
            </div>
            <div style={{ 
              width: '100%',
              height: '350px',
              borderRadius: '12px',
              backgroundImage: `url(${globalNeedHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </section>

      {/* Fund Our Mission Form Section */}
      <FundForm />
    </div>
  )
}

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }))
  }

  const handleLogin = () => {
    alert('Login functionality coming soon!')
  }

  return (
    <div style={{ padding: '80px 0', background: '#f5f5f5', minHeight: '80vh' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>LOGIN</h1>
          <p style={{ fontSize: '16px', color: '#666' }}>Access your LIFE DROP account</p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input 
              type="email"
              value={loginData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e0e0e0', 
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input 
              type="password"
              value={loginData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e0e0e0', 
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            onClick={handleLogin}
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
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

function ImpactPage() {

  return (
    <div>
      {/* Impact Section */}
      <section className="fade-in" style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(112, 28, 69, 0.1) 0%, rgba(139, 42, 91, 0.1) 100%)'
        }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
              <h2 style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#701C45',
                marginBottom: '24px'
              }}>
                IMPACT
              </h2>
              <p style={{ 
                fontSize: '16px', 
                color: '#666', 
                lineHeight: '1.6'
              }}>
                Every successful match through LIFE DROP represents a life saved, a family kept whole, and a community made stronger.
              </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '350px',
              borderRadius: '12px',
              backgroundImage: `url(${impactHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </section>

      {/* Strengthening Communities Section */}
      <section className="animate-on-scroll" style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            STRENGTHENING COMMUNITIES
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            textAlign: 'center',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto 60px'
          }}>
            Across East Africa, our platform ensures hospitals have reliable access to life-saving blood. Through LIFE DROP, donors and medical facilities connect seamlessly, creating stronger healthcare networks. Here are real stories from our community:
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="hover-image" style={{ 
                width: '100%',
                height: '300px',
                borderRadius: '12px',
                backgroundImage: `url(${sarahImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '20px'
              }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Sarah UMUTONI</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>"The blood transfusion saved my life during childbirth. I'm forever grateful to the donors who made this possible."</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div className="hover-image" style={{ 
                width: '100%',
                height: '300px',
                borderRadius: '12px',
                backgroundImage: `url(${receivingImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '20px'
              }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Michael GAKWAYA</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>"After my accident, the emergency blood transfusion gave me a second chance at life. Thank you to all the heroes who donate."</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div className="hover-image" style={{ 
                width: '100%',
                height: '300px',
                borderRadius: '12px',
                backgroundImage: `url(${anemiaImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '20px'
              }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Grace NAKATO</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>"My daughter's battle with anemia was won thanks to regular blood transfusions. Every donor is a lifesaver."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplying the World Section */}
      <section className="animate-on-scroll" style={{ padding: '100px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            CONNECTING EAST AFRICA
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
            <div>
              <p>• 500+ hospitals registered across Rwanda, Kenya, Uganda, and Tanzania.</p>
              <p>• 10,000+ verified donors in our network.</p>
              <p>• Real-time blood matching system operational 24/7.</p>
              <p>• SMS notification system reaching remote areas.</p>
              <p>• Multi-language support for regional languages.</p>
              <p>• Emergency blood request alerts to nearby donors.</p>
            </div>
            <div>
              <p>• Hospital dashboard for managing blood inventory.</p>
              <p>• Donor scheduling system for convenient appointments.</p>
              <p>• Blood type compatibility matching algorithm.</p>
              <p>• Mobile-responsive platform accessible on any device.</p>
              <p>• Secure data encryption protecting user information.</p>
              <p>• API integration with hospital management systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <section className="animate-on-scroll" style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{ 
                fontSize: '18px', 
                color: '#666', 
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                LIFE DROP focuses on connecting East African hospitals with verified blood donors through our digital platform, ensuring that life-saving blood reaches patients when they need it most.
              </p>
            </div>
            <div style={{ 
              width: '100%',
              height: '350px',
              borderRadius: '12px',
              backgroundImage: `url(${pageHeader4})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </section>

      {/* Fund Our Mission Form Section */}
      <FundForm />
    </div>
  )
}

function ContactPage() {
  return (
    <div>
      {/* Contact Hero Section */}
      <section className="fade-in" style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(112, 28, 69, 0.1) 0%, rgba(139, 42, 91, 0.1) 100%)'
        }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
              <h1 style={{ 
                fontSize: '48px', 
                fontWeight: 'bold', 
                color: '#701C45',
                marginBottom: '24px'
              }}>
                CONTACT US
              </h1>
              <p style={{ 
                fontSize: '18px', 
                color: '#666', 
                lineHeight: '1.6'
              }}>
                Get in touch with us. We're here to help and answer any questions you might have.
              </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${impactLedImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '60px' }}>
            <div>
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: '#701C45',
                marginBottom: '40px'
              }}>
                GET IN TOUCH
              </h2>
              
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Email</h3>
                <p style={{ fontSize: '16px', color: '#666' }}>support@lifedrop.org</p>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Phone</h3>
                <p style={{ fontSize: '16px', color: '#666' }}>+250789534491</p>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Location</h3>
                <p style={{ fontSize: '16px', color: '#666' }}>5 KG 248 St</p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Follow Us</h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a href="#" style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: '#701C45', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: '#701C45', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: '#701C45', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <EnhancedContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}

// Placeholder Pages
function HowItWorksPage() {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  HOW IT WORKS
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Learn how LIFE DROP connects hospitals with blood donors across East Africa through our streamlined digital platform.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${impactLedImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Process Overview Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>STREAMLINED DONATION PROCESS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>1</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Hospital Request</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Hospitals create blood requests with specific type, quantity, and urgency level through our secure platform.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>2</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Smart Matching</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Our algorithm instantly matches requests with eligible donors based on blood type, location, and availability.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>3</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Donor Response</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Verified donors receive instant notifications and can accept or decline donation requests through mobile alerts.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>4</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Donation & Tracking</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Scheduled donations are tracked, recorded, and inventory is automatically updated in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>ADVANCED PLATFORM FEATURES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Real-Time Matching</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>AI-powered algorithm processes donor-request matches within 5 seconds, ensuring rapid response for emergency situations.</p>
            </div>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>24/7 Availability</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Cloud-based infrastructure ensures continuous platform availability for critical blood requests and emergency responses.</p>
            </div>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Secure Data Protection</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Enterprise-grade encryption and authentication protect all medical data in compliance with healthcare privacy regulations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ForHospitalsPage() {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  FOR HOSPITALS
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Register your hospital and post blood requests to our verified donor network. Access life-saving blood when you need it most.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Hospital Benefits Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>COMPREHENSIVE HOSPITAL SOLUTIONS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-4H5v-4h5V5h4v4h5v4h-5v4z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Instant Blood Requests</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Create urgent blood requests with specific type, quantity, and priority level. Our system immediately alerts matching donors within your region.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Verified Donor Network</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Access our network of 10,000+ pre-screened, verified donors with complete medical histories and eligibility verification.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.67 2 3 2.67 3 3.5v15C3 19.33 3.67 20 4.5 20h15c.83 0 1.5-.67 1.5-1.5v-15C21 2.67 20.33 2 19.5 2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Inventory Management</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Real-time blood inventory tracking with expiry date monitoring, automated alerts, and comprehensive donation records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>HOSPITAL REGISTRATION PROCESS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Step 1</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Institution Verification</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Submit hospital license, medical facility certification, and authorized personnel credentials.</p>
            </div>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Step 2</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>System Integration</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Configure API integration with existing hospital management systems and blood bank protocols.</p>
            </div>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Step 3</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Staff Training</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Comprehensive training for medical staff on platform usage, request management, and donor coordination.</p>
            </div>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Step 4</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Go Live</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Begin creating blood requests, accessing donor network, and managing inventory through our platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ForDonorsPage() {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  FOR DONORS
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Join our network of verified blood donors and help save lives in your community. Get notified when hospitals need your blood type.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${impactHero})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Donor Benefits Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>BECOME A VERIFIED LIFE SAVER</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Smart Notifications</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Receive instant alerts when hospitals need your specific blood type. Choose when and where to donate based on your availability.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Health Monitoring</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Track your donation history, eligibility status, and receive health reminders. Our system ensures safe donation intervals.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Impact Tracking</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>See the direct impact of your donations - how many lives you've helped save and which hospitals benefited from your contribution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Requirements Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>DONOR ELIGIBILITY REQUIREMENTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '30px' }}>Basic Requirements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>Age: 18-65 years old</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>Weight: Minimum 50kg (110 lbs)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>Good general health condition</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>No recent illness or medication</span>
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '30px' }}>Safety Intervals</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>3 months between whole blood donations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>2 weeks after minor illness recovery</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>24 hours after dental procedures</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>1 year after major surgery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function BloodDriveEventsPage({ setCurrentPage }) {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  BLOOD DRIVE EVENTS
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Find upcoming blood drive events in your area and schedule your donation. Make a difference in your community.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${donatingImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>UPCOMING BLOOD DRIVE EVENTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div className="hover-card" style={{ background: '#f5f5f5', padding: '30px', borderRadius: '12px', border: '2px solid #701C45' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ background: '#701C45', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>URGENT</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Jan 15, 2025</div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Kigali Central Hospital</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>Emergency blood drive for surgical patients. All blood types needed, especially O- and AB+.</p>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>📍 KN 4 Ave, Kigali • 8:00 AM - 6:00 PM</div>
              <button onClick={() => setCurrentPage('register')} style={{ background: '#701C45', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Register to Donate</button>
            </div>
            <div className="hover-card" style={{ background: '#f5f5f5', padding: '30px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ background: '#4CAF50', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>SCHEDULED</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Mar 10, 2025</div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>University of Rwanda</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>Campus blood drive for students and staff. Mobile donation units available.</p>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>📍 UR Campus, Huye • 9:00 AM - 4:00 PM</div>
              <button onClick={() => setCurrentPage('register')} style={{ background: '#701C45', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Register to Donate</button>
            </div>
            <div className="hover-card" style={{ background: '#f5f5f5', padding: '30px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ background: '#FF9800', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>COMMUNITY</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Apr 25, 2025</div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Nyamirambo Community Center</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>Holiday community blood drive. Family-friendly event with refreshments.</p>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>📍 Nyamirambo, Kigali • 10:00 AM - 3:00 PM</div>
              <button onClick={() => setCurrentPage('register')} style={{ background: '#701C45', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Register to Donate</button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Organization Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>ORGANIZE A BLOOD DRIVE EVENT</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '24px' }}>Partner With Us</h3>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>Organizations, schools, and community groups can partner with LIFE DROP to organize impactful blood drive events. We provide complete support from planning to execution.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>Mobile donation units and medical staff</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>Marketing materials and promotional support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>Real-time donor registration and screening</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#666' }}>Post-event impact reporting and certificates</span>
                </div>
              </div>
            </div>
            <EnhancedEventPartnershipForm />
          </div>
        </div>
      </section>
    </div>
  )
}

function FAQPage() {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  FREQUENTLY ASKED QUESTIONS
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Find answers to common questions about blood donation and our platform. Get the information you need.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${pageHeader4})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#701C45', marginBottom: '40px' }}>For Donors</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Who can donate blood?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Healthy individuals aged 18-65, weighing at least 50kg, with no recent illness or medication that affects blood safety. Our system automatically checks eligibility based on your health profile.</p>
                </div>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>How often can I donate?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Whole blood donations require a 3-month interval between donations. Our platform tracks your donation history and automatically notifies you when you're eligible to donate again.</p>
                </div>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Is the donation process safe?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Yes, all donations are conducted at certified medical facilities with sterile, single-use equipment. Medical professionals oversee the entire process to ensure donor safety.</p>
                </div>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>How do I receive donation requests?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Once registered, you'll receive SMS and app notifications when hospitals need your blood type. You can accept or decline requests based on your availability.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#701C45', marginBottom: '40px' }}>For Hospitals</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>How do I register my hospital?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Submit your medical facility license, certification documents, and authorized personnel credentials. Our verification team reviews applications within 48 hours.</p>
                </div>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>How quickly can I find donors?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Our AI matching system processes requests within 5 seconds and immediately alerts eligible donors in your area. Emergency requests receive priority status compared to other requests.</p>
                </div>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Can I integrate with existing systems?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Yes, our API seamlessly integrates with hospital management systems, blood bank software, and inventory management platforms. Technical support is provided during setup.</p>
                </div>
                <div className="hover-card" style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>How is data security maintained?</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>All medical data is encrypted with enterprise-grade security, compliant with healthcare privacy regulations. Access is restricted to authorized personnel only.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#701C45', marginBottom: '24px' }}>Still Have Questions?</h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px', lineHeight: '1.6' }}>Our support team is available 24/7 to assist with any questions about blood donation, platform usage, or technical issues.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '16px' }}>📧</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Email Support</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>support@lifedrop.org</p>
            </div>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '16px' }}>📞</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Phone Support</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>+250 789 534 491</p>
            </div>
            <div className="hover-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '16px' }}>💬</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Live Chat</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Available 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PartnerWithUsPage() {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  PARTNER WITH US
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Join our network of healthcare partners and expand blood donation access across East Africa.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${pageHeader6})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>STRATEGIC PARTNERSHIP OPPORTUNITIES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div className="hover-card" style={{ background: '#f5f5f5', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-4H5v-4h5V5h4v4h5v4h-5v4z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Healthcare Institutions</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>Hospitals, clinics, and medical centers can integrate our platform to streamline blood procurement and donor management.</p>
              <div style={{ textAlign: 'left', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Direct API integration</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Real-time inventory sync</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Emergency request priority</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Dedicated account management</span>
                </div>
              </div>
            </div>
            <div className="hover-card" style={{ background: '#f5f5f5', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Government Agencies</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>National health ministries and regional health authorities can leverage our platform for public health initiatives.</p>
              <div style={{ textAlign: 'left', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Population-wide donor registration</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Emergency response coordination</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Health data analytics</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Policy compliance reporting</span>
                </div>
              </div>
            </div>
            <div className="hover-card" style={{ background: '#f5f5f5', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Technology Partners</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>Software companies and tech providers can integrate blood donation services into existing healthcare platforms.</p>
              <div style={{ textAlign: 'left', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>White-label solutions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>SDK and API access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Custom integrations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#701C45', borderRadius: '50%' }}></div>
                  <span>Revenue sharing models</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>PARTNERSHIP BENEFITS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '30px' }}>Why Partner with LIFE DROP?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '24px', height: '24px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Proven Impact</h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Join a network that has facilitated over 50,000 successful blood donations across East Africa.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '24px', height: '24px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Advanced Technology</h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Access cutting-edge AI matching algorithms and real-time analytics for optimal donor-hospital connections.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '24px', height: '24px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Regulatory Compliance</h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Full compliance with healthcare data protection and medical privacy regulations across all partner countries.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '24px', height: '24px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>24/7 Support</h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Dedicated technical support and account management to ensure seamless integration and operations.</p>
                  </div>
                </div>
              </div>
            </div>
            <EnhancedPartnershipForm />
          </div>
        </div>
      </section>
    </div>
  )
}

function APIIntegrationPage({ setCurrentPage }) {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  API INTEGRATION
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Integrate LIFE DROP's API with your hospital management system for seamless blood request processing.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${pageHeader3})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* API Features Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>COMPREHENSIVE API SOLUTIONS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ background: '#f5f5f5', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '4px' }}></div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>RESTful API</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Modern REST API with JSON responses, comprehensive documentation, and SDKs for popular programming languages.</p>
            </div>
            <div style={{ background: '#f5f5f5', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%' }}></div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Real-Time Webhooks</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Instant notifications for donor responses, request updates, and inventory changes through secure webhook endpoints.</p>
            </div>
            <div style={{ background: '#f5f5f5', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '4px' }}></div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Enterprise Security</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>OAuth 2.0 authentication, API key management, and encrypted data transmission with healthcare compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>KEY API ENDPOINTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '30px' }}>Blood Request Management</h3>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace' }}>
                <div style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '8px' }}>POST /api/v1/blood-requests</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Create new blood request with type, quantity, urgency</div>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace' }}>
                <div style={{ color: '#2196F3', fontWeight: 'bold', marginBottom: '8px' }}>GET /api/v1/blood-requests/[id]</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Retrieve request status and donor responses</div>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace' }}>
                <div style={{ color: '#FF9800', fontWeight: 'bold', marginBottom: '8px' }}>PUT /api/v1/blood-requests/[id]</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Update request details or close request</div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '30px' }}>Donor & Inventory</h3>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace' }}>
                <div style={{ color: '#2196F3', fontWeight: 'bold', marginBottom: '8px' }}>GET /api/v1/donors/search</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Search available donors by blood type and location</div>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace' }}>
                <div style={{ color: '#2196F3', fontWeight: 'bold', marginBottom: '8px' }}>GET /api/v1/inventory</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Real-time blood inventory levels and expiry dates</div>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace' }}>
                <div style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '8px' }}>POST /api/v1/donations</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Record completed donation and update inventory</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Guide Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', textAlign: 'center', marginBottom: '60px' }}>INTEGRATION PROCESS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>1</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>API Access Request</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Submit integration request with hospital credentials and technical requirements.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>2</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Sandbox Testing</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Test API endpoints in our sandbox environment with sample data and documentation.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>3</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Production Setup</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Deploy to production with security keys, webhook configuration, and monitoring.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#701C45', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>4</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45', marginBottom: '12px' }}>Go Live</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>Launch integration with ongoing support and performance monitoring.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button onClick={() => setCurrentPage('api-request')} style={{ background: '#701C45', color: 'white', padding: '16px 32px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginRight: '20px' }}>Request API Access</button>
            <button style={{ background: 'transparent', color: '#701C45', padding: '16px 32px', borderRadius: '8px', border: '2px solid #701C45', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>View Documentation</button>
          </div>
        </div>
      </section>
    </div>
  )
}



function PrivacyPolicyPage() {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  PRIVACY POLICY
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  Your privacy is important to us. Learn how we collect, use, and protect your information on LIFE DROP.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${smilingChildImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Privacy Overview Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', marginBottom: '24px' }}>DATA PROTECTION COMMITMENT</h2>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>LIFE DROP is committed to protecting your personal and medical information. This policy outlines how we collect, use, store, and protect your data in compliance with international healthcare privacy regulations.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Secure Encryption</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>All personal and medical data is encrypted using AES-256 encryption both in transit and at rest.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Regulatory Compliance</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Full compliance with GDPR, HIPAA, and local healthcare data protection regulations.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>User Control</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Complete control over your data with options to view, update, or delete your information at any time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: 'white', padding: '60px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>1. Information We Collect</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Personal Information:</strong> Name, email address, phone number, date of birth, and location data for donor-hospital matching.</p>
                <p style={{ marginBottom: '16px' }}><strong>Medical Information:</strong> Blood type, medical history, donation records, and eligibility status as required for safe blood donation.</p>
                <p style={{ marginBottom: '16px' }}><strong>Usage Data:</strong> Platform interaction data, login times, and feature usage for service improvement and security monitoring.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>2. How We Use Your Information</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Donor Matching:</strong> Connect eligible donors with hospitals based on blood type, location, and availability.</p>
                <p style={{ marginBottom: '16px' }}><strong>Safety Verification:</strong> Ensure donor eligibility and maintain safe donation intervals according to medical guidelines.</p>
                <p style={{ marginBottom: '16px' }}><strong>Communication:</strong> Send notifications about donation requests, appointment confirmations, and important health updates.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>3. Data Sharing and Disclosure</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Healthcare Partners:</strong> Limited data sharing with verified hospitals and medical facilities for donation coordination.</p>
                <p style={{ marginBottom: '16px' }}><strong>Legal Requirements:</strong> Data may be disclosed when required by law or to protect public health and safety.</p>
                <p style={{ marginBottom: '16px' }}><strong>No Commercial Use:</strong> We never sell or share your personal information with third parties for commercial purposes.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>4. Data Security and Storage</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Encryption:</strong> All data is encrypted using industry-standard AES-256 encryption both in transit and at rest.</p>
                <p style={{ marginBottom: '16px' }}><strong>Access Control:</strong> Strict access controls ensure only authorized personnel can access your information.</p>
                <p style={{ marginBottom: '16px' }}><strong>Data Retention:</strong> Medical data is retained for 7 years as required by healthcare regulations, then securely deleted.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>5. Your Rights and Choices</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Access and Update:</strong> View and update your personal information through your account dashboard.</p>
                <p style={{ marginBottom: '16px' }}><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format.</p>
                <p style={{ marginBottom: '16px' }}><strong>Account Deletion:</strong> Delete your account and associated data, subject to legal retention requirements.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid #e0e0e0' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Last updated: January 2025</p>
              <p style={{ fontSize: '14px', color: '#666' }}>For questions about this privacy policy, contact us at <strong>privacy@lifedrop.org</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TermsOfServicePage() {
  return (
    <div>
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="slide-in-left">
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#701C45',
                  marginBottom: '24px'
                }}>
                  TERMS OF SERVICE
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#666', 
                  lineHeight: '1.6'
                }}>
                  These terms govern your use of the LIFE DROP platform and services. Read our guidelines and policies.
                </p>
              </div>
            </div>
            <div style={{ 
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              backgroundImage: `url(${impactHero})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>
      </section>

      {/* Terms Overview Section */}
      <section className="animate-on-scroll" style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#701C45', marginBottom: '24px' }}>SERVICE AGREEMENT</h2>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>By using LIFE DROP, you agree to these terms of service. Our platform connects blood donors with healthcare facilities to save lives across East Africa through secure, compliant, and efficient blood donation coordination.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>User Responsibilities</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Provide accurate information, maintain account security, and comply with medical eligibility requirements.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Platform Security</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Secure platform with data protection, user authentication, and compliance with healthcare regulations.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#701C45', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', marginBottom: '16px' }}>Service Quality</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>24/7 platform availability, real-time matching, and dedicated support for all users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content Section */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: 'white', padding: '60px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>1. Acceptance of Terms</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}>By accessing or using LIFE DROP services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.</p>
                <p style={{ marginBottom: '16px' }}>These terms apply to all users including donors, hospitals, healthcare facilities, and partner organizations accessing our platform.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>2. User Accounts and Eligibility</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Donor Eligibility:</strong> Must be 18-65 years old, weigh at least 50kg, and meet medical eligibility criteria for blood donation.</p>
                <p style={{ marginBottom: '16px' }}><strong>Hospital Registration:</strong> Must be a licensed medical facility with proper certifications and authorized personnel.</p>
                <p style={{ marginBottom: '16px' }}><strong>Account Security:</strong> Users are responsible for maintaining the confidentiality of their account credentials and all activities under their account.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>3. Platform Usage and Conduct</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Permitted Use:</strong> Use the platform solely for legitimate blood donation coordination and healthcare purposes.</p>
                <p style={{ marginBottom: '16px' }}><strong>Prohibited Activities:</strong> No misuse of medical information, false eligibility claims, or interference with platform operations.</p>
                <p style={{ marginBottom: '16px' }}><strong>Data Accuracy:</strong> Users must provide accurate, current, and complete information and update it as necessary.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>4. Medical Disclaimer and Liability</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Platform Role:</strong> LIFE DROP is a coordination platform and does not provide medical services or medical advice.</p>
                <p style={{ marginBottom: '16px' }}><strong>Medical Responsibility:</strong> All medical decisions, screening, and donation procedures are the responsibility of qualified healthcare professionals.</p>
                <p style={{ marginBottom: '16px' }}><strong>Limitation of Liability:</strong> LIFE DROP is not liable for medical outcomes, donation complications, or healthcare decisions made by users.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>5. Service Availability and Modifications</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>Service Availability:</strong> We strive for 24/7 availability but do not guarantee uninterrupted service due to maintenance or technical issues.</p>
                <p style={{ marginBottom: '16px' }}><strong>Service Modifications:</strong> We reserve the right to modify, suspend, or discontinue services with reasonable notice to users.</p>
                <p style={{ marginBottom: '16px' }}><strong>Updates to Terms:</strong> These terms may be updated periodically, with notice provided through the platform or email.</p>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#701C45', marginBottom: '20px' }}>6. Termination and Account Suspension</h3>
              <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}><strong>User Termination:</strong> Users may terminate their account at any time through account settings.</p>
                <p style={{ marginBottom: '16px' }}><strong>Platform Termination:</strong> We may suspend or terminate accounts for violations of these terms or applicable laws.</p>
                <p style={{ marginBottom: '16px' }}><strong>Data Retention:</strong> Upon termination, data will be handled according to our Privacy Policy and legal requirements.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid #e0e0e0' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Last updated: January 2025</p>
              <p style={{ fontSize: '14px', color: '#666' }}>For questions about these terms, contact us at <strong>legal@lifedrop.org</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App