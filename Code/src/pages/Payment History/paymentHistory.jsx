import React, { useState } from 'react';
import './paymentHistory.css'
import Footer from '../../components/Footer';
import { Box, Card, CardContent, CardHeader, Divider, Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableSortLabel,Toolbar,Paper, Checkbox, TableFooter, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button} from '@mui/material'
import { useEffect } from 'react';
import { getPaymentCollectionHistory, saveCCAvenuePaymentRequestHistory } from '../../services/paymentHistoryService';
import { generateRandomString, showAlert } from '../../services/commonService';
import Header from '../../components/Header';


const PaymentHistory=()=> {
  const [paymentList , setPaymentList] =useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [totalPayment,setTotalPayment]=useState(0);
  
  useEffect(() => {
    getPaymentCollectionHistory().then(list=>{
      if(list!==null){
        setPaymentList(list);
        setCheckboxes(list.filter(item=>item.status==='Pending'))
      }
      else{
        showAlert('Payment history not found..','error')
      }
    });
    

  }, [])
  
  const handleRowSelection = (event, id,amount) => {
    if (event.target.checked) {
       setSelectedRows([...selectedRows, id]);
       let total=Number(totalPayment)+Number(amount);
       setTotalPayment(total);

    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      let total=Number(totalPayment)-Number(amount);
      setTotalPayment(total);
    }
    
  };
  const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          let total= checkboxes.reduce((total, item) => total + Number(item.amount), 0);
          setTotalPayment(total);
          const newSelected = checkboxes.map(item =>`${item.month}-${item.year}`);
          setSelectedRows(newSelected);

          return;
        }
        setSelectedRows([]);
        setTotalPayment(0);
  };
  return (
  <div>
     <Header title={'Payment History'}/>
    <div className='col-lg-12 d-flex justify-content-center align-items-center' >
    <Box  sx={{ width: '100%', mb: 2 }} >
      <Paper >
      <EnhancedTableToolbar numSelected={selectedRows.length} />
    <TableContainer  style={{height:400}}>
      <Table stickyHeader>
        <TableHead  style={{position:'sticky', zIndex:999}}>
          <TableRow>
            <TableCell padding="checkbox" variant='head'>
              <Checkbox  sx={{color: '#6200ED','&.Mui-checked': {color:' #6200ED'}}} onClick={handleSelectAllClick}
               checked={selectedRows.length===checkboxes.length}
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
                sx={{color: '#6200ED','&.Mui-checked': {color:' #6200ED'}}}
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
          Total Amount: {totalPayment}
        </Typography>
      
    </Toolbar>
    </Paper>
    </Box>
    </div>
    <PaymentButton transactionAmount={totalPayment} monthYear={selectedRows}/>
  <Footer />
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
function PaymentButton({transactionAmount,monthYear}) {
  const savePaymentHistory=()=>{
    if(transactionAmount>0){
    saveCCAvenuePaymentRequestHistory(transactionAmount,monthYear);}

  }
  return (
    <div className='d-flex align-items-center justify-content-center'>
                  <Button onClick={savePaymentHistory} variant="contained" size='large' sx={{p:'10px 30px',textTransform: 'none',background:'#6200ED',fontWeight:'bold',mt:5,'&:focus':{background:'green'},'&:hover':{background:'green'}}}>Pay Now</Button>
    </div>
  );
}
///////////////////////////////////////////////













// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';

// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

// function createData(name, calories, fat, carbs, protein) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Dessert (100g serving)',
//   },
//   {
//     id: 'calories',
//     numeric: true,
//     disablePadding: false,
//     label: 'Calories',
//   },
//   {
//     id: 'fat',
//     numeric: true,
//     disablePadding: false,
//     label: 'Fat (g)',
//   },
//   {
//     id: 'carbs',
//     numeric: true,
//     disablePadding: false,
//     label: 'Carbs (g)',
//   },
//   {
//     id: 'protein',
//     numeric: true,
//     disablePadding: false,
//     label: 'Protein (g)',
//   },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Payment History
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const PaymentHistory=()=> {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('calories');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
 

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.name);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };  

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
 


//   return (
//     <div className='d-flex justify-content-center'>
//     <Box sx={{ width: '95%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
            
//             <TableBody >
//               {rows.map((row, index) => {
//                 const isItemSelected = isSelected(row.name);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.name)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.name}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           'aria-labelledby': labelId,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.calories}</TableCell>
//                     <TableCell align="right">{row.fat}</TableCell>
//                     <TableCell align="right">{row.carbs}</TableCell>
//                     <TableCell align="right">{row.protein}</TableCell>
//                   </TableRow>
//                 );
//               })}
              
//             </TableBody>
//           </Table>
//         </TableContainer>
        
//       </Paper>
//     </Box>
//     </div>
//   );
// }