import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
// import Add from "./components/friend";

function App() {
  const {setUser,setisAuthenticated,setLoading,loading}=useContext(Context);
  
  useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/user/me`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.users);
      // console.log(res)
      setisAuthenticated(true);
      setLoading(false)
      
    }).catch((error)=>{
      setUser({});
      setisAuthenticated(false);
      setLoading(false)
    })
  },[]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={loading?<Loader/>:<Home/>}/>
        <Route path="/profile" element={loading?<Loader/>:<Profile/>}/>
        <Route path="/login" element={loading?<Loader/>:<Login/>}/>
        <Route path="/register" element={loading?<Loader/>:<Register/>}/>
        {/* <Route path="/add" element={<Add/>}/> */}
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App
