import React, { useEffect } from 'react'
import { RemoveData } from '../../services/dbService'

const PaymentCancel=()=>{
useEffect(() => {
  RemoveData(localStorage.getItem('removePath'))
}, [])

  return (
    <div>paymentCancel</div>
  )
}

export default PaymentCancel