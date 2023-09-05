import React, { useEffect, useState } from 'react';
import './index.css'
import { Typography } from '@mui/material';
import NavThreeDot from '../Navigation Button/Nav Three Dot/navThreeDot';
const Header = (props) => {

  return (
  
            <div className='header d-flex' >
              <Typography  sx={{ color: 'white', fontWeight: 'bold'}} id="tableTitle" >{props.title}</Typography>
             <div hidden={props.title==='Payment'}>
              <NavThreeDot />
              </div>
            </div>
      
  );
}
export default Header

