import './App.css';

import Login from './components/Login/login';
import Register from './components/Register/register';
import Dashboard from './components/Dashboard/dashboard';
import Home from './components/Home/home';
import Category from './components/Category/category';
import Employee from './components/Employee/employee';
import Profile from './components/Profile/profile';
import AddCategory from './components/AddCategory/addcategory';


import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AddEmployee from './components/AddEmployee/addemployee';
import EditEmployee from './components/EditEmployee/editemployee';
import Entry from './components/Entry/entry';
import EmployeeLogin from './components/EmployeeLogin/employeelogin';
import EmployeeDetail from './components/EmployeeDetail/employeedetail'
import { useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Entry />}></Route>
          <Route path="/adminlogin" element={<Login />} />
          <Route path='/employee_login' element={<EmployeeLogin />}></Route>
          <Route path="/employee_detail/:id" element={<EmployeeDetail />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path="" element={<Home />}></Route>
            <Route path="/dashboard/employee" element={<Employee />}></Route>
            <Route path="/dashboard/category" element={<Category />}></Route>
            <Route path="/dashboard/profile" element={<Profile />}></Route>
            <Route path="/dashboard/add_category" element={<AddCategory />}></Route>
            <Route path="/dashboard/add_employee" element={<AddEmployee />}></Route>
            <Route path="/dashboard/edit_employee/:id" element={<EditEmployee />}></Route>

          </Route>



        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;