import React from 'react';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Dashbord from '../Dashboard/dashboard.js';
import CardDetails from '../Card Detail/cardDetails.jsx';
import PaymentHistory from '../Payment History/paymentHistory.jsx';
import TransactionHistory from '../Transaction History/transactionHistory.jsx';
import PaymentCancel from '../Payment Status Page/paymentCancel.jsx';
import PaymentSuccess from '../Payment Status Page/paymentSuccess.jsx';


const RouterComponent=() => {
  return (

    <BrowserRouter>
      <Routes>
      <Route path='/:userId/:city' element={<Dashbord/>} />
        <Route path='/' element={<Dashbord />} />
        <Route path='/cardDetail' element={<CardDetails/>} />
        <Route path='/payment-history' element={<PaymentHistory/>} /> 
        <Route path='/transaction-history' element={<TransactionHistory/>} /> 
        <Route path='/payment-cancel' element={<PaymentCancel/>} /> 
        <Route path='/payment-success' element={<PaymentSuccess/>} /> 

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
