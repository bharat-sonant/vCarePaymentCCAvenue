import React,{useState} from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from 'react-router-dom';
import ContactsIcon from '@mui/icons-material/Contacts';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import './navSpeedDial.css'

const actions = [
  { icon: <FiberNewIcon style={{color:'#24b903', width:'200px'}}/>, name: 'New Card',path:"/" },
  { icon: <ContactsIcon  style={{color:'#24b903', width:'200px'}}/>, name: 'Card Details',path:"/cardDetail" },
  { icon: <PaymentsIcon style={{color:'#24b903', width:'200px'}}/>, name: 'Payment History',path:"/payment-history" },
  { icon: <HistoryIcon  style={{color:'#24b903', width:'200px'}}/>, name: 'Transaction History',path:"/transaction-history" },
  
];

export default function NavSpeedDial() {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick=(e,path)=>{
    navigate(path)
    setOpen(false);
  }

  return (
    <Box sx={{width:'100%',zIndex:'9999999', transform: 'translateZ(0px)',position: 'fixed', bottom: 50, left: 200,flexGrow: 1 }}>
      {/* <Backdrop open={open} /> */}
      
      <SpeedDial 
        ariaLabel="SpeedDial tooltip example"
        // sx={{  position: 'absolute', bottom: 50, right: 16  }}
        icon={<FormatListBulletedIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        
      >
        {actions.map((action) => (
          <SpeedDialAction 
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={(e)=>handleClick(e,action.path)}
            
          />
        ))}
      </SpeedDial>
     
     </Box>
  );
}
