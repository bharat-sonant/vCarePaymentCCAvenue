import { Box,Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { get } from 'jquery';
import React, { useEffect } from 'react'
import { getCardDetail } from '../../services/cardDetailService';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useState } from 'react';
import Header from '../../components/Header';

const CardDetails=()=> {
    const {ward,line,card}=useParams();
    const [respObject,setRespObject]=useState({})
    useEffect(() => {
        if(ward!==undefined||line!==undefined||card!==undefined){
            getCardDetail(ward,line,card).then(data=>{
              if(data!==null){
                setRespObject(data);
                localStorage.setItem('name',data.name)
              }
            });
        }
    }, [])
    

    return (
    <div>
      <Header title={'Card Details'}/>
        <div className='col-lg-12 d-flex justify-content-center align-items-center' >
          <Card className='col-lg-4 ' sx={{position:'relative',top:'20vh'}} >
            
          <CardHeader className='card-header ' title="Card Details" /> <Divider/>
            <CardContent className='card-body'>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className='col-lg-12 d-flex row'>
                    <label className='form-label col-lg-3' htmlFor="">Card No. :</label><Typography className='col-lg-3' variant='subtitle1'>{respObject.cardNo}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex row'>
                    <label className='form-label col-lg-3' htmlFor="">Name :</label><Typography className='col-lg-3' variant='subtitle1'>{respObject.name}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex row'>
                    <label className='form-label col-lg-3' htmlFor="">Address :</label><Typography className='col-lg-3' variant='subtitle1'>{respObject.address}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex row'>
                    <label className='form-label col-lg-3' htmlFor="">Mobile No :</label><Typography className='col-lg-3' variant='subtitle1'>{respObject.mobile}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex row'>
                    <label className='form-label col-lg-3' htmlFor="">Entity Type :</label><Typography className='col-lg-3' variant='subtitle1'>{respObject.cardType}</Typography>
                    </div>
                  </Box>
            </CardContent>
          
        </Card>    
        </div>

        <Footer />
    </div>
      );
}

export default CardDetails