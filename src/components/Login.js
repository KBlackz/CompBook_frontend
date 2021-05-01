import React, { useState } from "react"
import { useHistory } from "react-router-dom"

function Login ({ setCurrentUser }) {
    const [ formData, setFormData ] = useState ({
        name: "",
        password: "",
    })
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    function handleSubmit(e) {
        e.preventDefault();
        // request => Post/Login
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then(r => r.json())
            .then(user => {
                localStorage.setItem("userId", user.id)
                setCurrentUser(user)
                history.push("/")
            })
    }


    return (
        <div>
          <form onSubmit={handleSubmit} >
            <h1 className="letter"> Login</h1>
            <label className="letter"> name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label className="letter" >Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
    
            {errors.map((error) => (
              <p key={error} style={{ color: "red" }}>
                {error}
              </p>
            ))}

            <input type="submit" value="Login" />
          </form>
        </div>
    );
}

export default Login