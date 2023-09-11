import {Card, CardContent, CardHeader, Divider} from '@mui/material';
import React, { useEffect } from 'react'
import { getCardDetail, getHouseTypeJson } from '../../services/cardDetailService';
import { useState } from 'react';
import Header from '../../components/Header';
import NavSpeedDial from '../../components/Navigation Button/Nav SpeedDial/navSpeedDial';



const CardDetails = () => {
  const [respObject, setRespObject] = useState({})
  useEffect(() => {
    const cardDetailParams=JSON.parse(localStorage.getItem('cardDetailParams'));
    if (cardDetailParams.ward !== undefined || cardDetailParams.lineNo !== undefined || cardDetailParams.cardNo !== undefined) {

      getHouseTypeJson().then(houseTypeList=>{
        if(houseTypeList!==null){
          getCardDetail(cardDetailParams.ward, cardDetailParams.lineNo, cardDetailParams.cardNo).then(data => {
            if (data !== null) {
              data.houseTypeName=houseTypeList[Number(data.houseType)].name;
              setRespObject(data);
            }
          });
        }
      });
    }
    
  }, [])


  return (
    <div className='back-penal'>
      <div className='main-container container-fluid container-fluid-44 m-auto'>
        <Header title={'Card Details'} />
       
        <div className='row'>
          <div className=' col-md-12 '>
            {/* <div className='d-flex  align-items-center ' style={{ height: '100vh' }}> */}

            <div style={{ paddingTop: '70px' }}>
              <Card >
                <CardHeader className='card-header ' title={respObject.cardNo}/> <Divider />
                <CardContent className='card-body'>
                  {/* <Box >
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
                    </Box> */}
                  <div className='table-responsive'>
                    <table className="table table-one-iner mb-0">

                      <tbody>
                        {/* <tr >
                          <th className='border-0 text-left mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row" >
                            <snap className='heading0'> Card No.  </snap>
                          </th>
                    
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.cardNo}
                          </td>
                        </tr> */}
                        <tr >
                          <th className='border-0 text-left mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row" >
                            <snap className='heading0'> Name  </snap>
                          </th>
                          {/* <td className='border-0 mb-3' style={{ width: '5%', }} ></td> */}
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.name}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row" >
                            <snap className='heading0'> Address  </snap>
                          </th>
                          {/* <td className='border-0 mb-3' style={{ width: '5%', }} ></td> */}
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.address}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row">
                            <snap className='heading0'>  Mobile No </snap>
                          </th>
                          {/* <td className='border-0 mb-2' style={{ width: '5%', }}></td> */}
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.mobile}
                          </td>
                        </tr>


                        <tr >
                          <th className='border-0 mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row">
                            <snap className='heading0'> Entity Type  </snap>
                          </th>
                          {/* <td className='border-0 mb-2' style={{ width: '5%', }} ></td> */}
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.houseTypeName}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            
            </div>
       

            {/* </div> */}
          </div>

          {/* <Footer /> */}
        </div>
        <NavSpeedDial />

      </div>
    </div>
  );
}

export default CardDetails