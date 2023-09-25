import React, { useState } from 'react';
import './paymentHistory.css';
import { Box, Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Toolbar,Paper, Checkbox, Button} from '@mui/material'
import { useEffect } from 'react';
import { getPaymentCollectionHistory, saveCCAvenuePaymentRequestHistory } from '../../services/paymentHistoryService';
import {  showAlertMobile } from '../../services/commonService';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';



const PaymentHistory=()=> {
  const [paymentList , setPaymentList] =useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [totalPayment,setTotalPayment]=useState(0);
  const [hidden,setHidden]=useState(true)

  
  useEffect(() => {
    getPaymentCollectionHistory().then(list=>{
      if(list!==null){
        setPaymentList(list);
        setCheckboxes(list.filter(item=>item.status==='Pending'))
      }
      else{
        showAlertMobile('Payment history not found..','error')
      }
    });
    

  }, [])
  
  const handleRowSelection = (event, id,amount) => {
    if (event.target.checked) {
       setSelectedRows([...selectedRows, id]);
       let total=Number(totalPayment)+Number(amount);
       setTotalPayment(total);
       setHidden(false)

    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      let total=Number(totalPayment)-Number(amount);
      setTotalPayment(total);
      if(total===0){
        setHidden(true)
      }
    }
    
  };
  const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          let total= checkboxes.reduce((total, item) => total + Number(item.amount), 0);
          setTotalPayment(total);
          const newSelected = checkboxes.map(item =>`${item.month}-${item.year}`);
          setSelectedRows(newSelected);
          setHidden(false)

          return;
        }
        setSelectedRows([]);
        setTotalPayment(0);
        setHidden(true);
  };
  return (
    <div className='back-penal'>
    <div className='main-container container-fluid container-fluid-44 m-auto'>
     <Header title={'Payment History'}/>
     <div className='row'>
          <div className=' col-md-12 mb-5 '>
    <Box  sx={{ width: '100%', mb: 3 , pt:8}} >
      <Paper >
      <EnhancedTableToolbar numSelected={selectedRows.length} />
    <TableContainer  >
      <Table stickyHeader>
        <TableHead  style={{position:'sticky', zIndex:99}}>
          <TableRow>
            <TableCell padding="checkbox" variant='head'>
              <Checkbox  sx={{color: '#24B903','&.Mui-checked': {color:'#24B903'}}} onClick={handleSelectAllClick}
               checked={selectedRows.length===checkboxes.length} hidden={checkboxes.length===0}
               /> </TableCell>
            <TableCell className='table-header'  variant='head'>Month-Year</TableCell>
            <TableCell  variant='head'>Charges</TableCell>
            <TableCell  variant='head'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='table-body'>
          {paymentList.map(detail=> (
            <TableRow key={`${detail.month}-${detail.year}`}>
              <TableCell padding="checkbox"  variant='head'>
                <Checkbox 
                sx={{color: '#24B903','&.Mui-checked': {color:'#24B903'}}}
                  checked={selectedRows.includes(`${detail.month}-${detail.year}`)}
                  onChange={event => handleRowSelection(event, `${detail.month}-${detail.year}`,detail.amount)}
                  hidden={detail.status!=='Pending'} 
                />
              </TableCell>  
              <TableCell  variant='body'>{detail.month}-{detail.year}</TableCell>
              <TableCell  variant='body'>{detail.amount}</TableCell>
              <TableCell  variant='body'>{detail.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Toolbar sx={{ pl: { sm: 2 },pr: { xs: 1, sm: 1 }}}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Payable Amount: <CurrencyRupeeIcon style={{fontSize:'18px'}}/> {totalPayment}
        </Typography>
      
    </Toolbar>
   
    </Paper>

    </Box>
    <PaymentButton transactionAmount={totalPayment} monthYear={selectedRows} hidden={hidden}/>
    {/* <Button  className='btn css-sghohy-MuiButtonBase-root-MuiButton-root ' >Pay Now </Button> */}
   
  {/* <Footer /> */}
  </div>
  </div>
  </div>
  </div>

  )
  
}

export default PaymentHistory

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        backgroundColor:numSelected > 0 ?'darkgray':'whitesmoke'
       
      }}
      
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Name: {localStorage.getItem('name').toUpperCase()}
        </Typography>
      )}
    </Toolbar>
  );
}
function PaymentButton({transactionAmount,monthYear,hidden}) {
  const navigate=useNavigate()
  const savePaymentHistory=async()=>{
    if(transactionAmount>0){
    await saveCCAvenuePaymentRequestHistory(transactionAmount,monthYear);
    await navigate('/payment-request')
    
  }

  }
  return (
    <div className='d-flex align-items-center justify-content-center' >
                  <Button style={{backgroundColor:'#24B903'}} onClick={savePaymentHistory} variant="contained" size='large'  className='btn' hidden={hidden}>Pay Now</Button>
    </div>
  );
}