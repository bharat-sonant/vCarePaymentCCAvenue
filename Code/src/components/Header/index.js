import React,{ useEffect, useState } from 'react';
import './index.css'
import { Typography } from '@mui/material';

 const Header=(props)=> {

  return (
    <div className='col-md-12 d-flex  align-items-center top-header card-header'>
      <Typography  sx={{color:'white',fontWeight:'bold'}} id="tableTitle" >{props.title}</Typography>
    </div>
  );
}
export default Header

