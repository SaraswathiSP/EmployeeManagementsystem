import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './entry.css'

const Entry = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        axios.get('http://localhost:3007/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role === "admin") {
                        navigate('/dashboard')
                    } else {
                        navigate('/employee_detail/' + result.data.id)
                    }
                }
            }).catch(err => console.log(err))
    }, [])



    return (
        <div className="entry__cont">
            <div className="img__container">
            <img className="img" src="https://res.cloudinary.com/dg0telgxq/image/upload/v1699689400/123_xjfnvn.jpg" alt="" />
            </div>
            <div className="cont__2">
            <div className="cont__21">
                <h2 style={{color:"#3b0764", fontSize:30}}>Login As</h2>
                <div style={{display:"flex"}}>
                    <button className="custom-btn btn-1" type="button" onClick={() => { navigate('/employee_login') }}>
                        Employee
                    </button>
                    <button className="custom-btn btn-2 btn-1" type="button" onClick={() => { navigate('/adminlogin') }}>
                        Admin
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Entry;