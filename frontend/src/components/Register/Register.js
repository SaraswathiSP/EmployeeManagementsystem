import React,{useState} from 'react'
import './register.css'
import {Link, useNavigate} from 'react-router-dom'
import Validation from '../RegistrationValidation'
import axios from 'axios'


const Register = () => {

  const [values,setValues] = useState({
    username:"",
    email:"",
    password:""
  })

  const [errors,setErrors] = useState({})

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const onHandleInput = (event) =>{
    setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))

  }

  const onSubmitForm = (event) =>{
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
   

      axios.post("http://localhost:3007/signup",values)   // endpoint /signup
      .then(res => {
        navigate('/adminlogin');
      })
      .catch(err => console.log(err));
    }
  
    
  return (
         <div className='register-container'>
        <h1 className='register-heading'>Register</h1>
        <form action="" onSubmit={onSubmitForm} className='form'>
            <input onChange={onHandleInput}  required className='input' type="text" name="username" placeholder='username' />
            {errors.username!==undefined && <p className='err-msg'>{errors.username}</p>}
            <input onChange={onHandleInput}  required className='input' type="email" name="email" placeholder="email"  />
            {errors.email!==undefined && <p className='err-msg'>{errors.email}</p>}
            <input onChange={onHandleInput}  required className='input' type="password" name="password" placeholder='password' />
            {errors.password!==undefined && <p className='err-msg'>{errors.password}</p>}
            <button type="submit" className='register-button'>Register</button>
            <span className=''>Do you have an account? <Link to='/adminlogin'>Login</Link> </span>
        </form>
    </div>
    
  )
}

export default Register