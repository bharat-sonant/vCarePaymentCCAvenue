import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ContactsIcon from '@mui/icons-material/Contacts';
import { useLocation, useNavigate } from 'react-router-dom';

const actions = [
    { icon: <FiberNewIcon />, name: 'New Card',path:"/" },
    { icon: <ContactsIcon />, name: 'Card Details',path:"/cardDetail" },
    { icon: <PaymentsIcon/>, name: 'Payment History',path:"/payment-history" },
    { icon: <HistoryIcon />, name: 'Transaction History',path:"/transaction-history" },
    
  ];



export default function NavThreeDot() {
    const location = useLocation();
    const navigate=useNavigate()


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange=(e,path)=>{
    handleClose();
    navigate(path)


  }

  return (
    <div  >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{p:0, color:'#fff'}}
        
      >
        <MoreVertIcon />
      </IconButton>
      
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        
      >
        {actions.map((item) => (
          <MenuItem key={item.name}  onClick={(e)=>handleChange(e,item.path)} selected={location.pathname===item.path}>
            {item.name} 
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
