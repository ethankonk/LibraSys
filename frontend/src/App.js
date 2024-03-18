import './App.css';

import Footer from './components/Footer';
import Main from './components/Main'

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  useEffect(()=>navigate('/'), [])

  return (
    <div className="App">
      <Main />
      <Footer />
    </div>
  );
}

export default App;
