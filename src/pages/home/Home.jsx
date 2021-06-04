import { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import axios from "axios"
import { useLocation } from 'react-router'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    const api_uri = "https://mern-blog-fa.herokuapp.com/api";
    

    useEffect(() => {
        const fetchPosts = async() => {
            const res = await axios.get(api_uri+"/posts"+search);
            setPosts(res.data);
        }
        fetchPosts()   
    }, [search]);

    return (
        <>
            <Header/>
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    )
}
