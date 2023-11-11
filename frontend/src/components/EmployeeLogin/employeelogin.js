import React, { useState } from 'react'
import './employeelogin.css'
import {Link, useNavigate} from 'react-router-dom'
import Validation from '../LoginValidation'
import axios from 'axios'


const EmployeeLogin = () => {
  const [values,setValues] = useState({email:"", password:""})
  const [errors,setErrors] = useState({})

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleInput = (event) =>{
    setValues(prev =>({...prev, [event.target.name]:event.target.value}))
  }

  const handleSubmit = (event) =>{
    event.preventDefault();

    const err = Validation(values);
    console.log(err)
    setErrors(err);

   
      axios.post("htt7p://localhost:3007/employee_login",values)
      .then(result =>{
        if(result.data = "Success"){
          localStorage.setItem("valid", true)
        
          navigate('/employee_detail/'+result.data.id)
        }else{
          alert("No record Exists")
        }
      })
      .catch(err => console.log(err))
    }

  

  console.log(values)
  return (
    <div className='login-container'>
    <h1 className='login-heading'>Employee Login</h1>
    <form action="" onSubmit={handleSubmit}  className='form'>
        <input onChange={handleInput} required  name="email" className='input' type="text" placeholder='email'/>
        {errors.email!==undefined && <p className='err-msg'>{errors.email}</p>}
        <input onChange={handleInput} required  name="password" className='input' type="password" placeholder='password'/>
        {errors.password!==undefined && <p className='err-msg'>{errors.password}</p>}
        <button type="submit" className='login-button'>Login</button>
        
    </form>
</div>
  )
}

export default EmployeeLogin