import './post.css'
import {Link} from 'react-router-dom';

export default function Post({post}) {
    const PF = "https://mernblog.s3.amazonaws.com/";
    
    return (
        <div className="post">
            {post.photo && (
                 <img className="post-img" 
                 src={PF + post.photo} 
                 alt={post.title} />
            )}
            <div className="post-info">
                <div className="post-cats">
                {
                    post.categories.map((c,id)=>(
                        <Link key={c} to={`/?cat=${c}`} className="post-cat link">
                        {c}
                        </Link>
                    ))
                }                   
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="post-title">{post.title}</span>
                </Link>
                
                <hr />
                <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="post-desc">
               {post.desc}
            </p>
        </div>
    )
}
