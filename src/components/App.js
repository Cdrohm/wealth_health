import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Create from '../pages/CreateEmployee'
import View from '../pages/ViewEmployee'
import Error from '../pages/Error'
import { EmployeesContext } from '../context/employeesContext'
import '../style/App.css'

function App() {
  return (
    <EmployeesContext>
    <BrowserRouter basename="wealth_health">
      <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path='/view' element={<View />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
    </EmployeesContext>
  );
}

export default App;
