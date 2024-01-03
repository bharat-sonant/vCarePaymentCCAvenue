import React, { useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { deleteCCAvenuePaymentRequestHistory, getCCAvenuePaymentRequestHistory, saveCCAvenuePaymentCollectorHistory, saveCCAvenuePaymentTransactionHistory, savePaymentCollectionHistory } from '../../services/paymentStatusPageService';
import image from '../../assets/image/success.gif';
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { useState } from 'react';

const PaymentSuccess=()=>{
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
  setDefaults(obj);
}, [])

const setDefaults=async (params)=>{
  let count=5
  const interval=setInterval(async() => {
    setTimer(count);
    count--;
    if(count<0){
      clearInterval(interval);
      navigate('/transaction-history');
    }
  }, 1000);
    await getCCAvenuePaymentRequestHistory().then(async(response)=>{
      if(response!==null){
      const houseId = localStorage.getItem('houseTypeId')
      await saveCCAvenuePaymentTransactionHistory(response,params,houseId);
      await savePaymentCollectionHistory(response.monthYear,houseId);
      await saveCCAvenuePaymentCollectorHistory(response,params,houseId);
      await deleteCCAvenuePaymentRequestHistory();
    }
    })

}

  return (
    // <div>Payment Success<CircularProgress color='success'/></div>
    <div className='back-penal'>
    <div className='main-container container-fluid container-fluid-44 m-auto pt-5'>
      {/* <Header title={'Transaction History'} /> */}
      <div >
        <div className='d-flex justify-content-center align-items-center'>
          <img src={image} alt="" />
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <h5>Payment Done Successfully</h5>
        </div>
       
        <Box className="d-grid " sx={{ pt: 8, pb: 10, gridTemplateColumns: { xs: '100%', sm: '100%', md: '50% 50%', lg: '100% ' } }}>
            <div className='d-flex justify-content-center p-3' >
              <Card className='card'>
              <CardHeader className='card-header ' title={'Transaction Detail'}/> <Divider />
                <CardContent className='card-body '>
                  <div className='table-responsive'>
                    <table className="table table-one-iner mb-0">
                      <tbody>
                        <tr >
                          <th className='border-0 text-left ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row" >
                            <snap className='heading0'> Order Id</snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                         {queryParams.order_id}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row" >
                            <snap className='heading0'> Reference Id</snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                         {queryParams.bank_ref_no}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row" >
                            <snap className='heading0'>Tracking Id</snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                            {queryParams.tracking_id}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row" >
                            <snap className='heading0'>Amount</snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                            ₹ {queryParams.amount}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row" >
                            <snap className='heading0'>Date</snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                          {queryParams.trans_date}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
         
        </Box>

        <div className='d-flex justify-content-center align-items-center'>
          <p>Redirecting to transaction history page... {timer}</p>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default PaymentSuccess