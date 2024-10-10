import Hero from './components/pages/Hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hub from './components/pages/Hub';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/hub' element={<Hub />} />
      </Routes>
    </Router>
  );
};

export default App;
