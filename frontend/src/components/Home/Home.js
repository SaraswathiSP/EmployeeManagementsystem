import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './home.css'
import {RiAdminFill} from 'react-icons/ri'
import {BsFillPeopleFill} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3007/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }
  const adminCount = () => {
    axios.get('http://localhost:3007/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3007/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }


  const salaryCount = () => {
    axios.get('http://localhost:3007/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }


  return (
    <div className='home__container'>
      <div className='container__1'>
        <div className='subcontainer__1 shadow' style={{backgroundColor:"#fee2e2"}}>
          <RiAdminFill style={{height:60 , width:80, color:"#f87171"}}/>
          <>
          <h2 style={{color:"#1c1917"}}>Admin</h2>
          <h5>Total: {adminTotal}</h5>
          </>
        </div>
        <div className='subcontainer__1 shadow' style={{backgroundColor:"#e9d5ff"}}>
        
        <BsFillPeopleFill style={{height:60 , width:80, color:"#a855f7"}}/>
          <h2 style={{color:"#1c1917"}}>Employees</h2>
          <h5>Total: {employeeTotal}</h5>
        </div>
        <div className='subcontainer__1 shadow' style={{backgroundColor:"#fef9c3"}}>
        
        <img style={{height:60, width:80, borderRadius: '200px' }} src="https://res.cloudinary.com/dg0telgxq/image/upload/v1698563065/2e7c0ce5d32bdd31ed25fc52e0f0fded_ohypbx.jpg" at=""/>

          <h2 style={{color:"#1c1917"}}>Salary</h2>
          <h5>Total: {salaryTotal}</h5>
        </div>
      </div>
      <div className='container__2'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>
                    <button
                      className="edit__container">
                      Edit
                    </button>
                    <button
                      className="del__button" >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home