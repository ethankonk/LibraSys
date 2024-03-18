import React, { useState } from 'react'
import '../index.css'
import '../css/login-page.css'

import Login from '../components/Login'
import Navbar from '../components/Navbar'
import StarsCanvas from '../components/StarsCanvas'
import SignUp from '../components/SignUp'
import { useNavigate } from 'react-router-dom'

export default function LoginPage({ setProfile, setLoggedIn }) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authMethod, setAuthMethod] = useState('login')
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/authentication.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        login: true,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setProfile(prevProfile => ({
          ...prevProfile,
          username: data.username,
          email: email,
        }))
        setLoggedIn(true)
        setErrorMessage('');
        navigate("/")
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleSignUp = () => {
    fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/authentication.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        signup: true,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setProfile(prevProfile => ({
          ...prevProfile,
          username: username,
          email: email,
        }))
        setLoggedIn(true)
        setErrorMessage('');
        navigate("/")
      } else {
        setErrorMessage('Email Already in use. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const toggleAuthMethod = () => {
    setErrorMessage('')
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
                email={email} 
                password={password}
                errorMessage={errorMessage} 
                setEmail={setEmail} 
                setPassword={setPassword}
                handleLogin={handleLogin}
                toggleAuthMethod={toggleAuthMethod}
            />
        :
            <SignUp 
                email={email}
                username={username} 
                password={password} 
                confirmPassword={confirmPassword}
                errorMessage={errorMessage}
                setEmail={setEmail} 
                setUsername={setUsername}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                handleSignUp={handleSignUp}
                toggleAuthMethod={toggleAuthMethod}
            />
        }
    </div>
  );
};
