import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
    });
    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3007/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get('http://localhost:3007/employee/' + id)
            .then(result => {
                console.log(result)
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    category_id: result.data.Result[0].category_id,
                })
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3007/edit_employee/' + id, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }
    return (
        <div className='add_employee'>
            <div className='add_employee_container'>
                <h3 className='heading'>Edit Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div className='employee-data'>
                        <label className='label' htmlFor='name'>Name</label>
                        <input className='input' type="text" id="name" value={employee.name} placeholder='Enter Employee Name...'
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='email'>Email</label>
                        <input className='input' type="text" id="email" value={employee.email} placeholder='Enter Employee Email...'
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                    </div>

                    <div className='employee-data'>
                        <label className='label' htmlFor='salary'>Salary</label>
                        <input className='input' type="text" id="salary" autoComplete='off' value={employee.salary} placeholder='Enter Employee Salary...'
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='address'>Address</label>
                        <input className='input' type="text" id="address" value={employee.address} placeholder='Enter Employee Address...'
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className='employee-data'>
                        <label className='label' htmlFor='category'>Category</label>
                        <select name="category" id="category" className="select"
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            {category.map((category) => {
                                return <option className="option" key={category.id} value={category.id}>{category.name}</option>;
                            })}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className='employee_add_button'>Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee