import './login.css'
import {Link} from 'react-router-dom';
import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching} = useContext(Context);
    const api_uri = "https://mern-blog-fa.herokuapp.com/api";
    const handleSubmit = async (e) =>{
        e.preventDefault();

        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post(api_uri+"/auth/login", {
                username: userRef.current.value, 
                password: passwordRef.current.value
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE"});            
        }
    };

    return (
        <div className="login">
            <span className="login-title">Login</span>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    className="login-input" 
                    type="text" 
                    placeholder="Enter your username"
                    ref={userRef}
                />
                <label>Password</label>
                <input 
                    className="login-input"
                    type="password" 
                    placeholder="Enter your password"
                    ref={passwordRef}
                />
                <button className="login-button" type="submit" disabled={isFetching}>Login</button>
            </form>
            <Link className="login-register-button link" to="/register">Register</Link>

        </div>
    )
}
