import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'

export default function Sidebar() {
    const [cats, setCats]  = useState([]);
    const api_uri = "https://mern-blog-fa.herokuapp.com/api";
    useEffect(() => {
        const getCats = async ()=>{
            const res = await axios.get(api_uri+"/categories");
            setCats(res.data);
        }
        getCats();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <div className="sidebar-title">ABOUT US</div>
                <img src="https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nam voluptatem amet nisi, possimus impedit aliquam voluptate asperiores ab tempora!
                </p>
            </div>
            <div className="sidebar-item">
                <div className="sidebar-title">CATEGORIES</div>
                <ul className="sidebar-list">
                    {
                        cats.map((c)=>(
                            <Link key={c._id} to={`/?cat=${c.name}`} className="link">
                                <li className="sidebar-list-item">{c.name}</li>
                            </Link>
                        ))
                    }
                    
                </ul>
            </div>
        </div>
    )
}
