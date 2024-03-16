import './App.css';

import Footer from './components/Footer';
import Main from './components/Main'
import { useNavigate } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Main />
      <Footer />
    </div>
  );
}

export default App;
