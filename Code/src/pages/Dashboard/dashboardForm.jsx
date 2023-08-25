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


const DashboardForm=()=>{
  const navigate=useNavigate();
  const [cardNo,setCardNo]=useState('');
  const [error,setError]=useState(false)
  const handleOnChange=(e)=>{
    const numberPattern = /^\d+$/;
    if(numberPattern.test(e.target.value)|| e.target.value===''){
    setCardNo(e.target.value);
    setError(false)
    }
  }
  const handleSubmit=async()=>{
    if(cardNo===""){
      setError(true);
      return;
    }
    await getCardWardMapping(cardNo).then(data=>{
      if(data===null){
        setError(true);
      }
      else{
        localStorage.setItem("cardNo","MNZ"+cardNo)
        navigate('/cardDetail/'+data.ward+"/"+data.line+"/"+cardNo)
      }
    })

  }
  return (
    <div className='col-lg-12 d-flex justify-content-center align-items-center' >
      <Card className='col-lg-3 ' sx={{position:'relative',top:'20vh'}} >
        <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className='col-lg-9'>
                  <TextField  onChange={handleOnChange} value={cardNo} type='' label="Card Number" id="inputCardNumber" sx={{ m: 1, width: '25ch'}}
                    error={error} helperText={error ? 'Enter valid card number' : ''}
                     InputProps={{ startAdornment: <InputAdornment position="start" >MNZ</InputAdornment> }} />
                     
                </div>
                <div className='d-flex align-items-center'>
                  <Button variant="contained" color={error?'error':'primary'} onClick={handleSubmit}>Submit</Button>
                </div>
              </Box>
        </CardContent>
      {/* <CardActions> 
      
      </CardActions> */}
    </Card>

              
            
    </div>
  );
}

export default DashboardForm







