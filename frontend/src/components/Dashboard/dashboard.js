import React from 'react';
import { Link, Outlet,useNavigate } from 'react-router-dom';
import {AiOutlineDashboard,AiOutlinePoweroff} from 'react-icons/ai';
import {BsPeople,BsPerson} from 'react-icons/bs'
import {BiCategoryAlt} from 'react-icons/bi'
import './dashboard.css';
import axios from 'axios';



const Dashboard = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () =>{
    axios.get('http://localhost:3007/logout')
    .then(result =>{
      if (result.data.Status) {
        localStorage.removeItem("valid")
        navigate('/') 
      }
    })
  }



  return (
    <div className='container'>
      <div className='dashboard-containers'>
        <div className='left-navbar'>
          <div className='dashboard-items'>
            <Link className='section-head' to="/dashboard">Admin</Link>
            <ul className='sections'>
              <li className='section'>
                <AiOutlineDashboard className='icon'/>
                <Link className='section-name' to="/dashboard">Dashboard</Link>
              </li>
              <li className='section'>
                <BsPeople className='icon'/>
                <Link className='section-name' to="/dashboard/employee">Employees</Link>
              </li>
              <li className='section'>
                <BiCategoryAlt className='icon'/>
                <Link className='section-name' to="/dashboard/category">Category</Link>
              </li>
              <li className='section'>
                <BsPerson className='icon'/>
                <Link className='section-name' to="/dashboard/profile">Profile</Link>
              </li>
              <li className='section' onClick={handleLogout}>
                <AiOutlinePoweroff className='icon'/>
                <Link className='section-name'>Logout</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='right-container'>
            <div className='header'>
                <h4 className='main-heading'>Employee Management System</h4>
            </div>
            <Outlet/>
           
        </div>


      </div>
    </div>
  )
}

export default Dashboard


