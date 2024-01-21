import React, { useState,useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../css/login.css";
import axios from "axios"
import { Context, server } from '../main';
import toast from "react-hot-toast"

function Register(){

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const {isAuthenticated,setisAuthenticated,loading,setLoading}=useContext(Context);

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
    const {data}=await axios.post(`${server}/user/new`,{
      name,email,password
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true
    })
    if(data.success===true) toast.success(data.message)
    else toast.error(data.message)
    setisAuthenticated(true);
    setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
      setisAuthenticated(false);
      setLoading(false);
    }
    
  };
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <h1>Register Now</h1>
        <div className="input-group">
          <input value={name} onChange={(e)=>{setName(e.target.value)}}
          type="text" id="name" name="name" placeholder="name" required />
        </div>
        <div className="input-group">
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}}
          type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div className="input-group">
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}}
          type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <button type="submit" disabled={loading}>Login</button>
        <div className="bottom-text">
          <p>have an account? <Link to="/Login">Login</Link></p>
          {/* <p><a href="#">Forgot password?</a></p> */}
        </div>
      </form>
    </div>
  );
};

export default Register;