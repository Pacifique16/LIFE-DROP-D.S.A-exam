import React, { useState } from 'react'
import { renderErrorBox } from './validation'
import backgroundImage from './assets/background.png'

const LoginForm = ({ onLogin, setCurrentPage }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    userType: 'donor'
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateLogin = (data) => {
    const errors = {}
    
    if (!data.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!data.password.trim()) {
      errors.password = 'Password is required'
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    return errors
  }

  const handleInputChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateLogin(loginData)
    setErrors(validationErrors)
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        onLogin(loginData.userType, loginData.email)
      }, 1000)
    }
  }

  const getInputStyle = (field) => ({
    width: '100%',
    padding: '12px 16px',
    border: errors[field] ? '2px solid #e74c3c' : '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: errors[field] ? '#fdf2f2' : 'white'
  })

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(112, 28, 69, 0.1) 0%, rgba(139, 42, 91, 0.1) 100%)'
      }}></div>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#701C45',
            marginBottom: '8px'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Sign in to your LifeDrop account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px'
            }}>
              Account Type
            </label>
            <select
              value={loginData.userType}
              onChange={(e) => handleInputChange('userType', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="donor">Donor</option>
              <option value="hospital">Hospital</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={getInputStyle('email')}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
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
              style={getInputStyle('password')}
              placeholder="Enter your password"
            />
          </div>

          {renderErrorBox(errors)}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading ? '#ccc' : '#701C45',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Don't have an account?{' '}
              <span 
                onClick={() => setCurrentPage('register')}
                style={{ color: '#701C45', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Sign up here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm