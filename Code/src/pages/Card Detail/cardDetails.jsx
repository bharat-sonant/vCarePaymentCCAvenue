import { Box, Card, CardContent, CardHeader, Divider, Skeleton, Button } from '@mui/material';
import React, { useEffect } from 'react'
import { getCardDetail, getEntitiesCardDetail, getHouseTypeJson, saveEntityModifieRequestHistory } from '../../services/cardDetailService';
import { useState } from 'react';
import Header from '../../components/Header';
import './ModalWithDropdown.css';
import NavSpeedDial from '../../components/Navigation Button/Nav SpeedDial/navSpeedDial';
import { Sync } from '@mui/icons-material';
import { setAlertMessage, showAlertMobile } from '../../services/commonService';

const Modal = ({ isOpen, onClose, options, respObject }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const setModificationRequest = async () => {
    const houseId = localStorage.getItem('houseTypeId')
    const newHouseId = selectedOption
    console.log(newHouseId);
    console.log(houseId);
    if (newHouseId === '') {
      showAlertMobile('Select Entity type', 'error')
    } else {
      const response = await saveEntityModifieRequestHistory(houseId, newHouseId);
      console.log('res', response)
      if (response === 'success') {
        showAlertMobile('Entity Modifie Request Submit Successfully !', 'success')
        onClose();
      }
    }

  }

  return (
    <div style={{ zIndex: '2' }} className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <Card >
          <span className="close" onClick={onClose} style={{ alignItems: 'flex-start', backgroundColor: 'white' }}>&times;</span>
          <CardHeader className='card-header ' title={respObject.cardNo === undefined ? <Skeleton variant='rounded' height={'22px'} width={'100px'} /> : "Entity Modification Request"} /><Divider />
          <CardContent className='card-body'>
            <table className="table table-one-iner mb-0">
              <tbody>
                <tr style={{ marginBottom: 5, marginTop: 2 }}>
                  <th className='border-0 mb-0' style={{ width: '30%', textAlign: 'left', fontSize: 15 }} scope="row">
                    <snap className='heading0' style={{ fontSize: 15 }}> Entity Type  </snap>
                  </th>
                  {/* <td className='border-0 mb-2' style={{ width: '5%', }} ></td> */}
                  <td className='border-0 ' style={{ width: '70%', marginBottom: 30, marginTop: 50 }}>
                    <snap style={{ fontSize: 15 }}>{respObject.houseTypeName}{respObject.houseTypeName === undefined && <Skeleton variant='rounded' height={'15px'} width={'200px'} />}</snap>
                  </td>
                </tr>
                <tr style={{ marginBottom: 5, marginTop: 2 }}>
                  <th className='border-0 mb-0' style={{ width: '20%', textAlign: 'left' }} scope="row">
                    <snap className='heading0' style={{ fontSize: 15 }}>New Entity Type</snap>
                  </th>
                  <td className='border-0 ' style={{ width: '70%', height: '100%' }}>
                    <select value={selectedOption} onChange={handleChange} style={{ padding: '4px' }}>
                      <option value="">Select an option</option>
                      {options.map((option, index) => (
                        <option key={index} value={option.value} hidden={index===0}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button style={{ backgroundColor: '#24B903', marginTop: 10 }} onClick={setModificationRequest} variant="contained" size='small' className='btn'>Send Entity Modification Request</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CardDetails = () => {
  const [respObject, setRespObject] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const cardDetailParams = JSON.parse(localStorage.getItem('cardDetailParams'));
    localStorage.setItem('ward',cardDetailParams.ward)
    if (cardDetailParams.ward !== undefined || cardDetailParams.lineNo !== undefined || cardDetailParams.cardNo !== undefined) {

      getHouseTypeJson().then(houseTypeList => {
        if (houseTypeList !== null) {
          const houseId = localStorage.getItem('houseTypeId')
          console.log(houseId)
          // console.log(houseTypeList.map(obj => ({ label: obj?.name, value: obj?.name })))
          // const houseList = houseTypeList;
          // houseList.shift()
          setDropdownOptions([...dropdownOptions, ...houseTypeList.map((obj, index) => ({ label: obj?.name, value: index }))]);
          if (houseId === '19' || houseId === '20') {
            getEntitiesCardDetail(cardDetailParams.ward, cardDetailParams.lineNo, cardDetailParams.cardNo).then(data => {
              if (data !== null) {
                data.name = localStorage.getItem('name');
                data.address = localStorage.getItem('address');
                data.mobile = localStorage.getItem('mobile');
                data.cardNo = "MNZ" + cardDetailParams.cardNo
                data.houseTypeName = houseTypeList[Number(localStorage.getItem('entityTypeId'))].name;
                // console.log(houseTypeName)
                setRespObject(data);
              }
            });
          } else {
            getCardDetail(cardDetailParams.ward, cardDetailParams.lineNo, cardDetailParams.cardNo).then(data => {
              if (data !== null) {
                // console.log(houseTypeList[Number(data.houseType)].name)
                data.houseTypeName = houseTypeList[Number(data.houseType)].name;
                setRespObject(data);
              }
            });
          }
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
                <CardHeader className='card-header ' title={respObject.cardNo === undefined ? <Skeleton variant='rounded' height={'22px'} width={'100px'} /> : respObject.cardNo} /><Divider />
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
                            {respObject.name}{respObject.name === undefined && <Skeleton variant='rounded' height={'15px'} width={'200px'} />}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 text-left mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row" >
                            <snap className='heading0'> Address  </snap>
                          </th>
                          {/* <td className='border-0 mb-3' style={{ width: '5%', }} ></td> */}
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.address}{respObject.address === undefined && <Skeleton variant='rounded' height={'15px'} width={'200px'} />}
                          </td>
                        </tr>
                        <tr >
                          <th className='border-0 mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row">
                            <snap className='heading0'>  Mobile No </snap>
                          </th>
                          {/* <td className='border-0 mb-2' style={{ width: '5%', }}></td> */}
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.mobile}{respObject.mobile === undefined && <Skeleton variant='rounded' height={'15px'} width={'200px'} />}
                          </td>
                        </tr>


                        <tr >
                          <th className='border-0 mb-0' style={{ width: '0%', textAlign: 'left', }} scope="row">
                            <snap className='heading0'> Entity Type  </snap>
                          </th>
                          {/* <td className='border-0 mb-2' style={{ width: '5%', }} ></td> */}
                          <td className='border-0 ' style={{ width: '0%', }}>
                            {respObject.houseTypeName}{respObject.houseTypeName === undefined && <Skeleton variant='rounded' height={'15px'} width={'200px'} />}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <Button style={{ backgroundColor: '#24B903', marginTop: 20 }} onClick={openModal} variant="contained" size='medium' className='btn'>Entity Modification Request</Button>
              <Modal isOpen={isModalOpen} onClose={closeModal} options={dropdownOptions} respObject={respObject} />
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

