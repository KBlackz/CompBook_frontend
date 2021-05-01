import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUp ({ setCurrentUser }) {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        interest: "",
        
    });
    const [errors, setErrors] = useState([])
    const history = useHistory()

    // console.log (errors)

    const {name, interest, password} = formData;

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        // To: sign up as a new user
        // request => Post /signup
        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"   
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then((data) => {
            if (data.errors) {
                setErrors(data.errors)
            } else {
                localStorage.setItem("userId", data.id)
                setCurrentUser(data)
                history.push("/")
            }
        })
    }
    return(
        <form onSubmit={handleSubmit} autoComplete="off">
        <h1>Signup</h1>

        <label>name</label>
        <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
        />

        <label>Password</label>
        <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
        />

        <label>interest</label>
        <input
            type="text"
            name="interest"
            value={interest}
            onChange={handleChange}
        />

        {errors.map((error) => (
            <p key={error} style={{ color: "red" }}>
            {error}
            </p>
        ))}

        <input type="submit" value="Signup" />

    </form>
    )
}

export default SignUp
