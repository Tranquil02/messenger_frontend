import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context, server } from '../main';
import '../css/header.css';

function Header() {
    const { isAuthenticated, setisAuthenticated, setLoading } = useContext(Context);
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            const data = await axios.get(`${server}/user/logout`, {
                withCredentials: true,
            });
            toast.success(data.data.message);
            setisAuthenticated(false);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setisAuthenticated(true);
            setLoading(false);
        }
    };

    //   const toggleNav = () => {
    //     setIsNavExpanded((prev) => !prev);
    //   };

    return (
        <div className="header">
            <nav className='nav-list'>
                <div className="logo">Logo</div>
                <ul className='nav-list-right'>
                    <li className='nav-item'><Link to="/">Home</Link></li>
                    {!isAuthenticated ? "" :
                        <li className='nav-item'><Link to="/profile">Profile</Link></li>
                    }
                    {isAuthenticated ? (
                        <button className="logout-btn" onClick={logoutHandler}>
                            Logout
                        </button>
                    ) : (
                        <button className="login-btn">
                            <Link to="/login">Login</Link>
                        </button>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Header;
