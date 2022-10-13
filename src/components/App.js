import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Create from '../pages/CreateEmployee'
import View from '../pages/ViewEmployee'
import Error from '../pages/Error'
import './App.css';

function App() {
  return (
    <EmployeeProvider>
    <BrowserRouter basename="wealth_health">
      <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path='/view' element= />
        <Route path='*' element= />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
