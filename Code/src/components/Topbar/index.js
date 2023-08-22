import React from 'react';
import {Link} from 'react-router-dom';
import './index.css'
import {AiOutlineMenu} from "react-icons/ai";
import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import {ref as ref_storage,getDownloadURL} from "firebase/storage";
import {storage} from '../../Firebase';

function Topbar() {

    const {userId,city}=useParams();
    const [selectedCity,setSelectedCity]=useState("");

    useEffect(() => {
        if(city!=null) {
            setSelectedCity(city);
            localStorage.setItem('userId',userId);
            localStorage.setItem('city',city);
            getUsersPortelData();
        }
        else {
            setSelectedCity(localStorage.getItem('city'));
        }

    },[]);
    const getUsersPortelData=() => {
        getDownloadURL(ref_storage(storage,'https://firebasestorage.googleapis.com/v0/b/wevois-qa-er.appspot.com/o/Defaults%2FPortalUsers.json?alt=media'))
            .then((url) => {
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        let keyArray=Object.keys(data)
                        for(let i=0;i<keyArray.length;i++) {
                            let key=keyArray[i];
                            if(key!="lastKey") {
                                if(data[key]["userId"]==userId) {
                                    let userName=data[key]["userName"];
                                    localStorage.setItem('userName',userName);
                                }
                            }
                        }
                    })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const setCity=(city) => {
        localStorage.setItem('city',city);
        setTimeout(() => {
            window.location=("/dashboard");
        },600);
    }

    return (

        <nav className="navbar  navbar-expand-lg">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><AiOutlineMenu className='menu-icon' /></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  me-auto p-lg-3 p-md-0  p-0 ps-0 mb-lg-0 nav-padding-cs" id="pills-tab" role="tablist">
                        <li className="nav-item border-end mb-md-3 mb-lg-0 mb-sm-3 mb-3" role="presentation" >
                            <Link to="/dashboard" className="nav-link  text-light py-0 active  "  >Home</Link>
                        </li>
                    </ul>
                    {/* <form className="d-flex select-example mb-md-3 mb-lg-0 mb-sm-3 mb-3 " role="search">
                        <select id="drpCity" className="form-select  " aria-label="Default select example" value={selectedCity} onChange={(e) => setCity(e.target.value)}>
                            <option value="malviyanagar">Malviyanagar</option>
                            <option value="murlipura">Murlipura</option>
                        </select>
                    </form>
                    <button className="btn btn-outline-light ms-4 mb-md-3 mb-lg-0 mb-sm-3 mb-3" type="submit" >Logout</button> */}
                </div>
            </div>
        </nav>

    );
}

export default Topbar;