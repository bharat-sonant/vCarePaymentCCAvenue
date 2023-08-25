import React, { useEffect } from 'react';
import { RemoveData } from '../../services/dbService';
import {useNavigate} from 'react-router-dom';
import { deleteCCAvenuePaymentRequestHistory, getCCAvenuePaymentRequestHistory, saveCCAvenuePaymentCollectorHistory, saveCCAvenuePaymentTransactionHistory, savePaymentCollectionHistory } from '../../services/paymentStatusPageService'
import CircularProgress from '@mui/material/CircularProgress';

const PaymentSuccess=()=>{
  const navigate=useNavigate()
useEffect(() => {
  setDefaults()
}, [])
const setDefaults=()=>{
  getCCAvenuePaymentRequestHistory().then(async(response)=>{
    if(response!==null){
    await saveCCAvenuePaymentTransactionHistory(response);
    await savePaymentCollectionHistory(response.monthYear);
    await saveCCAvenuePaymentCollectorHistory(response);
    await deleteCCAvenuePaymentRequestHistory();
    await navigate('/transaction-history');
    console.log('hello')
  }
  })

}

  return (
    <div>Payment Success<CircularProgress color='success'/></div>
    
  )
}

export default PaymentSuccess