  import React, { useEffect } from 'react'
  import Footer from '../../components/Footer'
  import Header from '../../components/Header'
  import { Box,Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { getCCAvenuePaymentTransactionHistory } from '../../services/transactionHistoryService';
import { useState } from 'react';
import { showAlert } from '../../services/commonService';

  const TransactionHistory=()=> {
    const [historyArray,setHistoryArray]=useState([])
    useEffect(() => {
      setDefault()
     
    }, [])
    
    const setDefault=()=>{
      getCCAvenuePaymentTransactionHistory().then(list=>{
        if(list!==null){
          setHistoryArray([...list])
        }
        else{
          showAlert('NO history found..','error')
        }
      })
    }
    
    return (
      <div>
        <Header title={'Transaction History'}/>
        
        <Box className="d-grid" sx={{pt:10,pb:10,gridTemplateColumns:{ xs: '100%',sm:'100%',md: '50% 50%',lg:'33.33% 33.33% 33.33%' }}}>
       {historyArray.map(item=>(
        <div className='d-flex justify-content-center p-2'  key={item.key} >
        <Card   sx={{ boxShadow: '1px 1px 3px #6200ED',width:'100%','&:hover':{boxShadow: '2px 2px 4px #6200ED',backgroundColor:'whitesmoke'}}}>
          {/* <CardHeader className='card-header ' title="Card Details" /> <Divider/> */}
            <CardContent className='card-body '>
                  <Box >
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
                  </Box>
            </CardContent>
        </Card>
        </div>
       ))}
       </Box>

        <Footer/>
      </div>
    )
  }

  export default TransactionHistory