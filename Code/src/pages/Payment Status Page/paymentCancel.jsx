import React, { useEffect } from 'react';
import { useRef } from 'react';
import { deleteCCAvenuePaymentRequestHistory } from '../../services/paymentStatusPageService';
import image from '../../assets/image/cancel.gif'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PaymentCancel=()=>{
  const navigate=useNavigate();
  const location=useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const [queryParams,setQueryParams]=useState({});
  const [timer,setTimer]=useState()
useEffect(() => {
  let obj={}
  for (const [key, value] of urlSearchParams) {
    obj[key] = value;
  }
  setQueryParams(obj);
  setDefaults();
  
}, [])

const setDefaults=async()=>{
  let count=3
  const interval=setInterval(async() => {
    setTimer(count);
    count--;
    if(count<0){
      clearInterval(interval);
      navigate('/payment-history');
    }
  }, 1000);
  await deleteCCAvenuePaymentRequestHistory();
    
   
}


  return (
    // <div>paymentCancel</div>
    <div className='back-penal'>
    <div className='main-container container-fluid container-fluid-44 m-auto pt-5'>
      {/* <Header title={'Transaction History'} /> */}
      <div >
        <div className='d-flex justify-content-center align-items-center'>
          <img src={image} alt="" />
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <h5>Payment Cancelled</h5>
        </div>
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <p>Redirecting to payment history page... {timer}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PaymentCancel