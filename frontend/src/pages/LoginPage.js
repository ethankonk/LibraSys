import React, { useState } from 'react'
import '../index.css'
import '../css/login-page.css'

import Login from '../components/Login'
import Navbar from '../components/Navbar'
import StarsCanvas from '../components/StarsCanvas'
import SignUp from '../components/SignUp'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authMethod, setAuthMethod] = useState('login')

  const handleLogin = () => {
    console.log('Email:', email)
    console.log('Password:', password)
  };

  const handleSignUp = () => {
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Confirm Password: ', confirmPassword)
  }

  const toggleAuthMethod = () => {
    setAuthMethod((method) => {
        if (method === 'login') {
            return 'signup'
        }
        else {
            return 'login'
        }
    })
  }

  return (
    <div>
        <StarsCanvas />
        <Navbar background='transparent' buttons={false} />
        {authMethod === 'login' ?
            <Login 
                username={email} 
                password={password} 
                setEmail={setEmail} 
                setPassword={setPassword}
                handleLogin={handleLogin}
                toggleAuthMethod={toggleAuthMethod}
            />
        :
            <SignUp 
                username={email} 
                password={password} 
                confirmPassword={confirmPassword}
                setEmail={setEmail} 
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                handleSignUp={handleSignUp}
                toggleAuthMethod={toggleAuthMethod}
            />
        }
    </div>
  );
};
