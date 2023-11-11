import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './employee.css'

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const [categories,setCategories]  = useState({})

  

 
  useEffect(() => {
    axios.get("http://localhost:3007/category")
      .then(result => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false); // Set loading to false after data fetching is complete
      });
  }, []);

    console.log(categories)



    useEffect(() => {
      axios
        .get("http://localhost:3007/employee")
        .then((result) => {
          console.log(result.data)
          if (result.data.Status) {
            setEmployee(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }, []);

console.log(employee)

    const handleDelete = (id) => {
      axios.delete('http://localhost:3007/delete_employee/' + id)
        .then(result => {
          if (result.data.Status) {
            window.location.reload()
          } else {
            alert(result.data.Error)
          }
        })
    }

    const filteredEmployees = employee.filter((employee) => {
      const name = employee.name ? employee.name.toLowerCase() : '';
      const category = employee.category ? employee.category.toLowerCase() : '';
      
      return (
        name.includes(searchTerm.toLowerCase()) || category.includes(searchTerm.toLowerCase())
      );
    });
  

    return (
      <div className='employee-container'>
        {loading ? (
        <p>Loading...</p> // Display a loading message while data is being fetched
      ) : (
        <div className='table-container'>
          {/* Your table rendering code */}
        </div>
      )}
        <Link to="/dashboard/add_employee" className='add_button'>
          Add Employee
        </Link>

        <div className='table-container'>
          <div className="tablehead__container">
            <h3 className='employee-heading'>Employee List</h3>
            <div className="search-filter-container">
              <input
                className="search"
                type="search"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>S.NO.</th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Date of joining</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((e, index) => (
                  <tr key={e.id}>
                    <td>{index + 1}</td>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={`http://localhost:3007/Images/` + e.image}
                        className="employee_image"
                      /> <p>{e.name}</p>
                    </td>
                    <td>
                      {categories[e.category_id - 1]?.name}
            </td>
                    <td><div style={{display:"flex", flexDirection:"column", alignItems:'flex-start'}}><span>+91 {e.contact}</span><span>{e.address}</span> <span className="email">{e.email}</span> </div></td>
                    <td>{`${e.doj.slice(0,10)}`}</td>
                    <td>{e.salary}</td>
                    
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="edit__container">
                          <Link
                            to={`/dashboard/edit_employee/` + e.id}
                            className="edit__info"
                          >
                            Edit
                          </Link>
                        </div>
                        <button
                          className="del__button"
                          onClick={() => handleDelete(e.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        );
};

        export default Employee;

