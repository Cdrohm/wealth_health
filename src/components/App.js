import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Create from '../pages/CreateEmployee'
import View from '../pages/ViewEmployee'
import Error from '../pages/Error'
import './App.css';

function App() {
  return (
    <Provider>
    <BrowserRouter basename="wealth_health">
      <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element= />
        <Route path='/view' element= />
        <Route path='*' element= />
      </Routes>
      <Footer />
    </div>
    <BrowserRouter/>
    </Provider>
  );
}

export default App;
