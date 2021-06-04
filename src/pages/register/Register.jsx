import './register.css'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("/auth/register", {
                username, email, password
            })
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
    }
    return (
        <div className="register">
            <span className="register-title">Register</span>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    className="register-input" 
                    type="text" 
                    placeholder="Enter username"
                    onChange={e=>setUsername(e.target.value)}
                />
                <label>Email</label>
                <input 
                    className="register-input" 
                    type="text" 
                    placeholder="Enter an email"
                    onChange={e=>setEmail(e.target.value)}
                />
                <label>Password</label>
                <input 
                    className="register-input" 
                    type="passowrd" 
                    placeholder="Enter password password"
                    onChange={e=>setPassword(e.target.value)}
                />
                <button className="register-button" type="submit">Register</button>
            </form>
            <button className="register-login-button">
                <Link className="register-login-button link" to="/login">Login</Link>
            </button>
            {error && <span style={{marginTop:"10px"}}>Something went wrong</span> }
        </div>
    )
}
