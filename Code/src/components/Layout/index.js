import React from 'react';
import PropTypes from 'prop-types';
import Topbar from '../Topbar';
import Navbar from '../Navbar';
import "../../assets/css/common.css";
import "../../assets/css/alert.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout=({children}) => {
  

  return (
    <>
      <div>{children}</div>    
      <ToastContainer />
    </>
  );
};

Layout.propTypes={
  children: PropTypes.node.isRequired,
};

export default Layout;