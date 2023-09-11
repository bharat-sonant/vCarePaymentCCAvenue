
import React,{useEffect,useState} from 'react';
import {encrypt} from '../../services/commonService';
import CryptoJS from 'crypto-js';



const PaymentRequest=() => {
  const [accessCode,setAccessCode]=useState('AVPM05KI18AQ03MPQA'); // Replace with your CCAvenue access code
  const [merchantId,setMerchantId]=useState('2373725'); // Replace with your CCAvenue merchant ID
  const [orderId,setOrderId]=useState('12345'); // Replace with your order ID
  const [amount,setAmount]=useState('1.00'); // Replace with your order amount
  const [currency,setCurrency]=useState('INR'); // Replace with your currency
  const [language,setLanguage]=useState('EN');
  const [workingKey,setWorkingKey]=useState('65A0242CD1D57D3004836C3BB5532B12'); // Replace with your CCAvenue working key
  const [enRequest,setEnRequest]=useState('');
  const [redirect_url,setReDirectURL]=useState('http://localhost:3000/payment-success');
  const [cancel_url,setCancelURL]=useState('http://localhost:3000/payment-cancel');
  const [url,setURL]=useState("");

  useEffect(() => {
    const data=`${merchantId}|${orderId}|${amount}|${currency}|${workingKey}|${redirect_url}|${cancel_url}|${language}`;

    // Create the hash using SHA-256
    const hash=CryptoJS.SHA256(data).toString();
    
    console.log(hash);

    setEnRequest(hash);
  },[])

  const payment=() => {
    // Prepare the data to be hashed
    const data=`${merchantId}|${orderId}|${amount}|${currency}|${workingKey}|${redirect_url}|${cancel_url}|${language}`;

    // Create the hash using SHA-256
    const hash=CryptoJS.SHA256(data).toString();
    
    console.log(hash);

    setEnRequest(hash);

    let url="https://apitest.ccavenue.com/apis/servlet/DoWebTrans?enc_request="+hash+"&access_code=AVOG56KE91AF72GOFA&command=confirmOrder&request_type=XML&response_type=XML&version=1.1"
setURL(url);


    //window.location.href=url;


  }





  return (
    <div>
      <form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
      <input type="hidden" id="encRequest" name="encRequest" value={enRequest}/>
      <input type="hidden" name="access_code" id="access_code" value={accessCode}/>
      <input type='submit' value="Pay Now"/>
      </form>
      <div className='col-lg-12 d-flex justify-content-center align-items-center' >
        hi
        <input type="button" value={"Submit"} onClick={payment} />
      </div>
      <form method="POST" name="customerData" action={url}>

        <table width="40%" height="100" border='1' align="center">
          <caption>
            <font size="4" color="blue"><b>Integration Kit</b></font>
          </caption>
        </table>
        <table width="40%" height="100" border='1' align="center">
          <tr>
            <td>Parameter Name:</td>
            <td>Parameter Value:</td>
          </tr>
          <tr>
            <td colspan="2">Compulsory information</td>
          </tr>
          <tr>
            <td>Merchant Id</td>
            <td><input type="text" name="merchant_id" id="merchant_id" /> </td>
          </tr>
          <tr>
            <td>Order Id</td>
            <td><input type="text" name="order_id" /></td>
          </tr>
          <tr>
            <td>Currency</td>
            <td><input type="text" name="currency" value="INR" /></td>
          </tr>
          <tr>
            <td>Amount</td>
            <td><input type="text" name="amount" value="1.00" /></td>
          </tr>
          <tr>
            <td>Redirect URL</td>
            <td><input type="text" name="redirect_url"
              value="http://127.0.0.1:3001/ccavResponseHandler" />
            </td>
          </tr>
          <tr>
            <td>Cancel URL</td>
            <td><input type="text" name="cancel_url"
              value="http://127.0.0.1:3001/ccavResponseHandler" />
            </td>
          </tr>
          <tr>
            <td>Language</td>
            <td><input type="text" name="language" id="language" value="EN" /></td>
          </tr>
          <tr>
            <td colspan="2">Billing information(optional):</td>
          </tr>
          <tr>
            <td>Billing Name</td>
            <td><input type="text" name="billing_name" value="Peter" /></td>
          </tr>
          <tr>
            <td>Billing Address:</td>
            <td><input type="text" name="billing_address"
              value="Santacruz" /></td>
          </tr>
          <tr>
            <td>Billing City:</td>
            <td><input type="text" name="billing_city" value="Mumbai" /></td>
          </tr>
          <tr>
            <td>Billing State:</td>
            <td><input type="text" name="billing_state" value="MH" /></td>
          </tr>
          <tr>
            <td>Billing Zip:</td>
            <td><input type="text" name="billing_zip" value="400054" /></td>
          </tr>
          <tr>
            <td>Billing Country:</td>
            <td><input type="text" name="billing_country" value="India" />
            </td>
          </tr>
          <tr>
            <td>Billing Tel:</td>
            <td><input type="text" name="billing_tel" value="9876543210" />
            </td>
          </tr>
          <tr>
            <td>Billing Email:</td>
            <td><input type="text" name="billing_email"
              value="testing@domain.com" /></td>
          </tr>
          <tr>
            <td colspan="2">Shipping information(optional):</td>
          </tr>
          <tr>
            <td>Shipping Name</td>
            <td><input type="text" name="delivery_name" value="Sam" />
            </td>
          </tr>
          <tr>
            <td>Shipping Address:</td>
            <td><input type="text" name="delivery_address"
              value="Vile Parle" /></td>
          </tr>
          <tr>
            <td>Shipping City:</td>
            <td><input type="text" name="delivery_city" value="Mumbai" />
            </td>
          </tr>
          <tr>
            <td>Shipping State:</td>
            <td><input type="text" name="delivery_state" value="Maharashtra" />
            </td>
          </tr>
          <tr>
            <td>Shipping Zip:</td>
            <td><input type="text" name="delivery_zip" value="400038" /></td>
          </tr>
          <tr>
            <td>Shipping Country:</td>
            <td><input type="text" name="delivery_country" value="India" />
            </td>
          </tr>
          <tr>
            <td>Shipping Tel:</td>
            <td><input type="text" name="delivery_tel" value="0123456789" />
            </td>
          </tr>
          <tr>
            <td>Merchant Param1</td>
            <td><input type="text" name="merchant_param1"
              value="additional Info." /></td>
          </tr>
          <tr>
            <td>Merchant Param2</td>
            <td><input type="text" name="merchant_param2"
              value="additional Info." /></td>
          </tr>
          <tr>
            <td>Merchant Param3</td>
            <td><input type="text" name="merchant_param3"
              value="additional Info." /></td>
          </tr>
          <tr>
            <td>Merchant Param4</td>
            <td><input type="text" name="merchant_param4"
              value="additional Info." /></td>
          </tr>
          <tr>
            <td>Merchant Param5</td>
            <td><input type="text" name="merchant_param5"
              value="additional Info." /></td>
          </tr>
          <tr>
            <td>Promo Code:</td>
            <td><input type="text" name="promo_code" value="" /></td>
          </tr>
          <tr>
            <td>Customer Id:</td>
            <td><input type="text" name="customer_identifier" value="" /></td>
          </tr>
          <tr>
            <td></td>
            <td><input type="submit" value="Checkout" /></td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default PaymentRequest