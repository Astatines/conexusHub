import Hero from './components/pages/Hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hub from './components/pages/Hub';
import MarketR from './components/pages/MarketR';
import Marketplace from './components/pages/Marketplace';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/hub' element={<Hub />} />
        <Route path='/register-marketplace' element={<MarketR />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
