import React, { useState } from 'react';
import '../index.css'; 

import Login from '../components/Login'
import Navbar from '../components/Navbar'
import StarsCanvas from '../components/StarsCanvas';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login functionality here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
        <StarsCanvas />
        <Navbar background='transparent' buttons={false} />
        <Login 
            username={username} 
            password={password} 
            setUsername={setUsername} 
            setPassword={setPassword}
            handleLogin={handleLogin}
        />
    </div>
  );
};
