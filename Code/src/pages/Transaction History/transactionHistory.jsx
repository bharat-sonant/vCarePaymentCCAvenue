  import React from 'react'
  import Footer from '../../components/Footer'
  import Header from '../../components/Header'
  import { Box,Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

  const TransactionHistory=()=> {
    return (
      <div>
        <Header title={'Transaction History'}/>
        <div className='d-flex justify-content-center p-2' style={{width:'100% !imporant'}} >
          <Card   sx={{ boxShadow: '1px 1px 3px #6200ED',width: { xs: '97%',sm:'60%',md: '50%',lg:'30%' }}}>
            {/* <CardHeader className='card-header ' title="Card Details" /> <Divider/> */}
              <CardContent className='card-body '>
                    <Box >
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3 '>Order Id :</label><Typography className='col-md-9'></Typography>
                      </div>
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3'>Transaction Date:</label><Typography className='col-md-9'></Typography>
                      </div>
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3'>Transaction Amount :</label><Typography className='col-md-9'></Typography>
                      </div>
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3'>Referance Id :</label><Typography className='col-md-9'></Typography>
                      </div>
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3'>Pay Method :</label><Typography className='col-md-9' ></Typography>
                      </div>
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3'>Collectore Name :</label><Typography className='col-md-9' ></Typography>
                      </div>
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3'>Paid Month :</label><Typography className='col-md-9' ></Typography>
                      </div>
                      <div className='col-md-12 d-flex'>
                      <label className='col-md-3'>Status :</label><Typography className='col-md-9' ></Typography>
                      </div>
                    </Box>
              </CardContent>
          </Card>
          </div>
          
        <Footer/>
      </div>
    )
  }

  export default TransactionHistory