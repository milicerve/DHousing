import React from 'react'
import {ThemeProvider} from '@mui/material'
import theme from './theme'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import Login from './pages/login/Login'
import CreateAccount from './pages/login/CreateAccount'
import Confirmation from './pages/confirmation/Confirmation'
import ConfirmationProductCreation from './pages/confirmationProduct/ConfirmationProductCreation'
import Booking from './pages/booking/Booking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FindByCiudad from './pages/find/FindByCiudad'
import FindByCategoria from './pages/find/FindByCategoria'
import ScrollToTop from './components/ScrollToTop'
import CreateAccountOk from './pages/confirmation/CreateAccountOk'
import Administration from './pages/administration/Administration'
import ReservationList from './pages/reservation/ReservationList'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <ScrollToTop />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createAccount' element={<CreateAccount/>}/>
          <Route path='/producto/:id' element={<Product/>}/>
          <Route path='/producto/:id/reserva' element={<Booking/>}/>
          <Route path='/confirmation' element={<Confirmation/>}/>
          <Route path='/producto/findByCiudad/:id' element={<FindByCiudad/>}/>
          <Route path='/producto/findByCategoria/:id' element={<FindByCategoria/>}/>
          <Route path='/createdProductSucces' element={<ConfirmationProductCreation/>}/>
          <Route path='/administracion' element={<Administration/>}/>
          <Route path='/createAccountOk' element={<CreateAccountOk/>}/>
          <Route path='/:userid/reservas' element={<ReservationList/>}/>
          <Route path='*' element={<Home/>}/>
        </Routes>
      <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
