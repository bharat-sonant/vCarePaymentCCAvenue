
import React,{useState} from 'react';
import { Buffer } from 'buffer';
import {Card, CardContent,Button} from '@mui/material';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { deleteCCAvenuePaymentRequestHistory } from '../../services/paymentStatusPageService';



const PaymentRequest=() => {

  return (
    <div className='back-penal'>
      <div className='main-container container-fluid container-fluid-44 m-auto'>
        <Header title={'Order Confirmation'} hide={true} />
        <div className='row'>
          <div className=' col-md-12 '>
            <div style={{ paddingTop: '70px' }}>
              <Card >
                {/* <CardHeader className='card-header ' title={respObject.cardNo}/> <Divider /> */}
                <CardContent className='card-body'>

                  <div className='table-responsive'>
                    <table className="table table-one-iner mb-0">
                      <tbody>
                        <tr >
                          <th className='border-0 text-left mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row" >
                            <snap className='heading0'> Card No.  </snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {localStorage.getItem('cardNo')}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row" >
                            <snap className='heading0'> Transaction Id </snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {localStorage.getItem('transactionId')}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row" >
                            <snap className='heading0'> Amount (₹) </snap>
                          </th>
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {localStorage.getItem('transactionAmount')}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <PaymentButton/>
        </div>
        
      </div>
    </div>
  );
}

export default PaymentRequest

function PaymentButton() {
  const navigate=useNavigate();
  
  const [accessCode,setAccessCode]=useState('AVPM05KI18AQ03MPQA'); // Replace with your CCAvenue access code
  const [merchant_Id,setMerchantId]=useState('2373725'); // Replace with your CCAvenue merchant ID
  const [order_Id,setOrderId]=useState(localStorage.getItem('transactionId')); // Replace with your order ID
  const [amount,setAmount]=useState(localStorage.getItem('transactionAmount')); // Replace with your order amount
  const [currency,setCurrency]=useState('INR'); // Replace with your currency
  const [language,setLanguage]=useState('EN');
  const [workingKey,setWorkingKey]=useState('65A0242CD1D57D3004836C3BB5532B12'); // Replace with your CCAvenue working key
  const [enRequest,setEnRequest]=useState('');
  const [redirect_url,setReDirectURL]=useState('https://us-central1-ccavenuemalviyanagar.cloudfunctions.net/api/ccavenuePayment');
  const [cancel_url,setCancelURL]=useState('https://us-central1-ccavenuemalviyanagar.cloudfunctions.net/api/ccavenuePayment');
  const [url,setURL]=useState("");
  const ccav = require('../commons/ccavutil.js');
  window.Buffer = Buffer;

  

  const payment=() => {
     const param = "merchant_id="+`${merchant_Id}`+"&order_id="+`${order_Id}`+"&currency="+`${currency}`+"&amount="+`${amount}`+
     "&redirect_url="+`${redirect_url}`+"&cancel_url="+`${cancel_url}`+"&language="+`${language}`;

    const encryptedData = ccav.encrypt(param,workingKey);
    setEnRequest(encryptedData);
  }
  const handleCancel=async()=>{
    await deleteCCAvenuePaymentRequestHistory();
    await navigate('/payment-history');

  }

  return (
    <div className='d-flex mt-4 justify-content-center gap-5'>
      <Button style={{backgroundColor:'#FF0000'}} variant="contained" size='large' onClick={handleCancel} >Cancel</Button>


    <form method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
      <input type="hidden" id="encRequest" name="encRequest" value={enRequest}/>
      <input type="hidden" name="access_code" id="access_code" value={accessCode}/>
      {/* <input type='submit' value="Pay Now"/> */}
      <Button style={{backgroundColor:'#24B903'}} onClick={payment} type='submit' variant="contained" size='large'>Confirm</Button>
    </form>
  </div>
  );
}
