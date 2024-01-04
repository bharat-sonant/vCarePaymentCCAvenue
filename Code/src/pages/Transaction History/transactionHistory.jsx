import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Card, CardContent} from '@mui/material';
import { getCCAvenuePaymentTransactionHistory } from '../../services/transactionHistoryService';
import { useState } from 'react';
import { showAlertMobile } from '../../services/commonService';
import './transactionHistory.css';

const TransactionHistory = () => {
  const [historyArray, setHistoryArray] = useState([])
  useEffect(() => {
    setDefault()

  }, [])

  const setDefault = () => {
    const houseId = localStorage.getItem('houseTypeId')
    getCCAvenuePaymentTransactionHistory(houseId).then(list => {
      if (list !== null) {
        setHistoryArray([...list])
      }
      else {
        showAlertMobile('No history found..', 'error')
      }
    })
  }

  return (
    <div className='back-penal'>
      <div className='main-container container-fluid container-fluid-44 m-auto'>
        <Header title={'Transaction History'} />
        <div >
          <Box className="d-grid " sx={{ pt: 8, pb: 10, gridTemplateColumns: { xs: '100%', sm: '100%', md: '50% 50%', lg: '100% ' } }}>
            {historyArray.map(item => (
              <div className='d-flex justify-content-center p-3' key={item.orderId} >
                <Card className='card'>
                  {/* <CardHeader className='card-header ' title="Card Details" /> <Divider/> */}
                  <CardContent className='card-body '>
                    {/* <Box >
                    <div className='col-md-12 d-flex'>
                    <label >Order Id :</label><Typography  ml={1}>{item.orderId}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label>Transaction Date:</label><Typography ml={1}>{item.transactionDate}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label>Transaction Amount :</label><Typography ml={1}>{item.transactionAmount}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label>Reference Id :</label><Typography ml={1}>{item.referenceId}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label>Pay Method :</label><Typography ml={1}>{item.payMethod}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label>Collectore Name :</label><Typography ml={1}>{item.collectorName}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label>Paid Month :</label><Typography ml={1}>{item.paidMonth}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label>Status :</label><Typography ml={1}>{item.status}</Typography>
                    </div>
                  </Box> */}
                    <div className='table-responsive'>
                      <table className="table table-one-iner mb-0">

                        <tbody>
                          <tr >
                            <th className='border-0 text-left ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row" >
                              <snap className='heading0'> Order Id</snap>
                            </th>
                            {/* <td className='border-0 mb-3' style={{ width: '5%', }} ></td> */}
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {item.orderId}
                            </td>
                          </tr>
                          <tr >
                            <th className='border-0 text-left ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row" >
                              <snap className='heading0'> Transaction Date  </snap>
                            </th>
                            {/* <td className='border-0 mb-3' style={{ width: '5%', }} ></td> */}
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {item.transactionDate}
                            </td>
                          </tr>
                          <tr >
                            <th className='border-0 ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row">
                              <snap className='heading0'>  Reference Id </snap>
                            </th>
                            {/* <td className='border-0 mb-2' style={{ width: '5%', }}></td> */}
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {item.referenceId}
                            </td>
                          </tr>

                          <tr  >
                            <th className='border-0 ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row">
                              <snap className='heading0'> Transaction Amount  </snap>
                            </th>
                            {/* <td className='border-0 mb-2' style={{ width: '5%', }} ></td> */}
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {Number(item.transactionAmount).toFixed(2)}
                                 <sanp className='ms-1'> ₹</sanp> </td>
                          </tr>


                          <tr  >
                            <th className='border-0 ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row">
                              <snap className='heading0'> Pay Method  </snap>
                            </th>
                            {/* <td className='border-0 mb-2' style={{ width: '5%', }} ></td> */}
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {item.payMethod}
                            </td>
                          </tr>
                          {/* <tr >
                            <th className='border-0 ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row">
                              <snap className='heading0'> Collectore Name  </snap>
                            </th>
                          
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {item.collectorName}
                            </td>
                          </tr> */}
                          <tr >
                            <th className='border-0 ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row">
                              <snap className='heading0'> Paid Month  </snap>
                            </th>
                            {/* <td className='border-0 mb-2' style={{ width: '5%', }} ></td> */}
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {item.paidMonth}
                            </td>
                          </tr>
                          <tr >
                            <th className='border-0 ' style={{ width: '0%', textAlign: 'left', padding: '2px 5px' }} scope="row">
                              <snap className='heading0'>Status  </snap>
                            </th>
                            {/* <td className='border-0 mb-2' style={{ width: '5%', }} ></td> */}
                            <td className='border-0 ' style={{ width: '0%', padding: '2px 5px' }}>
                              {item.status}
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Box>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default TransactionHistory