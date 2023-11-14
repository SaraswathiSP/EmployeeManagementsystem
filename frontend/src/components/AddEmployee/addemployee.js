import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './addemployee.css'

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        salary: "",
        contact: "",
        doj: "",
        image: "",
        category_id: "",
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get("http://localhost:3007/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('contact', employee.contact);
        formData.append('doj', employee.doj);
        formData.append('image', employee.image);
        formData.append('category_id', employee.category_id);

        axios.post('http://localhost:3007/add_employee', formData)
            .then(result => {
                console.log(formData)
                console.log(result.data)
                if (result.data.Status) {
                    
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

   


    return (
        <div className='add_employee'>
            <div className='add_employee_container'>
                <h3 className='heading'>Add Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div className='employee-data'>
                        <label className='label' htmlFor='name'>Name</label>
                        <input className='input' type="text" id="name" placeholder='Enter Employee Name...'
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='email'>Email</label>
                        <input className='input' type="text" id="email" placeholder='Enter Employee Email...'
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='password'>Password</label>
                        <input className='input' type="password" id="password" placeholder='Enter Employee Password...'
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                        />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='address'>Address</label>
                        <input className='input' type="text" id="address" placeholder='Enter Employee Address...'
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='salary'>Salary</label>
                        <input className='input' type="text" id="salary" autoComplete='off' placeholder='Enter Employee Salary...'
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='contact'>Contact</label>
                        <input className='input' type="text" id="contact" autoComplete='off' placeholder='Enter Employee Contact...'
                            onChange={(e) => setEmployee({ ...employee, contact: e.target.value })}
                        />
                    </div>

                    <div className='employee-data'>
                        <label className='label' htmlFor='doj'>Date of joining</label>
                        <input className='input' type="date" id="doj"
                            onChange={(e) => setEmployee({ ...employee, doj: e.target.value })}
                        />
                    </div>

                    <div className='employee-data'>
                        <label className='label' htmlFor='category'>Department</label>
                        <select name="category" id="category" className="select"
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            {category.map((category) => {
                                return <option className="option" key={category.id} value={category.id}>{category.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='image'>Select Image</label>
                        <input className='input' type="file" id="image" name='image'
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} />

                    </div>
                    <div>
                        <button type="submit" className='employee_add_button'>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee 
