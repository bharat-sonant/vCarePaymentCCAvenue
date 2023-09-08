import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { getCardWardMapping } from '../../services/formService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';


const DashboardForm = () => {
  const navigate = useNavigate();
  const [cardNo, setCardNo] = useState('');
  const [error, setError] = useState(false)
  const handleOnChange = (e) => {
    const numberPattern = /^\d+$/;
    if (numberPattern.test(e.target.value) || e.target.value === '') {
      setCardNo(e.target.value);
      setError(false)
    }
  }
  const handleSubmit = async () => {
    if (cardNo === "") {
      setError(true);
      return;
    }
    await getCardWardMapping(cardNo).then(data => {
      if (data === null) {
        setError(true);
      }
      else {
        localStorage.setItem("cardNo", "MNZ" + cardNo);
        localStorage.setItem("cardDetailParams",JSON.stringify({cardNo:cardNo,ward:data.ward,lineNo:data.line}));
        navigate('/cardDetail')
      }
    })

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

                    <TextField  onChange={handleOnChange} value={cardNo} type='' label="Card Number" id="inputCardNumber" sx={{ width: '100%',marginBottom:'30px',}} color='success'
                      error={error} helperText={error ? 'Enter valid card number' : ''}
                      InputProps={{ startAdornment: <InputAdornment position="start" >MNZ</InputAdornment> }} />


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

export default DashboardForm







