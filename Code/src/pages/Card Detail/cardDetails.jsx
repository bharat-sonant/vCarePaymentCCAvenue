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
              }
            });
        }
    }, [])
    

    return (
    <div >
      <Header title={'Card Details'}/>
        <div className='d-flex justify-content-center' style={{width:'100% !imporant'}} >
        <Card  sx={{boxShadow: '1px 1px 3px #6200ED',position:'absolute',top:'30vh',width: { xs: '95%',sm:'60%',md: '50%',lg:'30%' }}}>
          <CardHeader className='card-header ' title="Card Details" /> <Divider/>
            <CardContent className='card-body'>
                  <Box >
                    <div className='col-md-12 d-flex'>
                    <label className='col-md-3 '>Card No. :</label><Typography className='col-md-9'>{respObject.cardNo}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label className='col-md-3'>Name :</label><Typography className='col-md-9'>{respObject.name}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label className='col-md-3'>Address :</label><Typography className='col-md-9'>{respObject.address}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label className='col-md-3'>Mobile No :</label><Typography className='col-md-9'>{respObject.mobile}</Typography>
                    </div>
                    <div className='col-md-12 d-flex'>
                    <label className='col-md-3'>Entity Type :</label><Typography className='col-md-9' >{respObject.cardType}</Typography>
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