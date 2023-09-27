function Validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.email === ""){
        error.email  = "Email is required"
    }
    else if (!email_pattern.test(values.email)){
        error.email = "Please enter a valid email"
    }else{
        error.email = ""
    }

    if (values.password === ""){
        error.password = "Password is required"
    }
    else if (!password_pattern.test(values.password)){
        error.password = "Please enter a valid password"
    }
    else{
        error.password = ""
    }

    return error;



}

export default Validation