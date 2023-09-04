import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: <HomeIcon />, name: 'Home',path:"/" },
  { icon: <PaymentsIcon/>, name: 'Payment History',path:"/payment-history" },
  { icon: <HistoryIcon />, name: 'Transaction History',path:"/transaction-history" },
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
    <Box sx={{width:'100%',zIndex:'9999999', transform: 'translateZ(0px)',position: 'fixed', bottom: 0, right: 0}}>
      {/* <Backdrop open={open} /> */}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 50, right: 18 }}
        icon={<SpeedDialIcon />}
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
