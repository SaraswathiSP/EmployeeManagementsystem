import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './category.css'
import axios from 'axios'

const Category = () => {
    const [category,setCategory]  = useState([])

    useEffect(() => {
        axios.get('http://localhost:3007/category')
        .then(result =>{
           if (result.data.Status){
            setCategory(result.data.Result)
           }else{
            alert(result.data.Error)
           }
        }).catch(err => console.log(err))

    },[]);

  return (
    <div className='category-container'> 
        <div className='container_12'>
            <h3 className='category-heading'>Department List</h3>
        </div>
        <Link to = '/dashboard/add_category' className='add_button'>Add Department</Link>
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map(category => (
                        <tr  key= {category.id}>
                            <td>{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Category