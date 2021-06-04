import React, { useContext } from 'react'
import './topbar.css'
import {Link} from 'react-router-dom';
import { Context } from "../../context/Context";

export default function Topbar() {
    const {user, dispatch} = useContext(Context);

    const PF = "https://mern-blog-fa.herokuapp.com/images/";

    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }
    return (
        <div className="top">
            <div className="top-left">
            <i className="social-icon fab fa-facebook-f"></i>
            <i className="social-icon fab fa-twitter"></i>
            <i className="social-icon fab fa-instagram"></i>
            </div>
            <div className="top-center">
                <ul className="top-list">
                    <li className="top-list-item">
                        <Link to="/" style={{textDecoration:'none', color:'inherit'}}>HOME</Link>
                    </li>
                    <li className="top-list-item">ABOUT</li>
                    <li className="top-list-item">CONTACT</li>
                    <li className="top-list-item">
                        <Link to="/write" style={{textDecoration:'none', color:'inherit'}}>WRITE</Link>
                    </li>
                    <li className="top-list-item" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="top-right">
                {
                    user ? (
                        <Link to="/settings">
                            <img className="profile-img" src={ PF+ user.profilePic} alt="pro-img" />
                        </Link>
                    ) : (
                        <ul className="top-list">
                            <li className="top-list-item">
                                <Link to="/login" style={{textDecoration:'none', color:'inherit'}}>LOGIN</Link>
                            </li>
                            <li className="top-list-item">
                                <Link to="/register" style={{textDecoration:'none', color:'inherit'}}>REGISTER</Link>
                            </li>
                            
                        </ul>
                    )
                }
                <i className="top-search-icon fas fa-search"></i>
            </div>
        </div>
    )
}
