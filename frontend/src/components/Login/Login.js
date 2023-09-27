import React, { useState } from 'react'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import Validation from '../LoginValidation'
import axios from 'axios'

const Login = () => {

  const [values,setValues] = useState({email:"", password:""})
  const [errors,setErrors] = useState({})

  const navigate = useNavigate()

  const handleInput = (event) =>{
    setValues(prev =>({...prev, [event.target.name]:event.target.value}))
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    const err = Validation(values);
    console.log(err)
    setErrors(err);
    if (errors.email ===""&& errors.password ===""){
      axios.post("http://localhost:3007/login",values)
      .then(res =>{
        if(res.data = "Success"){
          navigate("/home")
        }else{
          alert("No record Exists")
        }
      })
      .catch(err => console.log(err))
    }

  }

  console.log(values)

  

  return (
    <div className='login-container'>
        <h1 className='login-heading'>Login</h1>
        <form action="" onSubmit={handleSubmit}  className='form'>
            <input onChange={handleInput} required  name="email" className='input' type="text" placeholder='email'/>
            {errors.email!==undefined && <p className='err-msg'>{errors.email}</p>}
            <input onChange={handleInput} required  name="password" className='input' type="password" placeholder='password'/>
            {errors.password!==undefined && <p className='err-msg'>{errors.password}</p>}
            <button type="submit" className='login-button'>Login</button>
            
            <span className=''>Don't you have an account?<Link to='/register'>Register</Link> </span>
        </form>
    </div>
  )
}

export default Login