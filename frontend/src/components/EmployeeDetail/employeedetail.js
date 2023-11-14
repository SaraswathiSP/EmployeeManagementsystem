import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './employeedetail'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get('http://localhost:3007/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:3007/logout')
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }
        }).catch(err => console.log(err))
      }
      
  return (
    <div>
        <div className='header'>
                <h4 className='main-heading'>Employee Management System</h4>
            </div>
            <h2>Employee Details</h2>
            <div style={{display:'flex', justifyContent:"center", alignItems:'center', marginTop:50}}>
        <div style={{width:400, height:450, border:"1px solid #4f4f4f" , display:"flex", flexDirection:"column", alignItems:"center", borderRadius:10,padding:15,boxShadow:"2px 0px 80px rgba(0, 0, 0, 0.07)"}}>
            <img src={`http://localhost:3007/Images/`+employee.image} style={{width:200, height:200, borderRadius:200, border:"5px solid #14b8a6"}} alt=""/>
            <div style={{display:'flex', flexDirection:"column", alignItems:"flex-start"}}>
                <p style={{fontSize:18}}><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Salary: </strong>${employee.salary}</p>
                <button className='logout-btn' style={{backgroundColor:"red", fontSize:17, color:"#fff",width:80, height:40, border:'none', textAlign:'center',marginLeft:40,marginTop:20}} onClick={handleLogout}>Logout</button>
            </div>
            </div>
           
        </div>
    </div>
  )
}

export default EmployeeDetail