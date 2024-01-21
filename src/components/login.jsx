import React, { useState,useContext} from 'react';
import { Link ,Navigate} from 'react-router-dom';
import "../css/login.css";
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

function Login() {
  
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const {isAuthenticated,setisAuthenticated,loading,setLoading}=useContext(Context); 

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const data= await axios.post(`${server}/user/login`,{
        email,password},{
          headers:{"Content-Type":"application/json"},
          httpVersion: 'HTTP/1.1',
          withCredentials:true
        })
      // console.log(data);
      toast.success(data.data.message);
      setisAuthenticated(true);
      setLoading(false);
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message)  
      setisAuthenticated(false)
      setLoading(false);
    }
  }
  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <h1>Welcome Back</h1>
        <p>Please login to your account</p>
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
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          {/* <p><a href="#">Forgot password?</a></p> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
