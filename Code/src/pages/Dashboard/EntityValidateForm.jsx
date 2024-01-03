import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { getCardWardMapping } from '../../services/formService';
import { getCardDetail, getEntitiesCardDetail } from '../../services/cardDetailService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { showAlert } from '../../services/commonService';

const EntityValidateForm = () =>{

  const navigate = useNavigate();
  const [mobileNo, setMobileNo] = useState('');
  const [error, setError] = useState(false)
  const [respObject, setRespObject] = useState({})
  const handleOnChange = (e) => {
    const numberPattern = /^\d+$/;
    if (numberPattern.test(e.target.value) || e.target.value === '') {
      setMobileNo(e.target.value);
      setError(false)
    }
  }
  const handleSubmit = async () => {

    if (mobileNo === "") {
      setError(true);
      return;
    }
    const cardDetailParams = JSON.parse(localStorage.getItem('cardDetailParams'));
    if (cardDetailParams.ward !== undefined || cardDetailParams.lineNo !== undefined || cardDetailParams.cardNo !== undefined) {

            getEntitiesCardDetail(cardDetailParams.ward, cardDetailParams.lineNo, cardDetailParams.cardNo).then(data => {
              if (data !== null) {
                let keyArray=Object.keys(data)
                let flag = 'false'
                keyArray.map(key=>{
                   if(Number(data[key].mobile)===Number(mobileNo)){
                    flag = 'true'
                    localStorage.setItem('name',data[key].name);
                    localStorage.setItem('mobile',data[key].mobile);
                    localStorage.setItem('entityTypeId',data[key].entityType);
                    localStorage.setItem('address',data[key].address)
                    localStorage.setItem('entityId',key)
                    navigate('/CardDetail')
                   }
                })
                if(flag === 'false'){
                  setError(true)
                  
                }
                setRespObject(data);
              }
            });
          
      }

  }
  return (
    <div className='back-penal'>
      <div className='main-container container-fluid container-fluid-44 m-auto'>
     <Header title={'Payment'}/>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex  align-items-center ' style={{ height: '100vh' }}>
              <Card style={{ width: '100%' ,boxShadow:'none' }} >
                <CardContent>
                  <Box >
                    <TextField  onChange={handleOnChange} value={mobileNo} type='' label="Registered Mobile Number" id="inputCardNumber" sx={{ width: '100%',marginBottom:'30px',}} color='success'
                      error={error} helperText={error ? 'Enter valid registered mobile number' : ''} />
                      {/* InputProps={{ startAdornment: <InputAdornment position="start" >MNZ</InputAdornment> }} /> */}


                    <div className='d-flex align-items-center'>
                      <Button className='btn '  variant="contained"  onClick={handleSubmit} style={{width:'100%',backgroundColor:error ? 'red' : '#24B903'}}>Submit</Button>
                    </div>
                  </Box>
                </CardContent>
                {/* <CardActions> 
      
      </CardActions> */}
              </Card>             
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default EntityValidateForm