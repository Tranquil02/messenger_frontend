import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import "../css/profile.css"
import { Navigate } from 'react-router-dom';
import { LoaderIcon } from 'react-hot-toast';
// import Loader from './loader';

function Profile() {
  const { isAuthenticated,user,loading} = useContext(Context);
  // console.log(isAuthenticated,user);
  
  if(!isAuthenticated) return <Navigate to={"/login"}/>;
  
  return (
    <div className="wrapper">
      {}
      <div className="user-card">
        <div className="user-card-img">
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxivAs4UknzmDfLBXGMxQkayiZDhR2ftB4jcIV7LEnIEStiUyMygioZnbLXCAND-I_xWQpVp0jv-dv9NVNbuKn4sNpXYtLIJk2-IOdWQNpC2Ldapnljifu0pnQqAWU848Ja4lT9ugQex-nwECEh3a96GXwiRXlnGEE6FFF_tKm66IGe3fzmLaVIoNL/s1600/img_avatar.png" alt="" />
        </div>
        <div className="user-card-info">
          <h2>{user.name}</h2>
          <p><span>Email:</span> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
