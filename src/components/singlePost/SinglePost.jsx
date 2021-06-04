import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import './singlePost.css'
import { Context } from '../../context/Context';

export default function SinglePost() {
    const PF = "https://mern-blog-fa.herokuapp.com/images/";
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost();
    }, [path])

    const handleDelete = async () => {
        try {            
            await axios.delete(`/posts/${post._id}`, {
                data: {username: user.username},
            });
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async () =>{
        try {            
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title, 
                desc
            });
            setUpdateMode(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="single-post">

            <div className="single-post-wrapper">
               {post.photo && (
                    <img className="single-post-img" 
                    src={PF + post.photo} 
                    alt="single-post-img" />
               )}
               {
                    updateMode ? <input 
                                    type="text" 
                                    value={title} 
                                    className="single-post-input-title"
                                    onChange={e => setTitle(e.target.value)}
                                /> : (
                       <h1 className="single-post-title">
                            {title}
                            {post.username === user?.username && (                        
                                <div className="single-post-edit">
                                    <i className="single-post-icon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                                    <i className="single-post-icon far fa-trash-alt" onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                )}
                <div className="single-post-info">
                    <span className="single-post-author">Author: 
                    <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                    </Link>
                    </span>
                    <span className="single-post-date">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ?( <> <textarea 
                    value={desc}
                    type="text" 
                    className="single-post-input-desc"
                    onChange={e => setDesc(e.target.value)}
                ></textarea> 
                <button className="single-post-update-btn" onClick={handleUpdate}>Update</button>
                <button className="single-post-cancel-btn" onClick={()=> setUpdateMode(false)}>Cancel</button>
                </>)
                : 
                <p className="single-post-desc">
                   {desc}
                </p>

               
               
               }
               
            </div>
        </div>
    )
}
