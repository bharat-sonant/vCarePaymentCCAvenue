import { Box, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { get } from 'jquery';
import React, { useEffect } from 'react'
import { Card} from 'react-bootstrap';
import { getCardDetail } from '../../services/cardDetailService';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useState } from 'react';

const CardDetails=()=> {
    const {ward,line,card}=useParams();
    const [respObject,setRespObject]=useState({})
    useEffect(() => {
        if(ward!==undefined||line!==undefined||card!==undefined){
            getCardDetail(ward,line,card).then(data=>{
                setRespObject(data)

            })
        }
    }, [])
    

    return (
    <div>
        <div className='col-lg-12 d-flex justify-content-center align-items-center' >
          <Card className='col-lg-4 ' sx={{position:'relative',top:'20vh'}} >
          <CardHeader className='card-header ' title="Card Details"  disableTypography/> <Divider/>
            <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className='col-lg-12 d-flex'>
                    <label class='form-label' htmlFor="">Card NO. :</label><Typography variant='subtitle1'>{respObject.cardNo}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex'>
                    <label htmlFor="">Name :</label><Typography variant='subtitle1'>{respObject.name}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex'>
                    <label htmlFor="">Address :</label><Typography variant='subtitle1'>{respObject.address}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex'>
                    <label htmlFor="">Mobile No :</label><Typography variant='subtitle1'>{respObject.mobile}</Typography>
                    </div>
                    <div className='col-lg-12 d-flex'>
                    <label htmlFor="">Entity Type :</label><Typography variant='subtitle1'>{respObject.cardType}</Typography>
                    </div>
                  </Box>
            </CardContent>
          
        </Card>    
        </div>








        <Footer/>
    </div>
      );
}

export default CardDetails