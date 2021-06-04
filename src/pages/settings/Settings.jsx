import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context';
import { useContext, useState } from 'react';
import axios from "axios"

export default function Settings() {
    const {user, dispatch} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const PF = "https://mern-blog-fa.herokuapp.com/images/";

    const handleSubmit = async (e)=>{
        e.preventDefault();        
        dispatch({type:"UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.put("/users/"+ user._id, updatedUser) ;                  
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS", payload: res.data});
        } catch (err) {
            console.log(err);
            dispatch({type:"UPDATE_FAILURE"});
        }
    }

    return (
        <div className="settings">
            <div className="settings-wrapper">
                <div className="settings-title">
                    <span className="settings-update-title">Update Your Account</span>
                    <span className="settings-delete-title">Delete Account</span>
                </div>
                <form className="settings-form" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settings-profile">
                        {console.log(user.profilePic)}
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <i className="settings-profile-icon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display:"none"}}  onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username}  onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email}  onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <button className="settings-submit" type="submit">Update</button>
                    {success && <span>Profile has been updated</span> }
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}
