import { useState } from 'react'
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

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [donationStep, setDonationStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Rwanda'
  })

  const renderPage = () => {
    switch(currentPage) {
      case 'about': return <AboutPage />
      case 'impact': return <ImpactPage />
      case 'contact': return <ContactPage />
      case 'donate': return <DonatePage donationStep={donationStep} setDonationStep={setDonationStep} formData={formData} setFormData={setFormData} />
      default: return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
            <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src={logoutIcon} alt="Login" style={{ width: '16px', height: '16px' }} />
              Login
            </a>
            <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <img src={phoneCallIcon} alt="Contact" style={{ width: '16px', height: '16px' }} />
              Contact
            </button>
          </div>
        </div>
      </div>
      
      {/* Header */}
      <header style={{ 
        background: '#701C45',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
              LIFE DROP
            </div>
            <img src={bloodDropIcon} alt="Blood Drop" style={{ width: '32px', height: '32px', filter: 'brightness(0) saturate(100%) invert(100%)' }} />
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <button onClick={() => setCurrentPage('home')} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}>HOME</button>
            <button onClick={() => setCurrentPage('about')} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}>ABOUT US</button>
            <button onClick={() => setCurrentPage('impact')} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}>IMPACT</button>
          </nav>
        </div>
      </header>
      
      <main>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer style={{ 
        background: '#701C45', 
        color: 'white',
        padding: '60px 0 30px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                LIFE DROP
              </div>
              <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
                Join us in transforming survival odds worldwide — by ensuring every woman giving birth, every child battling malaria, and every accident victim fighting for life has access to the life-saving blood they need.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>QUICK LINKS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => setCurrentPage('about')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Our Mission</button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>FUND OUR MISSION</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Corporate Giving</a>
                <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Donate Equipment</a>
                <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>FAQ</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>CONTACT INFORMATION</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Info@lifedrop.org
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
              <a href="#" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Privacy Policy</a>
              <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', cursor: 'pointer', fontSize: '12px' }}>Contact Us</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HomePage({ setCurrentPage }) {
  const [fundFormStep, setFundFormStep] = useState(1)
  const [fundFormData, setFundFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    donationAmount: '',
    customAmount: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: 'Rwanda'
  })

  const partners = [
    { logo: aucaLogo, name: 'AUCA' },
    { logo: kfhLogo, name: 'KFH' },
    { logo: militaryLogo, name: 'Military' },
    { logo: rbcLogo, name: 'RBC' },
    { logo: rwandaLogo, name: 'Rwanda' },
    { logo: ugheLogo, name: 'UGHE' },
    { logo: urLogo, name: 'UR' }
  ]

  const handleFundFormInputChange = (field, value) => {
    setFundFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFundFormNext = () => {
    setFundFormStep(prev => prev + 1)
  }

  const handleFundFormPrevious = () => {
    setFundFormStep(prev => prev - 1)
  }

  const handleFundFormSubmit = () => {
    alert('Thank you for your donation!')
    setFundFormStep(1)
    setFundFormData({
      firstName: '',
      lastName: '',
      email: '',
      donationAmount: '',
      customAmount: '',
      cardNumber: '',
      expirationDate: '',
      securityCode: '',
      country: 'Rwanda'
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
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
                Save lives by helping the world's poorest countries collect sufficient, safe blood.
              </p>
              <button 
                onClick={() => setCurrentPage('donate')}
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
      <section style={{ padding: '80px 0', background: 'white' }}>
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
                In many low-income countries, hospitals face critical shortages of safe blood. Patients—especially women in childbirth, children with severe anemia, and accident victims—suffer and sometimes die due to the lack of an adequate blood supply. Meanwhile, wealthier nations enjoy a stable, safe blood supply that is readily available.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img src={clockIcon} alt="Clock" style={{ width: '24px', height: '24px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  <span style={{ fontSize: '16px', color: '#666' }}>Every 2 seconds, someone needs blood.</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img src={heartIcon} alt="Heart" style={{ width: '24px', height: '24px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  <span style={{ fontSize: '16px', color: '#666' }}>Over 50% of people in low-income countries do not have access to safe blood transfusions.</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img src={userIcon} alt="User" style={{ width: '24px', height: '24px', filter: 'brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1654%) hue-rotate(315deg) brightness(91%) contrast(95%)' }} />
                  <span style={{ fontSize: '16px', color: '#666' }}>1 donation can save up to 3 lives.</span>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentPage('donate')}
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
              <div style={{ 
                width: '100%',
                height: '400px',
                borderRadius: '12px',
                backgroundImage: `url(${medicalSceneImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
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
        </div>
      </section>

      {/* How We Make Impact Section */}
      <section style={{ padding: '80px 0', background: '#f5f5f5' }}>
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
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE DONATE</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>Providing funding, equipment, and expertise to low-income countries.</p>
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
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE ENCOURAGE</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>The blood banking community to share resources.</p>
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
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE ADVOCATE</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>Promoting voluntary, unpaid blood donation globally.</p>
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
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#701C45', margin: 0 }}>WE INFORM</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>Raising awareness about blood shortages and transfusion safety issues.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            marginBottom: '32px'
          }}>
            A LEGACY OF LIFE-SAVING WORK
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            maxWidth: '800px',
            margin: '0 auto 60px',
            lineHeight: '1.6'
          }}>
            Since 2008, LIFE DROP has worked to ensure that no patient is left without access to safe blood. By delivering essential medical supplies and funding life-saving programs, we empower hospitals and blood banks in under-resourced regions to improve transfusion safety. Our efforts have included providing <strong>2,000+ blood mixers/scales</strong> to enhance testing accuracy and supplying nearly <strong>20 mobile donation vehicles</strong> to reach remote communities.
          </p>
          
          {/* Partners Slider */}
          <div style={{ marginTop: '60px' }}>
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
                    style={{ 
                      height: '60px', 
                      objectFit: 'contain',
                      flexShrink: 0
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
            BE A VOICE TO FUND OUR MISSION
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#666', 
            marginBottom: '60px'
          }}>
            Help LIFE DROP save communities in crisis. Make your tax-deductible gift today.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ 
              background: '#701C45',
              color: 'white',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <img src={dealIcon} alt="Deal" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(100%)' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>CORPORATE GIVING</h3>
              <p style={{ fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                Help LIFE DROP save communities in crisis. Make your tax-deductible gift today or match 1:1 donations when your employees give.
              </p>
              <button style={{ 
                background: 'white',
                color: '#701C45',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Give Today
              </button>
            </div>
            
            <div style={{ 
              background: '#701C45',
              color: 'white',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <img src={prayIcon} alt="Pray" style={{ width: '48px', height: '48px', filter: 'brightness(0) saturate(100%) invert(100%)' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>OPEN ARMS</h3>
              <p style={{ fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                Open Arms partners encourage their donors to "give twice" by forgoing their donor gift for a financial donation on the donor's behalf to LIFE DROP.
              </p>
              <button style={{ 
                background: 'white',
                color: '#701C45',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Sign Up
              </button>
            </div>
            
            <div style={{ 
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
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>DONATE EQUIPMENT</h3>
              <p style={{ fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                Consider donating no-longer-needed equipment or supplies for rehoming to a low-income country.
              </p>
              <button style={{ 
                background: 'white',
                color: '#701C45',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Visit EQxchange
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fund Our Mission Form Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            marginBottom: '24px'
          }}>
            FUND OUR MISSION
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            marginBottom: '60px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 60px'
          }}>
            Be the reason someone gets a second chance at life. Help us build a world where no woman, child, or accident victim loses the fight because of a lack of blood. Together, we can make survival the norm — not the exception.
          </p>
          
          <div style={{ 
            textAlign: 'left', 
            maxWidth: '500px', 
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Step {fundFormStep} of 3
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: '#e0e0e0', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '40px'
            }}>
              <div style={{ 
                width: `${(fundFormStep / 3) * 100}%`, 
                height: '100%', 
                background: '#4CAF50',
                transition: 'width 0.3s ease'
              }}></div>
            </div>

            {fundFormStep === 1 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Name <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>First</label>
                      <input 
                        type="text"
                        value={fundFormData.firstName}
                        onChange={(e) => handleFundFormInputChange('firstName', e.target.value)}
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
                    <div>
                      <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>Last</label>
                      <input 
                        type="text"
                        value={fundFormData.lastName}
                        onChange={(e) => handleFundFormInputChange('lastName', e.target.value)}
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
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Email <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <input 
                    type="email"
                    value={fundFormData.email}
                    onChange={(e) => handleFundFormInputChange('email', e.target.value)}
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
                  onClick={handleFundFormNext}
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
                  Next
                </button>
              </>
            )}

            {fundFormStep === 2 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '16px'
                  }}>
                    Donation Amount <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ marginBottom: '16px' }}>
                    {['10', '50', '250'].map(amount => (
                      <label key={amount} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="donationAmount" 
                          value={amount}
                          checked={fundFormData.donationAmount === amount}
                          onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                          style={{ marginRight: '8px' }}
                        />
                        ${amount} USD
                      </label>
                    ))}
                    <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="donationAmount" 
                        value="custom"
                        checked={fundFormData.donationAmount === 'custom'}
                        onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                        style={{ marginRight: '8px' }}
                      />
                      Other amount
                    </label>
                  </div>
                  {fundFormData.donationAmount === 'custom' && (
                    <input 
                      type="number"
                      placeholder="Enter amount"
                      value={fundFormData.customAmount}
                      onChange={(e) => handleFundFormInputChange('customAmount', e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: '2px solid #e0e0e0', 
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        marginTop: '8px'
                      }}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={handleFundFormPrevious}
                    style={{ 
                      background: '#6c757d',
                      color: 'white', 
                      padding: '16px 32px', 
                      borderRadius: '25px', 
                      border: 'none', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleFundFormNext}
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
                    Next
                  </button>
                </div>
              </>
            )}

            {fundFormStep === 3 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Credit Card <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ marginBottom: '16px' }}>
                    <input 
                      type="text"
                      placeholder="Card number"
                      value={fundFormData.cardNumber}
                      onChange={(e) => handleFundFormInputChange('cardNumber', e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: '2px solid #e0e0e0', 
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        marginBottom: '16px'
                      }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <input 
                        type="text"
                        placeholder="MM/YY"
                        value={fundFormData.expirationDate}
                        onChange={(e) => handleFundFormInputChange('expirationDate', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          border: '2px solid #e0e0e0', 
                          borderRadius: '8px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input 
                        type="text"
                        placeholder="CVC"
                        value={fundFormData.securityCode}
                        onChange={(e) => handleFundFormInputChange('securityCode', e.target.value)}
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
                  </div>
                  <select 
                    value={fundFormData.country}
                    onChange={(e) => handleFundFormInputChange('country', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      border: '2px solid #e0e0e0', 
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Rwanda">Rwanda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={handleFundFormPrevious}
                    style={{ 
                      background: '#6c757d',
                      color: 'white', 
                      padding: '16px 32px', 
                      borderRadius: '25px', 
                      border: 'none', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleFundFormSubmit}
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
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function DonatePage({ donationStep, setDonationStep, formData, setFormData }) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setDonationStep(2)
  }

  const handlePrevious = () => {
    setDonationStep(1)
  }

  const handleSubmit = () => {
    alert('Thank you for your donation!')
  }

  return (
    <div style={{ padding: '80px 0', background: '#f5f5f5', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            marginBottom: '16px'
          }}>
            MAKE AN IMPACT TODAY
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Your support ensures that life-saving blood is accessible where it's needed most.
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#701C45' }}>
              Step {donationStep} of 3
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
              width: `${(donationStep / 3) * 100}%`, 
              height: '100%', 
              background: '#4CAF50',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {donationStep === 1 && (
          <div style={{ 
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: '8px'
              }}>
                Name <span style={{ color: '#e74c3c' }}>(Required)</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>First</label>
                  <input 
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
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
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>Last</label>
                  <input 
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
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
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: '8px'
              }}>
                Email <span style={{ color: '#e74c3c' }}>(Required)</span>
              </label>
              <input 
                type="email"
                value={formData.email}
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
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}

        {donationStep === 2 && (
          <div style={{ 
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: '8px'
              }}>
                Country
              </label>
              <select 
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '2px solid #e0e0e0', 
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="Rwanda">Rwanda</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
              </select>
            </div>

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
                  cursor: 'pointer'
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
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AboutPage() {
  const [fundFormStep, setFundFormStep] = useState(1)
  const [fundFormData, setFundFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    donationAmount: '',
    customAmount: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: 'Rwanda'
  })

  const handleFundFormInputChange = (field, value) => {
    setFundFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFundFormNext = () => {
    setFundFormStep(prev => prev + 1)
  }

  const handleFundFormPrevious = () => {
    setFundFormStep(prev => prev - 1)
  }

  const handleFundFormSubmit = () => {
    alert('Thank you for your donation!')
    setFundFormStep(1)
    setFundFormData({
      firstName: '',
      lastName: '',
      email: '',
      donationAmount: '',
      customAmount: '',
      cardNumber: '',
      expirationDate: '',
      securityCode: '',
      country: 'Rwanda'
    })
  }

  return (
    <div>

      {/* Mission Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
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
                Our aim is simple; to save lives by improving the availability and safety of blood in some of the world's poorest nations.
              </p>
              <button style={{ 
                background: '#701C45',
                color: 'white', 
                padding: '16px 32px', 
                borderRadius: '25px', 
                border: 'none', 
                fontSize: '16px', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Become a partner
              </button>
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
      <section style={{ padding: '100px 0', background: 'white' }}>
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
                LIFE DROP is a charity dedicated to reducing worldwide inequities in blood safety and sufficiency. Since 2008, we have helped over 50 poorly resourced countries in Africa, Asia and Latin America better serve their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section style={{ padding: '100px 0', background: '#f5f5f5' }}>
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
                LIFE DROP has been reducing worldwide inequities in blood safety and sufficiency since 2008.
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
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            marginBottom: '24px'
          }}>
            FUND OUR MISSION
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            marginBottom: '60px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 60px'
          }}>
            Be the reason someone gets a second chance at life. Help us build a world where no woman, child, or accident victim loses the fight because of a lack of blood. Together, we can make survival the norm — not the exception.
          </p>
          
          <div style={{ 
            textAlign: 'left', 
            maxWidth: '500px', 
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Step {fundFormStep} of 3
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: '#e0e0e0', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '40px'
            }}>
              <div style={{ 
                width: `${(fundFormStep / 3) * 100}%`, 
                height: '100%', 
                background: '#4CAF50',
                transition: 'width 0.3s ease'
              }}></div>
            </div>

            {fundFormStep === 1 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Name <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>First</label>
                      <input 
                        type="text"
                        value={fundFormData.firstName}
                        onChange={(e) => handleFundFormInputChange('firstName', e.target.value)}
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
                    <div>
                      <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>Last</label>
                      <input 
                        type="text"
                        value={fundFormData.lastName}
                        onChange={(e) => handleFundFormInputChange('lastName', e.target.value)}
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
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Email <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <input 
                    type="email"
                    value={fundFormData.email}
                    onChange={(e) => handleFundFormInputChange('email', e.target.value)}
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
                  onClick={handleFundFormNext}
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
                  Next
                </button>
              </>
            )}

            {fundFormStep === 2 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '16px'
                  }}>
                    Donation Amount <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ marginBottom: '16px' }}>
                    {['10', '50', '250'].map(amount => (
                      <label key={amount} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="donationAmount" 
                          value={amount}
                          checked={fundFormData.donationAmount === amount}
                          onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                          style={{ marginRight: '8px' }}
                        />
                        ${amount} USD
                      </label>
                    ))}
                    <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="donationAmount" 
                        value="custom"
                        checked={fundFormData.donationAmount === 'custom'}
                        onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                        style={{ marginRight: '8px' }}
                      />
                      Other amount
                    </label>
                  </div>
                  {fundFormData.donationAmount === 'custom' && (
                    <input 
                      type="number"
                      placeholder="Enter amount"
                      value={fundFormData.customAmount}
                      onChange={(e) => handleFundFormInputChange('customAmount', e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: '2px solid #e0e0e0', 
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        marginTop: '8px'
                      }}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={handleFundFormPrevious}
                    style={{ 
                      background: '#6c757d',
                      color: 'white', 
                      padding: '16px 32px', 
                      borderRadius: '25px', 
                      border: 'none', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleFundFormNext}
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
                    Next
                  </button>
                </div>
              </>
            )}

            {fundFormStep === 3 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Credit Card <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ marginBottom: '16px' }}>
                    <input 
                      type="text"
                      placeholder="Card number"
                      value={fundFormData.cardNumber}
                      onChange={(e) => handleFundFormInputChange('cardNumber', e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: '2px solid #e0e0e0', 
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        marginBottom: '16px'
                      }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <input 
                        type="text"
                        placeholder="MM/YY"
                        value={fundFormData.expirationDate}
                        onChange={(e) => handleFundFormInputChange('expirationDate', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          border: '2px solid #e0e0e0', 
                          borderRadius: '8px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input 
                        type="text"
                        placeholder="CVC"
                        value={fundFormData.securityCode}
                        onChange={(e) => handleFundFormInputChange('securityCode', e.target.value)}
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
                  </div>
                  <select 
                    value={fundFormData.country}
                    onChange={(e) => handleFundFormInputChange('country', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      border: '2px solid #e0e0e0', 
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Rwanda">Rwanda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={handleFundFormPrevious}
                    style={{ 
                      background: '#6c757d',
                      color: 'white', 
                      padding: '16px 32px', 
                      borderRadius: '25px', 
                      border: 'none', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleFundFormSubmit}
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
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
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
  const [fundFormStep, setFundFormStep] = useState(1)
  const [fundFormData, setFundFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    donationAmount: '',
    customAmount: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: 'Rwanda'
  })

  const handleFundFormInputChange = (field, value) => {
    setFundFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFundFormNext = () => {
    setFundFormStep(prev => prev + 1)
  }

  const handleFundFormPrevious = () => {
    setFundFormStep(prev => prev - 1)
  }

  const handleFundFormSubmit = () => {
    alert('Thank you for your donation!')
    setFundFormStep(1)
    setFundFormData({
      firstName: '',
      lastName: '',
      email: '',
      donationAmount: '',
      customAmount: '',
      cardNumber: '',
      expirationDate: '',
      securityCode: '',
      country: 'Rwanda'
    })
  }

  return (
    <div>
      {/* Impact Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
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
                Anyone whose life has been touched by blood – understands its power to transform lives.
              </p>
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
      <section style={{ padding: '100px 0', background: 'white' }}>
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
            A healthier community needs a sustainable blood supply. Every day, somewhere in the world, our neighbors face disease outbreaks, extreme poverty and other crises. Their need for a safe, sufficient blood supply has never been greater. Read the stories of lives saved and communities healed.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
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
              <div style={{ 
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
              <div style={{ 
                width: '100%',
                height: '300px',
                borderRadius: '12px',
                backgroundImage: `url(${anemiaImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '20px'
              }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#701C45', marginBottom: '8px' }}>Emma Rodriguez</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>"My daughter's battle with anemia was won thanks to regular blood transfusions. Every donor is a lifesaver."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplying the World Section */}
      <section style={{ padding: '100px 0', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            SUPPLYING THE WORLD
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', fontSize: '16px', color: '#666', lineHeight: '1.8' }}>
            <div>
              <p>• Delivered over $2,000,000 (depreciated value) of re-homed equipment.</p>
              <p>• Provide support to over 50 countries.</p>
              <p>• Established first and only blood bank in Northern Laos.</p>
              <p>• Donated two Trima Accel® Automated Blood Collection Systems to Ghanaian Ebola Readiness and Resilience Initiative.</p>
              <p>• Hundreds of portable donor beds delivered to Nigeria, Mexico, Lesotho and Cambodia.</p>
              <p>• Purchased computer equipment for a blood collector in Kenya.</p>
              <p>• Delivered LifeServe machines to help grow the blood programs in Mexico.</p>
              <p>• Funded a new TV spot to recruit blood donors in Haiti.</p>
              <p>• Purchased technical manuals for 19 blood services across Latin America.</p>
            </div>
            <div>
              <p>• Supplied multiple bloodmobiles to increase collections in Mexico, Malawi and Lebanon.</p>
              <p>• Hundreds of donation mixer/scales to Tanzania, Rwanda, Liberia, Botswana.</p>
              <p>• Hemapheresis technology sent to Africa, the Middle East and Eastern Europe.</p>
              <p>• Centrifuges supplied to Mexico.</p>
              <p>• Clinical uniforms delivered to Armenia.</p>
              <p>• Purchased computer equipment for a blood collector in Kenya.</p>
              <p>• Provided promotional materials for a blood collector in Mexico.</p>
              <p>• Funded recruitment training in Eastern Europe.</p>
              <p>• Funded a trainer to deliver recruitment training in Georgia (Eastern Caucasus).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{ 
                fontSize: '18px', 
                color: '#666', 
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                LIFE DROP focuses on enabling blood services in resource-poor countries to nurture that most precious of resources – blood donors.
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
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#701C45',
            marginBottom: '24px'
          }}>
            FUND OUR MISSION
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            marginBottom: '60px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 60px'
          }}>
            Be the reason someone gets a second chance at life. Help us build a world where no woman, child, or accident victim loses the fight because of a lack of blood. Together, we can make survival the norm — not the exception.
          </p>
          
          <div style={{ 
            textAlign: 'left', 
            maxWidth: '500px', 
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Step {fundFormStep} of 3
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: '#e0e0e0', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '40px'
            }}>
              <div style={{ 
                width: `${(fundFormStep / 3) * 100}%`, 
                height: '100%', 
                background: '#4CAF50',
                transition: 'width 0.3s ease'
              }}></div>
            </div>

            {fundFormStep === 1 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Name <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>First</label>
                      <input 
                        type="text"
                        value={fundFormData.firstName}
                        onChange={(e) => handleFundFormInputChange('firstName', e.target.value)}
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
                    <div>
                      <label style={{ fontSize: '14px', color: '#666', marginBottom: '4px', display: 'block' }}>Last</label>
                      <input 
                        type="text"
                        value={fundFormData.lastName}
                        onChange={(e) => handleFundFormInputChange('lastName', e.target.value)}
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
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Email <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <input 
                    type="email"
                    value={fundFormData.email}
                    onChange={(e) => handleFundFormInputChange('email', e.target.value)}
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
                  onClick={handleFundFormNext}
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
                  Next
                </button>
              </>
            )}

            {fundFormStep === 2 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '16px'
                  }}>
                    Donation Amount <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ marginBottom: '16px' }}>
                    {['10', '50', '250'].map(amount => (
                      <label key={amount} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="donationAmount" 
                          value={amount}
                          checked={fundFormData.donationAmount === amount}
                          onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                          style={{ marginRight: '8px' }}
                        />
                        ${amount} USD
                      </label>
                    ))}
                    <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="donationAmount" 
                        value="custom"
                        checked={fundFormData.donationAmount === 'custom'}
                        onChange={(e) => handleFundFormInputChange('donationAmount', e.target.value)}
                        style={{ marginRight: '8px' }}
                      />
                      Other amount
                    </label>
                  </div>
                  {fundFormData.donationAmount === 'custom' && (
                    <input 
                      type="number"
                      placeholder="Enter amount"
                      value={fundFormData.customAmount}
                      onChange={(e) => handleFundFormInputChange('customAmount', e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: '2px solid #e0e0e0', 
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        marginTop: '8px'
                      }}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={handleFundFormPrevious}
                    style={{ 
                      background: '#6c757d',
                      color: 'white', 
                      padding: '16px 32px', 
                      borderRadius: '25px', 
                      border: 'none', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleFundFormNext}
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
                    Next
                  </button>
                </div>
              </>
            )}

            {fundFormStep === 3 && (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Credit Card <span style={{ color: '#e74c3c' }}>(Required)</span>
                  </label>
                  <div style={{ marginBottom: '16px' }}>
                    <input 
                      type="text"
                      placeholder="Card number"
                      value={fundFormData.cardNumber}
                      onChange={(e) => handleFundFormInputChange('cardNumber', e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        border: '2px solid #e0e0e0', 
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        marginBottom: '16px'
                      }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <input 
                        type="text"
                        placeholder="MM/YY"
                        value={fundFormData.expirationDate}
                        onChange={(e) => handleFundFormInputChange('expirationDate', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          border: '2px solid #e0e0e0', 
                          borderRadius: '8px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input 
                        type="text"
                        placeholder="CVC"
                        value={fundFormData.securityCode}
                        onChange={(e) => handleFundFormInputChange('securityCode', e.target.value)}
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
                  </div>
                  <select 
                    value={fundFormData.country}
                    onChange={(e) => handleFundFormInputChange('country', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      border: '2px solid #e0e0e0', 
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Rwanda">Rwanda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={handleFundFormPrevious}
                    style={{ 
                      background: '#6c757d',
                      color: 'white', 
                      padding: '16px 32px', 
                      borderRadius: '25px', 
                      border: 'none', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleFundFormSubmit}
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
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  return (
    <div>
      {/* Contact Hero Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
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
            <div style={{ 
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              backgroundImage: `url(${impactLedImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
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
                <p style={{ fontSize: '16px', color: '#666' }}>Info@lifedrop.org</p>
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
            
            <div style={{ 
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
              <form>
                <div style={{ marginBottom: '20px' }}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
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
                <div style={{ marginBottom: '20px' }}>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
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
                <div style={{ marginBottom: '20px' }}>
                  <textarea 
                    placeholder="Your Message" 
                    rows="5"
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      border: '2px solid #e0e0e0', 
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }} 
                  />
                </div>
                <button 
                  type="submit" 
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
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App