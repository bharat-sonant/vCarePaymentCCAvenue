import React, { useEffect, useState } from 'react';
import './index.css'
import { Typography } from '@mui/material';
import NavThreeDot from '../Navigation Button/Nav Three Dot/navThreeDot';
const Header = (props) => {

  return (
  
            <div className='header d-flex justify-content-between' >
              <Typography  sx={{ color: 'white', fontWeight: 'bold'}} id="tableTitle" >{props.title}</Typography>
             <div hidden={props.title==='Payment'}>
              {props.hide!==true && <NavThreeDot className='menu' />}
              </div>
            </div>
      
  );
}
export default Header

