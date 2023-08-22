import React from 'react';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Dashbord from '../Dashboard/dashboard.js';
import Footer from '../../components/Footer/index.js';
import CardDetails from '../Card Detail/cardDetails.jsx';


const RouterComponent=() => {
  return (

    <BrowserRouter>
      <Routes>
      <Route path='/:userId/:city' element={<Dashbord/>} />
        <Route path='/' element={<Dashbord />} />
        <Route path='/cardDetail/:ward/:line/:card' element={<CardDetails/>} />
        {/* <Route path='/payment-history' element={<Dashbord />} /> */}

        {/* <Route path='/dashboard' element={<Dashbord />} />
        <Route path='/:userId/:city' element={<Topbar />} />
        <Route path='/' element={<Dashbord />} />
        <Route path='/BgServiceManagement' element={<BgServiceManagement/>}/>
        <Route path='/WelcomePage' element={<WelcomePage/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
