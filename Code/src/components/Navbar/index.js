import React from 'react'
import {Link} from 'react-router-dom';
import "./index.css";
import {FaUserAlt,FaThList,FaTruck,FaBars} from "react-icons/fa";
import {BsPersonBadge} from "react-icons/bs";



const Navbar=() => {
    function isMobile() {
        document.getElementById('Menubar').style.display='block';

    }
    function hide() {
        if(window.innerWidth<991) {
            document.getElementById('Menubar').style.display='none'
        }
    }
    return (
        <div className='dashboard'>
            <div className="dashboard-nav" id='Menubar'>
                <header>
                    <div className="logo-img">
                        <Link to='/dashboard'>
                            <img className='img-fluid' src={require('../../assets/image/wevois-logo-white.png')} /><b className="ms-3">WeVOIS</b>
                        </Link>
                    </div>
                </header>
                <nav className="dashboard-nav-list">
                    <ul className='nav-2' onClick={hide}>
                        <li>
                            <Link to="/dashboard" className="dashboard-nav-item" ><FaThList className='icon-3 me-3' /> Dashboard</Link>
                        </li>
                        {/* <li>
                            <Link to="/projects" className="dashboard-nav-item"><BsPersonBadge className='icon-3 me-3' />Projects </Link>
                        </li>
                        <li>
                            <Link to="/tasks" className="dashboard-nav-item"><BsPersonBadge className='icon-3 me-3' />Tasks </Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div className='mobile-show' onClick={isMobile}>
                <a><FaBars /></a>
            </div>
        </div>
    );
}

export default Navbar

