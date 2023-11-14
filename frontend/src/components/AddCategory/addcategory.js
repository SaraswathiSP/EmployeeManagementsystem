import React, { useState } from 'react'
import './addcategory.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddCategory = () => {
    const [category, setCategory] = useState();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3007/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category')
                }
                else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='add_category'>
            <div className='add_category_container'>
                <h2 className=''>Add Department</h2>
                <form onSubmit={handleSubmit}>
                    <div className='category-data'>
                        <label className='label' htmlFor='category'><strong>Department:</strong></label>
                        <input className='input' type="text" name="category" placeholder='Enter Category...'
                            onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <button className='category_add_button'>Add Department</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory