import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { showAlert } from '../../services/commonService';
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
        localStorage.setItem("cardNo", "MNZ" + cardNo)
        navigate('/cardDetail/' + data.ward + "/" + data.line + "/" + cardNo)
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

                    <TextField onChange={handleOnChange} value={cardNo} type='' label="Card Number" id="inputCardNumber" sx={{ width: '100%',marginBottom:'30px' }}
                      error={error} helperText={error ? 'Enter valid card number' : ''}
                      InputProps={{ startAdornment: <InputAdornment position="start" >MNZ</InputAdornment> }} />


                    <div className='d-flex align-items-center'>
                      <Button className='btn'  variant="contained" color={error ? 'error' : 'primary'} onClick={handleSubmit} style={{width:'100%'}}>Submit</Button>
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







